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
import React from "react";

const page = () => {
  const showCases = [
    {
      name: "Total Services",
      value: 20,
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
  ];
  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-medium text-2xl">Services Directory</h1>
          <button className="px-4 py-2 rounded-sm flex items-center gap-2 bg-red-400 text-white">
            <Plus /> New Service
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {showCases.map((item, index) => (
            <div
              key={index}
              className="p-5 bg-white shadow-sm w-full rounded-md flex flex-col items-center gap-2 h-32"
            >
              {item.icon}
              <h1 className="font-bold text-2xl">{item.name}</h1>
              <p>{item.value}</p>
            </div>
          ))}
        </div>

        {/* All services will be listed here. You can add, edit, or remove services as needed. */}
        <div className="bg-white shadow-sm rounded-md p-4">
          <div className="flex justify-between items-center border-b">
            <h1 className="font-medium text-2xl">Manage Services</h1>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 mb-4 bg-gray-300 px-4 py-2 rounded-sm">
                <ListFilter />
                <p>Filter</p>
              </div>
              <div className="flex items-center gap-2 mb-4 bg-gray-300 px-4 py-2 rounded-sm">
                <Download />
                <p>Export</p>
              </div>
            </div>
          </div>
          <Table>
            <TableHeader>
                <TableRow className={'text-xl'}>
                    <TableHead>Service Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className={'text-right'}>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>Classic Haircut</TableCell>
                    <TableCell>Haircut</TableCell>
                    <TableCell>30 mins</TableCell>
                    <TableCell>$25.00</TableCell>
                    <TableCell className={'text-right'}>
                        <button className="px-2 py-1 bg-blue-500 text-white rounded-sm">Edit</button>
                        <button className="px-2 py-1 bg-red-500 text-white rounded-sm ml-2">Delete</button>
                    </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default page;
