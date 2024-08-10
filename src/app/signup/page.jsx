"use client";
import React, { useState ,useLayoutEffect, useEffect} from 'react';
import Image from 'next/image';
import Logo from "@/images/imalian.png";
import { GoogleSignUporIn, EmailSignUp } from "@/Firebase/Authentication";
import InputField from "@/components/Signing/InputFeild";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import PasswordField from "@/components/Signing/PasswordInput";
import { auth } from '../../Firebase/Initialisation';

const SignUp = () => {
   
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
       const handleAuthStateChange = () => {
              const unsubscribe = auth.onAuthStateChanged(async (user) => {
                if (user) {
                  setIsAuthenticated(true);
                  window.location.assign("/");
              } else {
                  setLoading(false);
              }
              });
  
              return () => unsubscribe();
          };
  
          handleAuthStateChange();
  }, []);
   
 
    const [errors, setErrors] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error,setError]=useState("")
    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState(''); 
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateFields = () => {
        const newErrors = {};
        if (!firstName) newErrors.firstname = "First name is required.";
        if (!lastName) newErrors.lastname = "Last name is required.";
        if (!phone) newErrors.phone = "Phone number is required.";
        if (!email) newErrors.email = "Email is required.";
        else if (!validateEmail(email)) newErrors.email = "Invalid email format.";
        if (!password) newErrors.password = "Password is required.";
        if (!confirmPassword) newErrors.confirmpassword = "Please confirm your password.";
        if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignUp = async () => {
        if (validateFields()) {
            const err=await EmailSignUp({ firstName, lastName, email, password, phoneNumber:phone })
            if(err)
                setError(err);
            else{
               window.location.assign("/verify-email")}

        }
    };





    if (loading) {
        return <p>Loading...</p>; // Or a better loading indicator
    }
  
    if (isAuthenticated) {
        return null; // Or redirect, but this should already be handled by useEffect
    }

    return (
        <div className="bg-softBeige font-[sans-serif]">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-md w-full">
                    <a>
                        <Image src={Logo} alt="Imaliani Craft Studio" className='w-52 mb-8 mx-auto block' />
                    </a>
                    <div className="p-8 rounded-2xl bg-white shadow">
                        <h2 className="text-gray-800 text-center text-2xl font-bold">Sign up</h2>
                        <form className="mt-8 space-y-4">
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <InputField
                                    label={"First Name"}
                                    type="text"
                                    value={firstName}
                                    onChange={setFirstName}
                                    placeholder="Enter First Name"
                                    icon={
                                        <>
                                            <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                            <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                                        </>
                                    }
                                    errors={errors}
                                    setErrors={setErrors}
                                />
                                <InputField
                                    label={"Last Name"}
                                    type="text"
                                    value={lastName}
                                    onChange={setLastName}
                                    placeholder="Enter Last Name"
                                    icon={
                                        <>
                                            <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                            <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                                        </>
                                    }
                                    errors={errors}
                                    setErrors={setErrors}
                                />    
                            </div>
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
                             <PhoneInput
                                        placeholder="+1 555-555-555"
                                        value={phone}
                                        onChange={setPhone}
                                        defaultCountry="AE"
                                        className={`w-full text-gray-800 text-sm border  px-4 py-3 rounded-md outline-Beige `}
                                        />
                                        {errors.phone && <span className="text-red-500 mt-2 text-xs">{errors.phone}</span>}
                            <PasswordField
                                label="Password"
                                value={password}
                                onChange={setPassword}
                                placeholder="Enter password"
                                confirm={null}
                                errors={errors}
                                setErrors={setErrors}
                            />
                            <PasswordField
                                label="Confirm Password"
                                value={confirmPassword}
                                onChange={setConfirmPassword}
                                placeholder="Enter password"
                                confirm={password}
                                errors={errors}
                                setErrors={setErrors}
                            />
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox" color='#E4D5B7' className="h-4 w-4 shrink-0 text-Beige focus:ring-Beige border-gray-300 rounded" />
                                    <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">Remember me</label>
                                </div>
                                <div className="text-sm">
                                    <a className="text-hardBeige cursor-pointer hover:text-tooHardBeige transition-all duration-300 hover:underline font-semibold">Forgot your password?</a>
                                </div>
                            </div>
                            <div id="recaptcha-container"></div>
                            <hr className='w-[100%]' />
                            {error && (
                                <p className="text-red-500 text-sm mt-1">{error}</p>
                            )}
                            <div className="!mt-8">
                                <button onClick={handleSignUp} type="button" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-hardBeige hover:bg-tooHardBeige transition-all duration-500 focus:outline-none">
                                    Sign up
                                </button>
                            </div>
                            <div onClick={async () =>{ await GoogleSignUporIn();window.location.assign("/")}} className="flex cursor-pointer items-center justify-center px-6 py-3 mt-4 text-gray-900 transition-colors duration-300 border-hardBeige transform border rounded-lg hover:bg-softBeige">
                                <svg className="w-6 h-6 mx-2" viewBox="0 0 24 24" fill="none">
                                    <path d="M22.005 12.276c0-.792-.07-1.56-.198-2.3H12v4.358h5.617a4.798 4.798 0 01-2.083 3.148v2.61h3.365c1.97-1.816 3.106-4.491 3.106-7.816z" fill="#4285F4"></path>
                                    <path d="M12 23c3.042 0 5.594-1.01 7.458-2.72l-3.374-2.611c-.936.629-2.123 1.002-4.084 1.002-3.137 0-5.796-2.119-6.75-4.968H2.746v3.084A11.998 11.998 0 0012 23z" fill="#34A853"></path>
                                    <path d="M5.25 14.703a7.194 7.194 0 010-4.406V7.213H2.746a12.002 12.002 0 000 9.574L5.25 14.703z" fill="#FBBC05"></path>
                                    <path d="M12 4.738c1.638 0 3.104.563 4.258 1.664l3.184-3.184C17.592 1.43 15.04.402 12 .402 7.52.402 3.78 2.968 2.746 7.213l2.504 3.084C6.204 7.856 8.863 5.738 12 5.738z" fill="#EA4335"></path>
                                </svg>
                                <span className="mx-2">Sign up with Google</span>
                            </div>
                        </form>
                <p className="text-gray-800 text-sm !mt-8 text-center">Don't have an account? <a href="/signin" className="text-hardBeige hover:text-tooHardBeige transition-all duration-300 hover:underline ml-1 whitespace-nowrap font-semibold">Sign in</a></p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SignUp;
