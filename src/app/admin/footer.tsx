"use client";
import React from 'react';
import Image from 'next/image';
import { auth } from '../../Firebase/Initialisation.js';


const AdminFooter: React.FC = () => {
    return (
        <>
        <div className={"  fixed bottom-0  left-0 w-[100vw] flex items-center justify-center lg:pb-8"} style={{position:"fixed",bottom:0, paddingBottom:4,zIndex:100}}>
            <div className=' z-50 flex  bg-white rounded-full shadow-lg mid:w-[70%] lg:w-[30%] flex-row justify-around mb-1 mid:mb-2 lg:py-2 px-4 text-gray-950 ' >
                <div onClick={()=>auth.currentUser?window.location.assign("/admin/reviews"): window.location.assign("/signin")}   className=' z-50 flex-col cursor-pointer hover:bg-softGray rounded-full w-[4.2rem] h-[4.2rem] flex justify-center items-center mx-1 transition-all duration-500'>
                        {/* <House selected={false}/> */}
                    <span className=' z-50 mid:text-small text-sm  text-center font-roboto'>Reviews</span>
                </div>
                <div onClick={()=>auth.currentUser?window.location.assign("/admin/orders"): window.location.assign("/signin")}  className=' z-50 flex-col cursor-pointer hover:bg-softGray rounded-full w-[4.2rem] h-[4.2rem] flex justify-center items-center mx-1 transition-all duration-500'>
                        {/* <Categorie selected={false}/> */}
                    <span className=' z-50 mid:text-small text-sm text-center'>Orders</span>
                </div>
                <div onClick={()=>auth.currentUser?window.location.assign("/admin/customized-gifts"): window.location.assign("/signin")}  className=' z-50 flex-col cursor-pointer hover:bg-softGray rounded-full w-[4.2rem] h-[4.2rem] flex justify-center items-center mx-1 transition-all duration-500'>
                        {/* <New selected={false}/> */}
                    <span className=' z-50 mid:text-small text-sm text-center'>Customizeds</span>
                </div>
                <div onClick={()=>auth.currentUser?window.location.assign("/admin/messages"): window.location.assign("/signin")}   className=' z-50 flex-col cursor-pointer hover:bg-softGray rounded-full w-[4.2rem] h-[4.2rem] flex justify-center items-center mx-1 transition-all duration-500'>
                        {/* <Chart selected={false}/> */}
                    <span className=' z-50 mid:text-small text-sm text-center'>Message</span>
                </div>
                <div onClick={()=>auth.currentUser?window.location.assign("/admin/products"): window.location.assign("/signin")}  className=' z-50 flex-col cursor-pointer hover:bg-softGray rounded-full w-[4.2rem] h-[4.2rem] flex justify-center items-center mx-1 transition-all duration-500'>
                        {/* <Contact selected={false}/> */}
                    <span className=' z-50 mid:text-small text-sm text-center'>Products</span>
                </div>
            </div>
            </div>
        </>
    );
};

export default AdminFooter;
