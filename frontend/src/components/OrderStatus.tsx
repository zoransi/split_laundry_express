import React from 'react';
import { OrderStatus as OrderStatusType } from '../services/api';

interface OrderStatusProps {
  status: OrderStatusType;
  className?: string;
}

const statusConfig = {
  pending: {
    label: 'Pending',
    color: 'bg-yellow-500',
    icon: '⏳'
  },
  processing: {
    label: 'Processing',
    color: 'bg-blue-500',
    icon: '🔄'
  },
  picked_up: {
    label: 'Picked Up',
    color: 'bg-purple-500',
    icon: '📦'
  },
  cleaning: {
    label: 'Cleaning',
    color: 'bg-indigo-500',
    icon: '🧼'
  },
  ready: {
    label: 'Ready',
    color: 'bg-green-500',
    icon: '✅'
  },
  delivered: {
    label: 'Delivered',
    color: 'bg-green-600',
    icon: '🚚'
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-red-500',
    icon: '❌'
  }
};

const OrderStatus: React.FC<OrderStatusProps> = ({ status, className = '' }) => {
  const config = statusConfig[status];

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full ${config.color} text-white ${className}`}>
      <span className="mr-2">{config.icon}</span>
      <span className="text-sm font-medium">{config.label}</span>
    </div>
  );
};

export default OrderStatus; 