"use client";
import React, { useState } from 'react';

const UserDrop = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button
                id="dropdownAvatarNameButton"
                onClick={toggleDropdown}
                className="flex mid:text-xs mid:text-center mid:pl-2 relative font-roboto font-light items-center cursor-pointer pe-1  text-gray-900 rounded-full  md:me-0  "
                type="button"
            >
                My Account
                <svg
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
                </svg>
            </button>

            <div
                id="dropdownAvatarName"
                className={`z-10 ${isOpen ? 'block' : 'hidden'}  divide-y divide-softBeige rounded-lg shadow lg:w-44 bg-hardBeige bg-opacity-85 divide-softBiege absolute lg:right-16 right-4  top-16`}
            >
                <div className="px-4 py-3 text-sm text-white">
                    <div className="font-medium">Pro User</div>
                    <div className="truncate">name@flowbite.com</div>
                </div>
                <ul
                    className="py-1 text-sm text-gray-100"
                    aria-labelledby="dropdownAvatarNameButton"
                >
                    <li>
                        <a href="#" className="block cursor-pointer px-4 py-2 hover:bg-hardBeige  hover:text-white transition-all duration-500">
                            My Orders
                        </a>
                    </li>
                    <li>
                        <a href="#" className=" xss:block lg:hidden block cursor-pointer px-4 py-2 hover:bg-hardBeige  hover:text-white transition-all duration-500">
                            My Messages
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-hardBeige  hover:text-white transition-all duration-500">
                            My Ratings
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-hardBeige  hover:text-white transition-all duration-500">
                            Customized Gifts
                        </a>
                    </li>
                </ul>
                <div className="py-2">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-100  hover:bg-hardBeige  hover:text-white transition-all duration-500">
                        Sign out
                    </a>
                </div>
            </div>
        </>
    );
};

export default UserDrop;
