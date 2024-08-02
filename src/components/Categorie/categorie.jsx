import React, { useEffect, useState } from 'react';
import Head from '../header';
import ProductList from './ProductList';
import { OriginCategorieList } from '../products';
import Customized from '../CustomizedGifts/Forum';

const Categorie = () => {
    const [cat, setCat] = useState('All');
    const [listcat, setListCat] = useState('');
    const [CategorieList, setCategorieList] = useState(OriginCategorieList);

    const handleCategorie = (value) => {
        if (value !== 'All') {
            const filteredList = OriginCategorieList.filter(item => value.includes(item));
            setCategorieList(filteredList.length > 0 ? filteredList : OriginCategorieList);
            setCat(filteredList[0]);
            setListCat(filteredList[0])
        } else {
            setCategorieList(OriginCategorieList); 
            setCat(value) 
            setListCat('')
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
        // Add more products as needed
    ];

    return (
        <>
            <div className="w-screen h-screen relative max-h-screen overflow-hidden pb-24">
            <Head status={true} categorie={cat} setCategorie={handleCategorie} />
            <div className="flex flex-row h-full overflow-hidden">
                <div className="lg:w-1/5 z-50 text-gray-700 bg-gray-100 flex flex-col justify-around pb-2 h-fit ">
                    {CategorieList.map((item) => (
                        <div
                            key={item}
                            className={`lg:text-lg xxs:text-xs px-2 py-4 hover:bg-white cursor-pointer hover:border-l-8 hover:border-l-hardBeige transition-all duration-500 ${listcat === item ? 'border-l-8 border-l-hardBeige bg-white' : ''}`}
                            onClick={() => setListCat(item)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
                { listcat!=="Customized gifts"?
                <div className="flex-1 pl-2 overflow-y-auto h-full pb-60">
                    <ProductList products={products} />
                </div>
                  :<>
                  <Customized/>
              </>
          }
            </div>
            </div>
          
            
        </>
    );
};

export default Categorie;
