import { getDocs, collection, query, where, orderBy, limit, startAfter,addDoc } from "firebase/firestore";
import { DB } from "./Initialisation";
import { decryptData, encryptData } from "../../app/Utils/Encryption";


export const getUserReviews = async (lastVisibleOrder = null, pageSize = 10) => {
    try {
        const encryptedUserData = sessionStorage.getItem('UserData');
        if (!encryptedUserData) {
            throw new Error("User data not found in session storage.");
        }
        
        const userData = decryptData(encryptedUserData);
        const userId = userData?.id;
        if (!userId) {
            throw new Error("User ID not found in decrypted user data.");
        }

        const reviewsRef = collection(DB, "reviews");
        let reviewsQuery = query(
            reviewsRef,
            where("UserID", "==", encryptData(userId)),  // Encrypt userId for the query
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
            // Decrypt UserID and ProductIDs
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
        const reviewsRef = collection(DB, "reviews");
        let reviewsQuery = query(
            reviewsRef,
            where("ProductID", "==", encryptData(productId)),
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

        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        return { reviews, lastVisible };
    } catch (error) {
        console.error("Error retrieving product reviews:", error);
        throw new Error("Failed to retrieve product reviews.");
    }
};


export const getAllReviews = async (lastVisibleOrder = null, pageSize = 10) => {
    try {
        const reviewsRef = collection(DB, "reviews");
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

export const setNewReview = async ( ReviewData) => {
    try {
        
        const encryptedReviewData = {
            ...ReviewData,
            UserID: encryptData(ReviewData.UserID),
            ProductID: encryptData(product.ProductID)
        };

        await addDoc(doc(DB, "reviews"), encryptedReviewData);
        console.log("Review saved successfully.");
    } catch (error) {
        console.error("Error saving Review:", error);
        throw new Error("Failed to save Review.");
    }
};


export const deleteReview = async (ReviewId) => {
    try {
        const ReviewRef = doc(DB, "reviews", ReviewId);
        await deleteDoc(ReviewRef);
        console.log("Review deleted successfully.");
    } catch (error) {
        console.error("Error deleting Review:", error);
        throw new Error("Failed to delete Review.");
    }
};


export const updateReviewstatus = async (ReviewId, reviewData) => {
    try {
        const ReviewRef = doc(DB, "reviews", ReviewId);
        await updateDoc(ReviewRef,reviewData);
        console.log("Review  updated successfully.");
    } catch (error) {
        console.error("Error updating Review :", error);
        throw new Error("Failed to update Review .");
    }
};