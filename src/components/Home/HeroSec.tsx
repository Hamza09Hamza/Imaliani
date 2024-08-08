"use client";
import React from 'react'
import TissueBoxEmpty from "@/images/Products/AshtrayHat.jpg"
import TissueBox from "@/images/2024-08-08 04.13.54.jpg"
import framedec from "@/images/2024-08-08 04.13.32.jpg"
import Candles from "@/images/Products/Candels.jpg"
import catCandle from "@/images/Products/catCandle.jpg"
import Heart from "@/images/2024-08-08 04.13.58.jpg"
import HeroCard from "./HeroCard"
import Image from 'next/image';
import TrendingSlider from "./Carousel"
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
				<p className='lg:max-w-[60%] mid:text-sm mid:max-w-[80%] text-center text-xl mid:text-tooHardBeige text-hardBeige mb-10'>
				<span className='font-bold text-md text-brown'>Imaliani</span> has the vision to revive dying
				colors and colorless homes by creating a
				life, adding positivity and colors with our
				handmade products.
				Our products are special that why we
				creat a new style in the market</p>
			<div className=' mt-10 flex flex-col justify-around items-center w-[90%]'>
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