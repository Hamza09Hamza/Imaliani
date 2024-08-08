"use client";
import React, { useEffect, useState } from 'react'
import Logo from "@/images/imalian.png"
import Image from 'next/image';
import InputField from "@/components/Signing/InputFeild";
import PasswordField from "@/components/Signing/PasswordInput";
import axios from 'axios';
import { DB, auth } from '../../Firebase/Initialisation';
import { doc, getDoc } from 'firebase/firestore';
import isAuth from '@/app/adminAuth';

const AdminPanel = () => {
    const [errors, setErrors] = useState({
        email: "",  
        password: "",
    });
    const [error,setError]=useState("")

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateFields = () => {
        const newErrors = {};
        if (!email) newErrors.email = "Email is required.";
            else if (!validateEmail(email)) newErrors.email = "Invalid email format.";
        if (!password) newErrors.password = "Password is required.";

        setErrors(newErrors);
            return Object.keys(newErrors).length === 0;

    }
    const handleSignIn = async () => {
        if (validateFields()) {
            try {
               const res= await getDoc(doc(DB,"admins/",auth.currentUser.uid))
               if(res.exists()){
                const data=res.data()
                if(data.email==email&&data.password==password){
                    const {data}=await axios.post("/api/encrypt",{id:auth.currentUser.uid,data:auth.currentUser.uid})
                    sessionStorage.setItem("AdminID",JSON.stringify(data.data))
                    window.location.assign("/admin/orders")

                }
               }
            } catch (error) {
                console.log(error)
            }
        }
    }
        return ( <>
    <div className="bg-softBeige font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
            <a href="">
                    <Image
                src={Logo} alt="logo" className='w-52 mb-8 mx-auto block' />
            </a>

            <div className="p-8 rounded-2xl bg-white shadow">
                <h2 className="text-gray-800 text-center text-2xl font-bold">Admin Sign in</h2>
                <form className="mt-8 space-y-4">
                <InputField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="Enter email"
                    icon={
                        <>
                            <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                            <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                        </>
                    }
                    errors={errors}
                    setErrors={setErrors}
                />

                <PasswordField
                    label="Password"
                    value={password}
                    onChange={setPassword}
                    placeholder="Enter password"
                    confirm={null}
                    errors={errors}
                    setErrors={setErrors}
                />

              
                <hr />
                {error && (
                                <p className="text-red-500 text-sm mt-1">{error}</p>
                            )}
              <div className="!mt-8">
                <button onClick={async()=>{await handleSignIn();}} type="button" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-hardBeige hover:bg-tooHardBeige transition-all duration-500 focus:outline-none">
                 Admin Sign in
                </button>
              </div>
              

            </form>
          </div>
        </div>
      </div>
    </div>
        </> );
}
 
export default isAuth(AdminPanel);