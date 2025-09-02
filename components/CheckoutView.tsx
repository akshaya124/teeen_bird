
import React, { useState } from 'react';
import type { CartItem } from '../types';

interface CheckoutViewProps {
  cart: CartItem[];
  onPlaceOrder: () => void;
}

const CheckoutView: React.FC<CheckoutViewProps> = ({ cart, onPlaceOrder }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would process payment here.
    onPlaceOrder();
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({...prevState, [name]: value}));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-primary mb-6">Shipping Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" id="name" name="name" value={formState.name} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" id="email" name="email" value={formState.email} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent" required />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input type="text" id="address" name="address" value={formState.address} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input type="text" id="city" name="city" value={formState.city} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent" required />
            </div>
            <div>
              <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP Code</label>
              <input type="text" id="zip" name="zip" value={formState.zip} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent" required />
            </div>
          </div>
        </form>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-primary mb-6">Order Summary</h2>
        <div className="space-y-3">
          {cart.map(item => (
            <div key={item.product.id} className="flex justify-between">
              <span>{item.product.name} x {item.quantity}</span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <hr className="my-4"/>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Taxes</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-primary">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <button 
          onClick={handleSubmit} 
          className="mt-6 w-full bg-accent text-primary font-bold py-3 px-6 rounded-lg hover:bg-accent-hover transition-colors duration-300"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutView;
