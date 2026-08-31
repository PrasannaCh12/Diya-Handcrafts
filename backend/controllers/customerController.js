let customersStore = [
  { id: 'cust-1', name: 'Shamanth Kumar', email: 'shamanth.k@gmail.com', phone: '+91 98765 43210', ordersCount: 1, totalSpent: 1899, lastOrder: '2026-08-28' },
  { id: 'cust-2', name: 'Ananya Sharma', email: 'ananya.s@outlook.com', phone: '+91 91234 56789', ordersCount: 1, totalSpent: 1299, lastOrder: '2026-08-29' },
  { id: 'cust-3', name: 'Priya Reddy', email: 'priya.reddy@yahoo.com', phone: '+91 99887 76655', ordersCount: 2, totalSpent: 3798, lastOrder: '2026-08-29' }
];

export const getCustomers = (req, res) => {
  res.json({ success: true, customers: customersStore });
};
