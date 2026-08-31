import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  getStoredProducts,
  getStoredOrders,
  getStoredCustomers,
  subscribeToDataStore
} from '../../services/adminDataStore';
import {
  FaBoxOpen,
  FaCheckCircle,
  FaExclamationTriangle,
  FaShoppingCart,
  FaClock,
  FaDollarSign,
  FaUsers,
  FaPlus,
  FaArrowRight
} from 'react-icons/fa';

const AdminDashboard = () => {
  const [products, setProducts] = useState(getStoredProducts());
  const [orders, setOrders] = useState(getStoredOrders());
  const [customers, setCustomers] = useState(getStoredCustomers());

  useEffect(() => {
    const unsub = subscribeToDataStore(() => {
      setProducts(getStoredProducts());
      setOrders(getStoredOrders());
      setCustomers(getStoredCustomers());
    });
    return unsub;
  }, []);

  // Compute Live Metrics
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.status === 'ACTIVE').length;
  const outOfStock = products.filter((p) => Number(p.stockQuantity) <= 0 || p.stockStatus === 'Out of Stock').length;

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.orderStatus === 'Pending' || o.orderStatus === 'Processing').length;
  const completedOrders = orders.filter((o) => o.orderStatus === 'Delivered' || o.orderStatus === 'Confirmed' || o.orderStatus === 'Shipped').length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const totalCustomersCount = customers.length;

  return (
    <div className="admin-dashboard-page">
      {/* Welcome Banner */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', fontWeight: 700, color: '#2D2523', margin: 0 }}>
            Executive Dashboard
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#7A6965', margin: '4px 0 0 0' }}>
            Real-time analytics and inventory status for Diya Handcrafts
          </p>
        </div>
        <NavLink
          to="/admin/products/add"
          style={{
            background: 'linear-gradient(135deg, #E8C86A 0%, #C89B3C 100%)',
            color: '#FFFFFF',
            padding: '10px 20px',
            borderRadius: '50px',
            fontWeight: 700,
            textDecoration: 'none',
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 12px rgba(200, 155, 60, 0.3)'
          }}
        >
          <FaPlus /> Add New Product
        </NavLink>
      </div>

      {/* Summary Stat Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
        {/* Card 1: Total Products */}
        <div style={{ background: '#FFFFFF', padding: '1.4rem', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.2)', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#7A6965', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total Products</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#FEF3C7', color: '#B45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FaBoxOpen /></div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#2D2523' }}>{totalProducts}</div>
          <div style={{ fontSize: '0.78rem', color: '#16A34A', marginTop: '4px' }}>{activeProducts} Active catalog items</div>
        </div>

        {/* Card 2: Out of Stock */}
        <div style={{ background: '#FFFFFF', padding: '1.4rem', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.2)', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#7A6965', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Out of Stock</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#FEE2E2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FaExclamationTriangle /></div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#2D2523' }}>{outOfStock}</div>
          <div style={{ fontSize: '0.78rem', color: outOfStock > 0 ? '#DC2626' : '#16A34A', marginTop: '4px' }}>
            {outOfStock > 0 ? 'Requires stock replenishment' : 'All items in stock'}
          </div>
        </div>

        {/* Card 3: Total Orders */}
        <div style={{ background: '#FFFFFF', padding: '1.4rem', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.2)', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#7A6965', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total Orders</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#E0F2FE', color: '#0369A1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FaShoppingCart /></div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#2D2523' }}>{totalOrders}</div>
          <div style={{ fontSize: '0.78rem', color: '#0284C7', marginTop: '4px' }}>{pendingOrders} Orders pending fulfillment</div>
        </div>

        {/* Card 4: Total Revenue */}
        <div style={{ background: '#FFFFFF', padding: '1.4rem', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.2)', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#7A6965', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total Revenue</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#DCFCE7', color: '#15803D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FaDollarSign /></div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#2D2523' }}>₹{totalRevenue.toLocaleString()}</div>
          <div style={{ fontSize: '0.78rem', color: '#15803D', marginTop: '4px' }}>From {completedOrders} completed transactions</div>
        </div>
      </div>

      {/* Analytics Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Sales Trend Chart (Lightweight SVG) */}
        <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2D2523', margin: '0 0 1rem 0' }}>📈 Sales & Order Trends</h3>
          <div style={{ height: '180px', display: 'flex', alignItems: 'flex-end', gap: '12px', padding: '10px 0', borderBottom: '1px solid #E5DFD5' }}>
            {[
              { label: 'Mon', height: '40%', val: '₹3,400' },
              { label: 'Tue', height: '65%', val: '₹5,200' },
              { label: 'Wed', height: '50%', val: '₹4,100' },
              { label: 'Thu', height: '85%', val: '₹7,800' },
              { label: 'Fri', height: '70%', val: '₹6,100' },
              { label: 'Sat', height: '95%', val: '₹9,400' },
              { label: 'Sun', height: '60%', val: '₹5,000' }
            ].map((bar, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '0.68rem', color: '#7A6965', fontWeight: 600 }}>{bar.val}</span>
                <div style={{ width: '100%', height: bar.height, background: 'linear-gradient(180deg, #E8C86A 0%, #C89B3C 100%)', borderRadius: '6px 6px 0 0' }}></div>
                <span style={{ fontSize: '0.72rem', color: '#7A6965', fontWeight: 700 }}>{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2D2523', margin: '0 0 1rem 0' }}>🎨 Category Distribution</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { name: 'Resin Art Collection', count: 20, pct: 40, color: '#C89B3C' },
              { name: 'Bridal Thread Work', count: 8, pct: 25, color: '#8B5CF6' },
              { name: 'Chocolates & Biscuits', count: 12, pct: 20, color: '#EC4899' },
              { name: 'Customized Gifts & Chains', count: 8, pct: 15, color: '#3B82F6' }
            ].map((cat, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, color: '#2D2523', marginBottom: '4px' }}>
                  <span>{cat.name}</span>
                  <span style={{ color: '#7A6965' }}>{cat.count} items ({cat.pct}%)</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#F3EFEA', borderRadius: '50px', overflow: 'hidden' }}>
                  <div style={{ width: `${cat.pct}%`, height: '100%', background: cat.color, borderRadius: '50px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.2)', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2D2523', margin: 0 }}>🛍️ Recent Customer Orders</h3>
          <NavLink to="/admin/orders" style={{ fontSize: '0.85rem', fontWeight: 700, color: '#C89B3C', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
            View All Orders <FaArrowRight />
          </NavLink>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E5DFD5', color: '#7A6965', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <th style={{ padding: '10px' }}>Order ID</th>
                <th style={{ padding: '10px' }}>Customer</th>
                <th style={{ padding: '10px' }}>Product</th>
                <th style={{ padding: '10px' }}>Amount</th>
                <th style={{ padding: '10px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #F3EFEA' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 700, color: '#2D2523' }}>{order.id}</td>
                  <td style={{ padding: '12px 10px' }}>{order.customerName}</td>
                  <td style={{ padding: '12px 10px', color: '#5A4A42' }}>{order.items[0]?.name || 'Custom Product'}</td>
                  <td style={{ padding: '12px 10px', fontWeight: 700, color: '#C89B3C' }}>₹{order.totalAmount}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '50px',
                        background: order.orderStatus === 'Confirmed' ? '#DCFCE7' : order.orderStatus === 'Processing' ? '#FEF3C7' : '#E0F2FE',
                        color: order.orderStatus === 'Confirmed' ? '#15803D' : order.orderStatus === 'Processing' ? '#B45309' : '#0369A1'
                      }}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
