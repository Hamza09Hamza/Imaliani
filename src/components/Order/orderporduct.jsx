"use client"
import Image from 'next/image';
import React from 'react'
const ProductCard = ({id,desciption,price,quantity,image}) => {
    return ( <>
    <div className="space-y-4 p-6">
          <div className="flex xxs:flex-col items-center gap-6">
            <a href="#" className="h-24 w-24  ">
              <Image className="h-full w-full object-cover" src={image} width={100} height={100} alt="imac image" />
            </a>

            <a href="#" className="min-w-0 flex-1 font-medium text-gray-900 hover:underline"> {desciption} </a>
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-normal text-gray-500"><span className="font-medium text-gray-900">Product ID:</span> {id}</p>

            <div className="flex items-center justify-end gap-4">
              <p className="text-base font-normal text-gray-900">x{quantity}</p>

              <p className="text-xl font-bold leading-tight text-gray-900">AED {price}</p>
            </div>
          </div>
        </div>

    </> );
}
 
export default ProductCard;