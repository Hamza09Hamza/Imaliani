"use client";
import React from 'react'
import TissueBoxEmpty from "@/images/Products/AshtrayHat.jpg"
import TissueBox from "@/images/2024-08-08 04.13.54.jpg"
import framedec from "@/images/2024-08-08 04.13.32.jpg"
import Candles from "@/images/Products/Candels.jpg"
import catCandle from "@/images/Products/catCandle.jpg"
import Heart from "@/images/2024-08-08 04.13.58.jpg"
import Home from "@/images/home.jpg"
import Homeb from "@/images/homeb.jpg"
import Homec from "@/images/homec.jpg"
import HeroCard from "./HeroCard"
import Image from 'next/image';
import TrendingSlider from "./Carousel"
import { useEffect } from "react";


const HeroSec = () => {
	const images=[TissueBox,framedec,Heart]




        return (<>
        <div className='flex flex-col items-center '>

			<h1  className={'text-center  lg:text-header  mid:text-3xl    uppercase opacity-35 text-gray-400 font-Abril  my-20'}>
					Welcome to Imaliani craft studio
			</h1>
			<p className='lg:max-w-[60%] mid:w-[90%]   text-center lg:text-xl text-hardBeige mid:text-tooHardBeige'>
			Welcome to Imaliano Craft Studio! Discover unique candles, ashtrays, and home decorations crafted to add elegance to your space. Explore our collection and find the perfect piece for your home.
			</p>
				<TrendingSlider images={images}/>
				
			<div className='  flex  lg:justify-around mid:justify-between  xxs:justify-center xxs:flex-col items-center w-[90%] my-40'>
				<div 
				className='lg:max-w-[25%] mid:max-w-[40%]  xxs:max-w-[90%] lg:text-left xxs:text-center'>
					<h3 className='text-semiHeader text-brown  font-extralight font-Abril'>
						Our Vision
					</h3>
					<p className=' lg:text-left max-w-[90%] xxs:text-center lg:text-xl xxs:text-sm mid:text-tooHardBeige text-hardBeige mb-10'>
						we have the vision to revive dying
						colors and colorless homes by creating a
						life, adding positivity and colors with our
						handmade products.
						Our products are special that why we
						creat a new style in the market
					</p>
				</div>
				<div 
				
				className='lg:w-[60%] mid:max-w-[50%] xxs:max-w-[70%]  mr-2  items-center flex xxs:flex-col'>
					<div className='flex items-center mid  xxs:w-full justify-center relative '>
						<Image className=' lg:ml-16 lg:h-[30rem] xxs:w-[100%] mid:w-[10rem] mid:h-[20rem] xxs:h-[20rem]  lg:max-w-[20rem] object-cover mr-2 z-[2]  bg-hardBeige rounded-[1rem] ' src={Homec} alt="" />
						<div className="absolute lg:w-[60%] xxs:w-[100%] xxs:right-4 lg:right-24 mid:right-10 top-2 bottom-0 h-[105%] z-[1]   bg-hardBeige rounded-[1rem] blur-xl "></div>
					</div>
					<div className='flex items-center xxs:w-[90%] justify-center xxs:mt-14  relative '>
						<Image className=' lg:ml-16 lg:h-[30rem] xxs:w-[100%] mid:w-[10rem] mid:h-[20rem] xxs:h-[20rem] lg:max-w-[20rem] object-cover mr-2 z-[2]  bg-hardBeige rounded-[1rem] ' src={Homeb} alt="" />
						<div className="absolute lg:w-[60%] xxs:w-[100%] xxs:right-4 lg:right-24 mid:right-10 top-2 bottom-0 h-[105%] z-[1]   bg-hardBeige rounded-[1rem] blur-xl "></div>
					</div>
				</div>
			</div>
			<div className=' lg:mt-40 flex flex-col justify-around items-center w-[90%]'>
					<HeroCard 
					
					title={"Elegance in every moment  "}
					description={"Enhance your living space with our beautifully designed tissue box. Crafted to blend seamlessly with any décor, it adds a touch of sophistication to your home"}
					imageSrc={Candles}
					/>
					<HeroCard 
					title={"Warmth in Every Glow "}
					description={"Illuminate your surroundings with our beautifully crafted piece. Designed to create a cozy ambiance, it brings warmth and a gentle glow to any room"}
					imageSrc={catCandle}
					/>
					<HeroCard 
					title={"Crafted with Care  "}
					description={"Add a unique touch to your décor with our handcrafted items. Its rustic charm and artistic design make it the perfect centerpiece for any table to your home"}
					imageSrc={TissueBoxEmpty}
					/>
			</div>

        </div>
        </> );
}
 
export default HeroSec;