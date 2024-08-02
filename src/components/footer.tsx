import React from 'react';
import House from './footer/House.jsx';
import Chart from './footer/Chart.jsx';
import Contact from './footer/Contact.jsx';
import New from './footer/New.jsx';
import Categorie from './footer/Categorie.jsx';
import Image from 'next/image';

interface FooterProps {
    setCurrentPage: (value: number) => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
    return (
        <>
        <div className={"  fixed bottom-0 mb-4 left-0 w-[100vw] flex justify-center pb-8"} style={{position:"fixed",bottom:0, paddingBottom:4,zIndex:100}}>
            <div className=' z-20 flex  bg-white rounded-full shadow-lg lg:w-[30%] flex-row justify-around mb-1 xxs:mb-6 py-2 px-4 text-gray-950 ' >
                <div onClick={() => setCurrentPage(0)} className=' z-50 flex-col cursor-pointer hover:bg-softGray rounded-full w-[4.2rem] h-[4.2rem] flex justify-center items-center mx-1 transition-all duration-500'>
                        <House selected={false}/>
                    <span className=' z-50 text-xs text-center font-roboto'>Home</span>
                </div>
                <div onClick={() => setCurrentPage(1)} className=' z-50 flex-col cursor-pointer hover:bg-softGray rounded-full w-[4.2rem] h-[4.2rem] flex justify-center items-center mx-1 transition-all duration-500'>
                        <Categorie selected={false}/>
                    <span className=' z-50 text-xs text-center'>Categorie</span>
                </div>
                <div onClick={() => setCurrentPage(2)} className=' z-50 flex-col cursor-pointer hover:bg-softGray rounded-full w-[4.2rem] h-[4.2rem] flex justify-center items-center mx-1 transition-all duration-500'>
                        <New selected={false}/>
                    <span className=' z-50 text-xs text-center'>New</span>
                </div>
                <div onClick={() => setCurrentPage(3)} className=' z-50 flex-col cursor-pointer hover:bg-softGray rounded-full w-[4.2rem] h-[4.2rem] flex justify-center items-center mx-1 transition-all duration-500'>
                        <Chart selected={false}/>
                    <span className=' z-50 text-xs text-center'>Chart</span>
                </div>
                <div onClick={() => setCurrentPage(4)} className=' z-50 flex-col cursor-pointer hover:bg-softGray rounded-full w-[4.2rem] h-[4.2rem] flex justify-center items-center mx-1 transition-all duration-500'>
                        <Contact selected={false}/>
                    <span className=' z-50 text-xs text-center'>Contact</span>
                </div>
            </div>
            </div>
        </>
    );
};

export default Footer;
