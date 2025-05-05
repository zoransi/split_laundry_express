import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import CancelOrderButton from '../CancelOrderButton';
import { OrderStatus as OrderStatusType } from '../../services/api';

describe('CancelOrderButton Component', () => {
  const mockOnCancel = jest.fn();
  const orderId = '123';
  let originalConfirm: typeof window.confirm;

  beforeAll(() => {
    originalConfirm = window.confirm;
  });

  afterAll(() => {
    window.confirm = originalConfirm;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window.confirm
    window.confirm = jest.fn();
  });

  it('renders cancel button for cancellable status', () => {
    render(
      <CancelOrderButton
        orderId={orderId}
        currentStatus="pending"
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByText('Cancel Order')).toBeInTheDocument();
  });

  it('does not render for non-cancellable status', () => {
    render(
      <CancelOrderButton
        orderId={orderId}
        currentStatus="delivered"
        onCancel={mockOnCancel}
      />
    );

    expect(screen.queryByText('Cancel Order')).not.toBeInTheDocument();
  });

  it('shows confirmation dialog before cancelling', async () => {
    (window.confirm as jest.Mock).mockReturnValue(true);

    render(
      <CancelOrderButton
        orderId={orderId}
        currentStatus="pending"
        onCancel={mockOnCancel}
      />
    );

    await act(async () => {
      fireEvent.click(screen.getByText('Cancel Order'));
    });

    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to cancel this order? This action cannot be undone.'
    );
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('does not cancel if user declines confirmation', async () => {
    (window.confirm as jest.Mock).mockReturnValue(false);

    render(
      <CancelOrderButton
        orderId={orderId}
        currentStatus="pending"
        onCancel={mockOnCancel}
      />
    );

    await act(async () => {
      fireEvent.click(screen.getByText('Cancel Order'));
    });

    expect(window.confirm).toHaveBeenCalled();
    expect(mockOnCancel).not.toHaveBeenCalled();
  });

  it('shows loading state while cancelling', async () => {
    (window.confirm as jest.Mock).mockReturnValue(true);
    mockOnCancel.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(
      <CancelOrderButton
        orderId={orderId}
        currentStatus="pending"
        onCancel={mockOnCancel}
      />
    );

    await act(async () => {
      fireEvent.click(screen.getByText('Cancel Order'));
    });

    expect(screen.getByText('Cancelling...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByText('Cancel Order')).toBeInTheDocument();
    });
  });

  it('shows error message when cancellation fails', async () => {
    (window.confirm as jest.Mock).mockReturnValue(true);
    const error = new Error('Failed to cancel');
    mockOnCancel.mockRejectedValue(error);

    render(
      <CancelOrderButton
        orderId={orderId}
        currentStatus="pending"
        onCancel={mockOnCancel}
      />
    );

    await act(async () => {
      fireEvent.click(screen.getByText('Cancel Order'));
    });

    await waitFor(() => {
      expect(screen.getByText('Failed to cancel order. Please try again later.')).toBeInTheDocument();
    });
  });
}); 