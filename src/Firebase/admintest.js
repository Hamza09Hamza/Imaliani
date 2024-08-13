import "server-only";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import admin from "firebase-admin";


// Ensure the app is not initialized more than once
if (!admin.apps.length) {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

    admin.initializeApp({
        credential: admin.credential.cert({
        "type": process.env.FIREBASE_TYPE,
        "project_id": process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
        privateKey:privateKey,
        "client_email": process.env.FIREBASE_CLIENT_EMAIL,
        "client_id": process.env.FIREBASE_CLIENT_ID,
        "auth_uri": process.env.FIREBASE_AUTH_URI,
        "token_uri":process.env.FIREBASE_TOKEN_URI,
        "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
        "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL,
        "universe_domain":process.env.UNIVERSE_DOMAIN,
        }),
    });
}


const firestore = getFirestore();
const adauth=getAuth()
export const adminCreateOrder = async (data) => {
  try {

    
    await firestore.collection('Orders').add(data);
    console.log("done creating order");
  } catch (error) {
    console.log("error creating order", error);
  }
};
export const admincheck=()=>{
  return {adauth,firestore};
}

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

