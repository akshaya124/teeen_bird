
import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer group"
      onClick={() => onSelectProduct(product)}
    >
      <div className="relative">
        <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover"/>
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-opacity duration-300"></div>
        <span className="absolute top-2 left-2 bg-accent text-primary text-xs font-bold px-2 py-1 rounded">{product.category}</span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary truncate">{product.name}</h3>
        <p className="text-2xl font-bold text-accent mt-2">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
