"use client";
import React, {  useEffect, useState } from 'react';
import Head from '../header';
import CharCard from "./ChartCard";
import Summary from "./PricingSum";
import { DB, auth } from '@/Firebase/Initialisation';
import Empty from "../Emptylist"
import axios from 'axios';
import { doc, getDoc } from 'firebase/firestore';
import { updateUserField } from '@/Firebase/CRUD/User';

const Chart = ({setCurrentPage,setListCat}) => {
   
    
    const [products, setProducts] = useState([]);
    const [chart,setChart]=useState([]);

    useEffect(() => {
        const handleAuthStateChange = () => {
            const unsubscribe = auth.onAuthStateChanged(async (user) => {
                if (user) {
                    try {
                        let test=await user.getIdToken()
                        if(test){
                            const res = await getDoc(doc(DB,"Users/"+user.uid))
                            if( res.exists()){
                                let Chart=res.data().Chart
                                if(Chart.length>0)
                                    {
                                        const { data } = await axios.post("/api/chart/getuser", {
                                            idToken: test,
                                            Chart:Chart
                                        });
                                        let Products = data.Products;
                                        Chart=data.DATAChart
                                        setChart(Chart);
                                        let result = Products.map((product) => {
                                            return {
                                                ...product,
                                                quantity: Chart.filter((prod) => prod.ProductID === product.id)[0].Quantity
                                            }
                                        });
                                    setProducts(result); // Update the products state with the result
                                    }
                                    else setProducts([])

                            }
                        }
                    } catch (error) {
                        console.error("Error fetching user orders:", error);
                    }
                } else {
                    setProducts([]); 
                }
            });

            return () => unsubscribe();
        }

        handleAuthStateChange();
    }, []);


    const changeQuantity = (value, id) => {
        if(value>0){

            setProducts(
                products.map((item) => 
                    item.id === id ? { ...item, quantity: value } : item
                )
            );
        }else{
            removeProduct(id)
        }

    };
    const removeProduct=(id)=>{
        setProducts(products => 
            products.filter(item => 
                item.id !== id
            )
        );
        rmCart(id)
    }
    const rmCart= async (id)=>{
        if(auth.currentUser) {
            const {data}=await axios.put("/api/chart/updateuser",{type:false,id:id,Chart:chart});
          await updateUserField("Chart",data.userchart,auth.currentUser.uid);

        }else
          window.location.assign("signin")
      }

    return ( 
        <>
        <div className='pb-20'>

            <Head setListCat={setListCat} status={false} />
            {products && products.length>0?
            <div className="font-sans max-w-5xl xxs:max-w-[90%] max-md:max-w-xl mx-auto bg-white py-4">
                <h1 className="text-3xl font-bold text-gray-800 text-center">Shopping Cart</h1>
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    <div className="md:col-span-2 space-y-4">
                        {products.map((item) => (
                            <React.Fragment key={item.id}>
                                <CharCard removeProduct={removeProduct} setProducts={changeQuantity} product={item} />
                                {products.indexOf(item) !== products.length - 1 && <hr className="border-gray-300" />}
                            </React.Fragment>
                        ))}
                    </div>
                    <Summary setCurrentPage={setCurrentPage}products={products.map(item => ({
                        id:item.id,
                        name: item.title,
                        description: item.description,
                        amount: item.price*100,
                        images: item.images,
                        quantity: item.quantity
                    }))} />
                </div>
            </div>:

            <Empty text=" Your Shopping Chart is empty. " type="shopping"/>
            }
        </div>

        </>
    );
}

export default Chart;
