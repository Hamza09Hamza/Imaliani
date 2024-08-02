import axios from 'axios';
import React from 'react'
const MainProduct = () => {
  const handleOrder=async (e)=>{
    e.preventDefault();
    const {data}=await axios.post("/api/checkout_sessions",{
      amount:1200,
      name:"Nike Air",
      description:"                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam inventore quidem doloribus! Voluptates, vitae aliquam ex doloremque aperiam excepturi culpa tempora omnis error, at laborum eligendi alias facere harum doloribus?      ",
      images:["https://images.unsplash.com/photo-1578262825743-a4e402caab76?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",]
    },
  {headers:
    {
      "Content-Type":"application/json"
    }
  });
   window.location.assign(data.url)
   console.log(data)

  }
        return ( <>
        <main className="my-8 flex justify-center mt-20" id='123'>
              
              <div className="container flex items-center justify-center mx-auto px-6">
                <div className="md:flex md:items-center">
                  <div className="w-full h-64 md:w-1/2 lg:h-96">
                    <img className="h-full w-full rounded-md object-cover max-w-lg mx-auto" src="https://images.unsplash.com/photo-1578262825743-a4e402caab76?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80" alt="Nike Air" />
                  </div>
                  <div className="w-full max-w-lg  mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
                    <h3 className="text-gray-700 uppercase text-lg">Nike Air</h3>
                    <span className="text-gray-500 mt-3">$125</span>
                    <hr className="my-3" />
                   
                    <span className='text-gray-400'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam inventore quidem doloribus! Voluptates, vitae aliquam ex doloremque aperiam excepturi culpa tempora omnis error, at laborum eligendi alias facere harum doloribus?
                    </span>
                    <div className="flex items-center mt-6">
                      <button onClick={handleOrder} className="px-8 py-2 bg-hardBeige text-white text-sm font-medium rounded hover:bg-softBeige focus:outline-none  transition-all duration-500">Order Now</button>
                      <button className="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
                        <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
        </> );
}
 
export default MainProduct;