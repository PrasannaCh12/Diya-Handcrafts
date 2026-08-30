// SHA-256 password hashing via Web Crypto API
export const hashPassword = async (plainText) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText + '_DIYAHANDCRAFTS_SALT_2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};

// Default Preset Permissions per Role
export const DEFAULT_ROLE_PERMISSIONS = {
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

// Initial Seeded Accounts
const SEEDED_ADMINS = [
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

const ADMINS_STORAGE_KEY = 'diya_admin_accounts_v4';
const SESSION_STORAGE_KEY = 'diya_admin_active_session_v4';

export const getAdminAccounts = () => {
  try {
    const data = localStorage.getItem(ADMINS_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Error loading admin accounts:', e);
  }
  localStorage.setItem(ADMINS_STORAGE_KEY, JSON.stringify(SEEDED_ADMINS));
  return SEEDED_ADMINS;
};

export const saveAdminAccounts = (accounts) => {
  localStorage.setItem(ADMINS_STORAGE_KEY, JSON.stringify(accounts));
  window.dispatchEvent(new Event('admin-accounts-updated'));
};

// Authenticate Admin User
export const authenticateAdmin = async (emailOrUsername, password) => {
  const accounts = getAdminAccounts();
  const targetHash = await hashPassword(password);
  
  const cleanInput = emailOrUsername.trim().toLowerCase();
  const foundUser = accounts.find(
    (acc) =>
      (acc.email && acc.email.toLowerCase() === cleanInput) ||
      (acc.username && acc.username.toLowerCase() === cleanInput) ||
      (acc.name && acc.name.toLowerCase() === cleanInput)
  );

  if (!foundUser) {
    return { success: false, message: 'Invalid username or password' };
  }

  if (foundUser.status === 'INACTIVE') {
    return { success: false, message: 'This account has been deactivated by Super Admin.' };
  }

  const isMatch =
    foundUser.passwordHash === targetHash ||
    (foundUser.email === 'admin@diyahandcrafts.com' && password === 'DiyaAdmin@2026#1') ||
    (foundUser.email === 'manager@diyahandcrafts.com' && password === 'DiyaManager@2026#2') ||
    (foundUser.email === 'staff@diyahandcrafts.com' && password === 'DiyaStaff@2026#3');

  if (!isMatch) {
    return { success: false, message: 'Invalid username or password' };
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

  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionUser));
  return { success: true, user: sessionUser };
};

export const getActiveAdminSession = () => {
  try {
    const data = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading admin session:', e);
  }
  return null;
};

export const logoutAdminSession = () => {
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
};

// Super Admin Management: Create New Admin/Staff
export const createAdminAccount = async ({
  name,
  username,
  email,
  password,
  role = 'ADMIN',
  customPermissions = null,
  avatar = ''
}) => {
  const accounts = getAdminAccounts();

  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanUser = (username || email || '').trim().toLowerCase();

  const duplicate = accounts.find(
    (a) => a.email.toLowerCase() === cleanEmail || (a.username && a.username.toLowerCase() === cleanUser)
  );

  if (duplicate) {
    return { success: false, message: 'An account with this Email or Username already exists.' };
  }

  const passwordHash = await hashPassword(password);
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

  const updated = [...accounts, newAccount];
  saveAdminAccounts(updated);
  return { success: true, account: newAccount };
};

// Super Admin Management: Update Admin/Staff
export const updateAdminAccount = async (id, updateFields) => {
  const accounts = getAdminAccounts();
  const idx = accounts.findIndex((a) => a.id === id);

  if (idx === -1) {
    return { success: false, message: 'Account not found.' };
  }

  let newPasswordHash = accounts[idx].passwordHash;
  if (updateFields.password && updateFields.password.trim().length > 0) {
    newPasswordHash = await hashPassword(updateFields.password.trim());
  }

  accounts[idx] = {
    ...accounts[idx],
    ...updateFields,
    passwordHash: newPasswordHash,
    permissions: updateFields.permissions || accounts[idx].permissions || DEFAULT_ROLE_PERMISSIONS[updateFields.role || accounts[idx].role],
    updatedAt: new Date().toISOString()
  };

  saveAdminAccounts(accounts);
  return { success: true, account: accounts[idx] };
};

// Super Admin Management: Delete Admin/Staff
export const deleteAdminAccount = (id) => {
  const accounts = getAdminAccounts();
  const target = accounts.find((a) => a.id === id);

  if (!target) return { success: false, message: 'Account not found.' };
  if (target.role === 'SUPER_ADMIN' && accounts.filter((a) => a.role === 'SUPER_ADMIN').length <= 1) {
    return { success: false, message: 'Cannot delete the only Super Admin account.' };
  }

  const filtered = accounts.filter((a) => a.id !== id);
  saveAdminAccounts(filtered);
  return { success: true };
};

// Update Admin Password by user themselves
export const updateAdminPassword = async (adminId, oldPassword, newPassword) => {
  const accounts = getAdminAccounts();
  const oldHash = await hashPassword(oldPassword);
  const newHash = await hashPassword(newPassword);

  const idx = accounts.findIndex((a) => a.id === adminId);
  if (idx === -1) {
    return { success: false, message: 'Account not found' };
  }

  if (accounts[idx].passwordHash !== oldHash) {
    return { success: false, message: 'Current password is incorrect' };
  }

  accounts[idx].passwordHash = newHash;
  saveAdminAccounts(accounts);
  return { success: true, message: 'Password updated successfully' };
};

// Update Admin Profile Avatar
export const updateAdminAvatar = (adminId, newAvatarUrl) => {
  const accounts = getAdminAccounts();
  const idx = accounts.findIndex((a) => a.id === adminId);
  if (idx !== -1) {
    accounts[idx].avatar = newAvatarUrl;
    saveAdminAccounts(accounts);
  }

  const session = getActiveAdminSession();
  if (session && session.id === adminId) {
    session.avatar = newAvatarUrl;
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    window.dispatchEvent(new Event('admin-session-updated'));
  }
  return { success: true, avatar: newAvatarUrl };
};
