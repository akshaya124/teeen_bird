
import React, { useState } from 'react';
import type { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, onBack }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-4 md:p-8 animate-fade-in">
      <button onClick={onBack} className="mb-6 text-accent hover:text-accent-hover font-semibold transition-colors duration-300">
        &larr; Back to Products
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.imageUrl} alt={product.name} className="w-full h-auto rounded-lg shadow-lg object-cover" style={{maxHeight: '500px'}}/>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-sm font-bold uppercase text-gray-500">{product.category}</span>
          <h1 className="text-4xl font-bold text-primary my-2">{product.name}</h1>
          <p className="text-3xl font-light text-accent mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
          
          <div className="flex items-center space-x-4 mb-6">
            <span className="font-semibold">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <button onClick={() => handleQuantityChange(-1)} className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100 rounded-l-md">-</button>
              <span className="px-4 py-1 font-semibold">{quantity}</span>
              <button onClick={() => handleQuantityChange(1)} className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100 rounded-r-md">+</button>
            </div>
          </div>

          <button 
            onClick={() => onAddToCart(product, quantity)}
            className="w-full bg-accent text-primary font-bold py-3 px-6 rounded-lg hover:bg-accent-hover transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 transform hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
