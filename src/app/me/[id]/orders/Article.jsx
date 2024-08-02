import React from 'react';

const OrderCard = ({ id, date, price, status, statusClass, statusIcon }) => {
  return (
    <article className="flex flex-wrap items-center gap-y-4 py-6">
      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
          <a href="#" className="hover:underline">{id}</a>
        </dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{date}</dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Price:</dt>
        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{price}</dd>
      </dl>

      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
        <dd className={`me-2 mt-1.5 inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium ${statusClass}`}>
          <svg className="h-2.5 w-2.5 flex-shrink-0 text-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {statusIcon}
          </svg>
          <span className="ms-2">{status}</span>
        </dd>
      </dl>
    </article>
  );
};

export default OrderCard;
