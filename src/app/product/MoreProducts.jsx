import React from 'react';
import SmallProduct from "./SmallProduct"
const MoreProducts = ({catProducts}) => {
 
  return (
    <div className="mt-16 max-w-[90%] flex flex-col items-center justify-center lg:pb-40">
      <h3 className="text-gray-600 text-2xl font-medium">More Similar Products</h3>
      <div className="grid gap-6 flex-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {catProducts&&catProducts.map((product, index) => 
          <SmallProduct  product={product} key={index}/>
        )}
      </div>
    </div>
  );
};

export default MoreProducts;
