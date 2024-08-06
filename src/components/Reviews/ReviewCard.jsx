import React from 'react';
import formatString from "../../app/Utils/text";
import { timestampToDate } from '../../app/Utils/time';
const ReviewCard = ({ review }) => {
  const { UserID, rating, dateAdded, description,title   } = review;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg key={i} className={`h-4 w-4 ${i <= rating ? 'text-yellow-300' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="gap-3 py-6 sm:flex sm:items-start">
      <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
        <div className="flex items-center gap-0.5">
          {renderStars(rating)}
        </div>

        <div className="space-y-0.5">
          <p className="text-base font-semibold text-gray-900 ">{UserID.slice(0, 15) + '...'}</p>
          <p className="text-sm font-normal text-gray-500 ">{timestampToDate(dateAdded)}</p>
        </div>

        {/* {isVerified && (
          <div className="inline-flex items-center gap-1">
            <svg className="h-5 w-5 text-blue-600 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm font-medium text-gray-900 ">Verified purchase</p>
          </div>
        )} */}
      </div>

      <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
        <h5 className='text-gray-900'>{title}</h5>
        <p className="text-base font-normal text-gray-500 ">{description}</p>


        
      </div>
    </div>
  );
};

export default ReviewCard;
