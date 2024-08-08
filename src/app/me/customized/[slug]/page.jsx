"use client";

import { DB, auth } from '../../../../Firebase/Initialisation';
import ProductCard from '../../../../components/Order/orderporduct';
import TrackOrder from './ordertrack';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { timestampToDate, getMostRecentStatus } from '../../../Utils/time';
import { getProductsperID } from '../../../../Firebase/CRUD/Products';
import Head from '../../../../components/header';
import CarouselCustomNavigation from '../../../../components/carousel';
import { doc, getDoc } from 'firebase/firestore';

export default function Product({ params }) {
  const slug = params.slug;
  const [order, setOrder] = useState({
    images: [] ,
    orderId: "",
    date: "",
    status: "",
    description: "",
    email: "",
    Status: {},
  });

  useEffect(() => {
    const handleAuthStateChange = () => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            let order
            const res=await getDoc(doc(DB,"CustomizedGifts/",slug))
            if(res.exists()) 
            {
                order=res.data()
              order = {
              ...order,
              orderId: res.id,
              date: timestampToDate(order.Status.Pre_order),
              status: getMostRecentStatus(order.Status),
              description: order.description,
            };
            setOrder(order);
          }else{
            order={};
          }

          } catch (error) {
            console.error("Error fetching user orders:", error);
          }
        }
      });

      return () => unsubscribe();
    };

    handleAuthStateChange();
  }, [slug]);

  return (
    <>
      <Head status={false} setCategorie={null} categorie={null} />
      <section className="bg-softBeige py-8 antialiased md:py-16 h-full">
        <div className="mx-auto max-w-screen-xl bg-white p-8 rounded-3xl 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Track the delivery of gift with ID: #{order.orderId}</h2>

          <div className="mt-6 sm:mt-8 lg:flex lg:gap-8">
            <div className="w-full divide-y h-[100%] divide-gray-200 overflow-hidden rounded-lg border border-gray-200 lg:max-w-xl xl:max-w-2xl">
              <div className='max-w-[70%] h-[20rem] flex items-center justify-center'>
                <CarouselCustomNavigation images={order.images} />
              </div>
              <p className='my-4 ml-4 text-gray-600'>
                Description: {order.description}
              </p>
              <div className="space-y-4 p-6 bg-softBeige">
                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                  <dt className="text-lg font-bold text-gray-900">email</dt>
                  <dd className="text-lg font-bold text-gray-900">{order.email}</dd>
                </dl>
              </div>
            </div>
            <TrackOrder Status={order.Status} id={order.orderId} />
          </div>
        </div>
      </section>
    </>
  );
}
