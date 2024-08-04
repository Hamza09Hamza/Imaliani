import Categorie from '@/components/Categorie/categorie';
import Footer from '@/components/footer';
import React from 'react'
import Customized from './Forum';
import Head from '@/components/header';

const CustomGiftPage = () => {
    return ( <>
        <Head status={false} />
        <Customized    /> 
        <Footer />
    </> );
}
 
export default CustomGiftPage;