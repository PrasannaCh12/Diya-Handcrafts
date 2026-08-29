import React, { useState, useEffect } from 'react';
import { getStoredCustomers, subscribeToDataStore } from '../../services/adminDataStore';
import { FaUsers, FaEnvelope, FaPhone, FaShoppingBag } from 'react-icons/fa';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState(getStoredCustomers());

  useEffect(() => {
    const unsub = subscribeToDataStore(() => {
      setCustomers(getStoredCustomers());
    });
    return unsub;
  }, []);

  return (
    <div className="admin-customers-page">
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', fontWeight: 700, margin: 0 }}>Customer Directory</h1>
        <p style={{ fontSize: '0.9rem', color: '#7A6965', margin: '4px 0 0 0' }}>Manage customer contacts & transaction history</p>
      </div>

      <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.2)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: '#FAF8F5', borderBottom: '1px solid #E5DFD5', color: '#7A6965', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <th style={{ padding: '14px 16px' }}>Customer Name</th>
                <th style={{ padding: '14px 16px' }}>Email</th>
                <th style={{ padding: '14px 16px' }}>Phone</th>
                <th style={{ padding: '14px 16px' }}>Orders Count</th>
                <th style={{ padding: '14px 16px' }}>Total Spent</th>
                <th style={{ padding: '14px 16px' }}>Last Order</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid #F3EFEA' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#2D2523' }}>{c.name}</td>
                  <td style={{ padding: '14px 16px', color: '#5A4A42' }}><FaEnvelope style={{ color: '#C89B3C', marginRight: '6px' }} />{c.email}</td>
                  <td style={{ padding: '14px 16px', color: '#5A4A42' }}><FaPhone style={{ color: '#C89B3C', marginRight: '6px' }} />{c.phone}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 700 }}>{c.ordersCount} orders</td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#C89B3C' }}>₹{c.totalSpent.toLocaleString()}</td>
                  <td style={{ padding: '14px 16px', color: '#7A6965' }}>{c.lastOrder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;
