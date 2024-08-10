"use client"
import React, { useState, useEffect } from 'react';
import { DB, RTDB } from '@/Firebase/Initialisation';
import { ref, onValue } from 'firebase/database';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [productNames, setProductNames] = useState<any[]>([]);
    const [showSuggest,setShowSuggest]=useState<boolean>(false)
    useEffect(() => {
        const fetchProductNames = () => {
            const productsRef = ref(RTDB, 'products');
            onValue(productsRef, (snapshot) => {
                const data = snapshot.val();
                let names = data ? Object.values(data) : [];
                names=names.map((name:any)=>name.name)
                setProductNames(names)
                // setProductNames(names as any[]);
            });
        };

        fetchProductNames();
    }, []);

    const Search=async(value:string)=>{
        console.log(value)
        try {
            const Prodref=collection(DB,"products")
            let QuerySelection=query(
                Prodref,
                where("title","==",value)
            )
            const res=await getDocs(QuerySelection)
            if(!res.empty){
                window.location.assign("/product/"+res.docs[0].id)
            }
        } catch (error) {
            
        }

    }

    useEffect(() => {
        if (searchTerm === '') {
            setSuggestions([]);
            return;
        }
        // console.log(productNames)
        const filteredSuggestions = productNames.filter((name) =>
            name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        // console.log(filteredSuggestions)

        setSuggestions(filteredSuggestions);
    }, [searchTerm, productNames]);

    return (
        <div                 onBlur={()=>setShowSuggest(false)}
        onFocus={()=>setShowSuggest(true)}

        className="relative w-[39%] flex justify-center mx-auto text-gray-600">
            <input
                className="w-[100%] border-gray-300 bg-white h-10 px-5 pr-16 rounded-full text-sm focus:outline-none"
                type="search"
                name="search"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                {/* Search Icon */}
            </button>

            {suggestions.length  > 0 ? (
                <ul className="absolute left-0 top-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={async() => {console.log(suggestion);await  Search(suggestion)}}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            ):searchTerm=="" ||  !showSuggest ?<></>
            :<>
            <ul className="absolute left-0 mt-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
            <li> NOT FOUND </li>
        </ul></>
        
        }
        </div>
    );
};

export default SearchBar;
