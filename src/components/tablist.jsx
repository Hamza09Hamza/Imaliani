import React, { useEffect, useState } from 'react';

const TableList = ({ setCategorie, categorie }) => {
    const [listShow, setListShow] = useState(false);
    const [CategorieList] = useState([
        "All", "Candle holder", "Ashtray &Lighter cover", "Home decoration", "Frame decoration", "Jewelry tray"
    ]);
    useEffect(()=>{
        console.log(categorie)
    },[])
    return (
        <>
        <ul className="flex flex-wrap overflow-hidden text-sm xxs:text-xs font-medium text-center text-gray-400">
            {  CategorieList.slice(0, 3).map((item) => (
                <li key={CategorieList.indexOf(item)} className="me-2 mid:hidden xxs:flex">
                    <div
                        key={item}
                        className={`duration-300 lg:hidden cursor-pointer inline-block px-4 py-3 hover:text-gray-900 hover:bg-gray-100 rounded-lg ${categorie === item ? 'text-gray-900 bg-gray-100' : ''}`}
                        aria-current="page"
                        onClick={(e) => { setCategorie(e.currentTarget.id) }}
                        id={item}
                    >
                        {item}
                    </div>
                </li>
            ))}
            
            
            { CategorieList.map((item) => (
                <li key={CategorieList.indexOf(item)} className="me-2 xxs:hidden ">
                    <div
                        key={item}
                        className={`duration-300  cursor-pointer inline-block lg:px-4 px-1 py-3 hover:text-gray-900 hover:bg-gray-100 rounded-lg ${categorie === item ? 'text-gray-900 bg-gray-100' : ''}`}
                        aria-current="page"
                        onClick={(e) => { setCategorie(item) }}
                        id={item}
                    >
                        {item}
                    </div>
                </li>
            ))}
    <li className='text-xl lg:hidden mid:hidden  xxs:flex' onClick={() => setListShow(!listShow)}>
        <button id="dropdownDefaultButton" className='text-xl text-center flex justify-center ' data-dropdown-toggle="dropdown"  type="button">
            ... 
            
        </button>

    <div id="dropdown" className={`z-10 ${listShow?'flex':'hidden'} fixed right-2 top-24 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 `}>
        <ul className="py-2 text-sm  " aria-labelledby="dropdownDefaultButton">
        { CategorieList.slice(3).map((item) => (
                <li key={CategorieList.indexOf(item)} className="me-2 ">
                    <div
                        key={item}
                        className={`duration-300  cursor-pointer inline-block px-4 py-3 hover:text-gray-900 hover:bg-gray-100 rounded-lg ${categorie === item ? 'text-gray-900 bg-gray-100' : ''}`}
                        aria-current="page"
                        onClick={(e) => { setCategorie(e.currentTarget.id) }}
                        id={item}
                    >
                        {item}
                    </div>
                </li>
            ))}
        </ul>
    </div>
    </li>

            </ul>
        </>
    );
}

export default TableList;
