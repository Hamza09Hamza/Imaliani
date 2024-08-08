"use client";
import React, { useEffect, useState } from 'react';
import NewProduct from "./NewProduct";
import Head from '../header';
import { fetchNewProducts } from '@/Firebase/CRUD/Products';
import axios from 'axios';
import { auth } from '@/Firebase/Initialisation';
import { getRateProduct } from '@/Firebase/CRUD/Reviews';

const New = ({setListCat,setCurrentPage}) => {
  const [data, setData] = useState([]);
  const [products,setProducts]=useState([])
  const [cat,setCat]=useState("All")
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastVisibile,setLastVisibile]=useState()
  useEffect(() => {
    const handleAuthStateChange = () => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
      try {
        const res = await fetchNewProducts()
        const result=await getproductsrates(res.products)
        setData(result);
        if(cat==="All")
          setProducts(result)
        
        setLastVisibile(res.lastVisibleGift)
        
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    });

    return () => unsubscribe();
}

handleAuthStateChange();
  }, []);

 const  getproductsrates=async (products )=>{
  const result=await Promise.all(products.map(async(prod)=>{
    
    return {
      ...prod,rate:await getRateProduct(prod.id,auth.currentUser.uid)
    }

  }));
  return result
  }
 
 
 
 
  useEffect(()=>{
    if(cat!=="All"){
      setProducts(data.filter((prod)=>cat.toLowerCase().includes(prod.category.toLowerCase())))
    }else{
      setProducts(data)
    }
  },[cat])
  

  const continueFetching=async (e)=>{
    e.preventDefault()
    try {
      const res = await fetchNewProducts(lastVisibile)
      setData(prev=>[...prev,res.products]);
      setLastVisibile(res.lastVisibleGift)
      
    } catch (error) {
      console.error('Fetch error:', error); // Log any errors encountered

    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
    <div className='pb-32 '>
      <Head setCurrentPage={setCurrentPage} status={true} setListCat={setListCat} setCategorie={setCat} categorie={cat}  />
      
      <h1 className='text-black text-3xl font-bold text-center mt-4'> What's New in <span className='text-hardBeige'>Imaliani Craft Studio</span> ?</h1>
      <NewProduct productsList={products} />
      {lastVisibile&&<div className='flex justify-center'>
        <button onClick={async(e)=>await continueFetching(e)} className='text-center px-3 py-2 rounded-xl bg-hardBeige hover:bg-tooHardBeige transition-all duration-500'>
          load more
        </button>
      </div>}
    </div>
    </>
  );
};

export default New;
