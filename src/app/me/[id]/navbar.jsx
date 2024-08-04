import React from 'react'
const Navbar = ({handlePageChange,currentPage,totalPages}) => {
    return ( <>
    <nav className="mt-6 flex items-center justify-center sm:mt-8" aria-label="Page navigation example">
                            <ul className="flex h-8 items-center -space-x-px text-sm">
                                <li>
                                    <a
                                        
                                        className={`ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                                        onClick={() => currentPage!=1?handlePageChange(currentPage - 1):<></>}
                                    >
                                        <span className="sr-only">Previous</span>
                                        <svg className="h-4 w-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
                                        </svg>
                                    </a>
                                </li>
                                {[...Array(totalPages).keys()].map(number => (
                                    <li key={number + 1}>
                                        <a
                                           
                                            className={`flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${currentPage === number + 1 ? 'z-10 border-primary-300 bg-primary-50 text-primary-600' : ''}`}
                                            onClick={() => handlePageChange(number + 1)}
                                        >
                                            {number + 1}
                                        </a>
                                    </li>
                                ))}
                                <li>
                                    <a
                                       
                                        className={`flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
                                        onClick={() =>  handlePageChange(currentPage + 1)}
                                    >
                                        <span className="sr-only">Next</span>
                                        <svg className="h-4 w-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </nav>
    </> );
}
 
export default Navbar;