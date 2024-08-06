"use client"
import { auth } from '@/Firebase/Initialisation';
import { getUserRole } from '@/Firebase/Utils';
import { getCurrentFirestoreTimestamp,timestampToDate } from '@/app/Utils/time';
import { Statuses } from '@/app/me/orders/Order';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const TrackOrder = ({ Status, id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [admin,setAdmin]=useState(false)
    const [currentStatus, setCurrentStatus] = useState(Status);
    useEffect(()=>{
      const handleAuthStateChange = () => {
            
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
              if(await getUserRole(user.uid)!=='user')
                setAdmin(true)
                }
            });

      return () => unsubscribe();
      };

handleAuthStateChange();
      
    },[])

    const setNewStatus = async (value) => {
        const date = getCurrentFirestoreTimestamp();
        setCurrentStatus({ ...currentStatus, [value]: date });

        if (await getUserRole(auth.currentUser.uid)) {
            await axios.put("/api/orders/setorder", { id: id.substring(1), status: { ...Status, [value]: date },userId:auth.currentUser.uid });
            window.location.reload()
        }
    };

    const filterStatuses = () => {
        return Statuses.filter(status => !Status[status.status]);
    };

    return (
        <>
            <div className="mt-6 grow sm:mt-8 lg:mt-0 h-full">
                <div className="space-y-6 rounded-lg border h-full border-gray-200 bg-softBeige p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900">Order history</h3>

                    <ol className="relative ms-3 border-s border-gray-200">
                        {Status.Shipped && (
                            <li className=" ms-6">
                                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                                    <svg className="h-4 w-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
                                    </svg>
                                </span>
                                <h4 className="mb-0.5 text-base font-semibold text-gray-900">Order shipped on {timestampToDate(Status.Shipped)}</h4>
                                <p className="text-sm font-normal text-gray-500">The order has been shipped</p>
                            </li>
                        )}
                        {Status.In_transit && (
                            <li className=" mb-10 ms-6">
                                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                                    <svg className="h-4 w-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
                                    </svg>
                                </span>
                                <h4 className="mb-0.5 text-base font-semibold text-gray-900">In Transit</h4>
                                <p className="text-sm font-normal text-gray-500">Your order is on its way</p>
                            </li>
                        )}
                        {Status.Processing && (
                            <li className="mb-10 ms-6">
                                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                                    <svg className="h-4 w-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
                                    </svg>
                                </span>
                                <h4 className="mb-0.5 text-base font-semibold text-gray-900">Order in Processing since {timestampToDate(Status.Processing)}</h4>
                                <p className="text-sm font-normal text-gray-500">The order is being processed</p>
                            </li>
                        )}
                        {Status.Pre_order && (
                            <li className="mb-10 ms-6">
                                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                                    <svg className="h-4 w-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
                                    </svg>
                                </span>
                                <h4 className="mb-0.5 text-base font-semibold text-gray-900">Order confirmed on {timestampToDate(Status.Pre_order)}</h4>
                                <p className="text-sm font-normal text-gray-500">The order has been confirmed and is being processed ( keep an eye on your email and website )</p>
                            </li>
                        )}
                    </ol>
                    {admin ?<div className='flex items-center flex-col gap-4 justify-center w-[100%]'>
                        <button onClick={() => { setIsOpen(!isOpen) }} className='px-4 py-2 rounded-2xl bg-hardBeige hover:bg-tooHardBeige duration-500 transition-all'>
                            {isOpen ? "Not sure ?" : "set a new status"}
                        </button>
                        <div className={`${isOpen ? "flex" : "hidden"} items-center justify-around`}>
                            {filterStatuses().map((status) => (
                                <dd
                                    key={status.status}
                                    onClick={async() => {
                                        setIsOpen(false);
                                       await setNewStatus(status.status);
                                    }}
                                    className={`me-2 mt-1.5 inline-flex cursor-pointer items-center rounded-full px-2.5 py-0.5 font-medium ${status.statusClass}`}
                                >
                                    <svg className="h-2.5 w-2.5 flex-shrink-0 text-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        {status.statusIcon}
                                    </svg>
                                    <span className="ms-2">{status.status}</span>
                                </dd>
                            ))}
                        </div>
                    </div>:<>
                    </>}
                </div>
            </div>
        </>
    );
};

export default TrackOrder;
