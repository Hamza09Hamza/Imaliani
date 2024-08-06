"use client";
import React, { useEffect, useState } from 'react';
import ProductReview from './ProductReview';
import Head from '@/components/header';
import Navbar from  "../navbar";
import Empty from "@/components/Emptylist";
import Footer from "@/components/footer";
import axios from 'axios';
import { auth } from "@/Firebase/Initialisation";
import { timestampToDate } from "@/app/Utils/time";
import { getCurrentFirestoreTimestamp } from '../../Utils/time';

const Reviews = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(5);
    const [selectedRating, setSelectedRating] = useState('All reviews');
    const [reviews, setReviews] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const filteredReviews = selectedRating === 'All reviews'
        ? reviews
        : reviews.filter(review => review.rating.toString() === selectedRating);

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
    const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

    useEffect(() => {
        const handleAuthStateChange = () => {
            const unsubscribe = auth.onAuthStateChanged(async (user) => {
                if (user) {
                    try {
                        const { data } = await axios.get("/api/reviews/userreviews", { params: { id: user.uid } });
                        setReviews(data.Reviews);
                    } catch (error) {
                        console.error("Error fetching user orders:", error);
                    }
                }
            });

            return () => unsubscribe();
        };

        handleAuthStateChange();
    }, []);

    const handlePageChange = (pageNumber) => {
        if (pageNumber <= totalPages && pageNumber >= 1) {
            setCurrentPage(pageNumber);
        }
    };

    const handleRatingChange = (event) => {
        setSelectedRating(event.target.value);
        setCurrentPage(1);
    };

    const handleReviewUpdate = async (updatedReview) => {
        const reviewdata=reviews.filter((review)=>review.id===updatedReview.id)[0]
        
        
        await axios.put("/api/reviews/setreview",{
        Review:{
            dateAdded:getCurrentFirestoreTimestamp() ,
            title:updatedReview.title,
            description:updatedReview.description,
            rating:updatedReview.rating
        },
        id:reviewdata.id,
        userId:auth.currentUser.uid
    })
    window.location.reload()
        
    };

    const handleReviewDelete = async(reviewId) => {

        const id =reviews.filter(review => review.id === reviewId)[0].id
        setReviews(reviews.filter(review => review.id !== reviewId));
        await axios.delete("/api/reviews/deletereview",{
            params:{
                id:id,
                userId:auth.currentUser.uid
            }
        })
        window.location.reload()

    };
    



    return (
        <>
            <Head categorie={null} setCategorie={null} status={false}/>

           {reviews.length>0? <section className="bg-white py-8 antialiased md:py-16">
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
                                {currentReviews.map((item, index) => (<>                                    
                                    <ProductReview
                                                key={item.id}
                                                id={item.id}
                                                title={item.title}
                                                message={item.description}
                                                rating={item.rating}
                                                dateAdded={timestampToDate(item.dateAdded)}
                                                onReviewUpdate={handleReviewUpdate}
                                                onReviewDelete={handleReviewDelete}
                                            />
                                    <hr className='w-[100%] text-gray-800'/>
                                    </>

                                ))}
                            </div>
                        </div>

                        <Navbar handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages}/>
                    </div>
                </div>
            </section>
            :
                <Empty type={"reviewing"} text={"You have no reviews yet."}/>

            }
            <Footer/>
        </>
    );
};

export default Reviews;
