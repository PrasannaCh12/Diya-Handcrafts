// SHA-256 password hashing via Web Crypto API
export const hashPassword = async (plainText) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText + '_DIYAHANDCRAFTS_SALT_2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};

// Initial Seeded Accounts
const SEEDED_ADMINS = [
  {
    id: 'usr-super-01',
    name: 'Diya Super Admin',
    email: 'admin@diyahandcrafts.com',
    // Pre-calculated SHA-256 for 'DiyaAdmin@2026#1'
    passwordHash: '8b4f174e995f502df25287f3b8b15d2a63efc8152e960352efdfb99c4c7bc701',
    role: 'SUPER_ADMIN',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    createdAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'usr-admin-02',
    name: 'Diya Manager',
    email: 'manager@diyahandcrafts.com',
    // Pre-calculated SHA-256 for 'DiyaManager@2026#2'
    passwordHash: '1c49629b35b642672533e4b7e8d77d70fa7eeaa788df0a71922c091ad594582f',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    createdAt: '2026-01-15T00:00:00Z'
  },
  {
    id: 'usr-staff-03',
    name: 'Diya Staff Member',
    email: 'staff@diyahandcrafts.com',
    // Pre-calculated SHA-256 for 'DiyaStaff@2026#3'
    passwordHash: '9c53e020473db2fecae0f3c5b8b981881cf414e2777174e892c554907a3c3dfb',
    role: 'STAFF',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    createdAt: '2026-02-01T00:00:00Z'
  }
];

const ADMINS_STORAGE_KEY = 'diya_admin_accounts_v1';
const SESSION_STORAGE_KEY = 'diya_admin_active_session_v1';

// Initialize Accounts Storage
export const getAdminAccounts = () => {
  try {
    const data = localStorage.getItem(ADMINS_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error loading admin accounts:', e);
  }
  localStorage.setItem(ADMINS_STORAGE_KEY, JSON.stringify(SEEDED_ADMINS));
  return SEEDED_ADMINS;
};

// Authenticate Admin User
export const authenticateAdmin = async (emailOrUsername, password) => {
  const accounts = getAdminAccounts();
  const targetHash = await hashPassword(password);
  
  const cleanInput = emailOrUsername.trim().toLowerCase();
  const foundUser = accounts.find(
    (acc) => acc.email.toLowerCase() === cleanInput || acc.name.toLowerCase() === cleanInput
  );

  if (!foundUser) {
    return { success: false, message: 'Invalid username or password' };
  }

  // Verify hash
  if (foundUser.passwordHash !== targetHash) {
    return { success: false, message: 'Invalid username or password' };
  }

  // Generate Session Token
  const sessionUser = {
    id: foundUser.id,
    name: foundUser.name,
    email: foundUser.email,
    role: foundUser.role,
    avatar: foundUser.avatar,
    loginTime: new Date().toISOString()
  };

  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionUser));
  return { success: true, user: sessionUser };
};

// Get Currently Active Session
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

// Logout Active Session
export const logoutAdminSession = () => {
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
};

// Update Admin Password
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
  localStorage.setItem(ADMINS_STORAGE_KEY, JSON.stringify(accounts));
  return { success: true, message: 'Password updated successfully' };
};
