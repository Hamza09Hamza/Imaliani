import React, { useEffect, useState } from 'react';
import StarRating from "../me/reviews/StarRating"
const EditReviewModal = ({ isOpen, review, setReview, onClose, onSave,type}) => {
    if (!isOpen) return null;

    const handleChange = (name,value) => {
        setReview((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        await onSave();
    };
  return (<>
   {isOpen? <div
      id="editReviewModal"
      tabIndex="-1"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-Beige bg-opacity-50"
    >
      <div className="relative max-h-full w-full max-w-2xl p-4">
        <div className="relative rounded-lg bg-white shadow ">
          <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5">
            <h3 className="text-lg font-semibold text-gray-900 ">{type? "Add" :"Edit"} review</h3>
            <button
              type="button"
              className="absolute right-5 top-5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gray-200 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900  "
              onClick={onClose}
            >
              <svg
                className="h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form className="p-4 md:p-5">
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="col-span-2">
              <StarRating rating={review.rating} setRating={handleChange}/>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Review title
                </label>
                <input
                  type="text"
                  name="title"
                  value={review.title}
                  onChange={e=>handleChange("title",e.currentTarget.value)}
                  id="title"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-hardBeige focus:ring-hardBeige  outline-hardBeige "
                  required
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Review description
                </label>
                <textarea
                  id="description"
                  rows="6"
                  value={review.description}
                  onChange={e=>handleChange("description",e.currentTarget.value)}
                  className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-hardBeige  "
                  required
                ></textarea>
                <p className="text-xs text-gray-500 ">
                  Problems with the product or delivery?{' '}
                  <a href="#" className="text-primary-600 hover:underline ">
                    Send a report
                  </a>
                </p>
              </div>
              <div className="col-span-2">
                <div className="flex items-center">
                  <input
                    id="review-checkbox"
                    type="checkbox"
                    color='#000000'
                    value=""
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100  focus:ring-2 focus:ring-hardBeige  "
                  />
                  <label
                    htmlFor="review-checkbox"
                    className="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    By publishing this review you agree with the{' '}
                    <a href="#" className="text-hardBeige hover:underline ">
                      terms and conditions
                    </a>
                    .
                  </label>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 flex items-center justify-center flex-row-reverse  md:pt-5">
              <button
                type="button"
                className="me-2 inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium border-2 border-hardBeige text-hardBeige  hover:text-white transition-all duration-500 hover:bg-tooHardBeige focus:outline-hardBeige   "
                onClick={onSave}
              >
                {type? "Add" :"Edit"} review
              </button>
              <button
                type="button"
                className="me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100   "
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div> :<></>}
  </>

  );
};

export default EditReviewModal;
