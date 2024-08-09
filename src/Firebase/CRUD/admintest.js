import "server-only";
import { getFirestore } from "firebase-admin/firestore";
import admin from "firebase-admin";


// Ensure the app is not initialized more than once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(process.env.FIREBASE_CREDENTIALS),
  });
}


const firestore = getFirestore();
export const adminCreateOrder = async (data) => {
  try {
    const ordersSnapshot = await firestore.collection('Orders').add(data);
    console.log(ordersSnapshot.empty);
    console.log("done creating order");
  } catch (error) {
    console.log("error creating order", error);
  }
};

export const adminUpdateUserChart= async(userID)=>{
  try {
    // Reference to the user's document in the Users collection
    const userDocRef = firestore.collection('Users').doc(userID);

    // Update the Chart field for the user
    await userDocRef.update({ Chart: [] });

    console.log("User Chart updated successfully");
  } catch (error) {
    console.error("Error updating user Chart:", error);
  }
}

