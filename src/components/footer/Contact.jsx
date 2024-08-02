


import React from 'react'
const CatImage = ({selected}) => {
        return ( <>
        <svg className=' xxs:w-5  xxs:h-5' width="40" height="40" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className='transition-all duration-300' d="M73.0527 2H28.0527C17.5883 2 9.10529 10.0589 9.10529 20V74C9.10529 83.9411 17.5883 92 28.0527 92H73.0527C83.517 92 92 83.9411 92 74V20C92 10.0589 83.517 2 73.0527 2Z" stroke={selected?"white":"black"} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <path className='transition-all duration-300' d="M40.321 54.83C37.3416 56.729 29.5353 60.599 34.2911 65.441C36.6121 67.808 39.2032 69.5 42.4526 69.5H61.021C64.2705 69.5 66.8616 67.808 69.1826 65.441C73.9384 60.599 66.1321 56.729 63.1526 54.8345C59.7848 52.6619 55.8077 51.5004 51.7368 51.5004C47.6659 51.5004 43.6889 52.6619 40.321 54.8345M13.8421 20H2M13.8421 47H2M13.8421 74H2M61.2105 33.5C61.2105 35.8869 60.2124 38.1761 58.4357 39.864C56.6591 41.5518 54.2494 42.5 51.7368 42.5C49.2243 42.5 46.8146 41.5518 45.0379 39.864C43.2613 38.1761 42.2632 35.8869 42.2632 33.5C42.2632 31.1131 43.2613 28.8239 45.0379 27.136C46.8146 25.4482 49.2243 24.5 51.7368 24.5C54.2494 24.5 56.6591 25.4482 58.4357 27.136C60.2124 28.8239 61.2105 31.1131 61.2105 33.5Z" stroke={selected?"white":"black"} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        </>);
}
 
export default CatImage;