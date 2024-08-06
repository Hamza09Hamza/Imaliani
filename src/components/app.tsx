"use client"; // Mark this file as a Client Component
import '@/app/globals.css';

import React, { useEffect } from 'react';
import { useState } from 'react';
import Home from './Home/home';
import Categorie from './Categorie/categorie';
import Footer from './footer';
import New from "./NewPage/New"
import Chart from './Chart/Chart';
import { auth } from '@/Firebase/Initialisation';

const Application: React.FC = () => {
    const [customer,setCustomer]=useState("")
    useEffect(()=>{
        const handleAuthStateChange = () => {
            const unsubscribe = auth.onAuthStateChanged(async (user) => {
                if (user) {
                    setCustomer(user.uid)
                    sessionStorage.setItem("UserID",JSON.stringify(user.uid))
                }
            })
            return () => unsubscribe();
        };

        handleAuthStateChange();
    },[])

    return (
        <>
                <main className=' h-[100%] flex-1  '>
                    <Home customer={customer} />

                        <Footer  />
                </main>
        </>
    );
};

export default Application;
