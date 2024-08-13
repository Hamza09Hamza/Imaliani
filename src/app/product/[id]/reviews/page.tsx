"use client";
import React, { useEffect, useState } from 'react'
import ReviewCard from '../../../../components/Reviews/ReviewCard';
import Head from "../../../../components/header"
import Footer from "../../../../components/footer"
import axios from 'axios';
import {DB, auth} from "../../../../Firebase/Initialisation"
import EditReviewModal from '../../../me/reviews/UpdateReview';
import { getProductReviews } from '@/Firebase/CRUD/Reviews';
import Loading from '@/components/loading';
import { setReviews } from '@/Firebase/CRUD/Reviews';
const Reviews = ({ params }: { params: { id: string } }) => {
  const  id  = params.id;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [ProdReviews,setProdReviews]=useState<any>()
  const [numberofrate,setNumberofrate]=useState<any>()
  const [totalSum,setTotalSum]=useState<number>()
  const [loading,setLoading]=useState<boolean>(true)
  const [review,setReview]=useState({
    rating:0,
    title:"",
    description:"",
    ProductID:id
  })
   


  const handleEditClick =async  () => {
    if(auth.currentUser){
     const  {data}=await axios.post("/api/reviews/setreview",{
        Review:{...review},
        userId:auth.currentUser.uid,
        
      })
      console.log(data.Reviewdata)
      setReviews(null,data.Reviewdata,null)
      // await addDoc(collection(DB, 'Ratings'), data.Reviewdata);
    }

    setIsEditModalOpen(false);
    // window.location.reload()
  };
const handleEditClose = () => {
    setIsEditModalOpen(false);
  };
  useEffect(() => {
    const handleAuthStateChange = () => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                  // console.log(user.uid)
                  // u can add a way to optimize api calls and store in sessionStorage
                  
                  const data =await getProductReviews(review.ProductID,null,10,user.uid as any)
                    if(data.reviews){
                      setProdReviews(data.reviews)
                      setNumberofrate(data.ratingsPerValue)
                      setTotalSum(data.ratingsPerValue.reduce((acc: any, obj: { value: any; }) => acc + obj.value, 0))
                    }
                    else{
                      setProdReviews([])
                      setNumberofrate([])
                    }

                } catch (error) {
                    console.error("Error fetching user orders:", error);
                }
            } else {
                
            }
            setLoading(false)
        });

        return () => unsubscribe();
    };

    handleAuthStateChange();
}, []); 
  const totalRate=()=>{
    return numberofrate.reduce((acc: number, obj: { label: number; value: number; }) => acc + obj.label*obj.value, 0)/ProdReviews.length

  }

  
    
    const renderStars = (rating: number) => {
        const stars = [] as React.JSX.Element[];
        for (let i = 1; i <= 5; i++) {
          stars.push(<>
            <svg key={i} className={`h-5 w-5 ${i <= rating ? 'text-yellow-300' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />

            </svg>
          </>
          );
        }
        return stars;
      };

      if(loading)
        return <><Loading/></>
    return ( <>
    <Head status={undefined} categorie={null} setCategorie={null} customer={auth.currentUser?.uid} />
    { auth.currentUser?.uid&& ProdReviews&&ProdReviews.length>0 && numberofrate ?  <section className="bg-softBeige py-8 antialiased min-h-[120hv] px-16 xxs:p-2 xxs:pt-20 xxs:pb-20 md:pt-16">
      <div className="mx-auto max-w-screen-xl min-h-[100vh] px-4 2xl:px-0">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold text-gray-900 ">Reviews</h2>

          <div className="mt-2 flex items-center gap-2 sm:mt-0">
            <div></div>
            <div className="flex items-center gap-0.5">
            { renderStars(totalRate())}
            </div>
            <p className="text-sm font-medium leading-none text-gray-500 ">({totalRate()})</p>
            <a href="#" className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline "> {ProdReviews.length} Reviews </a>
          </div>
        </div>
        
        <div className="my-6 gap-8 sm:flex sm:items-start md:my-8">
          <div className="shrink-0 space-y-4">
            <p className="text-2xl font-semibold leading-none text-gray-900 ">{totalRate()} out of 5</p>
            <button type="button" data-modal-target="review-modal" data-modal-toggle="review-modal" className="mb-2 me-2 rounded-lg bg-hardBeige px-5 py-2.5 bg text-sm font-medium text-white hover:bg-tooHardBeige outline-none focus:outline-none focus:ring-4 focus:ring-primary-300  " onClick={()=>setIsEditModalOpen(true)}>Write a review</button>
          </div>

          <div className="mt-6 min-w-0 flex-1 space-y-3 sm:mt-0">
            {numberofrate &&totalSum && numberofrate.map((rate:any)=><>
                <div className="flex items-center gap-2">
                <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 ">{rate.label}</p>
                <svg className="h-4 w-4 shrink-0 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <div className="h-1.5 w-80 rounded-full bg-gray-500 ">
                  <div className={`h-1.5 rounded-full bg-yellow-300 ${"w-["+rate.value/totalSum+"%]"}`}></div>
                </div>
                <a href="#" className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline  sm:w-auto sm:text-left text-black">{rate.value} <span className="hidden sm:inline text-black">reviews</span></a>
            </div>

            </>)}
            
          </div>
        </div>

        <div className="mt-6 divide-y divide-gray-200 ">

         {
          ProdReviews.map((prod: any)=><><ReviewCard review={prod}/>
          <hr className='w-[full] text-gray-600'  /></>)
         }

          
        </div>

        {/* <div className="mt-6 text-center">
          <button type="button" className="mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 ">View more reviews</button>
        </div> */}
      </div>
    </section> :<>
    <div className='flex h-[80vh] flex-col items-center justify-center' >
      <h3 className='text-brown text-3xl  mb-4 text-center'>
        No Reviews yet on this product ! be the first to leave a message
      </h3>
      <button type="button" data-modal-target="review-modal" data-modal-toggle="review-modal" className="mb-2 me-2 rounded-lg bg-hardBeige px-5 py-2.5 bg text-sm font-medium transition-all duration-300 text-white hover:bg-tooHardBeige outline-none focus:outline-none focus:ring-4 focus:ring-primary-300  " 
      onClick={()=>setIsEditModalOpen(true)}>Write a review</button>

    </div>
    </>}
  <EditReviewModal type={true} setReview={setReview} review={review} isOpen={isEditModalOpen} onClose={handleEditClose} onSave={handleEditClick}/>
  <Footer />

</> );
}
 
export default Reviews;