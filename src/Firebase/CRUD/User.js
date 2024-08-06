import { DB, auth } from "../Initialisation";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { decryptData, encryptData } from "../../app/Utils/Encryption";



export const getUserData = async (id) => {
    try {
        const docRef = doc(DB, "Users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("Document data:", data);

            const encryptedData = encryptData(data);
            sessionStorage.setItem('UserData', encryptedData);

            return data;
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error getting document:", error);
    }
};

export const getStoredUserData = () => {
    const encryptedData = sessionStorage.getItem('UserData');
    if (encryptedData) {
        return decryptData(encryptedData);
    }
    return null;
};

export const updateUserField = async ( field, value,userid) => {
    try {

        const userDocRef = doc(DB, "Users", userid);
        const userDocSnap = await getDoc(userDocRef);
        console.log("test")
        if (userDocSnap.exists()) {
           
            await updateDoc(userDocRef, {
                [field]: value
            });
            console.log(`User's ${field} updated successfully.`);
        } else {
            console.log("User document does not exist.");
        }
    } catch (error) {
        console.error(`Error updating user ${field}:`, error);
        throw new Error(`Failed to update user ${field}.`);
    }
};





