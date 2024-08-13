"use client";
import React, { useEffect, useState } from 'react';
import { fetchrandomProducts, fetchCatProducts } from '@/Firebase/CRUD/Products';
import { OriginCategorieList } from '../../../components/products';
import AdminFooter from '../footer';
import Navbar from '../../me/navbar';
import { getFirestore, collection, getCountFromServer } from 'firebase/firestore';
import isAuth from '@/app/adminAuth'

const Products = () => {
    const [Products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [listcat, setListCat] = useState();
    const [lastVisibleOrder, setLastVisibleOrder] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(7);
    const [currentOrders, setCurrentOrders] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);

    const firestore = getFirestore();
    const productsCollection = collection(firestore, 'products');

    useEffect(() => {
        const fetchTotalProducts = async () => {
            try {
                const snapshot = await getCountFromServer(productsCollection);
                setTotalProducts(snapshot.data().count);
                setTotalPages(Math.ceil(snapshot.data().count / ordersPerPage));
                console.log(Math.ceil(snapshot.data().count / ordersPerPage))
            } catch (error) {
                console.error("Error getting total products:", error);
            }
        };

        fetchTotalProducts();
    }, []);

    useEffect(() => {
        const fetchProducts = async (reset = false) => {
            try {
                let productsResponse, lastVisibleResponse;

                if (listcat && OriginCategorieList.includes(listcat)) {
                    ({ products: productsResponse, lastVisible: lastVisibleResponse } = await fetchCatProducts(listcat, reset ? null : lastVisibleOrder, ordersPerPage));
                } else {
                    ({ products: productsResponse, lastVisible: lastVisibleResponse } = await fetchrandomProducts(reset ? null : lastVisibleOrder,ordersPerPage));
                }

                setProducts(prevProducts => reset ? productsResponse : [...prevProducts, ...productsResponse]);
                setLastVisibleOrder(lastVisibleResponse);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts(true);
    }, [listcat]);

    useEffect(() => {
        const filteredOrders = Products.filter(order =>
            order.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const indexOfLastOrder = currentPage * ordersPerPage;
        const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
        setCurrentOrders(filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder));
    }, [Products, searchTerm, currentPage, ordersPerPage]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handlePageChange = async (num) => {
        if(num<=totalPages && num>=1){
            setCurrentPage(num);
        }
        if(Products.length<totalProducts){
            const { products, lastVisible } = await fetchrandomProducts(lastVisibleOrder);
            setProducts(prevProducts => [...prevProducts, ...products]);
            setLastVisibleOrder(lastVisible);
        }
    };

    return (
        <>
            <section className="bg-softBeige min-h-[100vh] xxs:pb-24 p-3 sm:p-5">
                <div className="mx-auto max-w-screen-xl lg:h-[100vh] px-4 lg:px-12">
                    <div className="bg-white relative w-full shadow-md sm:rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2">
                                <form className="flex items-center">
                                    <label htmlFor="simple-search" className="sr-only">Search</label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            id="simple-search"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
                                            placeholder="Search"
                                            value={searchTerm}
                                            onChange={handleSearch}
                                            required=""
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button onClick={() => window.location.assign("/admin/add-product")} type="button" className="flex items-center justify-center text-black bg-hardBeige hover:bg-tooHardBeige font-medium rounded-lg text-sm px-4 py-2">
                                    <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                    </svg>
                                    Add product
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Product name</th>
                                        <th scope="col" className="px-4 py-3">Category</th>
                                        <th scope="col" className="px-4 py-3">Description</th>
                                        <th scope="col" className="px-4 py-3">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentOrders.map((product, index) => (
                                        <tr key={index} className="border-b">
                                            <th scope="row" onClick={()=>window.location.assign("/admin/product/"+product.id)} className="px-4 py-3 cursor-pointer font-medium text-gray-900 hover:underline whitespace-nowrap">{product.title}</th>
                                            <td className="px-4 py-3">{product.category}</td>
                                            <td className="px-4 py-3">{product.description}</td>
                                            <td className="px-4 py-3">{product.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Navbar totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
                    </div>
                </div>
            </section>
            <AdminFooter />
        </>
    );
};

export default isAuth(Products);
