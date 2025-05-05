import React from 'react';
import { OrderStatus as OrderStatusType } from '../services/api';

interface TimelineEvent {
  status: OrderStatusType;
  timestamp: string;
  note?: string;
}

interface OrderTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const OrderTimeline: React.FC<OrderTimelineProps> = ({ events, className = '' }) => {
  return (
    <div data-testid="timeline" className={`space-y-4 ${className}`}>
      {events.map((event, index) => (
        <div key={index} className="flex items-start">
          <div className="flex flex-col items-center mr-4">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            {index !== events.length - 1 && (
              <div className="w-0.5 h-12 bg-gray-200"></div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-900">
                {event.status.charAt(0).toUpperCase() + event.status.slice(1).replace('_', ' ')}
              </h4>
              <span className="text-xs text-gray-500">
                {new Date(event.timestamp).toLocaleString()}
              </span>
            </div>
            {event.note && (
              <p className="mt-1 text-sm text-gray-600">{event.note}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderTimeline; 