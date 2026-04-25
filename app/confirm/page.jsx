
"use client"
import React from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import { Check } from "lucide-react";

const Page = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const phone = searchParams.get("email");

  return (
    <>
    <Header/>
    <div>
      <div className="flex flex-col">
        <Check size={30}/>
        <h1 className="text-3xl font-bold text-white">Appointment Confirmed</h1>
      </div>
    </div>
    </>
  );
};

export default Page;
