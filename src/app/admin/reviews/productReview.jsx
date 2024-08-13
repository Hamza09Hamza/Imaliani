"use client";
import React, { useState } from 'react';
import DeleteModal from "../Delete";
const ProductReview = ({ id, title, message, rating, dateAdded, productTitle,onReviewDelete,ProductID }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [review, setReview] = useState({ title, description: message, rating , });



    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true);
    };

    const handleDeleteClose = () => {
        setIsDeleteModalOpen(false);
    };

    const handleConfirmDelete = async  () => {
        console.log("out")
        await   onReviewDelete(id);
        setIsDeleteModalOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const CompleteStar = () => (
        <svg className="w-5 h-5 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z"></path>
        </svg>
    );
    const MissStar = () => (
        <svg className="w-5 h-5 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z" />
        </svg>
    );
    const Stars = () => (
        Array.from({ length: 5 }, (_, index) => (
            index < rating ? <CompleteStar key={index} /> : <MissStar key={index} />
        ))
    );
    return ( <>
        <div className="flex justify-between  xxs:flex-col gap-4 md:gap-6 py-4 md:py-6 mt-2">
              <dl className="lg:w-[19%] order-3 md:order-1">
                  <dt className="sr-only">user:</dt>
                  <dd className="text-base font-semibold text-gray-700 ">
                  <div  >#{ProductID} </div>
                  </dd>
              </dl>
              <dl className="lg:w-[19%] order-3 md:order-1">
                  <dt className="sr-only">Product:</dt>
                  <dd className="text-base font-serif text-gray-600 ">
                  <a href={"/admin/product/"+ProductID} className="hover:underline">{productTitle} </a>
                  </dd>
              </dl>
              <dl className="lg:w-[19%] order-4 md:order-2">
                  <dt className="sr-only">dateAdded:</dt>
                  <dd className=" text-gray-500 ">{dateAdded}</dd>
              </dl>
              <dl className="lg:w-[19%] order-4 md:order-2">
                  <dt className="sr-only">Message:</dt>
                  <dd className=" text-gray-500 ">{message}</dd>
              </dl>

              <div className="lg:w-[19%] gap-2 content-center order-1 md:order-3 flex items-center justify-between">
                  <dl>
                      <dt className="sr-only">Stars:</dt>
                      <dd className="flex items-center space-x-1">
                          {Stars()}
                      </dd>
                  </dl>
                 <button 
                id="actionsMenuDropdown2" 
                type="button" 
                className="inline-flex ml-2 relative h-7 w-7 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
                onClick={toggleDropdown}
            >
                <span className="sr-only">Actions</span>
                <svg 
                    className="h-6 w-6" 
                    aria-hidden="true" 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    fill="none" 
                    viewBox="0 0 24 24"
                >
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="4" d="M6 12h.01m6 0h.01m5.99 0h.01"></path>
                </svg>                   
            </button>

            {isOpen && (
                <div 
                    id="dropdownOrder2" 
                    className="z-10 absolute lg:right-20 mid:right-0 mid:mt-32 w-40 divide-y divide-gray-100 rounded-lg bg-white shadow" 
                >
                    <ul className="p-2 text-left text-sm font-medium text-gray-500">
                       
                        <li  >
                            <button 
                                onClick={handleDeleteClick}
                                type="button" 
                                data-modal-target="deleteReviewModal" 
                                data-modal-toggle="deleteReviewModal" 
                                className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-200  dark:text-red-500"
                            >
                                <svg 
                                    className="me-1.5 h-4 w-4" 
                                    aria-hidden="true" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="24" 
                                    height="24" 
                                    fill="none" 
                                    viewBox="0 0 24 24"
                                >
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"></path>
                                </svg>
                                Delete review
                            </button>
                        </li>
                    </ul>
                </div>
            )}
              </div>
          </div>
            {isDeleteModalOpen && (
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={ handleDeleteClose}
                    onDelete={handleConfirmDelete}
                    message={"Are you sure you want to delete this review?"}
                />
            )}
        

          
    </> );
}
 
export default ProductReview;
