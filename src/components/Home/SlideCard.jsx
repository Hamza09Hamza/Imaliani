"use client";
import Image from 'next/image';
import React,{useState} from 'react'
const SlideCard = ({image,type,title ,description}) => {
        const [state,setState]=useState(false)
        return ( <>
        <div onMouseEnter={()=>{setState(true)}} onMouseLeave={()=>{setState(false)}} 
        className='lg:max-w-[30%] mid:w-[70%] xxs:w-[90%]    relative overflow-hidden '>
            <div
                className="absolute bottom-auto left-auto right-12 top-4  inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-hardBeige px-2.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
                {type}
            </div>
            <Image src={image} className='rounded-2xl' alt='Image product' />
            <div  className={`bg-black transition-all duration-700 bg-opacity-60 absolute rounded-2xl w-[100%] h-[100%] py-4 flex flex-col justify-center p-8 ${state ? "top-0" : "top-[200%]"}` }>
                                <div >
                                    <h5 className="mid:mb-2 xxs:mb-[0.5rem] lg:text-2xl xxs:text-sm font-bold tracking-tight  text-white">{title}</h5>
                                </div>
                                <p className="mid:mb-3 xxs:mb-1 font-normal mid:text-sm xxs:text-small xxs:!leading-small text-gray-400">{description}</p>
                                <a href="#" className="mid:text-sm xxs:text-xs inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-hardBeige rounded-lg hover:bg-opacity-65 transition-all duration-500 focus:ring-4 focus:outline-none focus:ring-blue-300  ">
                                    More About The Product
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                                </a>
            </div>  
        </div>
        </> );
}
 
export default SlideCard;