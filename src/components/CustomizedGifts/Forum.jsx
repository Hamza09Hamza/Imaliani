"use client";
import React, { useState } from 'react'



const Customized = () => {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            setFileName(event.target.files[0].name);
        } else {
            setFileName('');
        }
    };
        return ( <>
      <div class="lg:max-w-4xl lg:mx-auto lg:pt-10 mid:pt-2 lg:pb-20 mid:w-[100%]  mid:pb-40 ">
        <div class="text-center">
          <h2 class="lg:text-3xl font-extrabold text-gray-800 inline-block border-b-[3px] border-gray-800 lg:pb-1">Cutomized Gifts</h2>
        </div>

        <div class="lg:mt-12 mid:mt-2 mid:flex mid:items-center mid:flex-col w-[100%] ">

          <div class="grid mid:text-center md:grid-cols-3 gap-4  mid:w-[90%] ">
            <div>
              <h3 class="lg:text-3xl font-bold text-gray-300 mid:hidden">01</h3>
              <h3 class="lg:text-xl font-bold text-gray-800 mt-1">Personal Details</h3>
            </div>

            <div class="md:col-span-2  mid:flex mid:items-center mid:flex-col ">
                <div class="grid sm:grid-cols-2 gap-4 mid:w-[90%]">
                  <div>
                    <input type="text" placeholder="First name"
                      class="px-4 mid:px-2 py-3 bg-white text-gray-800 w-full text-sm mid:text-sm  border-2 rounded-md focus:border-Beige outline-none" />
                  </div>
                  <div>
                    <input type="text" placeholder="Last name"
                      class="px-4 py-3 bg-white text-gray-800 w-full text-sm mid:text-sm border-2 rounded-md focus:border-Beige outline-none" />
                  </div>
                  <div>
                    <input type="email" placeholder="Email address"
                      class="px-4 py-3 bg-white text-gray-800 w-full text-sm mid:text-sm border-2 rounded-md focus:border-Beige outline-none" />
                  </div>
                  <div>
                    <input type="text" placeholder="Phone number"
                      class="px-4 py-3 bg-white text-gray-800 w-full text-sm mid:text-sm border-2 rounded-md focus:border-Beige outline-none" />
                  </div>
                </div>
            </div>
          </div>

          <div class="grid mid:text-center md:grid-cols-3  gap-4 mid:mt-12 mid:w-[90%]">
            <div>
              <h3 class="lg:text-3xl font-bold text-gray-300 mid:hidden">02</h3>
              <h3 class="lg:text-xl font-bold text-gray-800 mt-1">Shopping Address</h3>
            </div>

            <div class="md:col-span-2  mid:flex mid:items-center mid:flex-col ">
                <div class="grid sm:grid-cols-2 gap-4 mid:w-[90%]">
                  <div>
                    <input type="text" placeholder="Street address"
                      class="px-4 py-3 bg-white text-gray-800 w-full text-sm mid:text-sm border-2 rounded-md focus:border-Beige outline-none" />
                  </div>
                  <div>
                    <input type="text" placeholder="City"
                      class="px-4 py-3 bg-white text-gray-800 w-full text-sm mid:text-sm border-2 rounded-md focus:border-Beige outline-none" />
                  </div>
                  <div>
                    <input type="text" placeholder="State"
                      class="px-4 py-3 bg-white text-gray-800 w-full text-sm mid:text-sm border-2 rounded-md focus:border-Beige outline-none" />
                  </div>
                  <div>
                    <input type="number" placeholder="Zip Code"
                      class="px-4 py-3 bg-white text-gray-800 w-full text-sm mid:text-sm border-2 rounded-md focus:border-Beige outline-none" />
                  </div>
                </div>
            </div>
          </div>
          <div class="grid mid:text-center md:grid-cols-3  gap-4 mid:mt-12 mid:w-[90%]">
            <div>
              <h3 class="lg:text-3xl font-bold text-gray-300 mid:hidden">03</h3>
              <h3 class="lg:text-xl font-bold text-gray-800 mt-1">Gift's Details</h3>
            </div>

            <div class="md:col-span-2  mid:flex mid:items-center mid:flex-col">
                <div class="grid sm:grid-cols-2 gap-4 mid:w-[100%] ">
                    <div class="max-w-sm mx-auto mid:w-[100%]">
                        <textarea id="message" rows="4" class="lg:px-16 mid:w-[90%] mid:px-2 py-3 bg-white text-gray-800 w-full text-sm mid:text-sm border-2 rounded-md focus:border-Beige outline-none" placeholder="Describe the Gift wanted.."></textarea>
                    </div>
                 
                    <div className='flex justify-center items-center flex-col transition-all duration-500'>
                        <input type="file" id="file-upload" class="hidden" onChange={handleFileChange}/>
                        <label for="file-upload" class="mid:w-[60%] cursor-pointer bg-hardBeige hover:bg-Beige text-white font-bold py-2 px-4 rounded transition-all duration-500">
                            Upload File
                        </label>
                        {fileName && (
                            <p className="mt-4 text-brown">
                                Selected file: {fileName}
                            </p>
                        )}
                    </div>
                </div>
            </div>
          </div>

         

          <div class="flex flex-wrap justify-end gap-4 lg:mt-12 mid:mt-6">
            <button type="button"
              class="px-6 py-3 text-sm font-semibold tracking-wide bg-black text-white rounded-md hover:bg-hardBeige transition-all duration-500" >Book now</button>
          </div>
        </div>
      </div>

        </> );
}
 
export default Customized;