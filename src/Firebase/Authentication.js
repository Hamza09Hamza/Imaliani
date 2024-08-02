import {
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification
} from "firebase/auth";
import { DB, auth } from "./Initialisation";
import { setDoc, doc } from "firebase/firestore";

auth.useDeviceLanguage();

export const FireSignUp = async (userData) => {
    const userDoc = {
        displayName: userData.displayName,
        Chart: [
            {
                ProductID: "",
                Quantity: 0,
            },
        ],
        Ratings: [""],
        Orders: [""],
        email: userData.email,
        phoneNumber: userData.phoneNumber 
    };
    await setDoc(doc(DB, "Users", auth.currentUser.uid), { ...userDoc });
};

const handleUserSignUp = async (userData) => {
    await updateProfile(auth.currentUser, { displayName: userData.firstName + ' ' + userData.lastName });
    console.log("Done Setting Name");

    await sendEmailVerification(auth.currentUser);
    console.log("Verification email sent");

    sessionStorage.setItem('userData', JSON.stringify(
        {
            displayName: userData.firstName+' '+userData.lastName,
            email:userData.email,
            phoneNumber:userData.phoneNumber
        }
    ));

    
    window.location.assign('/verify-email/'+auth.currentUser.uid);

};

export const GoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
        console.log("Trying sign up with Google");
        await signInWithPopup(auth, provider);
        console.log("Done in FireAuth");
        await FireSignUp({
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            phoneNumber: auth.currentUser.phoneNumber
        });
        console.log("Done in FireStore");
    } catch (error) {
        console.log(error);
    }
};

export const EmailSignUp = async (userData) => {
    try {
        console.log("Trying sign up with Email & Password");
        await createUserWithEmailAndPassword(auth, userData.email, userData.password);
        console.log("Done in FireAuth");
        console.log(userData.phoneNumber)
        await handleUserSignUp(userData);
        console.log("Done in FireStore");
    } catch (error) {
        console.error("Error during Email SignUp:", error);
    }
};
