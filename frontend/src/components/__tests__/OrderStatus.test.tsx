import React from 'react';
import { render, screen } from '@testing-library/react';
import OrderStatus from '../OrderStatus';
import { OrderStatus as OrderStatusType } from '../../services/api';

describe('OrderStatus Component', () => {
  const testCases: OrderStatusType[] = [
    'pending',
    'processing',
    'picked_up',
    'cleaning',
    'ready',
    'delivered',
    'cancelled'
  ];

  testCases.forEach((status) => {
    it(`renders ${status} status correctly`, () => {
      render(<OrderStatus status={status} />);
      
      // Check if the status label is displayed
      const label = status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ');
      const statusElement = screen.getByText(new RegExp(label, 'i'));
      expect(statusElement).toBeInTheDocument();
      
      // Check if the component has the correct color class
      const container = statusElement.closest('div');
      expect(container).toHaveClass('inline-flex');
    });
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-class';
    render(<OrderStatus status="pending" className={customClass} />);
    
    const statusElement = screen.getByText(/pending/i);
    const container = statusElement.closest('div');
    expect(container).toHaveClass(customClass);
  });
}); 