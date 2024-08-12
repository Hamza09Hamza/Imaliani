"use client";
import React, { useEffect, useState } from 'react';
import OrderCard from './giftcard';
import Navbar from '../../me/navbar';
import DeleteModal from '../../me/Delete';
import { getDateRange } from "../../me/orders/Order";
import Empty from '@/components/Emptylist';
import { DB, auth } from '@/Firebase/Initialisation';
import { timestampToDate, getMostRecentStatus } from '@/app/Utils/time';
import Head from "../../../components/header";
import Footer from "../../../components/footer";
import { Statuses } from '../../me/orders/Order';
import AdminFooter from '../footer';
import { collection, getDocs } from 'firebase/firestore';
import isAuth from "../../adminAuth"
import Loading from '@/components/loading'
import moment from 'moment/moment';


const Gifts = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [giftsPerPage] = useState(5);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedRating, setSelectedRating] = useState('All orders');
    const [selectedDateFilter, setSelectedDateFilter] = useState('All times');
    const [currentOrders, setCurrentOrders] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [displayedOrders, setDisplayedOrders] = useState([]);
    const [loading,setLoading]=useState(true)

    useEffect(() => {
        const handleAuthStateChange = () => {
            const unsubscribe = auth.onAuthStateChanged(async (user) => {
                if (user) {
                    try {
                        const customRef = collection(DB, "CustomizedGifts");
                        const res = await getDocs(customRef);
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
                            console.log(OrdersList);
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
        const filteredOrders = displayedOrders.filter(order =>
            (selectedRating === 'All orders' || order.status.toString().toLowerCase() === selectedRating.toLowerCase()) &&
            moment(order.date, "DD.MM.YYYY, HH:mm").toDate()>= startDate
        );

        const indexOfLastOrder = currentPage * giftsPerPage;
        const indexOfFirstOrder = indexOfLastOrder - giftsPerPage;
        setCurrentOrders(filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder));
        setTotalPages(Math.ceil(filteredOrders.length / giftsPerPage));
    }, [displayedOrders, selectedRating, selectedDateFilter, currentPage, giftsPerPage]);

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true);
    };

    const handleDeleteClose = () => {
        setIsDeleteModalOpen(false);
    };

    const handleConfirmDelete = () => {
        setIsDeleteModalOpen(false);
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


if(loading){
      return<><Loading/></>
    }

    
    return (
        <>
            {displayedOrders.length > 0 ? (
                <section className="bg-softBeige flex w-full xxs:w-[100%] items-center p-16 antialiased  min-h-[100vh] md:py-16">
                    <div className="mx-auto flex-1 max-w-screen-xl px-4 p-16 2xl:px-0 bg-white rounded-3xl">
                        <div className="lg:mx-auto xxs:w-[100%] lg:max-w-5xl">
                            <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                                <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Customized Gifts Orders</h2>
                                <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                                    <div>
                                        <label htmlFor="order-type" className="sr-only mb-2 block text-sm font-medium text-gray-900">Select gift type</label>
                                        <select
                                            value={selectedRating}
                                            onChange={handleRatingChange}
                                            id="order-type"
                                            className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-hardBeige outline-hardBeige focus:ring-hardBeige"
                                        >
                                            <option defaultValue="">All orders</option>
                                            <option value="pre_order">Pre-order</option>
                                            <option value="processing">Processing</option>
                                            <option value="In_transit">In transit</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                    <span className="inline-block text-gray-500">from</span>
                                    <div>
                                        <label htmlFor="duration" className="sr-only mb-2 block text-sm font-medium text-gray-900">Select duration</label>
                                        <select
                                            value={selectedDateFilter}
                                            onChange={handleDateFilterChange}
                                            id="duration"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-hardBeige outline-hardBeige focus:ring-hardBeige"
                                        >
                                            <option defaultValue="">All times</option>
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
                                            url={"/admin/customized-gifts/" + order.orderId}
                                            key={index}
                                            id={order.orderId}
                                            date={timestampToDate(order.dateAdded)}
                                            status={order.status}
                                            description={order.description}
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
                <Empty type={"shopping"} text={"You have no gifts yet."} />
            )}
            <DeleteModal typeText={"order"} isOpen={isDeleteModalOpen} onClose={handleDeleteClose} onDelete={handleConfirmDelete} />
            <AdminFooter />
        </>
    );
};

export default  isAuth(Gifts);
