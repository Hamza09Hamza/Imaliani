"use client"
import ProductCard from './orderporduct'
import { DocumentData } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

export default function Product({ params }: { params: { slug: string } }) {  
    const [isOpen,setIsOpen]=useState<Boolean>(false) 
    const  slug  = params.slug

    const closeDelete=()=>{
        setIsOpen(false)
    }
    const onDelete=async()=>{
        // await deleteProduct(slug)
    }

    useEffect(() => {
        
        
    }, []);
    return ( <>
   <section className="bg-softBeige py-8 antialiased md:py-16">
  <div className="mx-auto max-w-screen-xl bg-white p-8 rounded-3xl 2xl:px-0">
    <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Track the delivery of order #957684673</h2>

    <div className="mt-6 sm:mt-8 lg:flex lg:gap-8">
      <div className="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 lg:max-w-xl xl:max-w-2xl">
        
       {<>
        <ProductCard/>
        
       </>
       }

        <div className="space-y-4 p-6 bg-softBeige">
          <div className="space-y-2">
            <dl className="flex items-center justify-between gap-4">
              <dt className="font-normal text-gray-500">Original price</dt>
              <dd className="font-medium text-gray-900">$6,592.00</dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="font-normal text-gray-500">Savings</dt>
              <dd className="text-base font-medium text-green-500">-$299.00</dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="font-normal text-gray-500">Store Pickup</dt>
              <dd className="font-medium text-gray-900">$99</dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="font-normal text-gray-500">Tax</dt>
              <dd className="font-medium text-gray-900">$799</dd>
            </dl>
          </div>

          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
            <dt className="text-lg font-bold text-gray-900">Total</dt>
            <dd className="text-lg font-bold text-gray-900">$7,191.00</dd>
          </dl>
        </div>
      </div>

      <div className="mt-6 grow sm:mt-8 lg:mt-0">
        <div className="space-y-6 rounded-lg border border-gray-200 bg-softBeige p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900">Order history</h3>

          <ol className="relative ms-3 border-s border-gray-200">
            <li className="mb-10 ms-6">
              <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                <svg className="h-4 w-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
                </svg>
              </span>
              <h4 className="mb-0.5 text-base font-semibold text-gray-900">Estimated delivery in 24 Nov 2023</h4>
              <p className="text-sm font-normal text-gray-500">Products delivered</p>
            </li>

            <li className="mb-10 ms-6">
              <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                <svg className="h-4 w-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
                </svg>
              </span>
              <h4 className="mb-0.5 text-base font-semibold text-gray-900">Out for delivery</h4>
              <p className="text-sm font-normal text-gray-500">Your order is on its way</p>
            </li>

            <li className="mb-10 ms-6">
              <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                <svg className="h-4 w-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
                </svg>
              </span>
              <h4 className="mb-0.5 text-base font-semibold text-gray-900">Shipped on 19 Aug 2023</h4>
              <p className="text-sm font-normal text-gray-500">The order was shipped</p>
            </li>

            <li className="ms-6">
              <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                <svg className="h-4 w-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
                </svg>
              </span>
              <h4 className="mb-0.5 text-base font-semibold text-gray-900">Order confirmed on 15 Aug 2023</h4>
              <p className="text-sm font-normal text-gray-500">The order has been confirmed and is being processed</p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</section>

    </>)
}
