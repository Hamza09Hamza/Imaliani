"use client";
import { useEffect, useState } from 'react';
import { getProductsperID,updateProduct } from '@/Firebase/CRUD/Products';
import { DocumentData } from 'firebase/firestore';
import { OriginCategorieList } from '@/components/products';
import Image from 'next/image';
import AdminFooter from "../../../footer"
import isAuth from '@/app/Auth';
 function EditPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const [product, setProduct] = useState<DocumentData | undefined>(undefined);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
        images:[''],
    });
    const [currentFiles,setCurrentFiles]=useState<any[]>([])
    useEffect(() => {
        const fetchProduct = async () => {
            if (slug) {
                try {
                    const data = await getProductsperID(slug) as any
                    
                    setProduct(data);
                    if(data){
                        setFormData({
                            name: data.title || '',
                            price: data.price || 0,
                            category: data.category || '',
                            description: data.description || '',
                            images:data.images|| [],
                        });
                        setCurrentFiles(data.images|| [])
                    }
                        
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            }
        };

        fetchProduct();
    }, [slug]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };
    const handleDeleteImage = (link: string) => {
        setFormData({ ...formData, images: formData.images.filter((image) => image !== link) });
        setCurrentFiles(currentFiles.filter((image: string) => image !== link));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);

        
        if (files.length + currentFiles.length > 3) {
            alert('You can only upload a maximum of 3 files.');
            return;
        }
        setCurrentFiles((prevcurrentFiles: any)=>[...prevcurrentFiles,...files])
        const newFileNames = files.map((file) => URL.createObjectURL(file));
        setFormData((prevData) => ({
            ...prevData,
            images: [...prevData.images, ...newFileNames],
        }));
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const updatedFields: any = {};
             
           
            Object.keys(formData).forEach((key) => {
                if (formData[key as keyof typeof formData] !== product?.[key as keyof typeof product]) {
                    updatedFields[key as keyof typeof formData] = formData[key as keyof typeof formData];
                }
            });
            console.log(updatedFields.images)
            if (Object.keys(updatedFields).length > 0) {
                await updateProduct(slug, {...updatedFields,images:currentFiles});
            }

            alert('Product updated successfully!');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (<>
        <div className='bg-softBeige w-[100vw] h-[100vh] flex items-center justify-center'>

        <div className=" p-4 w-full max-w-2xl h-full md:h-auto">
            <div className=" p-4 bg-white rounded-lg shadow sm:p-5">
                <div className="flex text-center justify-center items-center pb-4 mb-4 rounded-t border-b sm:mb-5 w-[100%]">
                    <h3 className="text-lg text-center font-semibold text-gray-900">
                        Update Product
                    </h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                value={formData.name} 
                                onChange={handleInputChange} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                                placeholder="iPad Air Gen 5th Wi-Fi" 
                                required 
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                            <input 
                                type="number" 
                                name="price" 
                                id="price" 
                                value={formData.price} 
                                onChange={handleInputChange} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                                placeholder="$299" 
                                required 
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category} // This ensures the category is the default selected value
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            >
                                <option value="">Select category</option>
                                {OriginCategorieList.map((item) => (
                                    <option key={item} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                            <textarea 
                                id="description" 
                                name="description" 
                                rows={5} 
                                value={formData.description} 
                                onChange={handleInputChange} 
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600" 
                                placeholder="Write a description..." 
                            />
                        </div>
                        <div className='flex justify-around sm:col-span-2 w-[100%] my-4 flex-wrap'>
                            {formData.images.map((link: string) => (<>
                           
                                    <div className='relative w-[32%]'>
                                        <Image
                                            src={link}
                                            alt={`Product image`}
                                            className='xxs:w-[5rem] w-[100%] rounded-lg '
                                            width={100}
                                            height={100}
                                        />
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteImage(link)}
                                        className="absolute z-10  top-0 right-0  text-white rounded-full "
                                    >
                                            <svg className="mr-1 -ml-1 w-7 h-7 p-1 rounded-full  bg-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                            </svg>
                                    </button>
                                    </div>
                                   
                                    </>))}
                            {formData.images.length < 3 && (
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-[32%] h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                    <div className="flex flex-col items-center text-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" multiple onChange={handleFileChange} />
                                </label>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button 
                            type="submit" 
                            className="text-white bg-hardBeige hover:bg-tooHardBeige transition-all duration-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Update product
                        </button>
                        <button 
                            type="button" 
                            className="text-red-600 inline-flex items-center transition-all duration-500 hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                            </svg>
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </div>
        <AdminFooter/>
        </>

    );
}
export default isAuth(EditPage)