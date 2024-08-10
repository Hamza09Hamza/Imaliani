import { getDocs, collection, query, where, orderBy, limit, startAfter,addDoc, getDoc, updateDoc, deleteDoc, setDoc, doc, increment } from "firebase/firestore";
import { DB, auth } from "../Initialisation";
import axios from "axios";

export const getUserReviews = async (userId,lastVisibleOrder = null, pageSize = 5) => {
    try {
        const {data}=await axios.post("/api/encrypt",{id:userId,data:userId})
        const encryptedUserID=data.data
        const reviewsRef = collection(DB, "Ratings");
        let reviewsQuery = query(
            reviewsRef,
            where("cryptedUserID","==",encryptedUserID),
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

        const reviews  = await Promise.all(querySnapshot.docs.map(async(doc) => {
            const data = doc.data();
            let UserID=await axios.post("/api/decrypt",{id:userId,data:data.cryptedUserID})
            let ProductID=await axios.post("/api/decrypt",{id:userId,data:data.ProductID})
            UserID=UserID.data.data
            ProductID=ProductID.data.data
            return {
                id: doc.id,
                ...data,
                UserID: UserID,
                ProductID:ProductID,
            };
        }));

        // Get the last visible document for pagination
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        return { reviews, lastVisible };
    } catch (error) {
        console.error("Error retrieving user reviews:", error);
        throw new Error("Failed to retrieve reviews.");
    }
};

export const getProductReviews = async (productId, lastVisibleReview = null, pageSize = 10,userId) => {
    try {
        const {data}=await axios.post("/api/encrypt",{id:userId,data:productId})
        const cryptedProductId=data.data
        const reviewsRef = collection(DB, "Ratings");
        let reviewsQuery = query(
            reviewsRef,
            where("ProductID","==",cryptedProductId),
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
        const reviews = await Promise.all(querySnapshot.docs.map(async(doc) => {
            const data = doc.data();
            let UserID=await axios.post("/api/encrypt",{id:userId,data:data.UserID})
            let ProductID=await axios.post("/api/encrypt",{id:userId,data:data.ProductID})
            UserID=UserID.data.data
            ProductID=ProductID.data.data
            return {
                id: doc.id,
                ...data,
                UserID: UserID,
                ProductID:ProductID,
                
            };
        }));
        let ratingsPerValue=[
            { 
                label:0,
                value: (await productReviewperStar(productId,0)).length
            },
            { 
                label:1,
                value: (await productReviewperStar(productId,1)).length
            },
            { 
                label:2,
                value: (await productReviewperStar(productId,2)).length
            },
            { 
                label:3,
                value: (await productReviewperStar(productId,3)).length
            },
            { 
                label:4,
                value: (await productReviewperStar(productId,4)).length
            },
            { 
                label:5,
                value: (await productReviewperStar(productId,5)).length
            },
            ]


        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        return { reviews,ratingsPerValue ,lastVisible };
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
        const reviews = await Promise.all(querySnapshot.docs.map(async(doc) => {
            const data = doc.data();
            let UserID=await axios.post("/api/encrypt",{id:userId,data:data.UserID})
            let ProductID=await axios.post("/api/encrypt",{id:userId,data:data.ProductID})
            UserID=UserID.data.data
            ProductID=ProductID.data.data
            return {
                id: doc.id,
                ...data,
                UserID: UserID,
                ProductID:ProductID,
            };
        }));

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

export const setReviews = async (id = null, ReviewData,lastrate = null) => {
    try {
        const {data}=await axios.post("/api/decrypt",{id:auth.currentUser.uid,data:ReviewData.ProductID})
        const decryptedProductId=data.data
        const productRef = doc(DB, "products/", decryptedProductId);
        const productSnapshot = await getDoc(productRef);
        console.log(auth.currentUser.uid)
        const productData = productSnapshot.data();
        if(id!==null && lastrate){
             await setDoc(doc(DB, "Ratings/", id), ReviewData);
             if(ReviewData.rating !== undefined ){
                 const newRateMoyenne = (productData.rate *productData.totalRates -lastrate + ReviewData.rating)/(productData.totalRates)
                 await updateDoc(productRef, {
                    rate: newRateMoyenne,
                });
             }
        }
        else{
            console.log(typeof(productData.rate),typeof(productData.totalRates),typeof(ReviewData.rating),)
            await addDoc(collection(DB,"Ratings"),ReviewData)
            const newRateMoyenne = (productData.rate *productData.totalRates + ReviewData.rating)/(productData.totalRates+1)
            console.log(newRateMoyenne)
            await updateDoc(productRef, {
                rate: newRateMoyenne,
                totalRates: increment(1)
            }); 

        }
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




export async function productReviewperStar(id, star) {
    try {
        const {data}=await axios.post("/api/encrypt",{id:auth.currentUser.uid,data:id})
        const encryptedProductID=data.data

        const reviewsQuery = query(
            collection(DB, "Ratings"),
            where("rating", "==", star),
            where("ProductID","==",encryptedProductID),
            orderBy("dateAdded", "desc")
        );


        const datares = await getDocs(reviewsQuery);
        const result = datares.docs.map((doc) => ({ ...doc.data(), id: doc.id }));


        return result;
    } catch (error) {
        console.error("Error fetching reviews:", error);
        throw new Error("Failed to fetch product reviews");
    }
}


export const getRateProduct=async (id,userId)=>{
    const {data}=await axios.post("/api/encrypt",{id:userId,data:id})
    const encrypted=data.data
    const ratesRef = collection(DB, "Ratings");

    let ratesQuery = query(
        ratesRef,
        where("ProductID", "==",encrypted), 
    );
    const querySnapshot = await getDocs(ratesQuery);
    let totalRatings = 0;
    let ratingsCount = 0;
    querySnapshot.forEach(doc => {
        totalRatings += doc.data().rating;
        ratingsCount += 1;
    });
    if(totalRatings>0&&ratingsCount>0)
        return totalRatings/ratingsCount;
    else
        return 0
    

}
