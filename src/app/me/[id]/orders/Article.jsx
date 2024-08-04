import React from 'react';

const OrderCard = ({ id, date, price, status, statusClass, statusIcon,handleDeleteClick }) => {
    const canCancel = ['Pre-order', 'In transit', 'Processing'].includes(status);

  return (<>
    <article className="flex flex-wrap items-center gap-y-4 py-6">
      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-800 ">Order ID:</dt>
        <dd className="mt-1.5 text-base font-semibold text-gray-900 ">
          <a href="#" className="hover:underline">{id}</a>
        </dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-800 ">Date:</dt>
        <dd className="mt-1.5 text-base font-semibold text-gray-900 ">{date}</dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-800 ">Price:</dt>
        <dd className="mt-1.5 text-base font-semibold text-gray-900 ">{price}</dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-800 ">Status:</dt>
        <dd className={`me-2 mt-1.5 inline-flex items-center rounded-full px-2.5 py-0.5  font-medium ${statusClass}`}>
          <svg className="h-2.5 w-2.5 flex-shrink-0 text-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {statusIcon}
          </svg>
          <span className="ms-2">{status}</span>
        </dd>
      </dl>
      <div class="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
        {canCancel && (
                    <button onClick={handleDeleteClick} type="button" class=" transition-all duration-500 w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300    lg:w-auto">Cancel order</button>

            )}        
        <a href="#" class=" transition-all duration-500 w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100   -whi lg:w-auto">View details</a>
      </div>
    </article>
     

  </>);
};

export default OrderCard;
