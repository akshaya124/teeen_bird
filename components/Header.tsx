import React from 'react';
// FIX: The `View` enum is used as a value, so it needs to be imported as a value, not just a type.
import { View } from '../types';
import { ShoppingBagIcon, StoreIcon, SearchIcon } from './IconComponents';

interface HeaderProps {
  cartItemCount: number;
  onNavigate: (view: View) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onNavigate, searchTerm, onSearchChange }) => {
  return (
    <header className="bg-secondary shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center gap-4">
        <div 
          className="flex items-center space-x-2 cursor-pointer flex-shrink-0"
          // FIX: Used View.PRODUCTS enum member to match the expected type for onNavigate.
          onClick={() => onNavigate(View.PRODUCTS)}
        >
          <StoreIcon className="w-8 h-8 text-accent" />
          <h1 className="text-white text-2xl font-bold tracking-tight hidden sm:block">teen_bird</h1>
        </div>
        
        <div className="relative flex-grow max-w-xl">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-primary text-white placeholder-gray-400 border border-gray-600 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
            aria-label="Search products"
          />
        </div>

        <div 
          className="relative cursor-pointer flex-shrink-0"
          // FIX: Used View.CART enum member to match the expected type for onNavigate.
          onClick={() => onNavigate(View.CART)}
        >
          <ShoppingBagIcon className="w-8 h-8 text-white hover:text-accent transition-colors duration-300" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-accent text-primary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;