"use client";
import React, { useEffect ,useState} from 'react';
import SlideCard from "./SlideCard"
import Image from 'next/image';
const TrendingSlider = ({images}) => {
    const image1=images[0]
    const image2=images[1]
    const image3=images[2]
  return (<>
 
    <div className='flex flex-col items-center  justify-around mb-40 mt-10 p-10 bg-semiHardBeige  bg-opacity-25 rounded-2xl max-w-[90%]'>
            <h2 className='pb-4 lg:text-semiHeader text-hardBeige'>
               Our Best Products 
            </h2>
        <div className='flex xxs:flex-col xxs:gap-4 items-center flex-wrap justify-around'>
            <SlideCard
                type={"Best Sales"}
                title={"Noteworthy technology acquisitions 2021"}
                image={image1}
                description={"Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."}
             />
                   <SlideCard
                type={"Best Searched"}
                title={"Noteworthy technology acquisitions 2021"}
                image={image2}
                description={"Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."}
             />
            <SlideCard
                type={"Best Offer"}
                title={"Noteworthy technology acquisitions 2021"}
                image={image3}
                description={"Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."}
             />
        </div>
        
        
    </div>
    </>);
};

export default TrendingSlider;
