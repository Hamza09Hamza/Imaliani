"use client";
import React, { useEffect ,useState} from 'react';
import SlideCard from "./SlideCard"
import Image from 'next/image';
const TrendingSlider = ({images}) => {
    const image1=images[0]
    const image2=images[1]
    const image3=images[2]
    
  return (<>
 
    <div className='flex flex-col items-center  justify-around mb-20 mt-10 p-10 bg-semiHardBeige  bg-opacity-25 rounded-2xl lg:max-w-[90%] mid:max-w-[60%] xxs:max-w-[90%]'>
            <h2 className='pb-4 lg:text-semiHeader mid:text-2xl xxs:text-base text-hardBeige'>
               Our Best Products 
            </h2>
        <div className='flex mid:flex-col  mid:gap-4 items-center flex-wrap justify-around '>
            <SlideCard
                type={"Best Sales"}
                title={"The vision to revive dying colors and colorless homes"}
                image={image1}
                description={"by adding positivity and colors Our products are special that why we create a new style in the market."}
             />
                   <SlideCard
                type={"Best Searched"}
                title={"Embracing sleek and understated shapes"}
                image={image2}
                description={"Like crafting vessels, bowls, and other objects that integrate into modern living spaces while being a practical addition to everyday life.."}
             />
            <SlideCard
                type={"Best Offer"}
                title={"Celebrate the oldest and most widespread art of pottery"}
                image={image3}
                description={"These handcrafted pieces are a statement of lifestyle with its versatility in style and overwhelming hues. It’s like they portray a story of their own."}
             />
        </div>
        
        
    </div>
    </>);
};

export default TrendingSlider;
