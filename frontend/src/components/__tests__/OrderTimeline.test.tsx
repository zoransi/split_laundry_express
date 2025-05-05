import React from 'react';
import { render, screen } from '@testing-library/react';
import OrderTimeline from '../OrderTimeline';
import { OrderStatus as OrderStatusType } from '../../services/api';

describe('OrderTimeline Component', () => {
  const mockEvents = [
    {
      status: 'pending' as OrderStatusType,
      timestamp: '2024-03-20T10:00:00Z',
      note: 'Order created'
    },
    {
      status: 'processing' as OrderStatusType,
      timestamp: '2024-03-20T10:30:00Z',
      note: 'Order confirmed'
    },
    {
      status: 'picked_up' as OrderStatusType,
      timestamp: '2024-03-20T11:00:00Z',
      note: 'Items picked up'
    }
  ];

  it('renders all timeline events', () => {
    render(<OrderTimeline events={mockEvents} />);
    
    mockEvents.forEach(event => {
      // Check if status is displayed
      const status = event.status.charAt(0).toUpperCase() + event.status.slice(1).replace('_', ' ');
      const statusElement = screen.getByText((content, element) => {
        return element?.textContent === status;
      });
      expect(statusElement).toBeInTheDocument();
      
      // Check if timestamp is displayed
      const timestamp = new Date(event.timestamp).toLocaleString();
      const timestampElement = screen.getByText((content, element) => {
        return element?.textContent === timestamp;
      });
      expect(timestampElement).toBeInTheDocument();
      
      // Check if note is displayed
      const noteElement = screen.getByText(event.note!);
      expect(noteElement).toBeInTheDocument();
    });
  });

  it('renders empty timeline when no events provided', () => {
    render(<OrderTimeline events={[]} />);
    const timeline = screen.getByTestId('timeline');
    expect(timeline.children.length).toBe(0);
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-timeline';
    render(<OrderTimeline events={mockEvents} className={customClass} />);
    
    const timeline = screen.getByTestId('timeline');
    expect(timeline).toHaveClass(customClass);
  });
}); 