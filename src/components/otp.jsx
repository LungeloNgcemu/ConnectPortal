import React, { useState } from 'react';
import OtpInput from 'react-otp-input';

export default function Otp({ otp, setOtp, }) {

    return (
        <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props}
            style={{
                width: "50px",
                height: "50px",
                fontSize: "1.3em",
                textAlign: "center",
              
            }}
            />}
        />
    );
}