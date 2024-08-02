import React, { useState } from 'react'
const TableList = ({setCategorie,categorie}) => {
    const [CategorieList,setCategorieList]=
    useState(["All","Candle holder","Ashtray &Lighter cover","Home decoration","Frame decoration","Jewerly tray"])

        return ( <>

<ul className="flex flex-wrap text-sm xxs:text-xs font-medium text-center text-gray-400 ">

{
        CategorieList.map((item)=><><li  key={CategorieList.indexOf(item)} className="me-2">
        <div 
        key={item}
        className={`duration-300 cursor-pointer inline-block px-4 py-3 hover:text-gray-900 hover:bg-gray-100 rounded-lg  ${categorie==item?'  text-gray-900 bg-gray-100 ':''}`} 
        aria-current="page"
        onClick={(e)=>{setCategorie(e.currentTarget.id)}} id={item}>        
            {item}
            </div>
    </li></>)
    }
   
</ul>
</> );
}
 
export default TableList;