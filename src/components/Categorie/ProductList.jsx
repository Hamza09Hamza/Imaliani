import React from 'react'
import Image from 'next/image';
import Candle from"@/images/Products/AshtrayHat.jpg"
import CatCard from "./ProductCard"
const ProductList = ({products ,Categorie}) => {
        return ( <>
            <div class="p-4 mx-auto lg:max-w-7xl bg-gray-50 sm:max-w-full overflow-scroll lg:pt-12 mid:pt-8">
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6 place-items-center">
                {products.map((item)=><CatCard product={item}/>)}
              </div>
            </div>

        </> );
}
 
export default ProductList;