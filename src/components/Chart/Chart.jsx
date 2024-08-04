"use client";
import React, {  useState } from 'react';
import Head from '../header';
import CharCard from "./ChartCard";
import Summary from "./PricingSum";
import { auth } from '@/Firebase/Initialisation';
import Empty from "../Emptylist"
import image1 from "@/images/Products/Ashtray1.jpg"
import image2 from "@/images/Products/AshtrayHat.jpg"
import image3 from "@/images/Products/Heart.jpg"
import image4 from "@/images/Products/TissueBox.jpg"

const Chart = ({setCurrentPage,setListCat}) => {
   
    const [products, setProducts] = useState(
        (
        [
            {
                id: "1",
                title: "Candle Holder",
                description: "Elegant candle holder made from high-quality materials.",
                price: 25.99, // Price in AED
                images: [image1],
                quantity: 2
            },
            {
                id: "2",
                title: "Ashtray",
                description: "Stylish ashtray with a modern design.",
                price: 15.49, // Price in AED
                images: [image2],
                quantity: 1
            },
            {
                id: "3",
                title: "Home Decoration",
                description: "Beautiful home decoration piece to enhance your living space.",
                price: 30.00, // Price in AED
                images: [image3],
                quantity: 3
            },
            {
                id: "4",
                title: "Jewelry Tray",
                description: "Chic and practical jewelry tray for organizing your accessories.",
                price: 20.75, // Price in AED
                images: [image4],
                quantity: 4
            }
        ]));

    const changeQuantity = (value, id) => {
        setProducts(products => 
            products.map(item => 
                item.id === id ? { ...item, quantity: value } : item
            )
        );
    };
    const removeProduct=(id)=>{
        setProducts(products => 
            products.filter(item => 
                item.id !== id
            )
        );
    }

    return ( 
        <>
        <div className='pb-20'>

            <Head setListCat={setListCat} status={false} />
            {products.length>0?
            <div className="font-sans max-w-5xl xxs:max-w-[90%] max-md:max-w-xl mx-auto bg-white py-4">
                <h1 className="text-3xl font-bold text-gray-800 text-center">Shopping Cart</h1>
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    <div className="md:col-span-2 space-y-4">
                        {products.map((item) => (
                            <React.Fragment key={item.id}>
                                <CharCard removeProduct={removeProduct} setProducts={changeQuantity} product={item} />
                                {products.indexOf(item) !== products.length - 1 && <hr className="border-gray-300" />}
                            </React.Fragment>
                        ))}
                    </div>
                    <Summary setCurrentPage={setCurrentPage}products={products.map(item => ({
                        id:item.id,
                        name: item.title,
                        description: item.description,
                        amount: item.price*100,
                        images: item.images,
                        quantity: item.quantity
                    }))} />
                </div>
            </div>:

            <Empty text=" Your Shopping Chart is empty. " type="shopping"/>
            }
        </div>

        </>
    );
}

export default Chart;
