import Image from 'next/image';
import React from 'react'
import Logo from "@/images/imalian.png"
const Contactus = () => {
    return (  <>
    <footer className="p-4 bg-softBeige   pb-24 ">
  <div className="mx-auto max-w-screen-xl text-center">
      <a href="#" className="flex justify-center xxs:flex-col items-center text-2xl font-semibold text-brown ">
          <Image src={Logo} width={200} height={200} />
          Imaliani craft studio    
      </a>
      <p className="my-6 text-gray-500 ">The Best Home for crafting components  built for a better home.</p>
      <ul     className="flex flex-wrap justify-center items-center mb-6 text-gray-900 ">
          <li data-aos="fade-left"
                data-aos-duration="1500"
                data-aos-delay="100"
                data-aos-easing="ease-in-sine">
              <a href="#" className="mr-4 hover:underline md:mr-6 ">Instagram</a>
          </li>
          <li data-aos="fade-left"
                data-aos-duration="1500"
                data-aos-delay="200"

                data-aos-easing="ease-in-sine">
              <a href="https://www.tiktok.com/@imaliani_craft_studio" className="mr-4 hover:underline md:mr-6">Tiktok</a>
          </li>
          <li data-aos="fade-left"
                data-aos-duration="1500"
                data-aos-delay="300"

                data-aos-easing="ease-in-sine">
              <a href="tel:+971 52 130 33 66" className="mr-4 hover:underline md:mr-6 ">+971 52 130 33 66</a>
          </li >
          <li data-aos="fade-left"
                data-aos-duration="1500"
                data-aos-delay="400"

                data-aos-easing="ease-in-sine">
              <a href="mailto:imalianicraftstudio@gmail.com" className="mr-4 hover:underline md:mr-6">imalianicraftstudio@gmail.com</a>
          </li>
          <li data-aos="fade-left"
                data-aos-duration="1500"
                data-aos-delay="500"
                data-aos-easing="ease-in-sine">
              <a href="" className="mr-4 hover:underline md:mr-6">Dubai</a>
          </li>
          <li data-aos="fade-left"
                data-aos-duration="1500"
                data-aos-delay="600"
                data-aos-easing="ease-in-sine">
              <a href="/contact" className="mr-4 hover:underline md:mr-6">Contact us</a>
          </li>
      </ul>
      <span className="text-sm text-gray-500 sm:text-center ">© 2023-2024 <a href="#" className="hover:underline">Imaliani Craft Studio™</a>. All Rights Reserved.</span>
  </div>
</footer>
    
    </> );
}
 
export default Contactus;
