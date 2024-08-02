import React from 'react'
import Image from 'next/image';

const HeroCard = ({ title , description , imageSrc }) => {
        return ( <>
        <div className='flex mb-20 justify-center xxs:flex-col-reverse xxs:gap-4  items-center    '>
            <div className='flex items-center xxs:max-w-[90%] justify-center relative lg:max-w-[40%]'>
                <Image className='max-w-[60%] lg:ml-16 max-h-[26rem] object-cover mr-2 z-[2]  bg-hardBeige rounded-[1rem] ' src={imageSrc} alt="" />
                <div className="absolute w-[60%] lg:right-24 xxs:right-10 top-2 bottom-0 h-[105%] z-[1]   bg-hardBeige rounded-[1rem] blur-xl "></div>
            </div>
            <div className='  flex flex-col h-[100%] justify-around items-center   '>
                <div></div>
                <h3 className='text-brown lg:text-3xl xxs:text-lg font-black text-semiHeader text-wrap lg:pb-16 xxs:pb-4 '>
                {title}
                </h3>
                <p className='text-hardBeige xxs:text-xs xxs:text-center xxs:text-tooHardBeige xxs:mb-4 lg:text-lg text-wrap max-w-[70%]'>
                    {description}                
                </p>
                <div></div>

            </div>
        </div>
        </> );
}
 
export default HeroCard;