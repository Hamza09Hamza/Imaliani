"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { DB, Storage, auth } from '../../../Firebase/Initialisation';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import { getCurrentFirestoreTimestamp } from '@/app/Utils/time';
const Customized = () => {
    const [files, setFiles] = useState([]);
    const [fileNames, setFileNames] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [description, setDescription] = useState('');

        const handleFileChange = (event) => {
            const selectedFiles = Array.from(event.target.files);
            const newFileNames = selectedFiles.map(file => file.name);
        
            // Limit to 3 files
            if (files.length + selectedFiles.length > 3) {
            alert("You can only upload a maximum of 3 files.");
            return;
            }
        
            // Update state with new files and file names
            setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
            setFileNames(prevFileNames => [...prevFileNames, ...newFileNames]);
        };
        const uploadImage = async (imageFile) => {
            try {
                const buffer = await imageFile.arrayBuffer();
                const blob = new Blob([buffer], { type: imageFile.type });
                const imageRef = storageRef(Storage, `${imageFile.name}`);
                await uploadBytes(imageRef, blob);
                const downloadURL = await getDownloadURL(imageRef);
                return downloadURL;
            } catch (error) {
                console.error("Error uploading image:", error);
                throw error;
            }
        };
    

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!firstName || !lastName || !email || !phoneNumber || !streetAddress || !city || !state || !zipCode || !description) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const {data}=await axios.post("/api/encrypt",{id:auth.currentUser.uid,data:auth.currentUser.uid})
            const cryptedUserID=data.data

        
        const imageUrls = await Promise.all(files.map(async (file) => await uploadImage(file)));

        const Giftdata = {
            fullName:firstName + ' ' + lastName,
            email:email,
            phoneNumber:phoneNumber,
            ShippingAdresse: {
                streetAddress:streetAddress,
                city:city,
                state:state,
                zipCode:zipCode,
            },
            description:description,
            Status: {
                Pre_order: getCurrentFirestoreTimestamp(),
                Processing: null,
                In_transit: null,
                Shipped: null,
                Cancelled: null,
            },
            images: imageUrls,
            UserID: auth.currentUser.uid,
            encryptedUserID:cryptedUserID,
            dateAdded: getCurrentFirestoreTimestamp()
        };
        console.log(Giftdata)

        await addDoc(collection(DB, "CustomizedGifts"), Giftdata);

        alert("Gift successfully added!");
        window.location.assign("/me/customized");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <>
            <div className="lg:max-w-4xl lg:mx-auto lg:pt-10 mid:pt-2 lg:pb-20 mid:w-[100%] mid:pb-40">
                <div className="text-center">
                    <h2 className="lg:text-3xl font-extrabold text-gray-800 inline-block border-b-[3px] border-gray-800 lg:pb-1">Customized Gifts</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="lg:mt-12 mid:mt-2 mid:flex mid:items-center mid:flex-col w-[100%]">
                        <div className="grid mid:text-center md:grid-cols-3 gap-4 mid:w-[90%]">
                            <div>
                                <h3 className="lg:text-3xl font-bold text-gray-300 mid:hidden">01</h3>
                                <h3 className="lg:text-xl font-bold text-gray-800 mt-1">Personal Details</h3>
                            </div>
                            <div className="md:col-span-2 mid:flex mid:items-center mid:flex-col">
                                <div className="grid sm:grid-cols-2 gap-4 mid:w-[90%]">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="First name"
                                            className="px-4 mid:px-2 lg:my-2 py-3 bg-white text-gray-800 w-full text-sm mid:text-sm border-2 rounded-md focus:border-Beige outline-none"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Last name"
                                            className="px-4 py-3 lg:my-2 bg-white text-gray-800 w-full text-sm mid:text-sm border-2 rounded-md focus:border-Beige outline-none"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            placeholder="Email address"
                                            className="px-4 py-3 lg:my-2 bg-white text-gray-800 w-full text-sm mid:text-sm border-2 rounded-md focus:border-Beige outline-none"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Phone number"
                                            className="px-4 py-3 lg:my-2 bg-white text-gray-800 w-full text-sm mid:text-sm border-2 rounded-md focus:border-Beige outline-none"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid mid:text-center md:grid-cols-3 gap-4 mid:mt-12 mid:w-[90%]">
                            <div>
                                <h3 className="lg:text-3xl font-bold text-gray-300 mid:hidden">02</h3>
                                <h3 className="lg:text-xl font-bold text-gray-800 mt-1">Shopping Address</h3>
                            </div>
                            <div className="md:col-span-2 mid:flex mid:items-center mid:flex-col">
                                <div className="grid sm:grid-cols-2 gap-4 mid:w-[90%]">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Street address"
                                            className="px-4 py-3 lg:my-2 bg-white text-gray-800 w-full text-sm mid:text-sm border-2 rounded-md focus:border-Beige outline-none"
                                            value={streetAddress}
                                            onChange={(e) => setStreetAddress(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="City"
                                            className="px-4 py-3 lg:my-2 bg-white text-gray-800 w-full text-sm mid:text-sm border-2 rounded-md focus:border-Beige outline-none"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="State"
                                            className="px-4 py-3 bg-white text-gray-800 w-full text-sm mid:text-sm border-2 rounded-md focus:border-Beige outline-none"
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="number"
                                            placeholder="Zip Code"
                                            className="px-4 py-3 bg-white text-gray-800 w-full text-sm mid:text-sm border-2 rounded-md focus:border-Beige outline-none"
                                            value={zipCode}
                                            onChange={(e) => setZipCode(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid mid:text-center md:grid-cols-3 gap-4 mid:mt-12 mid:w-[90%]">
                            <div>
                                <h3 className="lg:text-3xl font-bold text-gray-300 mid:hidden">03</h3>
                                <h3 className="lg:text-xl font-bold text-gray-800 mt-1">Gift's Details</h3>
                            </div>
                            <div className="md:col-span-2 mid:flex mid:items-center mid:flex-col">
                                <div className="grid sm:grid-cols-2 gap-4 mid:w-[100%]">
                                    <div className="max-w-sm mx-auto mid:w-[100%]">
                                        <textarea
                                            id="message"
                                            rows="4"
                                            className="lg:px-16 mid:w-[90%] mid:px-2 py-3 bg-white text-gray-800 w-full text-sm mid:text-sm border-2 rounded-md focus:border-Beige outline-none"
                                            placeholder="Describe the Gift wanted.."
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className='flex justify-center items-center flex-col transition-all duration-500'>
                                        <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} multiple />
                                        <label htmlFor="file-upload" className="mid:w-[60%] mt-4 cursor-pointer bg-hardBeige hover:bg-Beige text-white font-bold py-2 px-4 rounded transition-all duration-500">
                                            Upload File
                                        </label>
                                        {fileNames &&fileNames.map ((fileName)=>
                                            <p className="mt-4 text-brown">
                                                Selected file: {fileName}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-4 lg:mt-12 mid:mt-6">
                            <button
                                type="submit"
                                className="px-6 py-3 text-sm font-semibold tracking-wide bg-black text-white rounded-md hover:bg-hardBeige transition-all duration-500"
                            >
                                Book now
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Customized;
