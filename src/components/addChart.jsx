import React, { useState } from 'react';

const AddToCartButton = ({ onClick,styles}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);

  let iconClass = 'absolute right-2 top-2/4 transform -translate-y-2/4  ';
  const handleClick = async () => {
    setLoading(true);
    setError(false);
    setDone(false);

    try {
      await onClick();
      setDone(true);
    } catch (err) {
        console.log(err)
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`transition-all flex  text-sm overflow-hidden transform duration-500 relative text-white px-4 py-3 rounded-lg shadow-lg ${loading
        ? 'bg-gray-400' 
        : error
          ? 'bg-red-400'
          : done
            ? 'bg-green-400'
            : styles ? styles+' hover:opacity-40' :"bg-gray-400"+ ' hover:bg-gray-200'
        } ${loading || error || done
          ? 'pr-8 pl-4'
          : ''
        }`}
      onClick={handleClick}
    >
        <svg className={`h-5 w-5`} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      {loading && (
        <span className={iconClass}>
          <svg className="spinner" viewBox="0 0 50 50">
            <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
          </svg>
        </span>
      )}
      {error && (
        <span className={iconClass}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </span>
      )}
      {done && (
        <span className={iconClass}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </span>
      )}
    </button>
  );
};

export default AddToCartButton;
