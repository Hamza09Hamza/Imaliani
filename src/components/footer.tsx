"use client";
import React from 'react';
import House from './footer/House.jsx';
import Chart from './footer/Chart.jsx';
import Contact from './footer/Contact.jsx';
import New from './footer/New.jsx';
import Categorie from './footer/Categorie.jsx';
import Image from 'next/image';
import { auth } from '@/Firebase/Initialisation.js';


const Footer: React.FC = () => {
    return (
        <>
        <div className={"  fixed bottom-0  left-0 w-[100vw] flex items-center justify-center lg:pb-8"} style={{position:"fixed",bottom:0, paddingBottom:4,zIndex:100}}>
            <div className=' z-50 flex  bg-white rounded-full shadow-lg mid:w-[70%] lg:w-[30%] flex-row justify-around mb-1 mid:mb-2 lg:py-2 px-4 text-gray-950 ' >
                <div onClick={()=>window.location.assign("/")}   className=' z-50 flex-col cursor-pointer hover:bg-softGray rounded-full w-[4.2rem] h-[4.2rem] flex justify-center items-center mx-1 transition-all duration-500'>
                        <House selected={false}/>
                    <span className=' z-50 mid:text-small text-sm  text-center font-roboto'>Home</span>
                </div>
                <div onClick={()=>window.location.assign("/categories")}  className=' z-50 flex-col cursor-pointer hover:bg-softGray rounded-full w-[4.2rem] h-[4.2rem] flex justify-center items-center mx-1 transition-all duration-500'>
                        <Categorie selected={false}/>
                    <span className=' z-50 mid:text-small text-sm text-center'>Categorie</span>
                </div>
                <div onClick={()=>window.location.assign("/new")}  className=' z-50 flex-col cursor-pointer hover:bg-softGray rounded-full w-[4.2rem] h-[4.2rem] flex justify-center items-center mx-1 transition-all duration-500'>
                        <New selected={false}/>
                    <span className=' z-50 mid:text-small text-sm text-center'>New</span>
                </div>
                <div onClick={()=>auth.currentUser?window.location.assign("/me/chart"): window.location.assign("/signIn")}   className=' z-50 flex-col cursor-pointer hover:bg-softGray rounded-full w-[4.2rem] h-[4.2rem] flex justify-center items-center mx-1 transition-all duration-500'>
                        <Chart selected={false}/>
                    <span className=' z-50 mid:text-small text-sm text-center'>Chart</span>
                </div>
                <div onClick={()=>window.location.assign("/contact")}  className=' z-50 flex-col cursor-pointer hover:bg-softGray rounded-full w-[4.2rem] h-[4.2rem] flex justify-center items-center mx-1 transition-all duration-500'>
                        <Contact selected={false}/>
                    <span className=' z-50 mid:text-small text-sm text-center'>Contact</span>
                </div>
            </div>
            </div>
        </>
    );
};

export default Footer;
