
import {  doc, getDoc } from "firebase/firestore";
import { DB } from "./Initialisation";

export async function getUserRole(uid: string): Promise<string> {
    try {
        const userDoc = await getDoc(doc(DB,"admins",uid))
        if (userDoc.exists()) {
            console.log(userDoc?.data().role)
            return userDoc?.data().role || ""
        } else {
            return 'user';
        }
    } catch (error) {
        console.error('Error getting user role:', error);
        return 'user';
    }
}
