import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import OrderFeedback from '../OrderFeedback';

// Mock the HeroIcons
jest.mock('@heroicons/react/solid', () => ({
  StarIcon: () => <div data-testid="star-filled">★</div>
}));

jest.mock('@heroicons/react/outline', () => ({
  StarIcon: () => <div data-testid="star-outline">☆</div>
}));

describe('OrderFeedback Component', () => {
  const mockOnSubmit = jest.fn();
  const orderId = '123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders feedback form', () => {
    render(
      <OrderFeedback
        orderId={orderId}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByText('How would you rate your experience?')).toBeInTheDocument();
    expect(screen.getByText('Additional Comments (Optional)')).toBeInTheDocument();
    expect(screen.getByText('Submit Feedback')).toBeInTheDocument();
  });

  it('shows error when submitting without rating', async () => {
    render(
      <OrderFeedback
        orderId={orderId}
        onSubmit={mockOnSubmit}
      />
    );

    await act(async () => {
      fireEvent.click(screen.getByText('Submit Feedback'));
    });

    expect(screen.getByText('Please select a rating')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('submits feedback with rating and comment', async () => {
    render(
      <OrderFeedback
        orderId={orderId}
        onSubmit={mockOnSubmit}
      />
    );

    await act(async () => {
      // Select rating
      fireEvent.click(screen.getByLabelText('Rate 4 stars'));

      // Add comment
      const commentInput = screen.getByPlaceholderText('Tell us about your experience...');
      fireEvent.change(commentInput, { target: { value: 'Great service!' } });

      // Submit
      fireEvent.click(screen.getByText('Submit Feedback'));
    });

    expect(mockOnSubmit).toHaveBeenCalledWith(4, 'Great service!');
  });

  it('shows loading state while submitting', async () => {
    mockOnSubmit.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(
      <OrderFeedback
        orderId={orderId}
        onSubmit={mockOnSubmit}
      />
    );

    await act(async () => {
      // Select rating and submit
      fireEvent.click(screen.getByLabelText('Rate 5 stars'));
      fireEvent.click(screen.getByText('Submit Feedback'));
    });

    expect(screen.getByText('Submitting...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByText('Thank you for your feedback!')).toBeInTheDocument();
    });
  });

  it('shows error message when submission fails', async () => {
    const error = new Error('Failed to submit');
    mockOnSubmit.mockRejectedValue(error);

    render(
      <OrderFeedback
        orderId={orderId}
        onSubmit={mockOnSubmit}
      />
    );

    await act(async () => {
      // Select rating and submit
      fireEvent.click(screen.getByLabelText('Rate 3 stars'));
      fireEvent.click(screen.getByText('Submit Feedback'));
    });

    await waitFor(() => {
      expect(screen.getByText('Failed to submit feedback. Please try again later.')).toBeInTheDocument();
    });
  });

  it('shows success message after successful submission', async () => {
    render(
      <OrderFeedback
        orderId={orderId}
        onSubmit={mockOnSubmit}
      />
    );

    await act(async () => {
      // Select rating and submit
      fireEvent.click(screen.getByLabelText('Rate 5 stars'));
      fireEvent.click(screen.getByText('Submit Feedback'));
    });

    await waitFor(() => {
      expect(screen.getByText('Thank you for your feedback!')).toBeInTheDocument();
      expect(screen.getByText('Your feedback helps us improve our service.')).toBeInTheDocument();
    });
  });
}); 