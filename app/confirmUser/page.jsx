"use client";
import { useEffect } from "react";
import axios from "axios";

export default function ConfirmUser() {
  useEffect(() => {
    axios.get("/api/customer/verify")
      .then(() => window.location.href = "/profile")
      .catch(() => window.location.href = "/book");
  }, []);

  return <div>Verifying...</div>;
}