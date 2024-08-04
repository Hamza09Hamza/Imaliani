import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Summary = ({setCurrentPage,products}) => {
    
    const[SumPrice,setSumPrice]=useState(products.reduce((total, product) => total + product.quantity*product.amount/100, 0))
    const HandleCheckout=async ()=>{
        const {data}=await axios.post("/api/checkout_sessions",{
            products,
            userID:JSON.parse(localStorage.getItem("UserID"))
          },
        {headers:
          {
            "Content-Type":"application/json"
          }
        });
         window.location.assign(data.url)

    }
    useEffect(()=>{
        setSumPrice(products.reduce((total, product) => total + product.quantity*product.amount, 0))
    },[products]) 
        return ( <>
          <div className="bg-softBeige rounded-md p-4 h-max">
                    <h3 className="text-lg max-sm:text-base font-bold text-gray-800 border-b  pb-2">Order Summary</h3>

                    <form className="mt-6">
                        <div>
                            <h3 className="text-base text-gray-800  font-semibold mb-4">Enter Details</h3>
                            <div className="space-y-3">
                                {/* <div className="relative flex items-center">
                                    <input type="text" placeholder="Full Name"
                                        className="px-4 py-2.5 bg-white text-gray-800 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4"
                                        viewBox="0 0 24 24">
                                        <circle cx="10" cy="7" r="6" dataOriginal="#000000"></circle>
                                        <path
                                            d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                            dataOriginal="#000000"></path>
                                    </svg>
                                </div>

                                <div className="relative flex items-center">
                                    <input type="email" placeholder="Email"
                                        className="px-4 py-2.5 bg-white text-gray-800 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4"
                                        viewBox="0 0 682.667 682.667">
                                        <defs>
                                            <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                                <path d="M0 512h512V0H0Z" dataOriginal="#000000"></path>
                                            </clipPath>
                                        </defs>
                                        <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                            <path fill="none" strokeMiterlimit="10" strokeWidth="40"
                                                d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                                                dataOriginal="#000000"></path>
                                            <path
                                                d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                                                dataOriginal="#000000"></path>
                                        </g>
                                    </svg>
                                </div> 

                                <div className="relative flex items-center">
                                    <input type="number" placeholder="Phone No."
                                        className="px-4 py-2.5 bg-white text-gray-800 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none" />
                                    <svg fill="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 64 64">
                                        <path
                                            d="m52.148 42.678-6.479-4.527a5 5 0 0 0-6.963 1.238l-1.504 2.156c-2.52-1.69-5.333-4.05-8.014-6.732-2.68-2.68-5.04-5.493-6.73-8.013l2.154-1.504a4.96 4.96 0 0 0 2.064-3.225 4.98 4.98 0 0 0-.826-3.739l-4.525-6.478C20.378 10.5 18.85 9.69 17.24 9.69a4.69 4.69 0 0 0-1.628.291 8.97 8.97 0 0 0-1.685.828l-.895.63a6.782 6.782 0 0 0-.63.563c-1.092 1.09-1.866 2.472-2.303 4.104-1.865 6.99 2.754 17.561 11.495 26.301 7.34 7.34 16.157 11.9 23.011 11.9 1.175 0 2.281-.136 3.29-.406 1.633-.436 3.014-1.21 4.105-2.302.199-.199.388-.407.591-.67l.63-.899a9.007 9.007 0 0 0 .798-1.64c.763-2.06-.007-4.41-1.871-5.713z"
                                            dataOriginal="#000000"></path>
                                    </svg>
                                </div> */}
                            </div>
                        </div>
                    </form>

                    <ul className="text-gray-800 mt-6 space-y-3">
                        <li className="flex flex-wrap gap-4 text-sm">Subtotal 
                        <span className="ml-auto font-bold">
                            AED {SumPrice/100}
                            </span></li>
                        <li className="flex flex-wrap gap-4 text-sm">Tax <span className="ml-auto font-bold">AED 4.00</span></li>
                        <hr className="border-gray-300" />
                        <li className="flex flex-wrap gap-4 text-sm font-bold">Total <span className="ml-auto">AED {4+SumPrice/100}</span></li>
                    </ul>

                    <div className="mt-6 space-y-3">
                        <button onClick={HandleCheckout} type="button" className="transition-all duration-500 text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-hardBeige hover:bg-tooHardBeige text-white rounded-md">Checkout</button>
                        <button onClick={()=>setCurrentPage(0)} type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md">Continue Shopping  </button>
                    </div>
                </div>
        </> );
}
 
export default Summary;