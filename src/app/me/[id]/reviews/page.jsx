"use client";
import React, { useEffect, useState } from 'react';
import ProductReview from './ProductReview';
import Head from '@/components/header';


const Reviews = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(5);
    const [selectedRating, setSelectedRating] = useState('All reviews');

    const productArray = [
        {
            title: `Apple iMac 27", M2 Max CPU 1TB HDD, Retina 5K`,
            Message: `It’s fancy, amazing keyboard, matching accessories. Super fast, batteries last more than usual, everything runs perfect in this...`,
            Rating: 5
        },
        {
            title: `iPad Pro 13-Inch (M4): XDR Display, 512GB`,
            Message: `Elegant look, exceptional keyboard, and well-matched accessories. Lightning-quick speed, impressive battery duration...`,
            Rating: 5
        },
        {
            title: `PlayStation®5 Console – 1TB, PRO Controller`,
            Message: `It’s fancy, amazing keyboard, matching accessories. Super fast, batteries last more than usual, everything runs perfect in this...`,
            Rating: 4
        },
        {
            title: `Apple Watch SE [GPS 40mm], Smartwatch`,
            Message: `The DualSense controller enhances gameplay with immersive feedback, making it a must-have for gaming...`,
            Rating: 4
        },
        {
            title: `Samsung Galaxy S23 Ultra`,
            Message: `The phone's camera is incredible, and the performance is top-notch. Battery life is excellent, and the screen is vibrant.`,
            Rating: 3
        },
        {
            title: `Dell XPS 13, 16GB RAM, 1TB SSD`,
            Message: `Sleek design, powerful performance, and excellent battery life. Ideal for both work and play, though a bit pricey.`,
            Rating: 5
        },
        {
            title: `Sony WH-1000XM5 Wireless Headphones`,
            Message: `Great noise cancellation and sound quality. Comfortable for long listening sessions, but a bit bulky.`,
            Rating: 4
        },
        {
            title: `Kindle Paperwhite (2024), 8GB`,
            Message: `Perfect for reading anywhere. The screen is crisp and clear, and the battery lasts for weeks. A must-have for book lovers.`,
            Rating: 5
        },
        {
            title: `GoPro HERO12 Black`,
            Message: `Excellent for action shots and videos. Durable and waterproof, but the battery life could be better.`,
            Rating: 4
        },
        {
            title: `Microsoft Surface Laptop 5`,
            Message: `A sleek and powerful laptop with a great display and comfortable keyboard. Battery life is good, but the price is high.`,
            Rating: 5
        },
    ];

    // Filter reviews based on the selected rating
    const filteredReviews = selectedRating === 'All reviews'
        ? productArray
        : productArray.filter(review => review.Rating.toString() === selectedRating);

    // Calculate pagination variables
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
    const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
    useEffect(()=>{
        console.log(currentPage,totalPages)
    },[])
    const handlePageChange = (pageNumber) => {
        
        pageNumber<=totalPages&& pageNumber>=1 &&  setCurrentPage(pageNumber);
    };

    const handleRatingChange = (event) => {
        
        setSelectedRating(event.target.value);
        setCurrentPage(1); // Reset to first page on filter change
    };

    return (
        <>
            <Head categorie={null} setCategorie={null} status={false}/>

            <section className="bg-white py-8 antialiased md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mx-auto max-w-5xl">
                        <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                            <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">My reviews</h2>
                            <div className="mt-6 sm:mt-0">
                                <label htmlFor="order-type" className="sr-only mb-2 block text-sm font-medium text-gray-900">Select review type</label>
                                <select
                                    id="order-type"
                                    value={selectedRating}
                                    onChange={handleRatingChange}
                                    className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                >
                                    <option>All reviews</option>
                                    <option value="5">5 stars</option>
                                    <option value="4">4 stars</option>
                                    <option value="3">3 stars</option>
                                    <option value="2">2 stars</option>
                                    <option value="1">1 star</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-6 flow-root sm:mt-8">
                            <div className="divide-y divide-gray-200">
                                {currentReviews.map((item, index) => (
                                    <ProductReview
                                        key={index}
                                        title={item.title}
                                        Message={item.Message}
                                        Rating={item.Rating}
                                    />
                                ))}
                            </div>
                        </div>

                        <nav className="mt-6 flex items-center justify-center sm:mt-8" aria-label="Page navigation example">
                            <ul className="flex h-8 items-center -space-x-px text-sm">
                                <li>
                                    <a
                                        
                                        className={`ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                                        onClick={() => currentPage!=1?handlePageChange(currentPage - 1):<></>}
                                    >
                                        <span className="sr-only">Previous</span>
                                        <svg className="h-4 w-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
                                        </svg>
                                    </a>
                                </li>
                                {[...Array(totalPages).keys()].map(number => (
                                    <li key={number + 1}>
                                        <a
                                           
                                            className={`flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${currentPage === number + 1 ? 'z-10 border-primary-300 bg-primary-50 text-primary-600' : ''}`}
                                            onClick={() => handlePageChange(number + 1)}
                                        >
                                            {number + 1}
                                        </a>
                                    </li>
                                ))}
                                <li>
                                    <a
                                       
                                        className={`flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
                                        onClick={() =>  handlePageChange(currentPage + 1)}
                                    >
                                        <span className="sr-only">Next</span>
                                        <svg className="h-4 w-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Reviews;
