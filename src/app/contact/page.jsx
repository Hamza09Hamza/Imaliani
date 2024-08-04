import React from 'react'
import Head from '@/components/header';
import Footer from '@/components/footer';

const Contact = ({setListCat,setCurrentPage}) => {
        return ( <>
        <div className='bg-softBeige lg:h-[100vh] xxs:h-[130vh]' >

        <Head setCurrentPage={setCurrentPage} setListCat={setListCat} status={false} categorie={null} setCategorie={null} />
        <section className="bg-softBeige ">
            <section className=" bg-softBeige py-4 lg:pb-32 lg:pt-8  px-4 mx-auto mb-0 max-w-screen-md  xxs:max-w-[90%] ">
                <h2 className="mb-2 text-4xl tracking-tight font-extrabold text-center text-brown ">Contact Us</h2>
                <p className="mb-4 lg:mb-8 font-light text-center text-tooHardBeige  sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
                <form  action="#" className="space-y-8 !z-[100]">
                        <div>
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                            <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-hardBeige focus:border-hardBeige block w-full p-2.5  outline-hardBeige  " placeholder="name@gmail.com" required/>
                        </div>
                        <div>
                            <label for="subject" className="block mb-2 text-sm font-medium text-gray-900 ">Subject</label>
                            <input type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-hardBeige focus:border-hardBeige  outline-hardBeige " placeholder="Let us know how we can help you" required/>
                        </div>
                        <div className="sm:col-span-2">
                            <label for="message" className="block mb-2 text-sm font-medium text-gray-900 ">Your message</label>
                            <textarea id="message" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-hardBeige focus:border-hardBeige outline-hardBeige  " placeholder="Leave a comment..."></textarea>
                        </div>
                        <button type="submit" className="!z-50  py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-hardBeige sm:w-fit hover:bg-tooHardBeige focus:ring-4 focus:outline-none focus:ring-softBeige  ">Send message</button>
                </form>
            </section>
        </section>
        <Footer/>
        </div>

        </> );
}
 
export default Contact;