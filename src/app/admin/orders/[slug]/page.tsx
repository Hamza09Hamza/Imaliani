"use client"
import { DB, auth } from '@/Firebase/Initialisation'
import ProductCard from '@/components/Order/orderporduct'
import TrackOrder from '@/components/Order/ordertrack'
import { DocumentData, doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '@/components/loading';


import {timestampToDate,getMostRecentStatus} from "@/app/Utils/time"
import { getProductsperID } from '@/Firebase/CRUD/Products'
import Head from '@/components/header'
import AdminFooter from '../../footer'
import isAuth from "../../../adminAuth"
function Product({ params }: { params: { slug: string } }) {  
    const  slug  = params.slug
        const [loading,setLoading]=useState(true);
    const [order, setOrder] = useState({
        ShippingAdresse:{city:"",state:"",streetAddress:"",zipCode:""},
        email:"",
        products: [] as any[], // Adjust this type as needed
        orderId: "",
        date: "",
        phoneNo:"",
        totalAmount: "",
        status: "",
        Status:{} as any 
    });
    const [products,setProducts]=useState<any>([])
    

    useEffect(() => {
        const handleAuthStateChange = () => {
            const unsubscribe = auth.onAuthStateChanged(async (user) => {
                if (user) {
                  try {
                    let order:any;
                    const res=await getDoc(doc(DB,"Orders/",slug))
                    console.log()
                    if(res.exists()) 
                    {
                       
                        const orddata=res.data()
                      order = {
                      ...orddata,
                      orderId:  res.id || "" ,
                      date: timestampToDate(orddata.Status.Pre_order)|| "" ,
                      status: getMostRecentStatus(orddata.Status) || "",
                      description: orddata.description || "",
                    };
                    const {data}=await axios.post("/api/decrypt",{id:user.uid,data:order.email})
                    order.email=data.data
                    const resPhone=await axios.post("/api/decrypt",{id:user.uid,data:order.phoneNo})
                    order.phoneNo=resPhone.data.data
                    const products=await Promise.all(order.products.map(async(prod:any)=>{
                        const {data}=await axios.post("/api/decrypt",{id:user.uid,data:prod.id})
                        const decryptedProductId=data.data
                        return{...(await getDoc(doc(DB,"products/",decryptedProductId))).data(),
                            quantity:prod.quantity
                        }
                    }))
                   
                    setProducts(products)

                    setOrder(order);
                  }else{
                    order={};
                  }
        
                  } catch (error) {
                    console.error("Error fetching user orders:", error);
                  }
                    setLoading(false)
                }
              });

            return () => unsubscribe();
        };

        handleAuthStateChange();
    }, []);
  
if(!loading){
        return <><Loading/></>
    }
  
    return ( <>
   <section className="bg-softBeige py-8 antialiased md:py-16 flex items-center justify-center h-[100vh]">
  <div className="mx-auto max-w-screen-xl bg-white p-8 rounded-3xl 2xl:px-0">
    <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Track the delivery of order {order.orderId}</h2>
    <span className='mt-1 text-base font-normal text-gray-500 dark:text-gray-400'>{"order set by "+order.email+", "+order.phoneNo +" "+order.ShippingAdresse.state+", "+order.ShippingAdresse.city+", "+order.ShippingAdresse.zipCode+", "+order.ShippingAdresse.streetAddress}</span>

    <div className="mt-6 sm:mt-8 lg:flex lg:gap-8">
      <div className="w-full divide-y h-[100%] divide-gray-200 overflow-hidden rounded-lg border border-gray-200 lg:max-w-xl xl:max-w-2xl">
        
       {products && products.map((prod: { id: any; description: any; price: any; quantity: any; images: any[] })=><>
            <ProductCard id={prod.id} desciption={prod.description} price={prod.price} quantity={prod.quantity} image={prod.images[0]}/>
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
<AdminFooter/>

    </>)
}
export default isAuth(Product);
