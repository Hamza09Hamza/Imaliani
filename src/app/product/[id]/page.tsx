// pages/products/[id].js
"use client";
import Head from '@/components/header';
import { useRouter } from 'next/navigation';
import {  useState } from 'react';
import MainProduct from '../MainProduct';
import Footer from '@/components/footer';
import MoreProducts from '../MoreProducts';

function ProductPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const  id  = params.slug;
  const [product, setProduct] = useState(null);


 
  return (<>
  
    <Head status={false} categorie={null} setCategorie={null}/>
    <MainProduct/> 
    <div className='flex justify-center w-[100vw]'>
    <MoreProducts/>
    </div>
   
    </>
    );
};

export default ProductPage;
