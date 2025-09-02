import React, { useState, useCallback, useMemo } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import OrderConfirmation from './components/OrderConfirmation';
import type { Product, CartItem } from './types';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSelectProduct = useCallback((product: Product) => {
    setSelectedProduct(product);
    setCurrentView(View.DETAIL);
  }, []);

  const handleAddToCart = useCallback((product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
    setCurrentView(View.CART);
  }, []);

  const handleUpdateCart = useCallback((productId: number, quantity: number) => {
    setCart(prevCart => {
      if (quantity <= 0) {
        return prevCart.filter(item => item.product.id !== productId);
      }
      return prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );
    });
  }, []);

  const handleRemoveFromCart = useCallback((productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  }, []);

  const handleNavigate = useCallback((view: View) => {
    setCurrentView(view);
  }, []);
  
  const handleCheckout = useCallback(() => {
    setCart([]);
    setCurrentView(View.CONFIRMATION);
  }, []);

  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
    // If user starts typing a search query, navigate to products page
    if (term.length > 0 && currentView !== View.PRODUCTS) {
      setCurrentView(View.PRODUCTS);
    }
  }, [currentView]);

  const cartItemCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const renderContent = () => {
    switch (currentView) {
      case View.PRODUCTS:
        return <ProductList onSelectProduct={handleSelectProduct} searchTerm={searchTerm} />;
      case View.DETAIL:
        return selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onBack={() => handleNavigate(View.PRODUCTS)}
          />
        ) : (
          <ProductList onSelectProduct={handleSelectProduct} searchTerm={searchTerm} />
        );
      case View.CART:
        return (
          <CartView
            cart={cart}
            onUpdateCart={handleUpdateCart}
            onRemoveFromCart={handleRemoveFromCart}
            onCheckout={() => handleNavigate(View.CHECKOUT)}
          />
        );
      case View.CHECKOUT:
        return <CheckoutView cart={cart} onPlaceOrder={handleCheckout} />;
      case View.CONFIRMATION:
        return <OrderConfirmation onContinueShopping={() => handleNavigate(View.PRODUCTS)} />;
      default:
        return <ProductList onSelectProduct={handleSelectProduct} searchTerm={searchTerm}/>;
    }
  };

  return (
    <div className="font-sans antialiased text-gray-200">
      <Header 
        cartItemCount={cartItemCount} 
        onNavigate={handleNavigate}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      <main className="container mx-auto p-4 md:p-8">
        {renderContent()}
      </main>
      <footer className="bg-secondary text-white text-center p-4 mt-8">
        <p>&copy; 2024 teen_bird. All vibes reserved.</p>
      </footer>
    </div>
  );
};

export default App;