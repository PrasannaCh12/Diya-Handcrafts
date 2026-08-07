import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CartDrawer from './components/CartDrawer';
import ProductModal from './components/ProductModal';
import WhatsAppButton from './components/WhatsAppButton';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ThreadWorkPage from './pages/ThreadWorkPage';
import ResinArtPage from './pages/ResinArtPage';
import ChocolatePage from './pages/ChocolatePage';
import BiscuitPage from './pages/BiscuitPage';
import CustomOrderPage from './pages/CustomOrderPage';
import ContactPage from './pages/ContactPage';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  // Cart operations
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            ...product,
            quantity: product.quantity || 1
          }
        ];
      }
    });
    setCartDrawerOpen(true);
  };

  const handleUpdateQty = (id, newQty) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="divya-app-wrapper">
      <ScrollToTop />

      {/* Header & Navbar */}
      <Navbar
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setCartDrawerOpen(true)}
      />

      {/* Main Multi-Page Route Content */}
      <main className="main-content">
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                onSelectProduct={(p) => setSelectedProduct(p)} 
                onAddToCart={handleAddToCart} 
              />
            } 
          />
          <Route path="/about" element={<AboutPage />} />
          <Route 
            path="/shop" 
            element={
              <ShopPage 
                onSelectProduct={(p) => setSelectedProduct(p)} 
                onAddToCart={handleAddToCart} 
              />
            } 
          />
          <Route 
            path="/product/:id" 
            element={<ProductDetailPage onAddToCart={handleAddToCart} />} 
          />
          <Route 
            path="/threadwork" 
            element={<ThreadWorkPage onSelectProduct={(p) => setSelectedProduct(p)} />} 
          />
          <Route 
            path="/resinart" 
            element={<ResinArtPage onSelectProduct={(p) => setSelectedProduct(p)} />} 
          />
          <Route 
            path="/chocolates" 
            element={<ChocolatePage onSelectProduct={(p) => setSelectedProduct(p)} />} 
          />
          <Route 
            path="/biscuits" 
            element={<BiscuitPage onSelectProduct={(p) => setSelectedProduct(p)} />} 
          />
          <Route path="/custom-order" element={<CustomOrderPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Elements */}
      <WhatsAppButton />

      {/* Modals & Drawers */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}

export default App;
