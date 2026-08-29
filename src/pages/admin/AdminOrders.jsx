import React, { useState, useEffect } from 'react';
import { getStoredOrders, updateOrderStatus, subscribeToDataStore } from '../../services/adminDataStore';
import { FaShoppingCart, FaCheck, FaTruck, FaClock, FaTimesCircle } from 'react-icons/fa';

const ORDER_STATUSES = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const AdminOrders = () => {
  const [orders, setOrders] = useState(getStoredOrders());
  const [filterStatus, setFilterStatus] = useState('ALL');

  useEffect(() => {
    const unsub = subscribeToDataStore(() => {
      setOrders(getStoredOrders());
    });
    return unsub;
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const filteredOrders = orders.filter((o) => filterStatus === 'ALL' || o.orderStatus === filterStatus);

  return (
    <div className="admin-orders-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', fontWeight: 700, margin: 0 }}>Order Management</h1>
          <p style={{ fontSize: '0.9rem', color: '#7A6965', margin: '4px 0 0 0' }}>Track customer enquiries, orders & fulfillment status</p>
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ padding: '9px 16px', borderRadius: '50px', border: '1px solid #E5DFD5', fontSize: '0.88rem', outline: 'none', background: '#FFF' }}
        >
          <option value="ALL">All Order Statuses</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.2)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: '#FAF8F5', borderBottom: '1px solid #E5DFD5', color: '#7A6965', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <th style={{ padding: '14px 16px' }}>Order ID</th>
                <th style={{ padding: '14px 16px' }}>Customer</th>
                <th style={{ padding: '14px 16px' }}>Items & Custom Name</th>
                <th style={{ padding: '14px 16px' }}>Amount</th>
                <th style={{ padding: '14px 16px' }}>Order Status</th>
                <th style={{ padding: '14px 16px' }}>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: '#7A6965' }}>
                    <FaShoppingCart style={{ fontSize: '2.5rem', color: '#D4C5B9', marginBottom: '0.5rem' }} />
                    <p style={{ margin: 0, fontWeight: 700 }}>No orders found for selected status</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => (
                  <tr key={o.id} style={{ borderBottom: '1px solid #F3EFEA' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#2D2523' }}>{o.id}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 700, color: '#2D2523' }}>{o.customerName}</div>
                      <div style={{ fontSize: '0.78rem', color: '#7A6965' }}>{o.phone}</div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      {o.items.map((item, idx) => (
                        <div key={idx} style={{ marginBottom: '4px' }}>
                          <span style={{ fontWeight: 600, color: '#2D2523' }}>{item.name}</span>
                          {item.customName && <div style={{ fontSize: '0.78rem', color: '#C89B3C', fontWeight: 700 }}>Custom: "{item.customName}"</div>}
                        </div>
                      ))}
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#C89B3C' }}>₹{o.totalAmount}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '4px 12px',
                          borderRadius: '50px',
                          background: o.orderStatus === 'Delivered' ? '#DCFCE7' : o.orderStatus === 'Shipped' ? '#E0F2FE' : '#FEF3C7',
                          color: o.orderStatus === 'Delivered' ? '#15803D' : o.orderStatus === 'Shipped' ? '#0369A1' : '#B45309'
                        }}
                      >
                        {o.orderStatus}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <select
                        value={o.orderStatus}
                        onChange={(e) => handleStatusChange(o.id, e.target.value)}
                        style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #E5DFD5', fontSize: '0.82rem', background: '#FFF', cursor: 'pointer' }}
                      >
                        {ORDER_STATUSES.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
