"use client";

import { useEffect, useState } from "react";
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
import axios from "axios";
import { User } from "@/lib/auth-types";
import { Order } from "@/app/types";
import { formatDate } from "@/app/common";

type StatsCardProps = {
  title: string;
  value: string;
  icon: any;
};

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<StatsCardProps[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        var user = localStorage.getItem("user") as string | null;
        var userObj = null;
        if (user) {
          userObj = JSON.parse(user) as User;
        }

        axios
          .get(
            `${process.env.NEXT_PUBLIC_API_URL}/orders-stats/vendor/${userObj?._id}`
          )
          .then((response) => {
            setStats([
              {
                title: "Total Orders",
                value: response.data.totalOrders,
                icon: Package2,
              },
              {
                title: "Processing",
                value: response.data.processingOrders,
                icon: Package2,
              },
              {
                title: "Cancelled",
                value: response.data.cancelledOrders,
                icon: Package2,
              },
            ]);
          });
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        var user = localStorage.getItem("user") as string | null;
        var userObj = null;
        if (user) {
          userObj = JSON.parse(user) as User;
        }

        axios
          .get(
            `${process.env.NEXT_PUBLIC_API_URL}/orders/vendor/${userObj?._id}?page=1&perPage=10`
          )
          .then((response) => {
            setOrders(response.data);
          });
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-[#00BFA6] text-white";
      case "paid":
        return "bg-green-500 text-white";
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
              <TableRow key={order._id}>
                <TableCell className="font-medium">{order._id}</TableCell>
                <TableCell>{order.user.name}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>
                  {order.gifts.map((gift) => gift.product.title).join(", ")}
                </TableCell>
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
