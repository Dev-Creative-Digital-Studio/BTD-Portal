"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircularProgress } from "../../../components/circular-progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Diamond, CreditCard, Users, Store } from "lucide-react";

const salesData = [
  { month: "Jan", revenue: 65000, expense: 45000 },
  { month: "Feb", revenue: 75000, expense: 50000 },
  { month: "Mar", revenue: 85000, expense: 55000 },
  { month: "Apr", revenue: 95000, expense: 60000 },
  { month: "May", revenue: 105000, expense: 65000 },
  { month: "Jun", revenue: 115000, expense: 70000 },
  { month: "Jul", revenue: 125000, expense: 75000 },
  { month: "Aug", revenue: 135000, expense: 80000 },
  { month: "Sep", revenue: 145000, expense: 85000 },
  { month: "Oct", revenue: 155000, expense: 90000 },
  { month: "Nov", revenue: 165000, expense: 95000 },
  { month: "Dec", revenue: 175000, expense: 100000 },
];

const vendorStats = [
  {
    title: "Total Vendors",
    value: "350",
    icon: Store,
    status: "Active",
  },
  {
    title: "Pending",
    value: "5",
    icon: Store,
    status: "Pending",
  },
  {
    title: "Blocked",
    value: "2",
    icon: Store,
    status: "Blocked",
  },
  {
    title: "New Orders",
    value: "15,000",
    icon: Store,
    status: "This Week",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Data Refreshed</span>
          <span className="text-sm">September 28, 2023 12:45 PM</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Diamond className="h-4 w-4 text-[#00BFA6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$123k</div>
            <div className="text-xs text-green-500">+45.00%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-[#00BFA6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,234</div>
            <div className="text-xs text-green-500">+15.45%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <CreditCard className="h-4 w-4 text-[#00BFA6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$476.3k</div>
            <div className="text-xs text-red-500">-12.45%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {vendorStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <stat.icon className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.status}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Sales Statistics 2022</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#00BFA6" />
                  <Bar dataKey="expense" fill="#FF725E" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Support Tickets</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <CircularProgress value={77} label="Resolution Rate" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
