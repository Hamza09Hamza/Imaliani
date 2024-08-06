import { getDocs, collection, query, where, orderBy, limit, startAfter,addDoc, getDoc, updateDoc, deleteDoc, setDoc, doc } from "firebase/firestore";
import { DB } from "../Initialisation";
import { decryptData, encryptData } from "../../app/Utils/Encryption";
import { error } from "console";
import { ref } from "firebase/storage";


export const getUserReviews = async (userId,lastVisibleOrder = null, pageSize = 5) => {
    try {
        const reviewsRef = collection(DB, "Ratings");
        let reviewsQuery = query(
            reviewsRef,
            where("UserID","==",encryptData(userId)),
            orderBy("dateAdded", "desc"),
            limit(pageSize)
        );


        if (lastVisibleOrder) {
            reviewsQuery = query(
                reviewsQuery,
                startAfter(lastVisibleOrder)
            );
        }

        const querySnapshot = await getDocs(reviewsQuery);
        console.log(querySnapshot.empty)
        const reviews = querySnapshot.docs.map(doc => {
            const data = doc.data();
            // Decrypt UserID and ProductIDs
            return {
                id: doc.id,
                ...data,
                UserID: decryptData(data.UserID),
                ProductID:decryptData(data.ProductID),
            };
        });

        // Get the last visible document for pagination
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        return { reviews, lastVisible };
    } catch (error) {
        console.error("Error retrieving user reviews:", error);
        throw new Error("Failed to retrieve reviews.");
    }
};

export const getProductReviews = async (productId, lastVisibleReview = null, pageSize = 10) => {
    try {
        const reviewsRef = collection(DB, "Ratings");
        let reviewsQuery = query(
            reviewsRef,
            where("ProductID","==",encryptData(productId)),
            orderBy("dateAdded", "desc"),
            limit(pageSize)
        );

        if (lastVisibleReview) {
            reviewsQuery = query(
                reviewsQuery,
                startAfter(lastVisibleReview)
            );
            
        }
        const querySnapshot = await getDocs(reviewsQuery);
        const reviews = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            UserID: decryptData(doc.data().UserID),
            ProductID: decryptData(doc.data().ProductID),
        }));
        console.log(querySnapshot.empty)


        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        return { reviews, lastVisible };
    } catch (error) {
        console.error("Error retrieving product reviews:", error);
        throw new Error("Failed to retrieve product reviews.");
    }
};


export const getAllReviews = async (lastVisibleOrder = null, pageSize = 10) => {
    try {
        const reviewsRef = collection(DB, "Ratings");
        let reviewsQuery = query(
            reviewsRef,
            orderBy("date", "desc"),
            limit(pageSize)
        );

        if (lastVisibleOrder) {
            reviewsQuery = query(
                reviewsQuery,
                startAfter(lastVisibleOrder)
            );
        }

        const querySnapshot = await getDocs(reviewsQuery);
        const reviews = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                UserID: decryptData(data.UserID),
                Products: data.Products.map(product => ({
                    ...product,
                    ProductID: decryptData(product.ProductID)
                }))
            };
        });

        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        return { reviews, lastVisible };
    } catch (error) {
        console.error("Error retrieving all reviews:", error);
        throw new Error("Failed to retrieve reviews.");
    }
};

export const getReviwesperID=async (id)=>{
    if(id)
    {    const ReviewRef = doc(DB, "Ratings", id);
        try {
            return (await getDoc(ReviewRef)).data()
        } catch (error) {
            console.log(error)
        }
    }else{
        throw new error("nothing")
    }
}

export const setReview = async (id=null, ReviewData) => {
    try {

        
        if(id!==null){
            await setDoc(doc(DB, "Ratings/",id), ReviewData);}
        else
            await addDoc(collection(DB,"Ratings"),ReviewData)
        console.log("Review saved successfully.");
    } catch (error) {
        console.error("Error saving Review:", error);
        throw new Error("Failed to save Review.");
    }
};


export const deleteReview = async (ReviewId) => {
    try {
        const ReviewRef = doc(DB, "Ratings/", ReviewId);
        await deleteDoc(ReviewRef);
        console.log("Review deleted successfully.");
    } catch (error) {
        console.error("Error deleting Review:", error);
        throw new Error("Failed to delete Review.");
    }
};

