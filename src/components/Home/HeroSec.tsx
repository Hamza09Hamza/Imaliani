"use client";
import React from 'react'
import TissueBox from "@/images/2024-08-08 04.13.54.jpg"
import framedec from "@/images/2024-08-08 04.13.32.jpg"
import Heart from "@/images/2024-08-08 04.13.58.jpg"
import Homeb from "@/images/homeb.jpg"
import Homec from "@/images/homec.jpg"

import Pottery1 from "@/images/pottery/pexels-fariphotography-905844.jpg"
import Pottery2 from "@/images/pottery/pexels-korhan-erdol-1123380-2344613.jpg"
import Pottery3 from "@/images/pottery/pexels-retosatti-22823.jpg"
import Pottery4 from "@/images/pottery/pexels-roman-odintsov-8063870.jpg"
import Pottery5 from "@/images/pottery/pexels-sankyrao90-716107.jpg"
import Pottery6 from "@/images/pottery/pexels-yankrukov-6611431.jpg"
import Pottery7 from "@/images/pottery/pexels-roman-odintsov-8063857.jpg"





import Image from 'next/image';
import TrendingSlider from "./Carousel"
import Home4 from "@/images/home4.jpg"
import DeviceMockup from "./devicemockup"
const HeroSec = () => {
	const images=[TissueBox,framedec,Heart]
	const images2=[Pottery1,Pottery2,Pottery3]
	const images3=[TissueBox,framedec,Heart]

        return (<>
        <div className='flex flex-col items-center '>

			<h1  className={'text-center  lg:text-header  mid:text-3xl    uppercase opacity-35 text-gray-400 font-Abril  my-20'}>
					Welcome to Imaliani craft studio
			</h1>
			<p className='lg:max-w-[60%] mid:w-[90%]   text-center lg:text-xl text-hardBeige mid:text-tooHardBeige'>
			Welcome to Imaliano Craft Studio! Discover unique candles, ashtrays, and home decorations crafted to add elegance to your space. Explore our collection and find the perfect piece for your home.
			</p>
				<TrendingSlider images={images}/>
				
			<div className='  flex  lg:justify-around mid:justify-between  xxs:justify-center xxs:flex-col items-center w-[90%] mt-40 mb-60'>
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
				<div className='lg:w-[60%] mid:max-w-[50%] xxs:max-w-[70%]  mr-2  items-center flex xxs:flex-col'>
					<div className='flex items-center mid  xxs:w-full justify-center relative '>
						<Image className=' lg:ml-16 lg:h-[30rem] xxs:w-[100%]  mid:w-[10rem] mid:h-[20rem] xxs:h-[20rem]  xl:max-w-[20rem] lg:max-w-[17rem] object-cover mr-2 z-[2]  bg-hardBeige rounded-[1rem] ' src={Homec} alt="" />
						<div className="absolute lg:w-[60%] xxs:w-[100%] xxs:right-4 lg:right-24 mid:right-10 top-2 bottom-0 h-[105%] z-[1]   bg-hardBeige rounded-[1rem] blur-xl "></div>
					</div>
					<div className='flex items-center xxs:w-[90%] justify-center xxs:mt-14  relative '>
						<Image className=' lg:ml-16 lg:h-[30rem] xxs:w-[100%] mid:w-[10rem] mid:h-[20rem] xxs:h-[20rem] xl:max-w-[20rem] lg:max-w-[17rem] object-cover mr-2 z-[2]  bg-hardBeige rounded-[1rem] ' src={Homeb} alt="" />
						<div className="absolute lg:w-[60%] xxs:w-[100%] xxs:right-4 lg:right-24 mid:right-10 top-2 bottom-0 h-[105%] z-[1]   bg-hardBeige rounded-[1rem] blur-xl "></div>
					</div>
				</div>
			</div>
			<div className='  flex  lg:justify-around mid:justify-between  xxs:justify-center xxs:flex-col items-center w-[90%] lg:mt-40 lg:mb-60 xxs:mt-20 xxs:mb-30 '>
				<div 
				className='lg:max-w-[40%] mid:max-w-[40%]  xxs:max-w-[90%] lg:text-left xxs:text-center'>
					<h3 className='text-semiHeader text-brown  font-extralight font-Abril'>
						About us
					</h3>
					<p className=' lg:text-left max-w-[90%] xxs:text-center lg:text-xl xxs:text-sm mid:text-tooHardBeige text-hardBeige mb-10'>
					Imaliani is a handmade lifestyle ceramic functional
					studio, based in Dubai, that celebrates the oldest and
					most widespread art of pottery. Our handmade
					ceramic products are inspired by traditional art and
					colors. One can see a pallet of soulful colors in our
					handmade product range and fall in love with them at
					first sight. These handcrafted pieces are a statement
					of lifestyle with its versatility in style and
					overwhelming hues. It’
					s like they portray a story of
					their own.
					</p>
				</div>
				<div className='xl:w-[60%] mid:max-w-[50%] xxs:max-w-[70%] lg:flex-1 lg:max-w-[100%]  mr-2  items-center justify-center flex xxs:flex-col'>
						<Image className=' lg:ml-16 lg:h-[30rem] xxs:w-[100%] lg:max-w-[20rem] mid:h-[20rem] xxs:h-[20rem]  xl:max-w-[30rem] lg: object-cover mr-2 z-[2]  bg-hardBeige rounded-[1rem] ' src={Home4} alt="" />
				</div>
			</div>
			<div className='  flex  lg:justify-around mid:justify-between  xxs:justify-center xxs:flex-col items-center w-[90%] lg:mt-40 lg:mb-60 xxs:mt-20 xxs:mb-30'>
				<div 
				className='lg:max-w-[40%] mid:max-w-[40%]  xxs:max-w-[90%] lg:text-left xxs:text-center'>
					<h3 className='text-semiHeader text-brown  font-extralight font-Abril'>
						Our Products
					</h3>
					<p className=' lg:text-left max-w-[90%] xxs:text-center lg:text-xl xxs:text-sm mid:text-tooHardBeige text-hardBeige mb-10'>
					Our collection of ceramic pottery on our website
					starts with daily use products and home decoration
					and unique pieces only by our creation.
					All our ceramics pieces are 100% Natural ingredients
					Ready-to-use and odorless denser and harder bodies,
					that is why we use the best of clay for making
					handmade pottery, The final product is a strong and
					durable piece of pottery made to be enjoyed, and last
					maybe for a lifetime!
					</p>
				</div>
				<div className='xl:w-[60%] mid:max-w-[50%] xxs:max-w-[70%] lg:flex-1 lg:max-w-[100%]  mr-2  items-center justify-center flex xxs:flex-col'>
						<Image className=' lg:ml-16 lg:h-[30rem] xxs:w-[100%] lg:max-w-[20rem] mid:h-[20rem] xxs:h-[20rem]  xl:max-w-[30rem] lg: object-cover mr-2 z-[2]  bg-hardBeige rounded-[1rem] ' src={TissueBox} alt="" />
				</div>
			</div>
			<div className='  flex flex-row-reverse   lg:justify-around mid:justify-between  xxs:justify-center xxs:flex-col items-center w-[90%] lg:mt-40 lg:mb-60 xxs:mt-20 xxs:mb-30'>
				<div 
				className='lg:max-w-[40%]  mid:max-w-[40%]  xxs:max-w-[90%] lg:text-left xxs:text-center'>
					<h3 className='text-semiHeader text-brown  font-extralight font-Abril'>
					Why is pottery
					important for our products
					today?
					</h3>
					<p className=' lg:text-left max-w-[90%] xxs:text-center lg:text-xl xxs:text-sm mid:text-tooHardBeige text-hardBeige mb-10'>
					Our collection of ceramic pottery on our website
					starts with daily use products and home decoration
					and unique pieces only by our creation.
					All our ceramics pieces are 100% Natural ingredients
					Ready-to-use and odorless denser and harder bodies,
					that is why we use the best of clay for making
					handmade pottery, The final product is a strong and
					durable piece of pottery made to be enjoyed, and last
					maybe for a lifetime!
					</p>
				</div>
				<div className='xl:w-[60%] mid:max-w-[50%] xxs:max-w-[70%] lg:flex-1 lg:max-w-[100%]  mr-2  items-center justify-center flex xxs:flex-col'>
						<div className='mr-4'>
							<Image className='  lg:h-[20rem] xxs:w-[100%] lg:max-w-[20rem] mid:h-[20rem] xxs:h-[20rem]  xl:max-w-[20rem] lg: object-cover mr-2 z-[2] mb-4  bg-hardBeige  '  src={Pottery1} alt="" />
							<Image className='  lg:h-[20rem] xxs:w-[100%] lg:max-w-[20rem] mid:h-[20rem] xxs:h-[20rem]  xl:max-w-[20rem] lg: object-cover mr-2 z-[2]  bg-hardBeige  ' src={Pottery2} alt="" />
						</div>
						<div className='xxs:mr-4 xxs:mt-4 '>
						<Image className='  lg:h-[20rem] xxs:w-[100%] lg:max-w-[20rem] mid:h-[20rem] xxs:h-[20rem]  xl:max-w-[20rem] lg: object-cover mr-2 z-[2]  bg-hardBeige  ' src={Pottery3} alt="" />
						</div>
				</div>
			</div>
			<div className='  flex  lg:justify-around mid:justify-between  xxs:justify-center mid:flex-col items-center w-[90%] lg:mt-40 lg:mb-60 xxs:mt-20 xxs:mb-30'>
				<div 
				className='lg:max-w-[40%] mid:max-w-[90%] mid:mb-10   xxs:max-w-[90%] lg:text-left xxs:text-center'>
					<h3 className='text-semiHeader mb-4 text-brown mid:text-center font-extralight font-Abril'>
					What is the trend in
					using pottery for our
					products today?
					</h3>
					<div className=' flex items-center xxs:flex-col-reverse'>
						<DeviceMockup 
								imageLight={Homec}
								imageDark={Homeb}
							/>
						<p className=' lg:text-left max-w-[90%] mid:max-w-[90%] mid:mr-10 ml-4 xxs:mr-0 xxs:text-center lg:text-xl xxs:text-sm mid:text-tooHardBeige text-hardBeige mb-10'>
						Potters are embracing
						sleek and understated
						shapes, crafting
						vessels, bowls, and
						other objects that
						integrate into modern
						living spaces while
						being a practical
						addition to everyday
						life.
						</p>
					</div>
				</div>
				<div className='xl:w-[60%] mid:max-w-[50%] xxs:max-w-[70%] lg:flex-1 lg:max-w-[100%]  mr-2  items-center justify-center flex xxs:flex-col'>
						<Image className=' lg:ml-16 lg:h-[30rem] xxs:w-[100%] lg:max-w-[20rem] mid:h-[20rem] xxs:h-[20rem]  xl:max-w-[30rem] lg: object-cover mr-2 z-[2]  bg-hardBeige rounded-[1rem] ' src={Pottery4} alt="" />
				</div>
			</div>
			<div className='  flex  lg:justify-around flex-col mid:justify-between  xxs:justify-center xxs:flex-col items-center w-[90%] lg:mt-40 lg:mb-60 xxs:mt-20 xxs:mb-30'>
				<div className='lg:max-w-[90%]  mid:max-w-[40%] xxs:flex-col  xxs:max-w-[90%] flex flex-row-reverse items-center  lg:text-left xxs:text-center'>
					<h3 className='text-semiHeader mb-24 text-brown lg:w-[40%] font-extralight font-Abril'>
						What makes
						our products
						special?
					</h3>
					<p className=' lg:text-left max-w-[50%] xxs:text-center lg:text-xl xxs:text-sm mid:text-tooHardBeige text-hardBeige mb-10'>
					Everything starts with the materials, Ceramic is manufactured
					with natural materials; it comes from the earth. And due to its
					natural origin, it is totally recyclable. Ceramics are not burnt
					or melted and, therefore, they do not emit toxic gases to the
					environment or your health
					</p>
				</div>
				<div className='xl:w-[60%] mid:max-w-[50%] xxs:max-w-[70%] gap-4 pb-20 lg:flex-1 lg:max-w-[100%]  mr-2  items-center justify-center flex xxs:flex-col'>
						<Image className='  lg:ml-16 lg:h-[30rem] xxs:w-[100%] lg:max-w-[10rem] mid:h-[15rem] xxs:h-[15rem]  xl:max-w-[18rem]  object-cover mr-2 z-[2]  bg-hardBeige rounded-[1rem] ' src={Pottery5} alt="" />
						<Image className=' lg:ml-16 lg:h-[30rem] xxs:w-[100%] lg:max-w-[10rem] mid:h-[15rem] xxs:h-[15rem]  xl:max-w-[18rem]  object-cover mr-2 z-[2]  bg-hardBeige rounded-[1rem] ' src={Pottery6} alt="" />
						<Image className=' lg:ml-16 lg:h-[30rem] xxs:w-[100%] lg:max-w-[10rem] mid:h-[15rem] xxs:h-[15rem]  xl:max-w-[18rem]  object-cover mr-2 z-[2]  bg-hardBeige rounded-[1rem] ' src={Pottery7} alt="" />
				</div>
			</div>
        </div>
        </> );
}
 
export default HeroSec;
