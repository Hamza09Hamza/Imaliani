"use client";
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import Imiliani from '@/images/Imalian.png';
import Search from './searchbar';
import Mess from '@/images/Message.png';
import TableList from './tablist';
import UserDrop from "./UserDrop"
import { auth } from '@/Firebase/Initialisation';
interface ChildComponentProps {
    status:boolean | any
    categorie: string | null;
    customer:string | any
    setCategorie: React.Dispatch<React.SetStateAction<string>> |null;
}
const Head: React.FC<ChildComponentProps> = ({ customer,status,categorie,setCategorie }) => {
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            sessionStorage.getItem("UserID")!=null ?setUser(JSON.parse(sessionStorage.getItem("UserID")||"")):null
        }
    }, []);


    
    return (
        <>
            <header className='flex justify-around flex-row bg-Main w-[100vw] font-roboto items-center py-2'>
                <Image
                    onClick={(e)=>{e.preventDefault();window.location.assign("/")}}
                    src={Imiliani}
                    className="lg:max-w-[12rem] mid:max-w-[8rem] xss:max-w-[26%] lg:ml-3 object-contain"
                    alt="Imiliani"
                    
                />
                <Search />
                <div className='flex flex-row w-[20%] items-center justify-around max-h-[90%] mr-5 '>
                    <div 
                        onClick={()=>auth.currentUser?window.location.assign("/me/chart"): window.location.assign("/signin")}  
                        className='text-black mid:text-xs mid:hidden mid:text-center cursor-pointer font-roboto font-light hover:text-gray-400 duration-500 transition-all  '> {user? "My Chart" :"Sign In"} </div>
                    <UserDrop user={user} />
                </div>
            </header>
            {status  && <div className='flex justify-center w-[100%] border-b-2'>
                <TableList setCategorie={setCategorie} categorie={categorie}  />
            </div>}
        </>
    );
};

export default Head;
