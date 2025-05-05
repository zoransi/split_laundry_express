import React, { useEffect, useState, useCallback } from 'react';
import { useWebSocket } from '../contexts/WebSocketContext';
import OrderStatus from './OrderStatus';
import OrderTimeline from './OrderTimeline';
import CancelOrderButton from './CancelOrderButton';
import OrderFeedback from './OrderFeedback';
import { OrderStatus as OrderStatusType } from '../services/api';

interface Order {
  _id: string;
  status: OrderStatusType;
  createdAt: string;
  updatedAt: string;
  // Add other order fields as needed
}

interface OrderTrackingProps {
  orderId: string;
  className?: string;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ orderId, className = '' }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { 
    socket, 
    isConnected, 
    connectionError, 
    reconnectAttempt, 
    isReconnecting, 
    reconnectSuccess, 
    connectionQuality,
    retrySuggestion,
    connectionHistory,
    networkDiagnostics,
    reconnect 
  } = useWebSocket();

  const fetchOrder = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch order');
      }
      const data = await response.json();
      setOrder(data);
      setError(null);
    } catch (err) {
      setError('Failed to load order details');
      console.error('Error fetching order:', err);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  useEffect(() => {
    if (!socket || !isConnected) return;

    // Join order room
    socket.emit('join_order', orderId);

    // Listen for order status updates
    socket.on('order_status_updated', (data) => {
      if (data.orderId === orderId) {
        setOrder(prev => prev ? { ...prev, status: data.status, updatedAt: data.updatedAt } : null);
      }
    });

    // Listen for order cancellation
    socket.on('order_cancelled', (data) => {
      if (data.orderId === orderId) {
        setOrder(prev => prev ? { ...prev, status: 'cancelled', updatedAt: data.updatedAt } : null);
      }
    });

    return () => {
      socket.emit('leave_order', orderId);
      socket.off('order_status_updated');
      socket.off('order_cancelled');
    };
  }, [socket, isConnected, orderId]);

  const handleCancel = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}/cancel`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to cancel order');
      }
      await fetchOrder(); // Refresh order data
    } catch (err) {
      console.error('Error cancelling order:', err);
      throw err;
    }
  };

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className={`text-red-600 ${className}`}>
        {error || 'Order not found'}
      </div>
    );
  }

  // Create timeline events from order data
  const timelineEvents = [
    {
      status: order.status,
      timestamp: order.updatedAt,
      note: `Order is ${order.status.replace('_', ' ')}`
    }
  ];

  const getConnectionQualityColor = (quality: typeof connectionQuality) => {
    switch (quality) {
      case 'good':
        return 'text-green-500';
      case 'fair':
        return 'text-yellow-500';
      case 'poor':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getConnectionQualityIcon = (quality: typeof connectionQuality) => {
    switch (quality) {
      case 'good':
        return (
          <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'fair':
        return (
          <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'poor':
        return (
          <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const formatLatency = (ms: number) => {
    return `${Math.round(ms)}ms`;
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const renderConnectionHistoryGraph = () => {
    if (connectionHistory.length === 0) return null;

    const maxLatency = Math.max(...connectionHistory.map(point => point.latency));
    const height = 60;
    const width = 200;
    const barWidth = width / connectionHistory.length;

    return (
      <div className="mt-2">
        <div className="text-xs text-gray-500 mb-1">Connection History (Last {connectionHistory.length} measurements)</div>
        <div className="relative h-[60px] w-[200px] bg-gray-100 rounded">
          {connectionHistory.map((point, index) => {
            const barHeight = (point.latency / maxLatency) * height;
            const color = point.quality === 'good' ? 'bg-green-500' :
                         point.quality === 'fair' ? 'bg-yellow-500' :
                         'bg-red-500';
            
            return (
              <div
                key={point.timestamp}
                className={`absolute bottom-0 ${color} transition-all duration-300`}
                style={{
                  left: `${index * barWidth}px`,
                  width: `${barWidth - 1}px`,
                  height: `${barHeight}px`,
                }}
                title={`${formatLatency(point.latency)} - ${point.quality}`}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const renderNetworkDiagnostics = () => {
    return (
      <div className="mt-4 space-y-2">
        <div className="text-xs text-gray-500">Network Diagnostics</div>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-xs text-gray-500">Avg Latency</div>
            <div className="font-medium">{formatLatency(networkDiagnostics.averageLatency)}</div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-xs text-gray-500">Packet Loss</div>
            <div className="font-medium">{formatPercentage(networkDiagnostics.packetLoss)}</div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-xs text-gray-500">Jitter</div>
            <div className="font-medium">{formatLatency(networkDiagnostics.jitter)}</div>
          </div>
        </div>
        <div className="text-xs text-gray-400">
          Last updated: {new Date(networkDiagnostics.lastUpdate).toLocaleTimeString()}
        </div>
      </div>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Connection Status */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getConnectionQualityIcon(connectionQuality)}
            <span className={`text-sm font-medium ${getConnectionQualityColor(connectionQuality)}`}>
              {connectionQuality === 'good' && 'Good Connection'}
              {connectionQuality === 'fair' && 'Fair Connection'}
              {connectionQuality === 'poor' && 'Poor Connection'}
              {connectionQuality === 'disconnected' && 'Disconnected'}
            </span>
          </div>
        </div>

        {renderConnectionHistoryGraph()}
        {renderNetworkDiagnostics()}
      </div>

      {/* WebSocket Connection Status */}
      {!isConnected && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  {connectionError || 'Connecting to server...'}
                  {reconnectAttempt > 0 && (
                    <span className="block mt-1 text-xs text-yellow-600">
                      Attempt {reconnectAttempt} of 5
                      {isReconnecting && ' (in progress...)'}
                    </span>
                  )}
                  {retrySuggestion && (
                    <span className="block mt-1 text-xs text-yellow-600">
                      Suggestion: {retrySuggestion}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <button
              onClick={reconnect}
              disabled={isReconnecting}
              className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 ${
                isReconnecting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isReconnecting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-1.5 h-4 w-4 text-yellow-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Reconnecting...
                </>
              ) : (
                <>
                  <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reconnect
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Success Message */}
      {reconnectSuccess && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 animate-fade-in">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                Successfully reconnected to the server
              </p>
            </div>
          </div>
        </div>
      )}

      <OrderStatus status={order.status} />
      <OrderTimeline events={timelineEvents} />
      {order.status !== 'cancelled' && order.status !== 'delivered' && (
        <CancelOrderButton 
          orderId={orderId}
          currentStatus={order.status}
          onCancel={handleCancel}
        />
      )}
      {order.status === 'delivered' && (
        <OrderFeedback 
          orderId={orderId} 
          onSubmit={async (rating, comment) => {
            console.log('Feedback submitted:', { rating, comment });
          }} 
        />
      )}
    </div>
  );
};

export default OrderTracking; 