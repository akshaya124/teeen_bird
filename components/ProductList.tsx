import React, { useState, useMemo } from 'react';
import type { Product } from '../types';
import useProducts from '../hooks/useProducts';
import ProductCard from './ProductCard';
import { LoaderIcon } from './IconComponents';

interface ProductListProps {
  onSelectProduct: (product: Product) => void;
  searchTerm: string;
}

const ProductList: React.FC<ProductListProps> = ({ onSelectProduct, searchTerm }) => {
  const { products, loading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [inputPrice, setInputPrice] = useState({ min: '', max: '' });

  const categories = useMemo(() => {
    if (products.length === 0) return [];
    return ['All', ...Array.from(new Set(products.map(p => p.category)))];
  }, [products]);

  const handlePriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputPrice(prev => ({ ...prev, [name]: value }));

    const numValue = parseFloat(value);
    if (value === '') {
      setPriceRange(prev => ({ ...prev, [name]: name === 'min' ? 0 : Infinity }));
    } else if (!isNaN(numValue)) {
      setPriceRange(prev => ({ ...prev, [name]: numValue }));
    }
  };

  const filteredAndSortedProducts = useMemo(() => {
    let tempProducts = products.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

    // Filter by category
    if (selectedCategory !== 'All') {
      tempProducts = tempProducts.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      tempProducts = tempProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    const sortedProducts = [...tempProducts];
    switch (sortOption) {
      case 'price-asc':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // 'featured' or default case, no change from original order
        break;
    }

    return sortedProducts;
  }, [products, selectedCategory, searchTerm, sortOption, priceRange]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoaderIcon className="w-12 h-12 text-accent animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg">
        <h2 className="text-xl font-bold">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-white tracking-tight lg:text-5xl">The Drop</h1>
        <p className="mt-4 text-lg text-gray-400">Vibe-checked essentials for your space & style.</p>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex justify-center flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 ${
                selectedCategory === category
                  ? 'bg-accent text-primary shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2">
            <label htmlFor="min-price" className="text-sm font-medium text-gray-300">Price:</label>
            <input
              type="number"
              id="min-price"
              name="min"
              placeholder="Min"
              value={inputPrice.min}
              onChange={handlePriceInputChange}
              className="w-24 px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent text-sm"
              aria-label="Minimum price"
              min="0"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              id="max-price"
              name="max"
              placeholder="Max"
              value={inputPrice.max}
              onChange={handlePriceInputChange}
              className="w-24 px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent text-sm"
              aria-label="Maximum price"
              min="0"
            />
          </div>

          <div className="flex-shrink-0">
            <label htmlFor="sort-options" className="sr-only">Sort by</label>
            <select
              id="sort-options"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>


      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredAndSortedProducts.map(product => (
            <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-2xl font-bold text-white">No Products Found</h3>
          <p className="mt-2 text-gray-400">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductList;