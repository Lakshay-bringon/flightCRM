// Simulated user data
const users = [
  {
    id: 1,
    username: "admin",
    password: "admin123", // In a real app, this would be hashed
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    email: "admin@skylineCRM.com",
    permissions: [
      "view_all",
      "edit_all",
      "manage_users",
      "manage_roles",
      "view_reports",
      "export_data"
    ]
  },
  {
    id: 2,
    username: "leader",
    password: "leader123", // In a real app, this would be hashed
    firstName: "Team",
    lastName: "Leader",
    role: "leader",
    email: "leader@skylineCRM.com",
    permissions: [
      "view_all",
      "edit_team",
      "view_reports",
      "export_data"
    ]
  },
  {
    id: 3,
    username: "agent",
    password: "agent123", // In a real app, this would be hashed
    firstName: "Sales",
    lastName: "Agent",
    role: "agent",
    email: "agent@skylineCRM.com",
    permissions: [
      "view_own",
      "edit_own",
      "view_basic_reports"
    ]
  }
];

// Simulated authentication token storage
let currentAuthToken = null;

/**
 * Simulates a login request
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{success: boolean, user?: object, token?: string, error?: string}>}
 */
export const login = async (username, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return {
      success: false,
      error: "Invalid username or password"
    };
  }

  // Generate a simple token (in a real app, use JWT or similar)
  const token = btoa(JSON.stringify({ userId: user.id, timestamp: Date.now() }));
  currentAuthToken = token;

  // Return success response without sensitive data
  const { password: _, ...safeUser } = user;
  return {
    success: true,
    user: safeUser,
    token
  };
};

/**
 * Simulates a logout request
 * @returns {Promise<{success: boolean}>}
 */
export const logout = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  currentAuthToken = null;
  return { success: true };
};

/**
 * Checks if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return currentAuthToken !== null;
};

/**
 * Gets the current authenticated user
 * @returns {object|null}
 */
export const getCurrentUser = () => {
  if (!currentAuthToken) return null;
  
  try {
    const { userId } = JSON.parse(atob(currentAuthToken));
    const user = users.find(u => u.id === userId);
    if (!user) return null;
    
    const { password: _, ...safeUser } = user;
    return safeUser;
  } catch {
    return null;
  }
};

/**
 * Checks if current user has specific permission
 * @param {string} permission
 * @returns {boolean}
 */
export const hasPermission = (permission) => {
  const user = getCurrentUser();
  return user?.permissions.includes(permission) || false;
};

/**
 * Checks if current user has specific role
 * @param {string|string[]} roles
 * @returns {boolean}
 */
export const hasRole = (roles) => {
  const user = getCurrentUser();
  if (!user) return false;
  
  if (Array.isArray(roles)) {
    return roles.includes(user.role);
  }
  return user.role === roles;
};

export const ROLES = {
  ADMIN: "admin",
  LEADER: "leader",
  AGENT: "agent"
};

export const PERMISSIONS = {
  VIEW_ALL: "view_all",
  EDIT_ALL: "edit_all",
  MANAGE_USERS: "manage_users",
  MANAGE_ROLES: "manage_roles",
  VIEW_REPORTS: "view_reports",
  EXPORT_DATA: "export_data",
  VIEW_OWN: "view_own",
  EDIT_OWN: "edit_own",
  VIEW_BASIC_REPORTS: "view_basic_reports",
  EDIT_TEAM: "edit_team"
}; 