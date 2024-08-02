import React, { useEffect } from 'react';
import ProductCard from './ProductCard';

const NewProduct = ({ productsList }) => {
    useEffect(()=>{
        console.log(productsList)
    },[])
    return (
        <div className='flex justify-center items-center'>
            <div className="flex flex-row flex-wrap flex-1 p-4  lg:ml-0 lg:max-w-[70%]  xxs:max-w-[90%] justify-around">
                {productsList.map((item)=><>
                    <ProductCard product={item}/>
                </>)}
            </div>
        </div>
    );
};

export default NewProduct;
