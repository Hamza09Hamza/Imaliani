"use client";
import React, { useEffect, useState } from 'react';
import NewProduct from "./NewProduct";
import Head from '../header';
import { fetchNewProducts } from '@/Firebase/CRUD/Products';
import { auth } from '@/Firebase/Initialisation';
import { getRateProduct } from '@/Firebase/CRUD/Reviews';

const New = ({ setListCat, setCurrentPage }) => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [cat, setCat] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);

  useEffect(() => {
    const fetchInitialProducts = async () => {
      try {
        const res = await fetchNewProducts(null, 5);
        const productsWithRates = await getProductsRates(res.products);
        setData(productsWithRates);
        setLastVisible(res.lastVisibleGift);

        if (cat === "All") {
          setProducts(productsWithRates);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const handleAuthStateChange = () => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          fetchInitialProducts();
        }
      });

      return () => unsubscribe();
    };

    handleAuthStateChange();
  }, [cat]);

  const getProductsRates = async (products) => {
    const result = await Promise.all(products.map(async (prod) => {
      const rate = await getRateProduct(prod.id, auth.currentUser.uid);
      return { ...prod, rate };
    }));
    return result;
  };

  useEffect(() => {
    if (cat !== "All") {
      setProducts(data.filter((prod) => cat.toLowerCase().includes(prod.category.toLowerCase())));
    } else {
      setProducts(data);
    }
  }, [cat, data]);

  const continueFetching = async (e) => {
    e.preventDefault();
    try {
      const res = await fetchNewProducts(lastVisible);
      const productsWithRates = await getProductsRates(res.products);
      setData((prev) => [...prev, ...productsWithRates]);
      setLastVisible(res.lastVisibleGift);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
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
