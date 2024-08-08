"use client";
import React, { useEffect, useState } from 'react';
import MessCard from './MessCard';
import Navbar from '../../me/navbar';
import DeleteModal from '../../me/Delete';
import { getDateRange } from "../../me/orders/Order";
import Empty from '@/components/Emptylist';
import { auth } from '@/Firebase/Initialisation';
import { timestampToDate } from '@/app/Utils/time';
import AdminFooter from '../footer';
import { collection, getDocs } from 'firebase/firestore';
import { DB } from '../../../Firebase/Initialisation';
import isAuth from "../../adminAuth";
const Messges = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [messagesPerPage] = useState(5);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedDateFilter, setSelectedDateFilter] = useState('All times');
    const [currentMessages, setCurrentMessages] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [displayedMessages, setDisplayedMessages] = useState([]);

    useEffect(() => {
        const handleAuthStateChange = () => {
            const unsubscribe = auth.onAuthStateChanged(async (user) => {
                if (user) {
                    try {
                        const data = await getDocs(collection(DB, "Messages"));
                        if (!data.empty) {
                            let messagesData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                            setDisplayedMessages(messagesData);
                        }
                    } catch (error) {
                        console.error("Error fetching user messages:", error);
                    }
                } else {
                    setDisplayedMessages([]);
                    setCurrentMessages([]);
                }
            });

            return () => unsubscribe();
        };

        handleAuthStateChange();
    }, []);

    useEffect(() => {
        const startDate = getDateRange(selectedDateFilter);
        const filteredMessages = displayedMessages.filter(msg =>
            new Date(timestampToDate(msg.timestamp).split('.').reverse().join('-')) >= startDate
        );

        const indexOfLastMessage = currentPage * messagesPerPage;
        const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
        setCurrentMessages(filteredMessages.slice(indexOfFirstMessage, indexOfLastMessage));
        setTotalPages(Math.ceil(filteredMessages.length / messagesPerPage));
    }, [displayedMessages, selectedDateFilter, currentPage, messagesPerPage]);

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

    const handlePageChange = (pageNumber) => {
        pageNumber <= totalPages && pageNumber >= 1 && setCurrentPage(pageNumber);
    };

    return (
        <>
            {displayedMessages.length > 0 ? (
                <section className="bg-softBeige flex w-full items-center p-16 antialiased justify-center lg:h-[100vh] xxs:h-full md:py-16">
                    <div className="mx-auto flex-1 max-w-screen-xl px-4 p-16 2xl:px-0 bg-white rounded-3xl">
                        <div className="mx-auto max-w-5xl">
                            <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                                <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Messages</h2>
                                <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
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
                                    {currentMessages.map((mess, index) => (
                                        <MessCard
                                            key={index}
                                            id={mess.id}
                                            date={timestampToDate(mess.timestamp)}
                                            message={mess.message}
                                            email={mess.email}
                                            subject={mess.subject}
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
                <Empty type={"Messages"} text={"You have no messages yet."} />
            )}
            <DeleteModal typeText={"message"} isOpen={isDeleteModalOpen} onClose={handleDeleteClose} onDelete={handleConfirmDelete} />
            <AdminFooter />
        </>
    );
};

export default isAuth(Messges);
