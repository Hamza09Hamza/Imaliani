import React from 'react'
const CatCard = ({product}) => {
        return ( <>
        <div className="bg-white rounded-2xl mid:w-[80%]  p-5 cursor-pointer hover:-translate-y-2 transition-all relative">
            <div
              className="bg-gray-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer absolute top-4 right-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16px" className="fill-gray-800 inline-block" viewBox="0 0 64 64">
                <path
                  d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                  data-original="#000000"></path>
              </svg>
            </div>

            <div className="lg:w-5/6 lg:h-[210px] mid:w-[70%] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
              <img src={product.images[0]} alt="Product 1"
                className="h-full w-full object-contain" />
            </div>

            <div>
              <h3 className="lg:text-lg mid:text-center font-extrabold text-gray-800">{product.title}</h3>
              <p className="text-gray-600 lg:text-sm mid:text-xs mt-2">{product.descrpition}</p>
              <div className='flex justify-around items-center mt-4 '>
                      <h4 className="lg:text-lg mid:text-xs  text-gray-800 font-bold ">AED {product.price}</h4>
                      <button className="flex items-center lg:max-w-[40%] mid:max-w-[80%] mid:py-2  rounded-full justify-center bg-hardBeige px-2 py-1 text-sm text-white  hover:bg-tooHardBeige transition-all duration-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-5 w-5 " viewBox="0 0 20 20" fill="currentColor">
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                        Add to cart
                    </button>
              </div>
            </div>
          </div>
        </> );
}
 
export default CatCard;