import {  deleteDoc, doc,getDoc, getDocs ,limit,orderBy,query,startAfter,updateDoc, where} from "firebase/firestore";
import { ref } from "firebase/database";
import {  ref as storageRef, uploadBytes, getDownloadURL ,deleteObject} from "firebase/storage";
import { DB ,Storage as storage} from "../Initialisation";
import { addDoc, collection } from "firebase/firestore";


const uploadImage = async (imageFile) => {
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
        const productRef = doc(DB, "products/", productId);

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
        const productRef = doc(DB, "products/", productId);

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
            let data={...docSnap.data(),id:docSnap.id}
            return data
        } else {
            console.log("No such product!");
        }
        
    } catch (error) {
        console.log(error)
    }
    
}

export const fetchNewProducts = async (lastVisible=null) => {
   try {
    const productsRef = collection(DB, "products");
    let productQuery = query(productsRef, orderBy("dateAdded", "desc"),  limit(10));
    if (lastVisible) {
        productQuery = query(
            productQuery,
            startAfter(lastVisible)
        );
    }
    const querySnapshot = await getDocs(productQuery);
    let lastVisibleGift=null
    const products = querySnapshot.docs.map(doc => ({...doc.data(),id:doc.id}));
    if(products.length==10){
     lastVisibleGift = querySnapshot.docs[querySnapshot.docs.length - 1];
    }
    return {products,lastVisibleGift};
   } catch (error) {
    console.log("error fetching new products",error)
   } 
};


export const fetchCatProducts = async (categorie,lastVisibleProduct = null, pageSize = 10) => {
    try {
        const productsRef = collection(DB, "products");
        let q = query(
            productsRef,
            where("category", "==", categorie), 
            limit(pageSize)
        );
        if (lastVisibleProduct) {
            q = query(
                q,
                startAfter(lastVisibleProduct)
            );
        }

        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map(doc => doc.data());
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        return {products,lastVisible};
    } catch (error) {
        console.error("Error searching products by category:", error);
        return [];
    }
 };
export const fetchrandomProducts = async (lastVisibleOrder = null, pageSize = 10) => {
    try {
        const productsRef = collection(DB, "products");
        let q = query(
            productsRef,
            limit(pageSize)
        );
        if (lastVisibleOrder) {
            q = query(
                q,
                startAfter(lastVisibleOrder)
            );
        }

        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map(doc => {return {id:doc.id,...doc.data()}});
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        return {products,lastVisible};
    } catch (error) {
        console.error("Error searching products by category:", error);
        return [];
    }

 };



export const getProductName= async (ProductID)=>{
   const res =await getDoc(doc(DB,"products/",ProductID))
   if(res.exists()){
    return res.data().title
   }else{
    return ""
   }

}