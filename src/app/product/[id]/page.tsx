"use client";
import Head from '../../../components/header';
import {  useEffect, useState } from 'react';
import MainProduct from '../MainProduct';
import Footer from '../../../components/footer';
import MoreProducts from '../MoreProducts';
import { auth } from '../../../Firebase/Initialisation';
import { fetchCatProducts, fetchrandomProducts, getProductsperID } from '../../../Firebase/CRUD/Products';
import React from 'react';
import Loading from '@/components/loading';

function ProductPage({ params }: { params: { id: string } }) {
  const  id  = params.id;
  const [product, setProduct] = useState<any>(null);
  const [catProducts, setCatProducts] = useState<any>([]);
  const [loading ,setLoading]=useState<boolean>(false)

  useEffect(() => {
    const handleAuthStateChange = () => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                  let data
                  let filtered=[];
                  filtered.length
                  const productObj=  (await getProductsperID(id)) as any;
                  setProduct(productObj)
                  if(productObj){
                   data=await fetchCatProducts(productObj.category,null,5) as any
                  }
                  filtered=data?.products.filter((prod: { id: any; })=>prod.id!=productObj.id)
                  if(filtered ){
                    data=await fetchrandomProducts(null,5)
                  }
                  filtered=data?.products.filter((prod: { id: any; })=>prod.id!=productObj.id)
                  if(filtered.length>0)
                    setCatProducts(filtered )

                 

                } catch (error) {
                    console.error("Error fetching user orders:", error);
                }
            } else {
                
            }
            setLoading(true)
        });

        return () => unsubscribe();
    };

    handleAuthStateChange();
}, []); 
  if(!loading)
      return <>     <Head status={false} categorie={null} setCategorie={null} customer={auth.currentUser?.uid}/>
  <Loading/></>
 
  return (<>
  
    <Head status={false} categorie={null} setCategorie={null} customer={auth.currentUser?.uid}/>
     {
     product ? <MainProduct product={product}/>:<>
      <h1 className=' text-hardBeige text-center text-semiHeader'> Sorry, we couldn't find this product </h1>
      <a href='/categories' className='flex items-center justify-center text-brown outline-none hover:text-tooHardBeige duration-500 transition-all text-center '> see more ?</a>
     </> }
      <div className='flex justify-center w-[100vw]'>

    {   catProducts?    <MoreProducts catProducts={catProducts} /> : <>
        <h4> we don't have another similair piece</h4>
    </>}
<Footer/>
    </div>
   
    </>
    );
};

export default ProductPage;
