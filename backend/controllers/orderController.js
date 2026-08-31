let ordersStore = [
  {
    id: 'DH-892401',
    customerName: 'Shamanth Kumar',
    email: 'shamanth.k@gmail.com',
    phone: '+91 98765 43210',
    date: '2026-08-28T14:32:00Z',
    items: [
      { id: 'resin-001', name: 'Personalized Resin Anniversary Photo Plaque', quantity: 1, customName: 'Shamanth & Vani' }
    ],
    totalAmount: 1899,
    paymentStatus: 'PAID',
    orderStatus: 'Confirmed',
    shippingAddress: 'Plot 42, Jubilee Hills, Hyderabad, Telangana'
  },
  {
    id: 'DH-581923',
    customerName: 'Ananya Sharma',
    email: 'ananya.s@outlook.com',
    phone: '+91 91234 56789',
    date: '2026-08-29T09:15:00Z',
    items: [
      { id: 'resin-00', name: 'Personalized Resin Photo Frame – Happy Birthday', quantity: 1, customName: 'Akhil Birthday' }
    ],
    totalAmount: 1299,
    paymentStatus: 'PAID',
    orderStatus: 'Processing',
    shippingAddress: 'Flat 301, Rosewood Apartments, Bangalore, Karnataka'
  },
  {
    id: 'DH-391024',
    customerName: 'Priya Reddy',
    email: 'priya.reddy@yahoo.com',
    phone: '+91 99887 76655',
    date: '2026-08-29T10:45:00Z',
    items: [
      { id: 'bangle-01', name: 'Royal Zardosi & Velvet Bridal Bangle Set', quantity: 2, customName: 'Red Lehenga Set' }
    ],
    totalAmount: 3798,
    paymentStatus: 'PAID',
    orderStatus: 'Shipped',
    shippingAddress: 'Door 12-4-5, Anna Nagar, Chennai, Tamil Nadu'
  }
];

export const getOrders = (req, res) => {
  res.json({ success: true, orders: ordersStore });
};

export const createOrder = (req, res) => {
  const { customerName, email, phone, shippingAddress, items = [], totalAmount, orderId, customNotes } = req.body;
  const finalOrderId = orderId || `DH-${Math.floor(100000 + Math.random() * 900000)}`;
  const timestamp = new Date().toISOString();

  const calculatedTotal = Number(totalAmount) || items.reduce((sum, i) => sum + (Number(i.price || 0) * Number(i.quantity || 1)), 0);

  const newOrder = {
    id: finalOrderId,
    customerName: customerName || 'Valued Customer',
    email: email || 'N/A',
    phone: phone || 'N/A',
    date: timestamp,
    items: items.map((it) => ({
      id: it.id || 'custom',
      name: it.name || it.title || 'Handmade Item',
      quantity: it.quantity || 1,
      price: it.price || 0,
      customName: it.customName || it.selectedSize || ''
    })),
    totalAmount: calculatedTotal,
    paymentStatus: 'WHATSAPP ENQUIRY',
    orderStatus: 'Pending',
    shippingAddress: shippingAddress || 'Pending Confirmation via WhatsApp',
    notes: customNotes || ''
  };

  ordersStore = [newOrder, ...ordersStore];
  res.status(201).json({ success: true, order: newOrder, orderId: finalOrderId });
};

export const updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const { orderStatus } = req.body;

  const idx = ordersStore.findIndex((o) => o.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  ordersStore[idx].orderStatus = orderStatus;
  ordersStore[idx].updatedAt = new Date().toISOString();

  res.json({ success: true, order: ordersStore[idx] });
};
