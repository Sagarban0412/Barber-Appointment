"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const statusStyles = {
  booked: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const page = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("/api/appointment");
        setAppointments(res.data.appointments || []);
      } catch (err) {
        console.error("Failed to fetch appointments:", err.message);
        toast.error("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    // optimistic update — change UI instantly
    setAppointments((prev) =>
      prev.map((a) => (a._id === id ? { ...a, status: newStatus } : a))
    );
    try {
      await axios.patch(`/api/appointment/${id}`, { status: newStatus });
      toast.success("Status updated");
    } catch (err) {
      // revert on failure
      toast.error("Failed to update status");
      const res = await axios.get("/api/appointment");
      setAppointments(res.data.appointments || []);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return;
    // optimistic update
    setAppointments((prev) => prev.filter((a) => a._id !== id));
    try {
      await axios.delete(`/api/appointment/${id}`);
      toast.success("Appointment deleted");
    } catch (err) {
      toast.error("Failed to delete appointment");
      const res = await axios.get("/api/appointment");
      setAppointments(res.data.appointments || []);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-96 text-gray-400">
        Loading appointments...
      </div>
    );

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
      <div className="bg-white rounded-xl shadow-sm p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Barber</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.length > 0 ? (
              appointments.map((a) => (
                <TableRow key={a._id}>
                  <TableCell>{a.customerId}</TableCell>
                  <TableCell>{a.serviceId?.name ?? "—"}</TableCell>
                  <TableCell>{a.barberId?.name ?? "—"}</TableCell>
                  <TableCell>
                    {new Date(a.appointmentDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{a.appointmentTime}</TableCell>
                  <TableCell>
                    <select
                      value={a.status}
                      onChange={(e) => handleStatusChange(a._id, e.target.value)}
                      className={`text-xs font-medium px-2 py-1 rounded-full border-none outline-none cursor-pointer ${statusStyles[a.status]}`}
                    >
                      <option value="booked">Booked</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </TableCell>
                  <TableCell>Rs.{a.serviceId?.price ?? 0}</TableCell>
                  <TableCell className="text-right">
                    <button onClick={() => handleDelete(a._id)}>
                      <Trash2 size={16} className="text-red-500 cursor-pointer" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-gray-400">
                  No appointments found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default page;
