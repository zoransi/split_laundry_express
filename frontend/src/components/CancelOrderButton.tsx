import React, { useState } from 'react';
import { OrderStatus as OrderStatusType } from '../services/api';

interface CancelOrderButtonProps {
  orderId: string;
  currentStatus: OrderStatusType;
  onCancel: () => Promise<void>;
  className?: string;
}

const cancellableStatuses: OrderStatusType[] = ['pending', 'processing'];

const CancelOrderButton: React.FC<CancelOrderButtonProps> = ({
  orderId,
  currentStatus,
  onCancel,
  className = ''
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this order? This action cannot be undone.')) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await onCancel();
    } catch (err) {
      setError('Failed to cancel order. Please try again later.');
      console.error('Error cancelling order:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!cancellableStatuses.includes(currentStatus)) {
    return null;
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <button
        onClick={handleCancel}
        disabled={isLoading}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Cancelling...
          </>
        ) : (
          'Cancel Order'
        )}
      </button>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default CancelOrderButton; 