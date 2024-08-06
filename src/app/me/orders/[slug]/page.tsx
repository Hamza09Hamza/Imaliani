"use client"
import { auth } from '@/Firebase/Initialisation'
import ProductCard from '@/components/Order/orderporduct'
import TrackOrder from './ordertrack'
import { DocumentData } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import {timestampToDate,getMostRecentStatus} from "@/app/Utils/time"
import { getProductsperID } from '@/Firebase/CRUD/Products'
import Head from '@/components/header'

export default function Product({ params }: { params: { slug: string } }) {  
    const [isOpen,setIsOpen]=useState<Boolean>(false) 
    const  slug  = params.slug
    const [order, setOrder] = useState({
        products: [] as any[], // Adjust this type as needed
        orderId: "",
        date: "",
        totalAmount: "",
        status: "",
        Status:{} as any 


    });
    const [products,setProducts]=useState<any>([])
    

    // const closeDelete=()=>{
    //     setIsOpen(false)
    // }
    // const onDelete=async()=>{
    //     // await deleteProduct(slug)
    // }

    useEffect(() => {
        const handleAuthStateChange = () => {
            const unsubscribe = auth.onAuthStateChanged(async (user) => {
                if (user) {
                    try {
                        const { data } = await axios.get("/api/orders/getorder", {
                            params: {
                                id: slug
                            }
                        });

                        let order = data.data;
                        order = {
                            ...order,
                                orderId: "#" + slug,
                                date: timestampToDate(order.Status.Pre_order),
                                totalAmount: "AED " + order.totalAmount,
                                status: getMostRecentStatus(order.Status) 

                        };
                        setOrder(order)
                        let products = await Promise.all(order.products.map(async (prod: any) => 
                            await  getProductsperID(prod.id) 
                        ));
                        console.log(order)
                        products =products.map((prod)=>{
                            return {
                                ...prod,
                                Quantity:order.products.filter((ord: { id: any })=>ord.id===prod.id)[0].quantity
                            }})

                        setProducts(products)

                    } catch (error) {
                        console.error("Error fetching user orders:", error);
                    }
                } else {
                }
            });

            return () => unsubscribe();
        };

        handleAuthStateChange();
    }, []);
  
    return ( <>
    <Head status={false} setCategorie={null} categorie={null} />
   <section className="bg-softBeige py-8 antialiased md:py-16 h-full">
  <div className="mx-auto max-w-screen-xl bg-white p-8 rounded-3xl 2xl:px-0">
    <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Track the delivery of order #{order.orderId}</h2>


    <div className="mt-6 sm:mt-8 lg:flex lg:gap-8">
      <div className="w-full divide-y h-[100%] divide-gray-200 overflow-hidden rounded-lg border border-gray-200 lg:max-w-xl xl:max-w-2xl">
        
       {products && products.map((prod: { id: any; description: any; price: any; Quantity: any; images: any[] })=><>
            <ProductCard id={prod.id} desciption={prod.description} price={prod.price} quantity={prod.Quantity} image={prod.images[0]}/>
       </>)
       
       }

        <div className="space-y-4 p-6 bg-softBeige">
          <div className="space-y-2">



          </div>

          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
            <dt className="text-lg font-bold text-gray-900">Total</dt>
            <dd className="text-lg font-bold text-gray-900">{order.totalAmount}</dd>
          </dl>
        </div>
      </div>

      <TrackOrder Status={order.Status} id={order.orderId}/>
    </div>
  </div>
</section>

    </>)
}
