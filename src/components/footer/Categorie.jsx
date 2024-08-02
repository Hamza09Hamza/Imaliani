
import React from 'react'
const Categorie = ({selected}) => {
        return ( <>
        <svg className=' xxs:w-5  xxs:h-5' width="40" height="40" viewBox="0 0 96 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className='transition-all duration-300' d="M40.1998 73.6429H94V79.7857H40.1998V73.6429ZM13.953 76.7143L4.03843 84.6386L9.45687 89L24.8284 76.7143L9.45687 64.4286L4 68.7593L13.953 76.7143ZM40.1998 42.9286H94V49.0714H40.1998V42.9286ZM13.953 46L4.03843 53.9243L9.45687 58.2857L24.8284 46L9.45687 33.7143L4 38.045L13.953 46ZM40.1998 12.2143H94V18.3571H40.1998V12.2143ZM13.953 15.2857L4.03843 23.21L9.45687 27.5714L24.8284 15.2857L9.45687 3L4 7.33071L13.953 15.2857Z" stroke={selected ? "white" :"black"} strokeWidth="4"/>
        </svg>
        </>);
}
 
export default Categorie;