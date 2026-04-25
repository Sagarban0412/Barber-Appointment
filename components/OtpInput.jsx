"use client";

import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const OtpInput = ({ onChange, correctOtp, formData }) => {
  const [value, setValue] = useState("");
  const handelConfirm = () => {
    if(value === ""){
      return alert("Please enter the otp")
    }
    
    if (value === correctOtp) {
      const params = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        service: formData.service,
        barber: formData.barber,
        date: formData.date,
        time: formData.time,
        notes: formData.notes || "",
      });
      onChange(false);
      window.location.href = `/checkout?${params.toString()}`;
    } else {
      alert("OTP does not match");
    }
  };

  return (
    <div className="space-y-2 flex flex-col items-center justify-center h-48">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <button
        className="bg-blue-400 px-3 py-2 rounded-2xl"
        onClick={handelConfirm}
      >
        Confirm
      </button>
    </div>
  );
};

export default OtpInput;
