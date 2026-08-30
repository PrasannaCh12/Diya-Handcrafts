import React, { useState, useEffect } from 'react';
import { getStoredCustomers, subscribeToDataStore } from '../../services/adminDataStore';
import { FaUsers, FaEnvelope, FaPhone, FaShoppingBag, FaSearch, FaUserCheck, FaRupeeSign, FaCalendarAlt } from 'react-icons/fa';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState(getStoredCustomers());
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsub = subscribeToDataStore(() => {
      setCustomers(getStoredCustomers());
    });
    return unsub;
  }, []);

  const filteredCustomers = customers.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      (c.name && c.name.toLowerCase().includes(q)) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      (c.phone && c.phone.toLowerCase().includes(q))
    );
  });

  const totalRevenue = customers.reduce((sum, c) => sum + Number(c.totalSpent || 0), 0);
  const totalOrders = customers.reduce((sum, c) => sum + Number(c.ordersCount || 0), 0);

  return (
    <div className="admin-customers-page">
      {/* Header */}
      <div className="customers-header-row">
        <div>
          <h1 className="page-heading">
            <FaUsers style={{ color: '#D4AF37' }} /> Customer Directory & CRM
          </h1>
          <p className="page-subheading">
            All customers placing orders or submitting inquiries from the website/WhatsApp are automatically recorded here.
          </p>
        </div>

        {/* Search */}
        <div className="search-bar-wrap">
          <FaSearch style={{ color: '#9C8E7F' }} />
          <input
            type="text"
            placeholder="Search by customer name, phone, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* KPI Stats */}
      <div className="crm-stats-grid">
        <div className="crm-stat-box">
          <div className="crm-stat-icon icon-users"><FaUsers /></div>
          <div>
            <div className="crm-stat-val">{customers.length}</div>
            <div className="crm-stat-lbl">Registered Customers</div>
          </div>
        </div>

        <div className="crm-stat-box">
          <div className="crm-stat-icon icon-orders"><FaShoppingBag /></div>
          <div>
            <div className="crm-stat-val">{totalOrders}</div>
            <div className="crm-stat-lbl">Total Orders Placed</div>
          </div>
        </div>

        <div className="crm-stat-box">
          <div className="crm-stat-icon icon-revenue"><FaRupeeSign /></div>
          <div>
            <div className="crm-stat-val">₹{totalRevenue.toLocaleString()}</div>
            <div className="crm-stat-lbl">Customer Lifetime Value</div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-container-box">
        <div style={{ overflowX: 'auto' }}>
          <table className="customers-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Email Address</th>
                <th>WhatsApp / Phone</th>
                <th>Orders Placed</th>
                <th>Total Spent</th>
                <th>Last Active / Order</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: '#7A6B5E' }}>
                    <FaUsers style={{ fontSize: '2.5rem', color: '#D4C5B9', marginBottom: '0.5rem' }} />
                    <p style={{ margin: 0, fontWeight: 700 }}>No customer records found matching "{searchQuery}"</p>
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <div className="cust-name-cell">
                        <div className="cust-avatar">{c.name ? c.name.charAt(0).toUpperCase() : 'C'}</div>
                        <div>
                          <div className="cust-name">{c.name}</div>
                          <span className="cust-id-sub">{c.id}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="contact-chip">
                        <FaEnvelope style={{ color: '#C79A2B' }} /> {c.email || 'N/A'}
                      </span>
                    </td>
                    <td>
                      <a
                        href={`https://wa.me/${(c.phone || '').replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-chip whatsapp-chip"
                        title="Chat on WhatsApp"
                      >
                        <FaPhone style={{ color: '#25D366' }} /> {c.phone}
                      </a>
                    </td>
                    <td>
                      <span className="orders-count-badge">
                        <FaShoppingBag /> {c.ordersCount || 1} order{(c.ordersCount || 1) > 1 ? 's' : ''}
                      </span>
                    </td>
                    <td className="total-spent-cell">
                      ₹{Number(c.totalSpent || 0).toLocaleString()}
                    </td>
                    <td className="last-order-cell">
                      <FaCalendarAlt style={{ marginRight: '5px', color: '#9C8E7F' }} />
                      {c.lastOrder || 'Recent'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .admin-customers-page {
          padding: 1.5rem;
          max-width: 1350px;
          margin: 0 auto;
        }

        .customers-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }

        .page-heading {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2rem;
          font-weight: 700;
          color: #2D2523;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .page-subheading {
          font-size: 0.88rem;
          color: #7A6B5E;
          margin: 4px 0 0 0;
        }

        .search-bar-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #FFFFFF;
          border: 1px solid #E8D8B5;
          border-radius: 50px;
          padding: 0.55rem 1.15rem;
          min-width: 320px;
        }

        .search-bar-wrap input {
          border: none;
          background: transparent;
          outline: none;
          font-size: 0.88rem;
          width: 100%;
          color: #2D2523;
        }

        .crm-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.25rem;
          margin-bottom: 1.75rem;
        }

        .crm-stat-box {
          background: #FFFFFF;
          border: 1px solid #E8D8B5;
          border-radius: 14px;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
        }

        .crm-stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.35rem;
        }

        .icon-users {
          background: #FAF5EF;
          color: #C79A2B;
        }

        .icon-orders {
          background: #E8F5E9;
          color: #2E7D32;
        }

        .icon-revenue {
          background: #FFF8E1;
          color: #F57F17;
        }

        .crm-stat-val {
          font-size: 1.6rem;
          font-weight: 800;
          color: #2D2523;
          line-height: 1;
        }

        .crm-stat-lbl {
          font-size: 0.78rem;
          color: #7A6B5E;
          font-weight: 600;
          margin-top: 4px;
        }

        .table-container-box {
          background: #FFFFFF;
          border-radius: 16px;
          border: 1px solid #E8D8B5;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
          overflow: hidden;
        }

        .customers-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.88rem;
        }

        .customers-table thead tr {
          background: #FAF7F2;
          border-bottom: 1px solid #E8D8B5;
          color: #7A6B5E;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .customers-table th {
          padding: 14px 16px;
          font-weight: 700;
        }

        .customers-table tbody tr {
          border-bottom: 1px solid #F3EFEA;
          transition: background 0.15s;
        }

        .customers-table tbody tr:hover {
          background: #FFFDF9;
        }

        .customers-table td {
          padding: 14px 16px;
          vertical-align: middle;
        }

        .cust-name-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .cust-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #2D2523;
          color: #E8C86A;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1rem;
        }

        .cust-name {
          font-weight: 700;
          color: #2D2523;
          font-size: 0.95rem;
        }

        .cust-id-sub {
          font-size: 0.72rem;
          color: #A89F91;
        }

        .contact-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #4A3B30;
          text-decoration: none;
          font-size: 0.82rem;
        }

        .whatsapp-chip {
          background: #FAF7F2;
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid #E8D8B5;
          font-weight: 600;
        }

        .whatsapp-chip:hover {
          background: #E8F5E9;
          border-color: #A5D6A7;
        }

        .orders-count-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #FAF5EF;
          border: 1px solid #E8D8B5;
          color: #C79A2B;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 20px;
        }

        .total-spent-cell {
          font-weight: 800;
          color: #C79A2B;
          font-size: 0.95rem;
        }

        .last-order-cell {
          color: #7A6B5E;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default AdminCustomers;
