
import React from 'react';
import { CheckCircleIcon } from './IconComponents';

interface OrderConfirmationProps {
  onContinueShopping: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ onContinueShopping }) => {
  return (
    <div className="text-center bg-white p-8 md:p-16 rounded-lg shadow-xl animate-fade-in">
      <CheckCircleIcon className="w-24 h-24 text-green-500 mx-auto mb-6" />
      <h1 className="text-4xl font-bold text-primary mb-4">Thank You For Your Order!</h1>
      <p className="text-gray-600 text-lg mb-8">
        Your order has been placed successfully. You will receive an email confirmation shortly.
      </p>
      <button 
        onClick={onContinueShopping}
        className="bg-accent text-primary font-bold py-3 px-8 rounded-lg hover:bg-accent-hover transition-colors duration-300"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderConfirmation;
