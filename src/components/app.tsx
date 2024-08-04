"use client"; // Mark this file as a Client Component
import '@/app/globals.css';

import React from 'react';
import { useState } from 'react';
import Home from './Home/home';
import Categorie from './Categorie/categorie';
import Footer from './footer';
import New from "./NewPage/New"
import Chart from './Chart/Chart';

const Application: React.FC = () => {


    return (
        <>
                <main className=' h-[100%] flex-1  '>
                    <Home />

                        <Footer  />
                </main>
        </>
    );
};

export default Application;
