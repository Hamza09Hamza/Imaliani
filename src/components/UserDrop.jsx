"use client";
import { UserSignout } from '@/Firebase/Authentication';
import { auth } from '@/Firebase/Initialisation';
import React, { useEffect, useState } from 'react';

const UserDrop = ({user}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
  

    return (
        <>
            <button
                id="dropdownAvatarNameButton"
                onClick={()=>user?toggleDropdown() : window.location.assign("/signup")}
                className="flex mid:text-xs mid:text-center mid:pl-2 relative font-roboto font-light items-center cursor-pointer pe-1  text-gray-900 hover:text-gray-400 duration-500 transition-all rounded-full  md:me-0  "
                type="button"
            >
                {user?"My Account":"Register "}
                
               {user? <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg> :<></>}
            </button>

            <div
                id="dropdownAvatarName"
                className={`z-10 ${isOpen ? 'block' : 'hidden'}  divide-y divide-softBeige rounded-lg shadow lg:w-44 bg-hardBeige bg-opacity-85 divide-softBiege absolute lg:right-16 right-4  top-16`}
            >
                <div className="px-4 py-3 text-sm text-white">
                    <div className="font-medium">Imaliani User</div>
                    <div className="truncate">{auth.currentUser&& auth.currentUser.email}</div>
                </div>
                <ul
                    className="py-1 text-sm text-gray-100"
                    aria-labelledby="dropdownAvatarNameButton"
                >
                    <li>
                        <a href={auth.currentUser ? "/me/orders":"/signin"} className="  block cursor-pointer px-4 py-2 hover:bg-hardBeige  hover:text-white transition-all duration-500">
                            My Orders
                        </a>
                       
                    </li>
                    <li>
                        <a href={auth.currentUser ? "/me/chart":"/signin"} className="xss:block lg:hidden cursor-pointer px-4 py-2 hover:bg-hardBeige  hover:text-white transition-all duration-500">
                            My Chart
                        </a>
                        
                    </li>
                    <li>
                        <a href={auth.currentUser ? "/me/reviews":"/signin"} className="block px-4 py-2 hover:bg-hardBeige  hover:text-white transition-all duration-500">
                            My Ratings
                        </a>
                    </li>
                    <li>
                        <div onClick={()=>{window.location.assign("/categories/customized-gifts")}} className="block cursor-pointer px-4 py-2 hover:bg-hardBeige  hover:text-white transition-all duration-500">
                            Customized Gifts
                        </div>
                    </li>
                </ul>
                <div className="py-2">
                    <div onClick={async()=>await UserSignout()} className="block cursor-pointer px-4 py-2 text-sm text-gray-100  hover:bg-hardBeige  hover:text-white transition-all duration-500">
                        Sign out
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserDrop;
