"use client";
import React, { useState } from 'react';
import { OriginCategorieList } from '@/components/products';
import {addNewProduct} from "@/Firebase/CRUD/Products"
import {getCurrentFirestoreTimestamp} from "../../Utils/time"
const CreateProduct = () => {
    const [fileNames, setFileNames] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        category: '',
        description: '',
        images: []
    });

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);

        
        if (files.length + fileNames.length > 3) {
            alert('You can only upload a maximum of 3 files.');
            return;
        }

        
        const newFileNames = files.map(file => file.name);
        setFileNames(prevFileNames => [...prevFileNames, ...newFileNames]);
        setFormData(prevData => ({
            ...prevData,
            images: [...prevData.images, ...files]
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const productData = {
            ...formData,
            dateAdded:getCurrentFirestoreTimestamp()
        };

        try {
            await addNewProduct(productData);
            alert('Product added successfully!');
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <div className='w-[100vw] h-[100vh] flex items-center justify-center bg-softBeige'>
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Add Product
                        </h3>
                        
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                                <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-hardBeige focus:ring-hardBeige focus:border-hardBeige block w-full p-2.5" placeholder="Type product title" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            
                            <div>
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                                <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-hardBeige focus:ring-hardBeige focus:border-hardBeige block w-full p-2.5" placeholder="$2999" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                            </div>
                            <div>
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                                <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 outline-hardBeige focus:border-primary-500 block w-full p-2.5" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                                    <option defaultValue="">Select category</option>
                                    {OriginCategorieList.map((item) => <option key={item} value={item}>{item}</option>)}
                                </select>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                <textarea id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 outline-hardBeige bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Write product description here" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
                            </div>
                            <div className="sm:col-span-2 w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" multiple onChange={handleFileChange} />
                                </label>
                                <div className="mt-2">
                                    {fileNames.map((fileName, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <span className='text-gray-700'>{fileName}</span>
                                            <button type="button" onClick={() => handleRemoveFile(fileName)} className="text-red-500 hover:text-red-700">Remove</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="text-black inline-flex items-center bg-hardBeige hover:bg-tooHardBeige transition-all duration-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            Add new product
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
