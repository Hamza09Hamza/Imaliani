

import React from 'react'
const Chart = ({selected}) => {
        return ( <>
        <svg  className="  mid:w-5  mid:h-5" width="40" height="40" viewBox="0 0 100 102" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_65_36)">
            <path className='transition-all duration-300' d="M22.8372 83.6279C22.8372 85.8483 23.7193 87.9778 25.2893 89.5479C26.8594 91.1179 28.9889 92 31.2093 92C33.4297 92 35.5592 91.1179 37.1293 89.5479C38.6993 87.9778 39.5814 85.8483 39.5814 83.6279M52.1395 83.6279C52.1395 85.8483 53.0216 87.9778 54.5917 89.5479C56.1617 91.1179 58.2912 92 60.5116 92C62.732 92 64.8615 91.1179 66.4316 89.5479C68.0017 87.9778 68.8837 85.8483 68.8837 83.6279M29.1163 27.1163H94V28.1628L92.9995 29.3474C82.8305 41.4242 77.2545 56.7051 77.2558 72.493V73.1628H22.8372V65.293C22.8372 56.5861 22.5609 47.8874 21.2214 39.2893C18.9023 24.4037 13.7828 2 4 2" stroke={selected?"white" :"black"} strokeWidth="4" shapeRendering="crispEdges"/>
            </g>
            <defs>
            <filter id="filter0_d_65_36" x="0" y="0" width="100" height="102" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_65_36"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_65_36" result="shape"/>
            </filter>
            </defs>
        </svg>
        </>);
}
 
export default Chart;