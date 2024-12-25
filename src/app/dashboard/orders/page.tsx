"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Package2, Search } from "lucide-react";

// Simulated order data
const orders = [
  {
    id: "ORD-2023-001",
    customer: "John Smith",
    date: "2023-12-26",
    amount: 234.5,
    status: "Completed",
    items: 3,
  },
  {
    id: "ORD-2023-002",
    customer: "Sarah Johnson",
    date: "2023-12-26",
    amount: 129.99,
    status: "Pending",
    items: 2,
  },
  {
    id: "ORD-2023-003",
    customer: "Michael Brown",
    date: "2023-12-25",
    amount: 549.99,
    status: "Processing",
    items: 4,
  },
  {
    id: "ORD-2023-004",
    customer: "Emma Wilson",
    date: "2023-12-25",
    amount: 89.99,
    status: "Completed",
    items: 1,
  },
  {
    id: "ORD-2023-005",
    customer: "James Davis",
    date: "2023-12-24",
    amount: 299.99,
    status: "Cancelled",
    items: 2,
  },
];

const stats = [
  {
    title: "Total Orders",
    value: "2345",
    icon: Package2,
  },
  {
    title: "Processing",
    value: "323",
    icon: Package2,
  },
  {
    title: "Cancelled",
    value: "17",
    icon: Package2,
  },
];

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-[#00BFA6] text-white";
      case "processing":
        return "bg-blue-500 text-white";
      case "pending":
        return "bg-yellow-500 text-white";
      case "cancelled":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-2 bg-gray-100 rounded-lg">
                <stat.icon className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search orders..."
            className="pl-8 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="shrink-0">
          Filter
        </Button>
      </div>

      {/* Orders Table */}
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-48">Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>${order.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#00BFA6] border-[#00BFA6] hover:bg-[#00BFA6] hover:text-white"
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
