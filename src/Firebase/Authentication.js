import {
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
    signOut,
    signInWithEmailAndPassword,
    
} from "firebase/auth";
import { DB, auth } from "./Initialisation";
import { setDoc, doc,getDoc } from "firebase/firestore";
const provider = new GoogleAuthProvider();

auth.useDeviceLanguage();

export const FireSignUp = async (userData) => {
    const userDoc = {
        displayName: userData.displayName,
        Chart: [],
        
        email: userData.email,
        
        phoneNumber: userData.phoneNumber 
    };

    await setDoc(doc(DB, "Users/", auth.currentUser.uid), { ...userDoc });
    
};

const handleUserSignUp = async (userData) => {
    await updateProfile(auth.currentUser, { displayName: userData.firstName + ' ' + userData.lastName });
    console.log("Done Setting Name");

    await sendEmailVerification(auth.currentUser);
    console.log("Verification email sent");

    await FireSignUp( {
        displayName: userData.firstName+' '+userData.lastName,
        email:userData.email,
        phoneNumber:userData.phoneNumber
    })
    console.log("user Added")
    
    
    window.location.assign('/verify-email/'+auth.currentUser.uid);

};

export const GoogleSignUporIn = async () => {
    try {
        console.log("Trying sign up or sign in with Google");
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const userDocRef = doc(DB, "Users/", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            // New user, sign up
            await FireSignUp({
                displayName: user.displayName,
                email: user.email,
                phoneNumber: user.phoneNumber
            });
            console.log("User added to Firestore");
            window.location.assign("/")

        } else {
            // Existing user, sign in
            sessionStorage.setItem('UserID', JSON.stringify(user.uid));
            console.log("User signed in");
            window.location.assign("/");
        }
    } catch (error) {
        console.log("Error during Google Sign In/Sign Up", error);
    }
};

export const EmailSignUp = async (userData) => {
    try {
        console.log("Trying sign up with Email & Password");
        await createUserWithEmailAndPassword(auth, userData.email, userData.password);
        console.log("Done in FireAuth");
        console.log(userData.phoneNumber)
        await handleUserSignUp(userData);
        localStorage.setItem("UserID",JSON.stringify(auth.currentUser.uid))
        console.log("Done in FireStore");
        return ""
    } catch (error) {
        console.error("Error during Email SignUp:", error);
        if (error.code === 'auth/email-already-in-use') {
            return "An account with this email already exists.";
        } else if (error.code === 'auth/invalid-email') {
            return "The email address is badly formatted.";
        } else if (error.code === 'auth/weak-password') {
            return "The password is too weak.";
        } else if (error.code =="auth/invalid-credential") {
            return "Email or Password are incorrect.";
        }
        else {
            return "could not sign you up retry later";
        }
    }
};

export const  UserSignout =async ()=>{
    try {
        await signOut(auth)
        sessionStorage.removeItem("UserID")
        localStorage.removeItem("UserID")
        sessionStorage.clear();
        window.location.assign("/")

    } catch (error) {
        console.log("Error during  Sign out",error)
    }
}

export const EmailSignIn=async({email,password})=>{
    try {
       await  signInWithEmailAndPassword(auth,email,password)
       localStorage.setItem("UserID",JSON.stringify(auth.currentUser.uid))
       sessionStorage.setItem("UserID",JSON.stringify(auth.currentUser.uid))

    } catch (error) {
        console.error("Error during Email SignIn:", error);
        if (error.code === 'auth/user-not-found') {
            return "No account found with this email.";
        } else if (error.code === 'auth/wrong-password') {
            return "Incorrect password. Please try again.";
        } else if (error.code === 'auth/invalid-email') {
            return "The email address is badly formatted.";
        } else if (error.code =="auth/invalid-credential") {
            return "Email or Password are incorrect.";
        }
        else {
            return "could not sign you in  retry later";
        }
    
    }
}
export const GoogleSignIn=async()=>{
    try {
        await signInWithPopup(auth, provider);
        sessionStorage.setItem('UserID', JSON.stringify(auth.currentUser.uid));

    } catch (error) {
        console.log("Error during Google Sign In",error)

    }
}
