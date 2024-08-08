import Image from 'next/image';
import React, { useEffect } from 'react';
import AddToCartButton from '../addChart';
import { DB, auth } from '@/Firebase/Initialisation';
import axios from 'axios';
import { doc, getDoc } from 'firebase/firestore';
import { updateUserField } from '@/Firebase/CRUD/User';

const ProductCard = ({ product }) => {
  const handleAddToCart= async ()=>{
    if(auth.currentUser) {
      const Chart= (await getDoc(doc(DB,"Users/",auth.currentUser.uid))).data().Chart
      let encryptedProductID=await axios.post("/api/encrypt",{id:auth.currentUser.uid,data:product.id})
      encryptedProductID=encryptedProductID.data.data;
      console.log()
      await updateUserField("Chart",
      [...Chart,{ProductID:encryptedProductID,Quantity:1}],
      auth.currentUser.uid);
      

    }else
      window.location.assign("signin")
  }


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
const Stars = (rating) => (
    Array.from({ length: 5 }, (_, index) => (
        index < rating ? <CompleteStar key={index} /> : <MissStar key={index} />
    ))
);
    return (<>
      <div   className="  group h-[400px] my-10 flex w-full max-w-xs lg:max-w-[30%] flex-col overflow-hidden border-2 border-gray-400 bg-white shadow-md  rounded-xl" >
        <div onClick={()=>window.location.assign("/product/"+product.id)} className=" cursor-pointer relative h-[250px] flex   items-center justify-center overflow-hidden  bg-gray-100" href="#">
          <Image src={product && product.images&&product.images[0]} width={400} height={400} className="absolute top-0 right-0 h-[100%] w-[100%] object-contain"  alt="product image" />
          
          
        </div>
        <div className="mt-2 px-5 h-[150px] flex flex-col justify-between  ">
          <a href="#">
            <h5 className=" truncate tracking-tight text-slate-900">{product.title}</h5>
          </a>
            <p>
              <span className="text-lg font-bold text-slate-900">{product.price} AED</span>
            </p>
          <div class="flex mb-2 items-center ">
            <div class="flex items-center space-x-1 rtl:space-x-reverse">
            {product.rate&&Stars(product.rate)}
            </div>
            <span class="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded ">{product.rate>0 ? product.rate :"No Rates yet"}</span>
        </div>
        <div className='w-fit mb-2 '>
          <AddToCartButton styles={" bg-black"} onClick={handleAddToCart}/>
        </div>
        </div>
      </div>

        
    </>
    );
};

export default ProductCard;
