import { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const PhoneNumber = ({ phone, setPhone }) => {

    return (
        <div>
            <PhoneInput
            className='phone-input'
                defaultCountry="za"
                value={phone}
                onChange={(phone) => setPhone(phone)}
                inputStyle={{ width: "100%", fontSize: "1rem", color: "#000" }}
            />
        </div>
    );
};

export default PhoneNumber;