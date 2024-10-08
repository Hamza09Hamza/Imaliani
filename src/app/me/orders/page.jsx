"use client";
import React, { useEffect, useState } from 'react';
import OrderCard from './Article';
import Navbar from '../navbar';
import { getDateRange } from "./Order";
import Head from '@/components/header';
import Empty from '@/components/Emptylist';
import { DB, auth } from '@/Firebase/Initialisation';
import { timestampToDate, getMostRecentStatus } from '@/app/Utils/time';
import axios from 'axios';
import { Statuses } from "./Order";
import { collection, getCountFromServer, query, where, getDocs, orderBy } from 'firebase/firestore';
import Footer from '@/components/footer';
import Loading from '@/components/loading';
import moment from 'moment';

const Orders = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5);
    const [selectedRating, setSelectedRating] = useState('All orders');
    const [selectedDateFilter, setSelectedDateFilter] = useState('All times');
    const [currentOrders, setCurrentOrders] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [displayedOrders, setDisplayedOrders] = useState([]);
    const [loading,setLoading]=useState(true)

    useEffect(() => {
        const handleAuthStateChange = () => {
            const unsubscribe = auth.onAuthStateChanged(async (user) => {
                if (user) {
                    try {
                        const customRef = collection(DB, "Orders");
                        const { data } = await axios.post("/api/encrypt", { id: user.uid, data: user.uid });
                        const cryptedUserID = data.data;

                        let orderQuery = query(
                            customRef,
                            where("UserID", "==", user.uid),
                        );
                        
                        const countSnapshot = await getCountFromServer(orderQuery);
                        const totalOrders = countSnapshot.data().count;
                        setTotalPages(Math.ceil(totalOrders / ordersPerPage));
                        
                        const res = await getDocs(orderQuery);
                        if (!res.empty) {
                            const customs = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                            let OrdersList = customs.map((order) => {
                                return {
                                    ...order,
                                    orderId: order.id,
                                    date: timestampToDate(order.Status.Pre_order),
                                    status: getMostRecentStatus(order.Status),
                                    description: order.description
                                };
                            });
                            setDisplayedOrders(OrdersList);
                        } else {
                            setDisplayedOrders([]);
                            setCurrentOrders([]);
                        }
                    } catch (error) {
                        console.error("Error fetching user orders:", error);
                    }
                } else {
                    setDisplayedOrders([]);
                    setCurrentOrders([]);
                }
                setLoading(false)
            });

            return () => unsubscribe();
        };

        handleAuthStateChange();
    }, []);

    useEffect(() => {
        const startDate = getDateRange(selectedDateFilter);
        const filteredOrders = displayedOrders.filter(order =>{
            console.log( );

            return (selectedRating == 'All orders' || order.status.toString().toLowerCase() === selectedRating.toLowerCase()) &&
            moment(order.date, "DD.MM.YYYY, HH:mm").toDate() >= startDate}
        );

        const indexOfLastOrder = currentPage * ordersPerPage;
        const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
        setCurrentOrders(filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder));
    }, [displayedOrders, selectedRating, selectedDateFilter, currentPage, ordersPerPage]);

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true);
    };

    const handleDateFilterChange = (event) => {
        setSelectedDateFilter(event.target.value);
        setCurrentPage(1);
    };

    const handleRatingChange = (event) => {
        setSelectedRating(event.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber) => {
        pageNumber <= totalPages && pageNumber >= 1 && setCurrentPage(pageNumber);
    };

    if(loading)
        return<>
            <Head status={false} categorie={null} setCategorie={null} />
            <Loading/>
        </>

    return (
        <>
            <Head status={false} categorie={null} setCategorie={null} />
            {displayedOrders.length > 0 ? (
                <section className="bg-white py-8 antialiased md:py-16">
                    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                        <div className="mx-auto max-w-5xl">
                            <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                                <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">My orders</h2>
                                <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                                    <div>
                                        <label htmlFor="order-type" className="sr-only mb-2 block text-sm font-medium text-gray-900">Select order type</label>
                                        <select value={selectedRating}
                                            onChange={handleRatingChange} id="order-type" className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-hardBeige outline-hardBeige focus:ring-hardBeige">
                                            <option defaultValue={""}>All orders</option>
                                            <option value="Pre_order">Pre-order</option>
                                            <option value="Processing">Processing</option>
                                            <option value="In_transit">In transit</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                    <span className="inline-block text-gray-500">from</span>
                                    <div>
                                        <label htmlFor="duration" className="sr-only mb-2 block text-sm font-medium text-gray-900">Select duration</label>
                                        <select 
                                            value={selectedDateFilter} 
                                            onChange={handleDateFilterChange} id="duration" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-hardBeige outline-hardBeige focus:ring-hardBeige">
                                            <option defaultValue={""}>All times</option>
                                            <option value={"this week"}>this week</option>
                                            <option value="this month">this month</option>
                                            <option value="last 3 months">the last 3 months</option>
                                            <option value="last 6 months">the last 6 months</option>
                                            <option value="this year">this year</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flow-root sm:mt-8">
                                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {currentOrders.map((order, index) => (
                                        <OrderCard
                                            url={"/me/orders/" + order.orderId}
                                            key={index}
                                            id={order.orderId}
                                            date={order.date}
                                            price={order.totalAmount}
                                            status={order.status}
                                            statusIcon={Statuses.find((ord) => ord.status === order.status).statusIcon}
                                            statusClass={Statuses.find((ord) => ord.status === order.status).statusClass}
                                            handleDeleteClick={handleDeleteClick}
                                        />
                                    ))}
                                </div>
                            </div>

                            <Navbar totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
                        </div>
                    </div>
                </section>
            ) : (
                <Empty type={"shopping"} text={"You have no orders yet."} />
            )}
            <Footer />
        </>
    );
};

export default Orders;
