"use client";
import React, { useEffect, useLayoutEffect, useState } from 'react';
import OrderCard from './Article';
import Navbar from '../navbar';
import DeleteModal from '../Delete';
import {getDateRange} from "./Order"
import Head from '@/components/header';
import Empty from '@/components/Emptylist';
import { auth } from '@/Firebase/Initialisation';
import { getUserOrders } from '@/Firebase/CRUD/Oders';
import { formatTimestamp, getMostRecentStatus } from '@/app/Utils/time';
import axios from 'axios';
const Orders = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedRating, setSelectedRating] = useState('All orders');
    const [selectedDateFilter, setSelectedDateFilter] = useState('All orders');
    const [lastVisibile, setLastVisibile] = useState(null);
    const [currentOrders,setCurrentOrders] =useState([])
    const [totalPages,setTotalPages] =useState()
    const [displayedOrders,setDisplayedOrders]=useState([])

    useEffect(() => {
        const handleAuthStateChange = () => {
            const unsubscribe = auth.onAuthStateChanged(async (user) => {
                if (user) {
                    try {
                        const OrdersData = await axios.get(null, 10, user.uid);
                        let OrdersList = OrdersData.orders.map((order) => {
                            return {
                                orderId: "#" + order.orderId,
                                date: formatTimestamp(order.Status.In_transit),
                                totalAmount: "AED " + order.totalAmount,
                                status: !order.cancelled ? getMostRecentStatus(order.Status) : "Cancelled"
                            };
                        });
                        setDisplayedOrders(OrdersList);
                        setLastVisibile(OrdersData.lastVisible);
                        console.log(OrdersData)

                    } catch (error) {
                        console.error("Error fetching user orders:", error);
                    }
                } else {
                    // Handle the case when user is not signed in
                    setDisplayedOrders([]);
                    setCurrentOrders([]);
                }
            });

            return () => unsubscribe();
        };

        handleAuthStateChange();
    }, []); 
    useEffect(()=>{
        
        const filteredOrders = displayedOrders.filter(order => 
            (selectedRating === 'All orders' || order.status.toString().toLowerCase() === selectedRating.toLowerCase()) &&
            new Date(order.date.split('.').reverse().join('-')) >= startDate
        );
    
        const indexOfLastOrder = currentPage * ordersPerPage;
    
        const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
        setCurrentOrders(filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder));
        setTotalPages(Math.ceil(displayedOrders.length / ordersPerPage))
        
    },[displayedOrders, selectedRating, selectedDateFilter, currentPage, ordersPerPage])




    const Statuses=[
        {
            status: 'Pre-order',
            statusIcon: (
                <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z" />
                </svg>
            ),
            statusClass: 'bg-blue-100 text-blue-800 text-xs',
        },
        {
            status: 'Cancelled',
            statusIcon: (
                <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                </svg>
            ),
            statusClass: 'bg-red-100 text-red-800 text-xs',
        },
        {
            status: 'In_transit',
            statusIcon: (
                <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.5 10.5v6h-15v-6h15Zm0 0L17.308 7M12 10.5V6m0 0-2.192 4.5M12 6l2.192 4.5" />
                </svg>
            ),
            statusClass: 'bg-yellow-100 text-yellow-800 text-xs',
        },
        {
            status: 'Processing',
            statusIcon: (
                <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v20m10-10H2" />
                </svg>
            ),
            statusClass: 'bg-purple-100 text-purple-800 text-xs',
        },
        {
            status: 'Shipped',
            statusIcon: (
                <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12l5 5L19 7" />
                </svg>
            ),
            statusClass: 'bg-cyan-100 text-cyan-800 text-xs',
        }

    ]

    const handleDeleteClick = () => {
            setIsDeleteModalOpen(true);
        };
    const handleDeleteClose = () => {
            setIsDeleteModalOpen(false);
        };
    const handleConfirmDelete = () => {
            
            setIsDeleteModalOpen(false);
        };

  
    const startDate = getDateRange(selectedDateFilter);

    const handleDateFilterChange = (event) => {
        setSelectedDateFilter(event.target.value);
        setCurrentPage(1); 
    };
    
    const handleRatingChange = (event) => {
        
        setSelectedRating(event.target.value);
        setCurrentPage(1); 
    };


   
    const handlePageChange = (pageNumber) => {
        pageNumber<=totalPages&& pageNumber>=1 &&  setCurrentPage(pageNumber);
    };
    

  return (<>
  <Head status={false} categorie={null } setCategorie={null} />
   {displayedOrders.length>0 ? <section className="bg-white py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">My orders</h2>
            <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
              <div>
                <label htmlFor="order-type" className="sr-only mb-2 block text-sm font-medium text-gray-900">Select order type</label>
                <select value={selectedRating}
                    onChange={handleRatingChange} id="order-type" className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-hardBeige outline-hardBeige focus:ring-hardBeige">
                  <option selected>All orders</option>
                  <option value="pre-order">Pre-order</option>
                  <option value="processing">Processing</option>
                  <option value="transit">In transit</option>
                  <option value="shipped">Shipped</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <span className="inline-block text-gray-500">from</span>
              <div>
                <label htmlFor="duration" className="sr-only mb-2 block text-sm font-medium text-gray-900">Select duration</label>
                <select 
                value={selectedDateFilter} 
                onChange={handleDateFilterChange} id="duration" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-hardBeige outline-hardBeige focus:ring-hardBeige">
                  <option selected>All times</option>
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
                  key={index}
                  id={order.orderId}
                  date={order.date}
                  price={order.totalAmount}
                  status={order.status}
                  statusIcon={Statuses.find((ord)=>ord.status==order.status).statusIcon }
                  statusClass={Statuses.find((ord)=>ord.status==order.status).statusClass}
                  handleDeleteClick={handleDeleteClick}
                />
              ))}
            </div>
          </div>

          <Navbar totalPages={totalPages} currentPage={currentPage}   handlePageChange={handlePageChange} />
        </div>
      </div>
    </section> :
    <Empty type={"shopping"} text={"You have no orders yet."}/>
    }
    <DeleteModal typeText={"order"} isOpen={isDeleteModalOpen} onClose={handleDeleteClose} onDelete={handleConfirmDelete} />
    </>

  );
};

export default Orders;
