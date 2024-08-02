"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Logo from "@/images/imalian.png";
import { GoogleSignUp, EmailSignUp } from "@/Firebase/Authentication";
import InputField from "@/components/Signing/InputFeild";
import PhoneNumberField from "@/components/Signing/InputPhoneN"
import PasswordField from "@/components/Signing/PasswordInput"

const SignUp = () => {
    const [firstName,setFirstName]=useState('') 
    const [lastName,setLastName]=useState('') 
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');



    return (<>
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
                            />
                            <PhoneNumberField value={phone} onChange={setPhone} />
                            <PasswordField
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.currentTarget.value)}
                                placeholder="Enter password"
                                confirm={null}
                            />
                            <PasswordField
                                label="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                                placeholder="Enter password"
                                confirm={password}
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

                            <hr className='w-[100%]'/>

                            <div className="!mt-8">
                                <button onClick={async () => await EmailSignUp({ firstName,lastName,email,password,phoneNumber:"+"+phone })} type="button" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-hardBeige hover:bg-tooHardBeige transition-all duration-500 focus:outline-none">
                                    Sign in
                                </button>
                            </div>
                            <div onClick={async () => await GoogleSignUp()} className="flex cursor-pointer items-center justify-center px-6 py-3 mt-4 text-gray-900 transition-colors duration-300 border-hardBeige transform border rounded-lg hover:bg-softBeige">
                                <svg className="w-6 h-6 mx-2" viewBox="0 0 24 24" fill="none">
                                    <path d="M22.005 12.276c0-.792-.07-1.56-.198-2.3H12v4.358h5.617a4.798 4.798 0 01-2.084 3.152v2.612h3.374c1.975-1.82 3.118-4.5 3.118-7.822z" fill="#4285F4"></path>
                                    <path d="M12 23c2.7 0 4.968-.9 6.624-2.422l-3.374-2.612c-.936.63-2.124 1.004-3.25 1.004-2.5 0-4.612-1.688-5.374-3.962H3.177v2.484C4.825 20.81 8.167 23 12 23z" fill="#34A853"></path>
                                    <path d="M6.626 14.008A5.995 5.995 0 015.5 12c0-.704.126-1.388.354-2.008V7.508H3.177A9.995 9.995 0 002 12c0 1.582.378 3.08 1.177 4.492l3.449-2.484z" fill="#FBBC05"></path>
                                    <path d="M12 5.996c1.374 0 2.606.47 3.575 1.38l2.66-2.66C16.968 2.948 14.7 2 12 2 8.167 2 4.825 4.19 3.177 7.508l3.449 2.484C7.388 7.684 9.5 5.996 12 5.996z" fill="#EA4335"></path>
                                </svg>
                                <span className="mx-2">Sign up with Google</span>
                            </div>

                        </form>
                        <div className="text-sm mt-2 text-center">
                            <div className='text-black'>Already have an account ? <a className="text-hardBeige cursor-pointer hover:text-tooHardBeige transition-all duration-300 hover:underline font-semibold">Sign In</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default SignUp;
