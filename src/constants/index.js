// User Roles
export const USER_ROLES = {
	ADMIN: "admin",
	TEAM_LEADER: "leader",
	AGENT: "agent",
};

// Transaction Types
export const TRANSACTION_TYPES = {
	NEW_BOOKING: "new_booking",
	EXCHANGE: "exchange",
	SEAT_ASSIGNMENT: "seat_assignment",
	UPGRADE: "upgrade",
	CANCEL_FOR_REFUND: "cancel_for_refund",
	CANCEL_FOR_FUTURE_CREDIT: "cancel_for_future_credit",
};

// Booking Status
export const BOOKING_STATUS = [
	"pending",
	"in-progress",
	"cancelled",
	"Ticketed & MCO charged",
];
export const AUTH_STATUS = ["pending", "approved", "rejected"];

export const CHARGING_STATUS = ["pending", "charged", "declined"];

export const REFUND_STATUS = ["pending", "approved", "rejected"];

export const CHARGEBACK_STATUS = ["pending", "won", "lost"];
