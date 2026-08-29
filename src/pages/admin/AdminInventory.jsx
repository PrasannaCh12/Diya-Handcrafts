import React, { useState, useEffect } from 'react';
import { getStoredProducts, updateProduct, subscribeToDataStore } from '../../services/adminDataStore';
import { FaWarehouse, FaExclamationTriangle, FaCheckCircle, FaSave } from 'react-icons/fa';

const AdminInventory = () => {
  const [products, setProducts] = useState(getStoredProducts());
  const [filterType, setFilterType] = useState('ALL'); // ALL, LOW_STOCK, OUT_OF_STOCK
  const [stockEdits, setStockEdits] = useState({});

  useEffect(() => {
    const unsub = subscribeToDataStore(() => {
      setProducts(getStoredProducts());
    });
    return unsub;
  }, []);

  const handleQuantityChange = (id, value) => {
    setStockEdits((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveStock = (id) => {
    const newQty = Number(stockEdits[id]);
    if (isNaN(newQty) || newQty < 0) return;

    updateProduct(id, { stockQuantity: newQty });
    setStockEdits((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const filteredProducts = products.filter((p) => {
    const qty = Number(p.stockQuantity ?? 20);
    if (filterType === 'LOW_STOCK') return qty > 0 && qty <= 5;
    if (filterType === 'OUT_OF_STOCK') return qty <= 0;
    return true;
  });

  return (
    <div className="admin-inventory-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', fontWeight: 700, margin: 0 }}>Inventory & Stock Manager</h1>
          <p style={{ fontSize: '0.9rem', color: '#7A6965', margin: '4px 0 0 0' }}>Adjust stock counts, manage low-stock thresholds & availability</p>
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{ padding: '9px 16px', borderRadius: '50px', border: '1px solid #E5DFD5', fontSize: '0.88rem', outline: 'none', background: '#FFF' }}
        >
          <option value="ALL">All Items ({products.length})</option>
          <option value="LOW_STOCK">Low Stock (≤ 5 units)</option>
          <option value="OUT_OF_STOCK">Out of Stock (0 units)</option>
        </select>
      </div>

      <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.2)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: '#FAF8F5', borderBottom: '1px solid #E5DFD5', color: '#7A6965', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <th style={{ padding: '14px 16px' }}>Product</th>
                <th style={{ padding: '14px 16px' }}>SKU</th>
                <th style={{ padding: '14px 16px' }}>Category</th>
                <th style={{ padding: '14px 16px' }}>Current Stock</th>
                <th style={{ padding: '14px 16px' }}>Stock Alert</th>
                <th style={{ padding: '14px 16px', textAlign: 'right' }}>Quick Update</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => {
                const qty = Number(p.stockQuantity ?? 20);
                const isEdited = stockEdits[p.id] !== undefined;
                const displayQty = isEdited ? stockEdits[p.id] : qty;

                return (
                  <tr key={p.id} style={{ borderBottom: '1px solid #F3EFEA' }}>
                    <td style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={p.image || '/logo192.png'} alt={p.name} style={{ width: '42px', height: '42px', objectFit: 'cover', borderRadius: '8px' }} />
                      <div style={{ fontWeight: 700, color: '#2D2523' }}>{p.name}</div>
                    </td>

                    <td style={{ padding: '14px 16px', fontFamily: 'monospace', color: '#7A6965' }}>{p.sku || `SKU-${p.id}`}</td>
                    <td style={{ padding: '14px 16px', color: '#5A4A42' }}>{p.category}</td>

                    <td style={{ padding: '14px 16px', fontWeight: 700 }}>
                      <span style={{ fontSize: '1rem', color: qty <= 0 ? '#DC2626' : qty <= 5 ? '#B45309' : '#16A34A' }}>
                        {qty} units
                      </span>
                    </td>

                    <td style={{ padding: '14px 16px' }}>
                      {qty <= 0 ? (
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '50px', background: '#FEE2E2', color: '#DC2626' }}>
                          ⚠️ Out of Stock
                        </span>
                      ) : qty <= 5 ? (
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '50px', background: '#FEF3C7', color: '#B45309' }}>
                          ⚠️ Low Stock Alert
                        </span>
                      ) : (
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '50px', background: '#DCFCE7', color: '#15803D' }}>
                          ✓ Optimal Stock
                        </span>
                      )}
                    </td>

                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <input
                          type="number"
                          value={displayQty}
                          onChange={(e) => handleQuantityChange(p.id, e.target.value)}
                          style={{ width: '70px', padding: '6px 8px', borderRadius: '8px', border: '1px solid #E5DFD5', fontSize: '0.88rem', fontWeight: 700, textAlign: 'center' }}
                        />

                        {isEdited && (
                          <button
                            onClick={() => handleSaveStock(p.id)}
                            style={{ background: '#16A34A', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                          >
                            <FaSave /> Save
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminInventory;
