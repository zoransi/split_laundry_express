import React, { createContext, useContext, useState } from 'react';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || '');

interface PaymentContextType {
  clientSecret: string | null;
  setClientSecret: (secret: string) => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const options: StripeElementsOptions = {
    mode: 'payment',
    amount: 0,
    currency: 'usd',
    appearance: {
      theme: 'stripe',
    },
  };

  return (
    <PaymentContext.Provider value={{ clientSecret, setClientSecret }}>
      <Elements stripe={stripePromise} options={options}>
        {children}
      </Elements>
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
}; 