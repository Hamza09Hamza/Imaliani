"use client";
import React, { useEffect, useState } from 'react';
import Head from '../header';
import ProductList from './ProductList';
import { OriginCategorieList } from '../products';
import Customized from '../../app/categories/customized-gifts/Forum';
import CatList from './CatList';
import { useRouter } from 'next/router';

const Categorie = () => {
    const [cat, setCat] = useState('All');
    
    const [listcat, setListCat] = useState();
    
    const [CategorieList, setCategorieList] = useState(OriginCategorieList);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
     // Assuming category is the third segment
    
    const handleCategorie = (value) => {
        if (value !== 'All') {
            const filteredList = OriginCategorieList.filter(item => value.includes(item));
            setCategorieList(filteredList.length > 0 ? filteredList : OriginCategorieList);
            setCat(filteredList[0]);
            setListCat(filteredList[0]);
        } else {
            setCategorieList(OriginCategorieList);
            setCat(value);
            setListCat('');
        }
    };
    


    const products = [
        { id: 1, title: 'Urban Sneakers', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', price: '100', images: ["https://readymadeui.com/images/product10.webp"] },
        { id: 2, title: 'Blaze Burst', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', price: '200', images: ["https://readymadeui.com/images/product9.webp"] },
        { id: 3, title: 'Sneakers', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', price: '200', images: ["https://readymadeui.com/images/product8.webp"] },
        { id: 4, title: 'Pumps', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', price: '200', images: ["https://readymadeui.com/images/product15.webp"] },
        { id: 5, title: 'Echo Elegance', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', price: '200', images: ["https://readymadeui.com/images/product14.webp"] },
        { id: 6, title: 'Nike Shoes', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', price: '200', images: ["https://readymadeui.com/images/product6.webp"] },
        { id: 7, title: 'Zenith Glow', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', price: '200', images: ["https://readymadeui.com/images/product13.webp"] },
        { id: 8, title: 'Summit Hiking', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', price: '200', images: ["https://readymadeui.com/images/product12.webp"] },
        { id: 9, title: 'Velvet Boots', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', price: '200', images: ["https://readymadeui.com/images/product11.webp"] },
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <div className="w-screen h-screen relative max-h-screen overflow-hidden  xxs:pb-90 bg-gray-50">
                <Head 
                status={true} 
                categorie={cat} 
                setCategorie={handleCategorie} />
                <div className="flex flex-row h-full overflow-scroll bg-gray-50">
                    
                    <div className={`lg:w-1/5  text-gray-700 bg-gray-50 flex flex-col justify-around mid:w-[fit] h-fit mid:pb-40 pb-40 xxs:pb-2 transition-transform transform duration-500 `}style={{zIndex:200}}>
                        <CatList list={CategorieList} setList={setListCat} listcat={listcat} toggleSidebar={toggleSidebar} status={isSidebarOpen} />
                    </div>
                   
                        <div className="flex-1  lg:pl-2 overflow-y-auto h-full  mid:pb-10 xxs:pb-4 bg-gray-50">
                            <ProductList products={products} />
                        </div>
                       
                    
                </div>
            </div>
        </>
    );
};

export default Categorie;
