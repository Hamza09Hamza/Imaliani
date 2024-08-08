import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import AddToCartButton from '@/components/addChart';
import {DB, auth} from "@/Firebase/Initialisation"
import CarouselCustomNavigation from '@/components/carousel'
import { updateUserField } from '@/Firebase/CRUD/User';
import { doc, getDoc } from 'firebase/firestore';
 const MainProduct = ({product}) => {
  const [connected,setConnected]=useState(null)
  const [Buying,setBuying]=useState(false)

  useEffect(()=>{
    const handleAuthStateChange = () => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            setConnected(user.uid)
          } else {
              
          }
      });

      return () => unsubscribe();
  };

  handleAuthStateChange();

  },[])
 
  const handleAddToCart= async ()=>{
    if(auth.currentUser) {
      console.log(product.id)
      const Chart= (await getDoc(doc(DB,"Users/",auth.currentUser.uid))).data().Chart
      const {data}=await axios.put("/api/chart/updateuser",{type:true,id:product.id,Chart:Chart})
      await updateUserField("Chart",data.userchart,auth.currentUser.uid);
      

    }else
      window.location.assign("signin")
  }
  const buynow=async()=>{
    
    try {
      await  handleAddToCart();
      window.location.assign("/me/chart")
    } catch (error) {
      
    }
  }
        return ( <>{
          product?
        <main className="my-8 flex justify-center mt-20" id={product.id}>
              
              <div className="container flex items-center justify-center mx-auto px-6">
                <div className="md:flex md:items-center">
                  <div className="w-[90%] h-64 md:w-1/2 lg:h-96">
                    <CarouselCustomNavigation images={product.images}/>
                  </div>
                  <div className="w-full max-w-lg  mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
                    <h3 className="text-gray-700 uppercase text-lg">{product.title}</h3>
                    <span className="text-gray-500 mt-3">AED {product.price}</span>
                    <hr className="my-3" />
                   
                    <span className='text-gray-400'>
                      {product.description}
                    </span>
                    <div className="flex items-center my-6">
                      <button onClick={async()=>{setBuying(true);await buynow()}} className={`px-8 py-2 mr-4  bg-hardBeige ${Buying ? "bg-gray-800" :""} text-white text-sm font-medium rounded hover:bg-softBeige focus:outline-none  transition-all duration-500`}>{Buying ? "hold.." :"Order Now"}</button>
                      <AddToCartButton onClick={handleAddToCart} />
                    </div>
                    <a href={'/product/'+product.id+"/reviews"} className='text-gray-700 cursor-pointer outline-none hover:text-gray-500 transition-all duration-500 '>
                    (Reviews)
                  </a>
                  </div>
                  
                </div>
              </div>
            </main>:<></>}
        </> );
}
 
export default MainProduct;