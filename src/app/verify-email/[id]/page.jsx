"use client"
import React, { useEffect, useState } from 'react';
import { auth } from '@/Firebase/Initialisation';
import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import { FireSignUp } from '@/Firebase/Authentication';

const CheckEmailPage = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const handleAuthChange = async (user) => {
            if (user && user.emailVerified) {
                const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
                if (storedUserData) {

                    await FireSignUp ({
                        displayName: storedUserData.displayName,
                        email: storedUserData.email,
                        phoneNumber: storedUserData.phoneNumber,

                    });
                    sessionStorage.removeItem('userData');
                    localStorage.setItem('UserID', JSON.stringify(user.uid));
                    window.location.assign("/");
                }
            }
        }

    const unsubscribe = onAuthStateChanged(auth, handleAuthChange);

    const intervalId = setInterval(async () => {
        const user = auth.currentUser;
        if (user) {
            await user.reload();
            if (user.emailVerified) {
                handleAuthChange(user);
            }
        }
    }, 3000); 

    return () => {
        clearInterval(intervalId);
        unsubscribe();
    };
}, []);

    useEffect(() => {
        const userDataFromSession = JSON.parse(sessionStorage.getItem('userData'));
        if (userDataFromSession) {
            setUserData(userDataFromSession);
        }
    }, []);

    const reSend = async (e) => {
        e.preventDefault();
        await sendEmailVerification(auth.currentUser);
        window.location.reload();
    };

    return (
        <div className="container text-black">
            <h1>Check Your Email</h1>
            <p>We have sent a verification email to {auth.currentUser?.email}. Please check your inbox and follow the instructions to verify your email address.</p>
            <p>Please wait while we check the status of your email verification. You will be redirected to the home page once your email is verified.</p>
            <button onClick={reSend}>
                Resend E-mail
            </button>
        </div>
    );
};

export default CheckEmailPage;
