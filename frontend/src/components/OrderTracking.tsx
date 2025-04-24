import React from 'react';

interface OrderStatus {
  status: 'pending' | 'processing' | 'picked_up' | 'cleaning' | 'ready' | 'delivered' | 'cancelled';
  timestamp: string;
  message: string;
}

interface OrderTrackingProps {
  orderId: string;
  currentStatus: OrderStatus['status'];
  statusHistory: OrderStatus[];
  estimatedDeliveryTime?: string;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({
  orderId,
  currentStatus,
  statusHistory,
  estimatedDeliveryTime,
}) => {
  const getStatusColor = (status: OrderStatus['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'picked_up':
        return 'bg-green-100 text-green-800';
      case 'cleaning':
        return 'bg-purple-100 text-purple-800';
      case 'ready':
        return 'bg-indigo-100 text-indigo-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: OrderStatus['status']) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'processing':
        return '🔄';
      case 'picked_up':
        return '📦';
      case 'cleaning':
        return '🧼';
      case 'ready':
        return '✅';
      case 'delivered':
        return '🎉';
      case 'cancelled':
        return '❌';
      default:
        return '•';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Order Tracking</h2>
        <span className="text-sm text-gray-500">Order #{orderId}</span>
      </div>

      {estimatedDeliveryTime && (
        <div className="mb-6 p-4 bg-primary-50 rounded-lg">
          <p className="text-primary-800">
            <span className="font-semibold">Estimated Delivery:</span>{' '}
            {new Date(estimatedDeliveryTime).toLocaleString()}
          </p>
        </div>
      )}

      <div className="relative">
        {/* Status Timeline */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-8">
          {statusHistory.map((status, index) => (
            <div key={index} className="relative pl-12">
              {/* Status Icon */}
              <div
                className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  getStatusColor(status.status)
                }`}
              >
                {getStatusIcon(status.status)}
              </div>

              {/* Status Content */}
              <div>
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold capitalize">{status.status.replace('_', ' ')}</h3>
                  <span className="ml-2 text-sm text-gray-500">
                    {new Date(status.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="mt-1 text-gray-600">{status.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Status */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(currentStatus)}`}>
            {getStatusIcon(currentStatus)}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold capitalize">{currentStatus.replace('_', ' ')}</h3>
            <p className="text-gray-600">
              {statusHistory[statusHistory.length - 1]?.message || 'Your order is being processed'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking; 