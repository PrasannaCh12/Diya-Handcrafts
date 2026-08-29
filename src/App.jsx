import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CartDrawer from './components/CartDrawer';
import WhatsAppButton from './components/WhatsAppButton';

// Admin Context & Components
import { AdminAuthProvider } from './context/AdminAuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';

// Admin Pages
import LampLogin from './pages/admin/LampLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminAddEditProduct from './pages/admin/AdminAddEditProduct';
import AdminCategories from './pages/admin/AdminCategories';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminInventory from './pages/admin/AdminInventory';
import AdminSettings from './pages/admin/AdminSettings';

// Customer Pages
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
import CustomizedDollsPage from './pages/CustomizedDollsPage';

function AppContent() {
  const [cartItems, setCartItems] = useState([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

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

      {/* Customer Header & Navbar (Only shown on non-admin routes) */}
      {!isAdminRoute && (
        <Navbar
          cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
          onOpenCart={() => setCartDrawerOpen(true)}
        />
      )}

      {/* Main Content Router */}
      <main className={isAdminRoute ? 'admin-root-content' : 'main-content'}>
        <Routes>
          {/* ------------------- ADMIN ROUTES ------------------- */}
          <Route path="/admin" element={<LampLogin />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requiredPermission="canViewDashboard">
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminProducts />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/products/add"
            element={
              <ProtectedRoute requiredPermission="canAddProducts">
                <AdminLayout>
                  <AdminAddEditProduct />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/products/edit/:id"
            element={
              <ProtectedRoute requiredPermission="canEditProducts">
                <AdminLayout>
                  <AdminAddEditProduct />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute requiredPermission="canManageCategories">
                <AdminLayout>
                  <AdminCategories />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute requiredPermission="canManageOrders">
                <AdminLayout>
                  <AdminOrders />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/customers"
            element={
              <ProtectedRoute requiredPermission="canManageCustomers">
                <AdminLayout>
                  <AdminCustomers />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/inventory"
            element={
              <ProtectedRoute requiredPermission="canManageInventory">
                <AdminLayout>
                  <AdminInventory />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute requiredPermission="canChangeSettings">
                <AdminLayout>
                  <AdminSettings />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* ------------------- CUSTOMER WEBSITE ROUTES ------------------- */}
          <Route path="/" element={<HomePage onAddToCart={handleAddToCart} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shop" element={<ShopPage onAddToCart={handleAddToCart} />} />
          <Route path="/threadwork" element={<ThreadWorkPage />} />
          <Route path="/resinart" element={<ResinArtPage />} />
          <Route path="/wedding-marriage-items" element={<WeddingItemsPage />} />
          <Route path="/customized-chains" element={<CustomizedChainsPage />} />
          <Route path="/chocolates" element={<ChocolatePage />} />
          <Route path="/biscuits" element={<BiscuitPage />} />
          <Route path="/customized-gifts" element={<CustomizedGiftsPage />} />
          <Route path="/customized-dolls" element={<CustomizedDollsPage />} />
          <Route path="/custom-order" element={<CustomOrderPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      {/* Customer Footer & Floating Elements (Only shown on non-admin routes) */}
      {!isAdminRoute && (
        <>
          <Footer />
          <WhatsAppButton />
          <CartDrawer
            isOpen={cartDrawerOpen}
            onClose={() => setCartDrawerOpen(false)}
            cartItems={cartItems}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
          />
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <AdminAuthProvider>
      <AppContent />
    </AdminAuthProvider>
  );
}

export default App;
