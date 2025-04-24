import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OrderTracking from '../components/OrderTracking';
import api from '../services/api';

interface OrderStatus {
  status: 'pending' | 'processing' | 'picked_up' | 'cleaning' | 'ready' | 'delivered' | 'cancelled';
  timestamp: string;
  message: string;
}

interface OrderDetails {
  id: string;
  currentStatus: OrderStatus['status'];
  statusHistory: OrderStatus[];
  estimatedDeliveryTime?: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  customerName: string;
  address: string;
  phoneNumber: string;
}

const OrderTrackingPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/orders/${orderId}`);
        setOrder(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load order details. Please try again later.');
        console.error('Error fetching order details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Not Found</h2>
          <p className="text-gray-600">The order you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <OrderTracking
          orderId={order.id}
          currentStatus={order.currentStatus}
          statusHistory={order.statusHistory}
          estimatedDeliveryTime={order.estimatedDeliveryTime}
        />

        {/* Order Details */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Order Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {order.customerName}</p>
                <p><span className="font-medium">Address:</span> {order.address}</p>
                <p><span className="font-medium">Phone:</span> {order.phoneNumber}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage; 