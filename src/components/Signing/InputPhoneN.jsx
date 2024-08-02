// components/PhoneNumberField.js
import React, { useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneNumberField = ({ value, onChange }) => {
    return (
        <div>
            <label className="text-gray-800 text-sm mb-2 block">Phone number</label>
            <div className="relative flex items-center text-black">
                <PhoneInput
                    country={'ae'}
                    value={value}
                    onChange={onChange}
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
    );
};

export default PhoneNumberField;
