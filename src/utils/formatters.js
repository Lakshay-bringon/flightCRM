// Currency formatter for monetary values
export const currencyFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
});

// Number formatter for quantities
export const numberFormatter = new Intl.NumberFormat("en-US", {
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
});

// Percentage formatter
export const percentFormatter = new Intl.NumberFormat("en-US", {
	style: "percent",
	minimumFractionDigits: 1,
	maximumFractionDigits: 1,
});

// Date formatter
export const dateFormatter = new Intl.DateTimeFormat("en-US", {
	year: "numeric",
	month: "short",
	day: "numeric",
});

// Time formatter
export const timeFormatter = new Intl.DateTimeFormat("en-US", {
	hour: "2-digit",
	minute: "2-digit",
	hour12: false,
});

// Compact number formatter (e.g., 1.2K, 1.2M)
export const compactNumberFormatter = new Intl.NumberFormat("en-US", {
	notation: "compact",
	compactDisplay: "short",
});

// Safe date formatter that handles invalid dates
export function formatSafeDate(dateValue, fallback = "N/A") {
	if (!dateValue) return fallback;

	const date = new Date(dateValue);

	// Check if date is invalid
	if (isNaN(date.getTime())) {
		return fallback;
	}

	return date.toLocaleDateString();
}

// Local date string formatter (YYYY-MM-DD) without timezone shift
export function formatLocalDateString(dateValue) {
	if (!dateValue) return "";
	const d = new Date(dateValue);
	const year = d.getFullYear();
	const month = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}
