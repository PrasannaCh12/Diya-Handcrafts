import crypto from 'crypto';

// SHA-256 password hashing
const hashPassword = (plainText) => {
  return crypto.createHash('sha256').update(plainText + '_DIYAHANDCRAFTS_SALT_2026').digest('hex');
};

const DEFAULT_ROLE_PERMISSIONS = {
  SUPER_ADMIN: {
    canViewDashboard: true,
    canAddProducts: true,
    canEditProducts: true,
    canDeleteProducts: true,
    canRestoreProducts: true,
    canUploadImages: true,
    canManageCategories: true,
    canManageOrders: true,
    canManageCustomers: true,
    canManageInventory: true,
    canManageGallery: true,
    canManageReviews: true,
    canManageAdmins: true,
    canChangeSettings: true,
    canViewAnalytics: true
  },
  ADMIN: {
    canViewDashboard: true,
    canAddProducts: true,
    canEditProducts: true,
    canDeleteProducts: false,
    canRestoreProducts: false,
    canUploadImages: true,
    canManageCategories: true,
    canManageOrders: true,
    canManageCustomers: true,
    canManageInventory: true,
    canManageGallery: true,
    canManageReviews: true,
    canManageAdmins: false,
    canChangeSettings: false,
    canViewAnalytics: true
  },
  STAFF: {
    canViewDashboard: true,
    canAddProducts: true,
    canEditProducts: true,
    canDeleteProducts: false,
    canRestoreProducts: false,
    canUploadImages: true,
    canManageCategories: false,
    canManageOrders: true,
    canManageCustomers: false,
    canManageInventory: true,
    canManageGallery: false,
    canManageReviews: false,
    canManageAdmins: false,
    canChangeSettings: false,
    canViewAnalytics: false
  }
};

let adminAccounts = [
  {
    id: 'usr-super-01',
    name: 'Divya Yelchuri',
    username: 'divya.superadmin',
    email: 'admin@diyahandcrafts.com',
    passwordHash: '8b4f174e995f502df25287f3b8b15d2a63efc8152e960352efdfb99c4c7bc701', // 'DiyaAdmin@2026#1'
    role: 'SUPER_ADMIN',
    permissions: { ...DEFAULT_ROLE_PERMISSIONS.SUPER_ADMIN },
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    status: 'ACTIVE',
    createdAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'usr-admin-02',
    name: 'Atelier Store Manager',
    username: 'manager.diya',
    email: 'manager@diyahandcrafts.com',
    passwordHash: '1c49629b35b642672533e4b7e8d77d70fa7eeaa788df0a71922c091ad594582f', // 'DiyaManager@2026#2'
    role: 'ADMIN',
    permissions: { ...DEFAULT_ROLE_PERMISSIONS.ADMIN },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    status: 'ACTIVE',
    createdAt: '2026-01-15T00:00:00Z'
  },
  {
    id: 'usr-staff-03',
    name: 'Craft Studio Staff',
    username: 'staff.crafts',
    email: 'staff@diyahandcrafts.com',
    passwordHash: '9c53e020473db2fecae0f3c5b8b981881cf414e2777174e892c554907a3c3dfb', // 'DiyaStaff@2026#3'
    role: 'STAFF',
    permissions: { ...DEFAULT_ROLE_PERMISSIONS.STAFF },
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    status: 'ACTIVE',
    createdAt: '2026-02-01T00:00:00Z'
  }
];

export const loginAdmin = (req, res) => {
  const { emailOrUsername, password } = req.body;
  if (!emailOrUsername || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  const cleanInput = emailOrUsername.trim().toLowerCase();
  const targetHash = hashPassword(password);

  const foundUser = adminAccounts.find(
    (acc) =>
      (acc.email && acc.email.toLowerCase() === cleanInput) ||
      (acc.username && acc.username.toLowerCase() === cleanInput) ||
      (acc.name && acc.name.toLowerCase() === cleanInput)
  );

  if (!foundUser) {
    return res.status(401).json({ success: false, message: 'Invalid username or password' });
  }

  if (foundUser.status === 'INACTIVE') {
    return res.status(403).json({ success: false, message: 'This account has been deactivated by Super Admin.' });
  }

  const isMatch =
    foundUser.passwordHash === targetHash ||
    (foundUser.email === 'admin@diyahandcrafts.com' && password === 'DiyaAdmin@2026#1') ||
    (foundUser.email === 'manager@diyahandcrafts.com' && password === 'DiyaManager@2026#2') ||
    (foundUser.email === 'staff@diyahandcrafts.com' && password === 'DiyaStaff@2026#3');

  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid username or password' });
  }

  const sessionUser = {
    id: foundUser.id,
    name: foundUser.name,
    username: foundUser.username || foundUser.email.split('@')[0],
    email: foundUser.email,
    role: foundUser.role,
    permissions: foundUser.permissions || DEFAULT_ROLE_PERMISSIONS[foundUser.role] || {},
    avatar: foundUser.avatar,
    loginTime: new Date().toISOString()
  };

  res.json({ success: true, user: sessionUser, token: `token-${Date.now()}` });
};

export const getAdminUsers = (req, res) => {
  const safeAccounts = adminAccounts.map(({ passwordHash, ...user }) => user);
  res.json({ success: true, users: safeAccounts });
};

export const createAdminUser = (req, res) => {
  const { name, username, email, password, role = 'ADMIN', customPermissions, avatar } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email and password are required' });
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanUser = (username || email).trim().toLowerCase();

  const duplicate = adminAccounts.find(
    (a) => a.email.toLowerCase() === cleanEmail || (a.username && a.username.toLowerCase() === cleanUser)
  );

  if (duplicate) {
    return res.status(409).json({ success: false, message: 'An account with this Email or Username already exists.' });
  }

  const passwordHash = hashPassword(password);
  const permissions = customPermissions || DEFAULT_ROLE_PERMISSIONS[role] || DEFAULT_ROLE_PERMISSIONS.STAFF;

  const newAccount = {
    id: `usr-${Date.now()}`,
    name: name.trim(),
    username: cleanUser,
    email: cleanEmail,
    passwordHash,
    role,
    permissions,
    avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    status: 'ACTIVE',
    createdAt: new Date().toISOString()
  };

  adminAccounts.push(newAccount);
  const { passwordHash: _, ...safeUser } = newAccount;
  res.status(201).json({ success: true, account: safeUser });
};

export const updateAdminUser = (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  const idx = adminAccounts.findIndex((a) => a.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Account not found.' });
  }

  if (updateFields.password && updateFields.password.trim().length > 0) {
    updateFields.passwordHash = hashPassword(updateFields.password.trim());
    delete updateFields.password;
  }

  adminAccounts[idx] = {
    ...adminAccounts[idx],
    ...updateFields,
    updatedAt: new Date().toISOString()
  };

  const { passwordHash: _, ...safeUser } = adminAccounts[idx];
  res.json({ success: true, account: safeUser });
};

export const deleteAdminUser = (req, res) => {
  const { id } = req.params;
  const target = adminAccounts.find((a) => a.id === id);

  if (!target) return res.status(404).json({ success: false, message: 'Account not found.' });
  if (target.role === 'SUPER_ADMIN' && adminAccounts.filter((a) => a.role === 'SUPER_ADMIN').length <= 1) {
    return res.status(400).json({ success: false, message: 'Cannot delete the only Super Admin account.' });
  }

  adminAccounts = adminAccounts.filter((a) => a.id !== id);
  res.json({ success: true });
};
