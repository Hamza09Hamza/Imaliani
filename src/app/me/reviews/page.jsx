"use client";
import React, { useEffect, useState } from 'react';
import ProductReview from './productReview';
import Head from '@/components/header';
import Navbar from  "../navbar";
import Empty from "@/components/Emptylist";
import Footer from "@/components/footer";
import axios from 'axios';
import { auth } from "@/Firebase/Initialisation";
import { timestampToDate } from "../../Utils/time";
import { getCurrentFirestoreTimestamp } from '../../Utils/time';
import { deleteReview, getUserReviews, setReviews as setRev } from '@/Firebase/CRUD/Reviews';
import Loading from '@/components/loading';

const Reviews = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(5);
    const [selectedRating, setSelectedRating] = useState('All reviews');
    const [reviews, setReviews] = useState([]);
    const [loading,setLoading]=useState(true)
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
                       const data= await getUserReviews(user.uid,null,7)
                       console.log(data)

                        setReviews(data.reviews);
                    } catch (error) {
                        console.error("Error fetching user orders:", error);
                    }
                }
            });
            setLoading(false)
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
        const id= updatedReview.id
        updatedReview.dateAdded=reviews.filter(rev=>rev.id===id)[0].dateAdded
        updatedReview.ProductID=reviews.filter(rev=>rev.id===id)[0].ProductID
        delete updatedReview.id
        const {data}=await axios.put("/api/reviews/setreview",{
            userId:auth.currentUser.uid,
            Review:updatedReview,
            id:updatedReview.ProductID
        })
        
        const  NewReview={...data.Reviewdata,UserID:auth.currentUser.uid}
        await setRev(id,NewReview)
   
        window.location.reload()
        
    };

    const handleReviewDelete = async(reviewId) => {

        const id =reviews.filter(review => review.id === reviewId)[0].id
        await deleteReview(id)
        window.location.reload()

    };
    
    if(loading){
        return <>
                    <Head categorie={null} setCategorie={null} status={false}/>
                <Loading/>
        </>
    }


    return (
        <>
            <Head categorie={null} setCategorie={null} status={false}/>

           {reviews.length>0? <section className="bg-white py-8 xxs:p-2 antialiased md:py-16">
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
                                {currentReviews.map((item, index) => {
                                    return(<>                                    
                                    <ProductReview
                                                key={item.id}
                                                title={item.title}
                                                dateAdded={timestampToDate(item.dateAdded)}
                                                id={item.id}
                                                rating={item.rating}
                                                message={item.description}
                                                onReviewUpdate={handleReviewUpdate}
                                                onReviewDelete={handleReviewDelete}
                                            />
                                    <hr className='w-[100%] text-gray-800'/>
                                    </>

                                )})}
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
