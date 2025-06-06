import {
	DEFAULT_EMAIL_TEMPLATES,
	EMAIL_TEMPLATE_TYPES,
} from "../constants/emailVariables";

/**
 * Generate email template with booking data
 * @param {Object} bookingData - The booking data object
 * @param {String} templateType - Type of email template
 * @returns {Object} Template with subject and body
 */
export const generateEmailTemplate = (
	bookingData,
	templateType = EMAIL_TEMPLATE_TYPES.BOOKING_CONFIRMATION
) => {
	const template =
		DEFAULT_EMAIL_TEMPLATES[templateType] ||
		DEFAULT_EMAIL_TEMPLATES[EMAIL_TEMPLATE_TYPES.CUSTOM];

	if (!bookingData) {
		return {
			subject: template.subject,
			body: template.body,
		};
	}

	// Replace variables in subject and body
	const subject = replaceVariables(template.subject, bookingData);
	const body = replaceVariables(template.body, bookingData);

	return {
		subject,
		body,
	};
};

/**
 * Replace template variables with actual data
 * @param {String} text - Template text with variables
 * @param {Object} data - Data object containing values
 * @returns {String} Text with variables replaced
 */
export const replaceVariables = (text, data) => {
	if (!text || !data) return text;

	let result = text;

	// Variable mapping - maps template variables to data paths
	const variableMap = {
		// Customer Information
		"{{customer_name}}": getNestedValue(data, "customer_name") || "Customer",
		"{{customer_email}}": getNestedValue(data, "email") || "customer@email.com",
		"{{customer_phone}}": getNestedValue(data, "phone") || "Not provided",

		// Booking Information
		"{{booking_id}}":
			getNestedValue(data, "bid") || getNestedValue(data, "id") || "BK-000",
		"{{pnr}}": getNestedValue(data, "pnr") || "PNR-000",
		"{{airline_name}}": getNestedValue(data, "airline_name") || "Airline",
		"{{booking_status}}": getNestedValue(data, "status") || "Confirmed",

		// Financial Information
		"{{total_amount}}": getNestedValue(data, "amount") || "0.00",
		"{{currency}}": getNestedValue(data, "currency") || "USD",
		"{{payment_method}}":
			getNestedValue(data, "payment_method") || "Credit Card",
		"{{card_holder}}":
			getNestedValue(data, "card_holder") ||
			getNestedValue(data, "customer_name") ||
			"Card Holder",

		// Travel Information
		"{{travel_date}}":
			getNestedValue(data, "travel_date") ||
			formatDate(getNestedValue(data, "departure_date")) ||
			"TBD",
		"{{departure_city}}": getNestedValue(data, "departure_city") || "Origin",
		"{{arrival_city}}": getNestedValue(data, "arrival_city") || "Destination",

		// Agent Information
		"{{agent_name}}": getNestedValue(data, "agent") || "Support Team",

		// Company Information
		"{{company_name}}": "SkylineTravels LLC",
		"{{company_phone}}": "+1-877-413-0030",
		"{{company_email}}": "booking@skylinetravelsllc.com",

		// Transaction Information
		"{{transaction_type}}":
			formatTransactionType(getNestedValue(data, "transactionType")) ||
			"Booking",
		"{{purchase_date}}":
			getNestedValue(data, "purchase_date") ||
			formatDate(getNestedValue(data, "created_at")) ||
			new Date().toLocaleDateString(),

		// Address Information
		"{{billing_address}}":
			getNestedValue(data, "billing_address") || "Not provided",
		"{{city}}": getNestedValue(data, "city") || "Not provided",
		"{{state}}": getNestedValue(data, "state") || "Not provided",
		"{{zip}}": getNestedValue(data, "zip") || "Not provided",
		"{{country}}": getNestedValue(data, "country") || "US",

		// Special formatters
		"{{formatted_amount}}": formatCurrency(
			getNestedValue(data, "amount"),
			getNestedValue(data, "currency")
		),
		"{{current_date}}": new Date().toLocaleDateString(),
		"{{current_year}}": new Date().getFullYear().toString(),
	};

	// Replace all variables
	Object.entries(variableMap).forEach(([variable, value]) => {
		result = result.replace(
			new RegExp(escapeRegExp(variable), "g"),
			value || ""
		);
	});

	return result;
};

/**
 * Get nested value from object using dot notation
 * @param {Object} obj - Source object
 * @param {String} path - Dot notation path (e.g., 'user.name')
 * @returns {*} Value at path or undefined
 */
export const getNestedValue = (obj, path) => {
	if (!obj || !path) return undefined;
	return path.split(".").reduce((current, key) => current?.[key], obj);
};

/**
 * Format transaction type from snake_case to proper case
 * @param {String} type - Transaction type
 * @returns {String} Formatted type
 */
export const formatTransactionType = (type) => {
	if (!type) return "Booking";

	return type
		.split("_")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};

/**
 * Format currency amount
 * @param {String|Number} amount - Amount value
 * @param {String} currency - Currency code
 * @returns {String} Formatted currency
 */
export const formatCurrency = (amount, currency = "USD") => {
	if (!amount) return "0.00 " + currency;

	const numAmount = parseFloat(amount);
	if (isNaN(numAmount)) return amount + " " + currency;

	return numAmount.toFixed(2) + " " + currency;
};

/**
 * Format date to readable string
 * @param {String|Date} date - Date to format
 * @returns {String} Formatted date
 */
export const formatDate = (date) => {
	if (!date) return null;

	try {
		const dateObj = new Date(date);
		if (isNaN(dateObj.getTime())) return null;

		return dateObj.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	} catch (error) {
		return null;
	}
};

/**
 * Escape special regex characters
 * @param {String} string - String to escape
 * @returns {String} Escaped string
 */
export const escapeRegExp = (string) => {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

/**
 * Convert JSX component to HTML string for existing templates
 * @param {React.Component} component - React component
 * @param {Object} props - Component props
 * @returns {String} HTML string
 */
export const convertJSXToHTML = (component, props) => {
	// This would need react-dom/server for server-side rendering
	// For now, we'll use the template system above
	// This is a placeholder for future implementation if needed
	console.warn(
		"convertJSXToHTML not implemented. Use generateEmailTemplate instead."
	);
	return "";
};

/**
 * Create a simple text version of the email for plain text emails
 * @param {String} htmlContent - HTML content
 * @returns {String} Plain text version
 */
export const htmlToPlainText = (htmlContent) => {
	if (!htmlContent) return "";

	return htmlContent
		.replace(/<br\s*\/?>/gi, "\n")
		.replace(/<\/p>/gi, "\n\n")
		.replace(/<\/h[1-6]>/gi, "\n\n")
		.replace(/<\/li>/gi, "\n")
		.replace(/<[^>]*>/g, "")
		.replace(/&nbsp;/g, " ")
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/\n\s*\n\s*\n/g, "\n\n")
		.trim();
};
