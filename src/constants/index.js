// User Roles
export const USER_ROLES = {
  ADMIN: "admin",
  TEAM_LEADER: "leader",
  AGENT: "agent",
};

// Transaction Types
export const TRANSACTION_TYPES = {
  BOOKING: "booking",
  EXCHANGE: "exchange",
  SEAT_ASSIGNMENT: "seat_assignment",
  UPGRADE: "upgrade",
  CANCEL_FOR_REFUND: "cancel_for_refund",
  CANCEL_FOR_FUTURE_CREDIT: "cancel_for_future_credit",
  EXTRA_ADD_ONS: "extra_add_ons",
  TICKET_ISSUANCE: "ticket_issuance",
};

// Booking Status
export const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
};

// User Status
export const USER_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  SUSPENDED: "suspended",
};

// Team Status
export const TEAM_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};

// Shift Types
export const SHIFT_TYPES = {
  MORNING: "morning",
  AFTERNOON: "afternoon",
  NIGHT: "night",
};

// Permission Types
export const PERMISSIONS = {
  BOOKING_MANAGEMENT: "booking_management",
  TEAM_MANAGEMENT: "team_management",
  USER_MANAGEMENT: "user_management",
  REPORT_ACCESS: "report_access",
  SYSTEM_SETTINGS: "system_settings",
};

// Access Levels
export const ACCESS_LEVELS = {
  READ: "read",
  WRITE: "write",
  ADMIN: "admin",
};

// API Response Status
export const API_STATUS = {
  SUCCESS: "success",
  ERROR: "error",
  PENDING: "pending",
};
