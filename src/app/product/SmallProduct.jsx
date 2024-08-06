import { auth } from '@/Firebase/Initialisation';
import AddToCartButton from '@/components/addChart';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const SmallProduct = ({product}) => {
    
    const [connected,setConnected]=useState(null)

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
        await axios.put("/api/chart/updateuser",{type:true,id:product.id,userid:auth.currentUser.uid})
        
  
      }else
        window.location.assign("signin")
    }

    return ( <>
   {product &&product.images && <div onClick={()=>window.location.assign("/product/"+product.id)}  className=" cursor-pointer w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
            <div className="flex items-end justify-end h-56 w-full bg-cover" style={{ backgroundImage: `url(${product.images[0]})` }}>
              <button onClick={()=>null} className=" cursor-pointer  text-white mx-5 -mb-4  focus:outline-none  transition-all duration-500">
                <AddToCartButton styles={" bg-tooHardBeige"} onClick={handleAddToCart}/>
              </button>
            </div>
            <div className="px-5 py-3">
              <h3 className="text-gray-700 uppercase">{product.title}</h3>
              <span className="text-gray-500 mt-2">AED {product.price}</span>
            </div>
          </div>}
    </> );
}
 
export default SmallProduct;