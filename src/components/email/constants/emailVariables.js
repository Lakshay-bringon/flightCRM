// Email variable definitions for dynamic content insertion
export const VARIABLE_DEFINITIONS = [
	// Customer Information
	{
		key: "customer_name",
		label: "Customer Name",
		path: "customer_name",
		defaultValue: "Customer",
		category: "customer",
	},
	{
		key: "customer_email",
		label: "Customer Email",
		path: "email",
		defaultValue: "customer@email.com",
		category: "customer",
	},
	{
		key: "customer_phone",
		label: "Customer Phone",
		path: "phone",
		defaultValue: "Not provided",
		category: "customer",
	},

	// Booking Information
	{
		key: "booking_id",
		label: "Booking ID",
		path: "bid",
		defaultValue: "BK-000",
		category: "booking",
	},
	{
		key: "pnr",
		label: "PNR",
		path: "pnr",
		defaultValue: "PNR-000",
		category: "booking",
	},
	{
		key: "airline_name",
		label: "Airline Name",
		path: "airline_name",
		defaultValue: "Airline",
		category: "booking",
	},
	{
		key: "booking_status",
		label: "Booking Status",
		path: "status",
		defaultValue: "Confirmed",
		category: "booking",
	},

	// Financial Information
	{
		key: "total_amount",
		label: "Total Amount",
		path: "amount",
		defaultValue: "0.00",
		category: "financial",
	},
	{
		key: "currency",
		label: "Currency",
		path: "currency",
		defaultValue: "USD",
		category: "financial",
	},
	{
		key: "payment_method",
		label: "Payment Method",
		path: "payment_method",
		defaultValue: "Credit Card",
		category: "financial",
	},
	{
		key: "card_holder",
		label: "Card Holder Name",
		path: "card_holder",
		defaultValue: "Card Holder",
		category: "financial",
	},

	// Travel Information
	{
		key: "travel_date",
		label: "Travel Date",
		path: "travel_date",
		defaultValue: "TBD",
		category: "travel",
	},
	{
		key: "departure_city",
		label: "Departure City",
		path: "departure_city",
		defaultValue: "Origin",
		category: "travel",
	},
	{
		key: "arrival_city",
		label: "Arrival City",
		path: "arrival_city",
		defaultValue: "Destination",
		category: "travel",
	},

	// Agent Information
	{
		key: "agent_name",
		label: "Agent Name",
		path: "agent",
		defaultValue: "Support Team",
		category: "agent",
	},

	// Company Information
	{
		key: "company_name",
		label: "Company Name",
		path: "company_name",
		defaultValue: "SkylineTravels LLC",
		category: "company",
	},
	{
		key: "company_phone",
		label: "Company Phone",
		path: "company_phone",
		defaultValue: "+1-877-413-0030",
		category: "company",
	},
	{
		key: "company_email",
		label: "Company Email",
		path: "company_email",
		defaultValue: "booking@skylinetravelsllc.com",
		category: "company",
	},

	// Transaction Information
	{
		key: "transaction_type",
		label: "Transaction Type",
		path: "transactionType",
		defaultValue: "Booking",
		category: "transaction",
	},
	{
		key: "purchase_date",
		label: "Purchase Date",
		path: "purchase_date",
		defaultValue: new Date().toLocaleDateString(),
		category: "transaction",
	},

	// Address Information
	{
		key: "billing_address",
		label: "Billing Address",
		path: "billing_address",
		defaultValue: "Not provided",
		category: "address",
	},
	{
		key: "city",
		label: "City",
		path: "city",
		defaultValue: "Not provided",
		category: "address",
	},
	{
		key: "state",
		label: "State",
		path: "state",
		defaultValue: "Not provided",
		category: "address",
	},
	{
		key: "zip",
		label: "ZIP Code",
		path: "zip",
		defaultValue: "Not provided",
		category: "address",
	},
	{
		key: "country",
		label: "Country",
		path: "country",
		defaultValue: "US",
		category: "address",
	},
];

// Email template types
export const EMAIL_TEMPLATE_TYPES = {
	BOOKING_CONFIRMATION: "booking_confirmation",
	BOOKING_CANCELLATION: "booking_cancellation",
	PAYMENT_CONFIRMATION: "payment_confirmation",
	ITINERARY_UPDATE: "itinerary_update",
	CUSTOM: "custom",
};

// Default email templates
export const DEFAULT_EMAIL_TEMPLATES = {
	[EMAIL_TEMPLATE_TYPES.BOOKING_CONFIRMATION]: {
		subject: "Booking Confirmation - {{pnr}}",
		body: `
      <h2>Dear {{customer_name}},</h2>
      
      <p>Thank you for contacting us!</p>
      
      <p>You can contact us on this number <strong>+1-877-413-0030</strong> for any related request.</p>
      
      <p>As per our conversation and as agreed, we have booked your reservation under Confirmation Number 
      <strong>{{pnr}}</strong> on <strong>{{airline_name}}</strong> with a charge of 
      <strong>{{total_amount}} {{currency}}</strong> all inclusive of taxes and fees.</p>
      
      <h3>Booking Details:</h3>
      <ul>
        <li><strong>Booking ID:</strong> {{booking_id}}</li>
        <li><strong>PNR:</strong> {{pnr}}</li>
        <li><strong>Airline:</strong> {{airline_name}}</li>
        <li><strong>Total Amount:</strong> {{total_amount}} {{currency}}</li>
        <li><strong>Customer:</strong> {{customer_name}}</li>
        <li><strong>Email:</strong> {{customer_email}}</li>
        <li><strong>Phone:</strong> {{customer_phone}}</li>
      </ul>
      
      <h3>Payment Information:</h3>
      <ul>
        <li><strong>Card Holder:</strong> {{card_holder}}</li>
        <li><strong>Payment Method:</strong> {{payment_method}}</li>
        <li><strong>Purchase Date:</strong> {{purchase_date}}</li>
      </ul>
      
      <p><strong>Important:</strong> Your e-tickets will be sent to you via email within 24 hours or early if there is no delay from the airline's end.</p>
      
      <p>For any queries, please contact our agent <strong>{{agent_name}}</strong> at <strong>+1-877-413-0030</strong> or email us at <strong>booking@skylinetravelsllc.com</strong></p>
      
      <p>Thank you for choosing our service!</p>
      
      <p>Best regards,<br>
      SkylineTravels LLC</p>
    `,
	},

	[EMAIL_TEMPLATE_TYPES.BOOKING_CANCELLATION]: {
		subject: "Booking Cancellation - {{booking_id}}",
		body: `
      <h2>Dear {{customer_name}},</h2>
      
      <p>We are writing to confirm the cancellation of your booking.</p>
      
      <h3>Cancelled Booking Details:</h3>
      <ul>
        <li><strong>Booking ID:</strong> {{booking_id}}</li>
        <li><strong>PNR:</strong> {{pnr}}</li>
        <li><strong>Airline:</strong> {{airline_name}}</li>
        <li><strong>Amount:</strong> {{total_amount}} {{currency}}</li>
      </ul>
      
      <p>Refund details will be processed within 5-7 business days according to the airline's policy.</p>
      
      <p>If you have any questions about this cancellation or need assistance with a new booking, please contact our agent <strong>{{agent_name}}</strong> at <strong>+1-877-413-0030</strong>.</p>
      
      <p>Thank you for choosing SkylineTravels LLC.</p>
      
      <p>Best regards,<br>
      SkylineTravels LLC</p>
    `,
	},

	[EMAIL_TEMPLATE_TYPES.PAYMENT_CONFIRMATION]: {
		subject: "Payment Confirmation - {{booking_id}}",
		body: `
      <h2>Dear {{customer_name}},</h2>
      
      <p>We have successfully received your payment for the following booking:</p>
      
      <h3>Payment Details:</h3>
      <ul>
        <li><strong>Booking ID:</strong> {{booking_id}}</li>
        <li><strong>PNR:</strong> {{pnr}}</li>
        <li><strong>Amount Paid:</strong> {{total_amount}} {{currency}}</li>
        <li><strong>Payment Method:</strong> {{payment_method}}</li>
        <li><strong>Payment Date:</strong> {{purchase_date}}</li>
        <li><strong>Card Holder:</strong> {{card_holder}}</li>
      </ul>
      
      <p>Your booking is now confirmed and your tickets will be issued shortly.</p>
      
      <p>For any queries, please contact us at <strong>+1-877-413-0030</strong> or email us at <strong>booking@skylinetravelsllc.com</strong></p>
      
      <p>Thank you for your business!</p>
      
      <p>Best regards,<br>
      SkylineTravels LLC</p>
    `,
	},

	[EMAIL_TEMPLATE_TYPES.CUSTOM]: {
		subject: "Important Information - {{booking_id}}",
		body: `
      <h2>Dear {{customer_name}},</h2>
      
      <p>We hope this message finds you well.</p>
      
      <p>[Your custom message here]</p>
      
      <h3>Booking Reference:</h3>
      <ul>
        <li><strong>Booking ID:</strong> {{booking_id}}</li>
        <li><strong>PNR:</strong> {{pnr}}</li>
        <li><strong>Customer:</strong> {{customer_name}}</li>
      </ul>
      
      <p>If you have any questions, please don't hesitate to contact us at <strong>+1-877-413-0030</strong>.</p>
      
      <p>Best regards,<br>
      SkylineTravels LLC</p>
    `,
	},
};
