"use client";
import React, { useEffect, useState,useLayoutEffect } from 'react'
import Logo from "@/images/imalian.png"
import Image from 'next/image';
import InputField from "@/components/Signing/InputFeild";
import PasswordField from "@/components/Signing/PasswordInput";
import { EmailSignIn,  GoogleSignUporIn } from '@/Firebase/Authentication';
import { auth } from '../../Firebase/Initialisation';

const SignIn = () => {
  useLayoutEffect(()=>{
        
    auth.currentUser ? window.location.assign("/")  : null
},[auth.currentUser])
 
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
            const err=await EmailSignIn({ email, password })
            if(err)
              setError(err);
            else{
              sessionStorage.setItem("UserID",JSON.stringify(auth.currentUser.uid))
              window.location.assign("/")
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
                <h2 className="text-gray-800 text-center text-2xl font-bold">Sign in</h2>
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

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" color='#E4D5B7' className="h-4 w-4 shrink-0 text-Beige focus:ring-Beige border-gray-300 rounded" />
                  <label for="remember-me" className="ml-3 block text-sm text-gray-800 ">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="" className="text-hardBeige hover:text-tooHardBeige transition-all duration-300 hover:underline font-semibold">
                    Forgot your password?
                  </a>
                </div>
              </div>
                <hr />
                {error && (
                                <p className="text-red-500 text-sm mt-1">{error}</p>
                            )}
              <div className="!mt-8">
                <button onClick={async()=>{await handleSignIn()}} type="button" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-hardBeige hover:bg-tooHardBeige transition-all duration-500 focus:outline-none">
                  Sign in
                </button>
              </div>
              <button onClick={async()=>{await GoogleSignUporIn()}} href="#" className="flex items-center justify-center px-6 py-3 mt-4 text-gray-900 transition-colors duration-300 border-hardBeige transform border rounded-lg  hover:bg-softBeige">
                    <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
                        
                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                        <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                        <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                    </svg>

                    <span className="mx-2 text-black">Sign in with Google</span>
                </button>

              <p className="text-gray-800 text-sm !mt-8 text-center">Don't have an account? <a href="/signup" className="text-hardBeige hover:text-tooHardBeige transition-all duration-300 hover:underline ml-1 whitespace-nowrap font-semibold">Register here</a></p>
            </form>
          </div>
        </div>
      </div>
    </div>
        </> );
}
 
export default SignIn;
