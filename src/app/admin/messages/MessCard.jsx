import React from 'react';

const MessCard = ({ id, message, email, subject, date }) => {
  return (
    <article className="flex flex-col bg-white w-full  p-6 rounded-2xl shadow-lg space-y-6 mt-4">
      <div className="flex flex-wrap w-[100%] gap-4">
        <dl className="flex-1 min-w-[200px]">
          <dt className="text-base font-medium text-gray-800">Email Sender:</dt>
          <dd className="mt-1.5 text-base font-semibold text-gray-900">
            <a href={"mailto:" + email} className="hover:underline">{email}</a>
          </dd>
        </dl>

        <dl className="flex-1  w-[100%] min-w-[200px]">
          <dt className="text-base font-medium text-gray-800">Date:</dt>
          <dd className="mt-1.5 text-base font-light text-gray-600">{date}</dd>
        </dl>

        <dl className="flex-1 min-w-[200px]">
          <dt className="text-base font-medium text-gray-800">Subject:</dt>
          <dd className="mt-1.5 text-base font-semibold text-gray-900">{subject}</dd>
        </dl>

        <dl className="flex-1 w-[100%] min-w-[200px]">
          <dt className="text-base font-medium text-gray-800">Message:</dt>
          <dd className="mt-1.5 w-[100%] text-base font-semibold text-gray-900">{message}</dd>
        </dl>
      </div>
    </article>
  );
};

export default MessCard;
