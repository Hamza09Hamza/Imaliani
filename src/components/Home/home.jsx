import React from 'react';
import Head from '../header';
import HeroSec from "./HeroSec"



const Home= ({customer}) => {
    return (
        <>
            <div className='w-[100vw]  bg-softBeige h-fit pb-40w' >
                <Head customer={customer}   status={false} categorie={null} setCategorie={null} />
                <HeroSec/>
            </div>
        </>
    );
};

export default Home;
