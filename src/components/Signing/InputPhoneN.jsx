import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneNumberField = ({label, value, onChange, errors, setErrors }) => {
    const [touched, setTouched] = useState(false);

    const handleChange = (phone) => {
        onChange(phone);
        if (touched) {
            setErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
        }
    };

    const handleBlur = () => {
        setTouched(true);
        if (!value) {
            setErrors((prevErrors) => ({ ...prevErrors, phone: "Phone number is required." }));
        }
        if (errors[label.toLowerCase().replace(' ', '')] && value) {
            console.log("inside");
        
            const { [label.toLowerCase().replace(' ', '')]: removed, ...newErrors } = errors;
        
            setErrors(newErrors);
        }
    };

    return (<>
           <div>
            <label className="text-gray-800 text-sm mb-2 block">Phone number</label>
            <div className="relative flex items-center text-black">
                <PhoneInput
                    onBlur={handleBlur}
                    country={'ae'}
                    value={value}
                    
                    onChange={handleChange}
                    inputProps={{
                        name: 'phone',
                        required: true,
                        className: 'w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-Beige'
                    }}
                    containerClass="w-full"
                    inputStyle={{ width: '100%' }}
                    buttonStyle={{ right: '10px' }}
                />
            </div>
        </div>
            {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
   </> );
};

export default PhoneNumberField;
