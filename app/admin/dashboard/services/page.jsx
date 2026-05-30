"use client";

import {
  Clock1,
  Clock2,
  Download,
  ListFilter,
  Plus,
  Scissors,
  TrendingUp,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const page = () => {
  const [allServices, setAllServices] = useState([]);
  const noOfServices = allServices.length
  const showCases = [
    {
      name: "Total Services",
      value: noOfServices,
      icon: <Scissors size={40} />,
    },
    {
      name: "Most Booked Service",
      value: "Classic Haircut",
      icon: <Clock2 size={40} />,
    },
    {
      name: "Total Revenue",
      value: "$5000",
      icon: <TrendingUp size={40} />,
    },
    {
      name: "Average Duration",
      value: "45 mins",
      icon: <Clock1 size={40} />,
    },
  ];

  const [isOpen, setISOpen] = useState(false);
  const [services, setServices] = useState({
    name: "",
    price: "",
    duration: "",
    category: "",
    description: "",
  });
  const [refresh, setRefresh] = useState(false);
  const [update, setUpdate] = useState(false);
  const [categories, setCategories] = useState([]);
  const handleChange = (e) => {
    setServices((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      {
        update
          ? await axios.put(`/api/service/${services._id}`, services)
          : await axios.post("/api/service", services);
      }
      toast.success("Service added successfully!", { autoClose: 2000 });
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error("Failed to add service.", { autoClose: 2000 });
    } finally {
      setISOpen(false);
      setServices({
        name: "",
        price: "",
        duration: "",
        category: "",
        description: "",
      });
      setRefresh((prev) => !prev);
    }
  };
  const fetchServices = async () => {
    try {
      const res = await axios.get("/api/service");
      setAllServices(res.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
  const fetchCategories = async ()=>{
    try {
      const res = await axios.get("/api/category");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }
  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, [refresh]);

  return (
    <>
      <div className="w-full">
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
              <h1 className="text-2xl font-bold mb-4">Add New Service</h1>
              {/* Form fields for adding a new service */}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Service Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Enter service name"
                    name="name"
                    value={services.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  {
                    categories.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Category
                        </label>
                        <select
                          name="category"
                          className="w-full border border-gray-300 rounded-md p-2"
                          value={services.category}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select a category</option>
                          {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )
                  }
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Enter duration"
                    name="duration"
                    value={services.duration}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Price
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Enter price"
                    name="price"
                    value={services.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Enter description"
                    value={services.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded-md"
                    onClick={() => setISOpen(false)}
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-red-400 text-white rounded-md">
                    {update ? "Update" : "Add Service"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-bold md:font-medium text-md md:text-2xl">
            Services Directory
          </h1>
          <button
            className=" p-1 py-2 md:px-4 md:py-2 rounded-sm flex items-center gap-2 bg-red-400 text-white"
            onClick={() => {
              setISOpen(true);
              setUpdate(false);
              setServices({
                name: "",
                price: "",
                duration: "",
                category: "",
                description: "",
              });
            }}
          >
            <Plus /> New Service
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {showCases.map((item, index) => (
            <div
              key={index}
              className="p-5 bg-white shadow-sm w-full rounded-md flex flex-col items-center gap-2 h-32 hover:shadow-xl"
            >
              {item.icon}
              <h1 className="font-bold text-sm md:text-2xl">{item.name}</h1>
              <p className="text-sm md:text-base">{item.value}</p>
            </div>
          ))}
        </div>

        {/* All services will be listed here. You can add, edit, or remove services as needed. */}
        <div className="bg-white shadow-sm rounded-md p-4">
          <div className="flex justify-between items-center border-b">
            <h1 className="font-medium text-sm md:text-2xl">Manage Services</h1>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 mb-4 shadow-2xs p-1 md:px-4 md:py-2 rounded-sm">
                <ListFilter />
                <p className="text-[14px] hidden md:block">Filter</p>
              </div>
              <div className="flex items-center gap-2 mb-4 shadow-2xs md:px-4 md:py-2 rounded-sm">
                <Download />
                <p className="text-[14px] hidden md:block">Export</p>
              </div>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow className={"text-xl"}>
                <TableHead>Service Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className={"text-right"}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allServices.map((service) => (
                <TableRow key={service._id}>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service.category.name}</TableCell>
                  <TableCell>{service.duration}</TableCell>
                  <TableCell>${service.price.toFixed(2)}</TableCell>
                  <TableCell className={"text-right"}>
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded-sm"
                      onClick={() => {
                        setServices(service);
                        setUpdate(true);
                        setISOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded-sm ml-2"
                      onClick={() => {
                        axios.delete(`/api/service/${service._id}`).then(() => {
                          setRefresh((prev) => !prev);
                        });
                      }}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default page;
