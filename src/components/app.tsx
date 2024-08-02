"use client"; // Mark this file as a Client Component
import '@/app/globals.css';

import React from 'react';
import { useState } from 'react';
import Home from './Home/home';
import Categorie from './Categorie/categorie';
import Footer from './footer';
import New from "./NewPage/New"
import Chart from './Chart/Chart';
import Contact from "../components/Contact"

const Application: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(0);

    const SettingCurrentPage = (value: number) => {
        setCurrentPage(value);
    };

    return (
        <>
                <main className=' h-[100%] flex-1  '>
                    {currentPage === 0 ? <Home /> :
                        currentPage === 1 ? <Categorie    /> : currentPage === 2 ? <New/> : currentPage === 3 ? <Chart  setCurrentPage={SettingCurrentPage}/>: currentPage === 4 ? <Contact/> :<></>}

                        <Footer setCurrentPage={SettingCurrentPage} />
                </main>
        </>
    );
};

export default Application;
