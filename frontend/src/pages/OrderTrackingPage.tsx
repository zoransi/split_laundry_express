import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { orderService, feedbackService } from '../services/api';
import OrderStatus from '../components/OrderStatus';
import OrderTimeline from '../components/OrderTimeline';
import CancelOrderButton from '../components/CancelOrderButton';
import OrderFeedback from '../components/OrderFeedback';

const OrderTrackingPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<any>(null);

  const fetchOrderData = async () => {
    try {
      setLoading(true);
      const [orderData, historyData] = await Promise.all([
        orderService.getOrderById(orderId!),
        orderService.getOrderHistory(orderId!)
      ]);
      setOrder(orderData);
      setHistory(historyData);
      setError(null);

      // Fetch feedback if order is completed
      if (orderData.status === 'delivered') {
        try {
          const feedbackData = await feedbackService.getFeedback(orderId!);
          setFeedback(feedbackData);
        } catch (err) {
          // Ignore error if feedback doesn't exist yet
          console.log('No feedback found for this order');
        }
      }
    } catch (err) {
      setError('Failed to load order data. Please try again later.');
      console.error('Error fetching order data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, [orderId]);

  const handleCancelOrder = async () => {
    try {
      await orderService.cancelOrder(orderId!);
      await fetchOrderData(); // Refresh the order data
    } catch (err) {
      console.error('Error cancelling order:', err);
      throw err; // Let the CancelOrderButton handle the error
    }
  };

  const handleSubmitFeedback = async (rating: number, comment: string) => {
    await feedbackService.submitFeedback(orderId!, { rating, comment });
    await fetchOrderData(); // Refresh to get the submitted feedback
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Order Not Found</h2>
            <p className="mt-2 text-gray-600">The order you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Order #{order.id}</h2>
              <OrderStatus status={order.status} />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Created on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Order Details</h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Customer</dt>
                <dd className="mt-1 text-sm text-gray-900">{order.customerInfo.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
                <dd className="mt-1 text-sm text-gray-900">${order.totalAmount.toFixed(2)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Pickup Date</dt>
                <dd className="mt-1 text-sm text-gray-900">{new Date(order.pickupDetails.date).toLocaleDateString()}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Pickup Time</dt>
                <dd className="mt-1 text-sm text-gray-900">{order.pickupDetails.time}</dd>
              </div>
            </dl>
          </div>

          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Order Progress</h3>
              <CancelOrderButton
                orderId={order.id}
                currentStatus={order.status}
                onCancel={handleCancelOrder}
              />
            </div>
            <OrderTimeline events={history} />
          </div>

          {order.status === 'delivered' && !feedback && (
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Your Feedback</h3>
              <OrderFeedback
                orderId={order.id}
                onSubmit={handleSubmitFeedback}
              />
            </div>
          )}

          {feedback && (
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Your Feedback</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`h-5 w-5 ${
                          star <= feedback.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {feedback.comment && (
                  <p className="text-sm text-gray-700">{feedback.comment}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage; 