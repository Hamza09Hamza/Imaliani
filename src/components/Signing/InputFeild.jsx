"use client";
import React, { useEffect, useState } from 'react';

const InputField = ({ label, type, value, onChange, placeholder, icon }) => {
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleChange = (e) => {
        const newValue = e.target.value;
        onChange(newValue);
    };

    const handleBlur = () => {
        if (type === 'email') {
            if (value && !validateEmail(value)) {
                setError('Please enter a valid email address.');
            } else {
                setError('');
            }
        }
    };

    return (
        <div>
            <label className="text-gray-800 text-sm mb-2 block">{label}</label>
            <div className="relative flex items-center">
                <input
                    value={value}
                    onChange={(e)=>handleChange(e)}
                    onBlur={handleBlur}
                    type={type}
                    required
                    className={`w-full text-gray-800 text-sm border ${error ? 'border-red-500' : 'border-gray-300'} px-4 py-3 rounded-md outline-Beige`}
                    placeholder={placeholder}
                />
                {icon && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                        {icon}
                    </svg>
                )}
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default InputField;
