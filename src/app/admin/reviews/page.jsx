"use client";
import React, { useEffect, useState } from 'react';
import ProductReview from './productReview';
import Navbar from  "../navbar";
import Empty from "@/components/Emptylist";
import axios from 'axios';
import { timestampToDate } from "@/app/Utils/time";
import { getCurrentFirestoreTimestamp } from '../../Utils/time';
import { DB, auth } from '../../../Firebase/Initialisation';
import AdminFooter from '../footer';
import { redirect } from 'next/navigation';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { deleteReview } from '@/Firebase/CRUD/Reviews';
import { getProductName } from '@/Firebase/CRUD/Products';
import isAuth from '@/app/adminAuth'
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
                    const reviewsRef = collection(DB, "Ratings");
                    let reviewsQuery = query(
                        reviewsRef,
                        orderBy("dateAdded", "desc"),
                    );
                    const data=await getDocs(reviewsQuery)
                    if(!data.empty){
                        const res= await Promise.all(data.docs.map(async(doc)=>{
                            const prod=doc.data()
                            const {data}=await axios.post("/api/decrypt",{id:user.uid,data:prod.ProductID})
                            const decryptedProductId=data.data
                            let productTitle =await getProductName(decryptedProductId)
                            return{...prod,
                            id:doc.id,
                            ProductID:decryptedProductId,
                            productTitle:productTitle
                        }
                        }));
                        setReviews(res)
                    }
                }else{
                    redirect("/")
                }
                setLoading(false)

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

   

    const handleReviewDelete = async(reviewId) => {

        const id =reviews.filter(review => review.id === reviewId)[0].id
        setReviews(reviews.filter(review => review.id !== reviewId));
        if(id)
            await deleteReview(id)
        // window.location.reload()

    };
    

  if(loading){
        return <><Loading/></>
    }

    return (
        <>

           {reviews.length>0? <section className="bg-softBeige   min-h-[100vh]  xxs:w-[100vw]  py-8 antialiased md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mx-auto max-w-6xl bg-white px-16 py-8 rounded-3xl ">
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

                        <div className="mt-6 flow-root  sm:mt-8">
                            <div className="divide-y  divide-gray-200">
                                {currentReviews.map((item, index) => (<>                                    
                                    <ProductReview
                                                productTitle={item.productTitle}
                                                key={index}
                                                id={item.id}
                                                title={item.title}
                                                message={item.description}
                                                rating={item.rating}
                                                ProductID={item.ProductID}
                                                dateAdded={timestampToDate(item.dateAdded)}
                                                onReviewDelete={handleReviewDelete}
                                            />
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
            <AdminFooter/>
        </>
    );
};

export default isAuth(Reviews);
