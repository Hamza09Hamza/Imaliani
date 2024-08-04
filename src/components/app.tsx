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


    return (
        <>
                <main className=' h-[100%] flex-1  '>
                    <Home />
                    {/* {currentPage === 0 ?  :
                        : currentPage === 2 ? <New setListCat={setListCat} setCurrentPage={setCurrentPage} /> 
                        : currentPage === 3 ? <Chart setListCat={setListCat}  setCurrentPage={SettingCurrentPage}/>
                        : currentPage === 4 ? <Contact setListCat={setListCat} setCurrentPage={setCurrentPage}/> :<></>} */}

                        <Footer  />
                </main>
        </>
    );
};

export default Application;
