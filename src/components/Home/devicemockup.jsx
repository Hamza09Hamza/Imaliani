import React from 'react';
import Homeb from "@/images/Products/catCandle.jpg"
import Homec from "@/images/Products/AshtrayHat.jpg"
import Image from 'next/image';
const DeviceMockup = ({ imageLight, imageDark }) => {
  return (<>
        <div class="relative lg:mx-auto border-gray-800 lg:mr-14  bg-gray-800 border-[14px] rounded-[2.5rem] h-[24rem] w-[12rem]">
          
            <div class="h-[32px] w-[3px] bg-gray-800  absolute -start-[17px] top-[72px] rounded-s-lg"></div>
            <div class="h-[46px] w-[3px] bg-gray-800  absolute -start-[17px] top-[124px] rounded-s-lg"></div>
            <div class="h-[46px] w-[3px] bg-gray-800  absolute -start-[17px] top-[178px] rounded-s-lg"></div>
            <div class="h-[64px] w-[3px] bg-gray-800  absolute -end-[17px] top-[142px] rounded-e-lg"></div>
            <div class="rounded-[2rem] overflow-hidden w-[10rem] h-[22rem] bg-transparent ">
                <Image src={Homeb}    class=" h-[11rem] w-[22rem]" alt=""/>
                <Image src={Homec}   class=" w-[22rem]  h-[11rem]" alt=""/>
            </div>
        </div>

  </>
  );
};

export default DeviceMockup;
