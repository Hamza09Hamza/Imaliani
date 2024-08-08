"use client";
import React, { useEffect, useState } from 'react';
import {deleteProduct, getProductsperID} from "@/Firebase/CRUD/Products"
import { DocumentData } from 'firebase/firestore';
import Image from 'next/image';
import DeleteModal from "@/app/me/Delete"
import AdminFooter from "../../footer"
import isAuth from "../../../adminAuth"
function Product({ params }: { params: { slug: string } }) {  
    const [isOpen,setIsOpen]=useState<Boolean>(false) 
    const  slug  = params.slug

    const closeDelete=()=>{
        setIsOpen(false)
    }
    const onDelete=async()=>{
        await deleteProduct(slug)
        window.location.assign("/admin/products")
    }

    const [product, setProduct] = useState<DocumentData | undefined>(undefined);
    useEffect(() => {
        
        const fetchProduct = async () => {
            if (slug && !product) {
                try {
                    const data = await getProductsperID(slug); 
                    setProduct(data);
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            }
        };

        fetchProduct();
    }, []);
    return ( <>

<div className='w-[100vw] h-[100vh] flex flex-col items-center justify-center bg-softBeige'>
        <h2 className='text-center text-semiHeader text-brown'>
            Product Overview
        </h2>
    <div className="relative p-4 w-full max-w-xl h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow  sm:p-5">
                <div className="flex justify-between mb-4 rounded-t sm:mb-5">
                    <div className="text-lg text-gray-900 md:text-xl w-[100%] ">
                        <h3 className="font-semibold ">
                            {product &&
                        product.title}
                        </h3>
                        <div className='flex justify-around w-[100%] my-4 flex-wrap'>
                        {product &&product.images&&
                        product.images.map((link: string) => (
                            <Image
                                src={link}
                                alt={`Product image `}
                                className='xxs:w-[5rem] w-[30%] rounded-lg'
                                width={100} // Example width
                                height={100} // Example height
                            />
                        ))}
                        </div>
                        <p className="font-bold">
                            {product&&product.price}AED
                        </p>
                    </div>
                </div>
                <dl>
                    <dt className="mb-2 font-semibold leading-none text-gray-900 ">Details</dt>
                    <dd className="mb-4 font-light text-gray-500 sm:mb-5 ">{product&&product.description}</dd>
                    <dt className="mb-2 font-semibold leading-none text-gray-900 ">Category</dt>
                    <dd className="mb-4 font-light text-gray-500 sm:mb-5 ">{product&&product.category}</dd>
                </dl>
                <div className="flex justify-center items-center">
                        <button onClick={()=>window.location.assign("/admin/product/"+slug+"/edit")} type="button" className="text-white mr-8 inline-flex items-center bg-hardBeige hover:bg-tooHardBeige transition-all duration-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  ">
                            <svg aria-hidden="true" className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                            Edit
                        </button>               
                        
                    <button onClick={()=>setIsOpen(true)} type="button" className="inline-flex items-center text-white transition-all duration-500 bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  ">
                        <svg aria-hidden="true" className="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                        Delete
                    </button>
                </div>
        </div>
    </div>
    <DeleteModal onClose={closeDelete} isOpen={isOpen} onDelete={onDelete} typeText={"product"}/>
</div>
    <AdminFooter/>

    </> );
}
export default isAuth(Product) 
