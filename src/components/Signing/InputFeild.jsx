import React, { useState } from 'react';

const InputField = ({ label, type, value, onChange, placeholder, icon, errors, setErrors }) => {
    const [touched, setTouched] = useState(false);

    const handleChange = (e) => {
        onChange(e.target.value);
        if (touched) {
            setErrors((prevErrors) => ({ ...prevErrors, [label.toLowerCase().replace(' ', '')]: "" }));
        }
    };

    const handleBlur = () => {
        setTouched(true);
        if (!value) {
            setErrors((prevErrors) => ({ ...prevErrors, [label.toLowerCase().replace(' ', '')]: `${label} is required.` }));
        } else if (label === "Email" && !validateEmail(value)) {
            setErrors((prevErrors) => ({ ...prevErrors, [label.toLowerCase().replace(' ', '')]: "Invalid email format." }));
        }
        if (errors[label.toLowerCase().replace(' ', '')] && value) {
            console.log("inside");
        
            const { [label.toLowerCase().replace(' ', '')]: removed, ...newErrors } = errors;
        
            console.log("newErrors");
        
            setErrors(newErrors);
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
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
                    className={`w-full text-gray-800 text-sm border ${errors[label.toLowerCase().replace(' ', '')] ? 'border-red-500' : 'border-gray-300'} px-4 py-3 rounded-md outline-Beige`}
                    placeholder={placeholder}
                />
                {icon && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                        {icon}
                    </svg>
                )}
            </div>
            {errors[label.toLowerCase().replace(' ', '')] && (
                <p className="text-red-500 text-sm mt-1">{errors[label.toLowerCase().replace(' ', '')]}</p>
            )}
        </div>
    );
};

export default InputField;
