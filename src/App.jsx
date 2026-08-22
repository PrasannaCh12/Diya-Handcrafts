import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CartDrawer from './components/CartDrawer';
import WhatsAppButton from './components/WhatsAppButton';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ShopPage from './pages/ShopPage';
import ThreadWorkPage from './pages/ThreadWorkPage';
import ResinArtPage from './pages/ResinArtPage';
import ChocolatePage from './pages/ChocolatePage';
import BiscuitPage from './pages/BiscuitPage';
import CustomOrderPage from './pages/CustomOrderPage';
import ContactPage from './pages/ContactPage';
import WeddingItemsPage from './pages/WeddingItemsPage';
import CustomizedChainsPage from './pages/CustomizedChainsPage';
import CustomizedGiftsPage from './pages/CustomizedGiftsPage';

function App() {
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
                onAddToCart={handleAddToCart} 
              />
            } 
          />
          <Route path="/about" element={<AboutPage />} />
          <Route 
            path="/shop" 
            element={
              <ShopPage 
                onAddToCart={handleAddToCart} 
              />
            } 
          />
          <Route 
            path="/threadwork" 
            element={<ThreadWorkPage />} 
          />
          <Route 
            path="/resinart" 
            element={<ResinArtPage />} 
          />
          <Route 
            path="/wedding-marriage-items" 
            element={<WeddingItemsPage />} 
          />
          <Route 
            path="/customized-chains" 
            element={<CustomizedChainsPage />} 
          />
          <Route 
            path="/chocolates" 
            element={<ChocolatePage />} 
          />
          <Route 
            path="/biscuits" 
            element={<BiscuitPage />} 
          />
          <Route 
            path="/customized-gifts" 
            element={<CustomizedGiftsPage />} 
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
