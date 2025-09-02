
import React from 'react';
import type { CartItem } from '../types';
import { TrashIcon } from './IconComponents';

interface CartViewProps {
  cart: CartItem[];
  onUpdateCart: (productId: number, quantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
  onCheckout: () => void;
}

const CartView: React.FC<CartViewProps> = ({ cart, onUpdateCart, onRemoveFromCart, onCheckout }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="text-center bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-primary mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600">Looks like you haven't added anything to your cart yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-4 md:p-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Your Shopping Cart</h1>
      <div className="space-y-4">
        {cart.map(item => (
          <div key={item.product.id} className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center space-x-4">
              <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 object-cover rounded-md" />
              <div>
                <h3 className="font-semibold text-lg">{item.product.name}</h3>
                <p className="text-gray-500">${item.product.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
               <input 
                type="number" 
                value={item.quantity}
                onChange={(e) => onUpdateCart(item.product.id, parseInt(e.target.value))}
                className="w-16 text-center border rounded-md"
                min="1"
              />
              <p className="font-semibold w-24 text-right">${(item.product.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => onRemoveFromCart(item.product.id)} className="text-red-500 hover:text-red-700">
                <TrashIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-end items-center">
        <div className="text-right">
          <p className="text-xl font-bold">Subtotal: <span className="text-accent">${subtotal.toFixed(2)}</span></p>
          <p className="text-gray-500 text-sm">Taxes and shipping calculated at checkout.</p>
          <button onClick={onCheckout} className="mt-4 bg-accent text-primary font-bold py-3 px-8 rounded-lg hover:bg-accent-hover transition-colors duration-300">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartView;
