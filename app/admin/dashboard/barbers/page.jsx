"use client";

import axios from "axios";
import {
  ChartNoAxesColumnIncreasing,
  Download,
  ListFilter,
  Pencil,
  Plus,
  Trash2,
  UserCheck,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "react-toastify";

const page = () => {
  const showCase = [
    {
      name: "Total Barber",
      value: 5,
      icon: <Users />,
    },
    {
      name: "Active Barber",
      value: 3,
      icon: <UserCheck />,
    },
  ];
  const [barbers, setBarbers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(true);
  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const res = await axios.get("/api/barber");
        setBarbers(res.data.barbers || []);
      } catch (error) {
        console.error("Error fetching barbers:", error);
      }
    };
    fetchBarbers();
  }, [refresh]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialty: "",
    start: "",
    end: "",
  });
  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const payload = {
        ...formData,
        specialty: formData.specialty
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };
      await axios.post("/api/barber", payload);
      setIsOpen(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error adding barber:", error);
    }
  };

  // handling the delete data for barbers

  const handleDelete = async (id) => {
    try {
      alert("are you sure you wnat to delete")
      await axios.delete(`/api/barber/${id}`);
      toast.success("delete successfully");
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error deleting barber:", error);
    }
  };

  return (
    <>
      <div className="w-full">
        {isOpen && (
          <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
            <div className="bg-white p-4 w-96 rounded-lg">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Barber Name"
                    className="border-none h-8 rounded-sm px-2 bg-gray-50 "
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Barber Email Address"
                    className="border-none h-8 rounded-sm px-2 bg-gray-50 "
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2 ">
                  <label htmlFor="specialty">Speciality</label>
                  <input
                    type="text"
                    name="specialty"
                    id="specialty"
                    placeholder="e.g. fade, massage, haircut"
                    className="border-none h-8 rounded-sm px-2 bg-gray-50 "
                    value={formData.specialty}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex gap-2 justify-between">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="start">Start</label>
                    <input
                      type="time"
                      name="start"
                      id="start"
                      placeholder="Select Start Time"
                      className="border-none h-8 rounded-sm px-2 bg-gray-50 "
                      value={formData.start}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="end">End</label>
                    <input
                      type="time"
                      name="end"
                      id="end"
                      placeholder="Select end time"
                      className="border-none h-8 rounded-sm px-2 bg-gray-50 "
                      value={formData.end}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    className="px-3 py-1 rounded-lg shadow-xs"
                    onClick={(prev) => setIsOpen(!prev)}
                  >
                    Cancel
                  </button>
                  <button className="px-2 py-1 rounded-lg bg-red-400 shadow-xs">
                    Add Barber
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-sm md:text-2xl">Barber Management</h1>
          <button
            className="flex justify-center items-center bg-red-400 p-1 md:px-2 md:py-1 rounded-sm"
            onClick={() => setIsOpen(true)}
          >
            <Plus />
            New Barber
          </button>
        </div>
        {/* show Cases of barbers behaviours */}
        <div className="flex ">
          {showCase.map((data, index) => (
            <div
              className="border-black w-56 h-30 m-5 flex flex-col justify-center items-center space-y-2 shadow-xl cursor-pointer"
              key={index}
            >
              <div className="p-1 bg-gray-200 rounded-full">{data.icon}</div>
              <h1 className="font-bold text-base md:text-xl">{data.name}</h1>
              <h1 className="font-medium text-sm">{data.value}</h1>
            </div>
          ))}
        </div>
        {/* Management of barbers */}
        <div className="w-full ">
          <div className="flex justify-between items-center px-4">
            <h1 className="font-light md:font-bold text-sm md:text-2xl">
              Manage Barbers
            </h1>
            <div className="flex gap-4">
              <button className="flex justify-center items-center px-1 py-2 rounded-xl ">
                <ListFilter />
                <h2 className="hidden md:block">Filter</h2>
              </button>
              <button className="flex justify-center items-center px-1 py-2 rounded-xl ">
                <Download />
                <h2 className="hidden md:block">Export</h2>
              </button>
            </div>
          </div>

          {/* All barbers are listed here. You can edit or delete any barber by clicking the respective icons in the action column. */}
          <div>
            <Table>
              <TableHeader>
                <TableRow className={"text-sm md:text-lg"}>
                  <TableHead>Barber Name</TableHead>
                  <TableHead>Speciality</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Working Hours</TableHead>
                  <TableHead className={"text-right"}>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {barbers.length > 0 ? (
                  barbers.map((barber) => (
                    <TableRow key={barber._id}>
                      <TableCell>{barber.name}</TableCell>
                      <TableCell>
                        {barber.specialty[0] + "," + barber.specialty[1]}
                      </TableCell>
                      <TableCell>
                        {barber.isActive ? "Active" : "inActive"}
                      </TableCell>
                      <TableCell>
                        {barber.workingHours.start +
                          " to " +
                          barber.workingHours.end}
                      </TableCell>
                      <TableCell className={"flex justify-end gap-5 px-4"}>
                        <button>
                          <Pencil className="text-blue-400 cursor-pointer" />
                        </button>
                        <button onClick={() => handleDelete(barber._id)}>
                          <Trash2 className="text-red-500 cursor-pointer" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No barbers found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
