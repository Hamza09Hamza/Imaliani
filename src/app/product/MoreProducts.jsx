import React from 'react';

const MoreProducts = () => {
  const products = [
    {
      name: 'Chanel',
      price: 12,
      image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=376&q=80'
    },
    {
      name: 'Man Mix',
      price: 12,
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'
    },
    {
      name: 'Classic watch',
      price: 12,
      image: 'https://images.unsplash.com/photo-1532667449560-72a95c8d381b?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
    },
    {
      name: 'Woman mix',
      price: 12,
      image: 'https://images.unsplash.com/photo-1590664863685-a99ef05e9f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=345&q=80'
    }
  ];

  return (
    <div className="mt-16 max-w-[90%] flex flex-col items-center justify-center lg:pb-40">
      <h3 className="text-gray-600 text-2xl font-medium">More Similar Products</h3>
      <div className="grid gap-6 flex-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {products.map((product, index) => (
          <div key={index} className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
            <div className="flex items-end justify-end h-56 w-full bg-cover" style={{ backgroundImage: `url(${product.image})` }}>
              <button className=" cursor-pointer p-2 rounded-full bg-Beige text-white mx-5 -mb-4 hover:bg-softBeige focus:outline-none focus:bg-softBeige transition-all duration-500">
                <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </button>
            </div>
            <div className="px-5 py-3">
              <h3 className="text-gray-700 uppercase">{product.name}</h3>
              <span className="text-gray-500 mt-2">AED {product.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoreProducts;
