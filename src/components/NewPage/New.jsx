"use client";
import React, { useEffect, useState } from 'react';
import NewProduct from "./NewProduct";
import Head from '../header';
import { fetchNewProducts } from '@/Firebase/CRUD/Products';
import { auth } from '@/Firebase/Initialisation';
import { getRateProduct } from '@/Firebase/CRUD/Reviews';
import Loading from '../loading';

const New = ({ setListCat, setCurrentPage }) => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [cat, setCat] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);

useLayoutEffect(() => {
    const fetchInitialProducts = async () => {
      try {
        const res = await fetchNewProducts(null, 5);
        setData(res.products);
        setLastVisible(res.lastVisibleGift);
        if (cat === "All") {
          setProducts(res.products);
        }
      } catch (error) {

        console.error('Fetch error:', error);
        setError(error);
      } finally {
      }
      setLoading(false);
    };

    fetchInitialProducts();
    
  }, [cat]);



  useEffect(() => {
    if (cat !== "All") {
      setProducts(data.filter((prod) => cat.toLowerCase().includes(prod.category.toLowerCase())));
    } else {
      setProducts(data);
    }
    console.log(data)
  }, [cat, data]);

  const continueFetching = async (e) => {
    e.preventDefault();
    try {
      const res = await fetchNewProducts(lastVisible);
      setData((prev) => [...prev, ...res.products]);
      setLastVisible(res.lastVisibleGift);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  if (loading) return <><Loading/></>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className='pb-32'>
        <Head setCurrentPage={setCurrentPage} status={true} setListCat={setListCat} setCategorie={setCat} categorie={cat} />
        <h1 className='text-black text-3xl font-bold text-center mt-4'>What's New in <span className='text-hardBeige'>Imaliani Craft Studio</span>?</h1>
        <NewProduct productsList={products} />
        {lastVisible && (
          <div className='flex justify-center'>
            <button
              onClick={async (e) => await continueFetching(e)}
              className='text-center px-3 py-2 rounded-xl bg-hardBeige hover:bg-tooHardBeige transition-all duration-500'>
              Load more
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default New;
