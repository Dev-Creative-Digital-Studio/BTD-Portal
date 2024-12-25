"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrderStatusUpdateProps {
  orderId: number;
  currentStatus: string;
  onUpdate: (orderId: number, newStatus: string) => void;
}

export function OrderStatusUpdate({
  orderId,
  currentStatus,
  onUpdate,
}: OrderStatusUpdateProps) {
  const [status, setStatus] = useState(currentStatus);

  const handleUpdate = () => {
    onUpdate(orderId, status);
  };

  return (
    <div className="flex items-center space-x-2">
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Processing">Processing</SelectItem>
          <SelectItem value="Shipped">Shipped</SelectItem>
          <SelectItem value="Delivered">Delivered</SelectItem>
          <SelectItem value="Cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={handleUpdate}>Update</Button>
    </div>
  );
}
