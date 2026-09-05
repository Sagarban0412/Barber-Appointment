"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function ConfirmUser() {
  const [phase, setPhase] = useState("enter_email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await axios.post(
        "/api/customer/verify",
        { email },
        { withCredentials: true },
      );
      if (res.data?.status === "otp_sent") {
        toast.success(res.data.message || "OTP sent to your email");
        setPhase("enter_otp");
      } else {
        toast.error("Unexpected response");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send OTP",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter the 6-digit code");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "/api/customer/verify",
        { email, otp },
        { withCredentials: true },
      );
      toast.success(res.data?.message || "Verified");
      window.location.href = "/profile";
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid or expired OTP",
      );
    } finally {
      setLoading(false);
    }
  };

  if (phase === "enter_otp") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <form
          onSubmit={handleVerifyOtp}
          className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6"
        >
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              Enter verification code
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              We sent a 6-digit code to{" "}
              <span className="font-medium">{email}</span>
            </p>
          </div>

          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
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
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>

          <button
            type="button"
            onClick={() => {
              setPhase("enter_email");
              setOtp("");
            }}
            className="w-full text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            ← Use a different email
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <form
        onSubmit={handleSendOtp}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
            Confirm your email
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Enter your email and we&apos;ll send a verification code.
          </p>
        </div>

        <input
          type="email"
          name="email"
          value={email}
          placeholder="Enter Email Address"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />

        <button
          type="submit"
          disabled={loading || !email}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
}
