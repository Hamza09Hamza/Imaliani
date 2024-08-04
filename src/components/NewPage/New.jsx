"use client";
import React, { useEffect, useState } from 'react';
import NewProduct from "./NewProduct";
import Head from '../header';

const New = ({setListCat,setCurrentPage}) => {
  const [data, setData] = useState([]);
  const [cat,setCat]=useState("All")
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products');
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const result = await res.json();
        setData(result.products); // Assuming `result` contains a `products` field
      } catch (error) {
        console.error('Fetch error:', error); // Log any errors encountered
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
    <div className='pb-20 '>
      <Head setCurrentPage={setCurrentPage} status={true} setListCat={setListCat} setCategorie={setCat} categorie={cat}  />
      
      <h1 className='text-black text-3xl font-bold text-center mt-4'> What's New in <span className='text-hardBeige'>Imaliani Craft Studio</span> ?</h1>
      <NewProduct productsList={data} />
    </div>
    </>
  );
};

export default New;
