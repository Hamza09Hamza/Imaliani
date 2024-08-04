import {  deleteDoc, doc,getDoc, getDocs ,updateDoc} from "firebase/firestore";
import { ref } from "firebase/database";
import {  ref as storageRef, uploadBytes, getDownloadURL ,deleteObject} from "firebase/storage";
import { DB ,Storage as storage} from "../Initialisation";
import { addDoc, collection } from "firebase/firestore";


const uploadImage = async (imageFile) => {
    console.log(imageFile)
    const imageRef = storageRef(storage, `${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
};

export const addNewProduct = async (productData) => {
    try {
        const { images, ...rest } = productData;
        const imageUrls = await Promise.all(images.map(uploadImage));

        const ProductData = {
            ...rest,
            images: imageUrls,  
        };

        await addDoc(collection(DB, "products"), ProductData);
    } catch (error) {
        console.error("Error adding product: ", error);
        throw new Error("Failed to add product.");
    }
};


export const updateProduct = async (productId, updatedData) => {
    try {
        console.log(updatedData)
        const productRef = doc(DB, "products", productId);

        const productSnap = await getDoc(productRef);
        if (!productSnap.exists()) {
            throw new Error("Product not found");
        }
        const currentProductData = productSnap.data();

        if (updatedData.images) {
          
            const oldImageUrls = currentProductData.images.filter(item => !updatedData.images.includes(item));
            const deletePromises = oldImageUrls.map(url => {
                const imageRef = storageRef(storage, url);
                return deleteObject(imageRef);
            });
            
            await Promise.all(deletePromises);
            const newImages= updatedData.images.filter(item => !currentProductData.images.includes(item))
            const newImageUrls = await Promise.all(newImages.map(uploadImage));

            
            const Images = updatedData.images.filter(item => currentProductData.images.includes(item));

            updatedData.images = Images.length === 0 ? [...newImageUrls] : [...Images, ...newImageUrls];

        }

        

        await updateDoc(productRef, updatedData);
        console.log("Product updated with ID: ", productId);
    } catch (error) {
        console.error("Error updating product: ", error);
        throw new Error("Failed to update product.");
    }
};

export const deleteProduct = async (productId) => {
    try {
        const productRef = doc(DB, "products", productId);

        const productSnap = await getDoc(productRef);
        if (!productSnap.exists()) {
            throw new Error("Product not found");
        }
        const productData = productSnap.data();
        const imageUrls = productData.images || [];

        const deletePromises = imageUrls.map(url => {
            const imageRef = storageRef(storage, url);
            return deleteObject(imageRef);
        });
        await Promise.all(deletePromises);
        console.log("Images deleted ")
        await deleteDoc(productRef);
        console.log("Product deleted with ID: ", productId);
        window.location.assign("/admin")
    } catch (error) {
        console.error("Error deleting product: ", error);
        throw new Error("Failed to delete product.");
    }
};


export const getProductsperID=async(id)=>{
    try {
        const docSnap=await getDoc(doc(DB,"products/"+id));
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return docSnap.data()
        } else {
            console.log("No such product!");
        }
        
    } catch (error) {
        console.log(error)
    }
    
}

export const fetchNewProducts = async () => {
   try {
    const productsRef = collection(DB, "products");
    const q = query(productsRef, orderBy("dateAdded", "desc"),  limit(10));
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc => doc.data());
    return products;
   } catch (error) {
    console.log("error fetching new products")
   } 
};
export const fetchNextNewProducts = async (lastVisible) => {
    if (!lastVisible) return []; // No more products to fetch

    try {
        const productsRef = collection(db, "products");
        const q = query(
            productsRef,
            orderBy("dateAdded", "desc"),
            startAfter(lastVisible), // Start after the last document from previous fetch
            limit(10)
        );

        const querySnapshot = await getDocs(q);
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]; // Update the last document

        const products = querySnapshot.docs.map(doc => doc.data());
        console.log("Next 10 products:", products);
        return products;
    } catch (error) {
        console.error("Error fetching next 10 products:", error);
        return [];
    }
};

export const fetchCatProducts = async (categorie) => {
    try {
        const productsRef = collection(db, "products");
        const q = query(
            productsRef,
            where("category", "==", categorie), 
        );

        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map(doc => doc.data());
        console.log("Products found:", products);
        return products;
    } catch (error) {
        console.error("Error searching products by category:", error);
        return [];
    }

 };
