import { Currency } from "lucide-react";
import { z } from "zod";

// Passenger schema
const passengerSchema = z.object({
	type: z.string().min(1, "Passenger type is required"),
	firstName: z.string().min(1, "First name is required"),
	middleName: z.string().optional(),
	lastName: z.string().min(1, "Last name is required"),
	dob: z.string().min(1, "Date of birth is required"),
});

// Charge schema
const chargeSchema = z.object({
	amount: z.string().min(1, "Charge amount is required"),
	description: z.string().min(1, "Description is required"),
});

// Zod schema for booking form validation
export const bookingSchema = z.object({
	// Basic booking info
	airline_name: z.string().min(1, "Airline name is required"),
	customer_name: z.string().min(1, "Customer name is required"),
	amount: z.string().min(1, "Total amount is required"),
	pnr: z.string().min(1, "PNR is required"),

	// Charges array
	charge_data: z.array(chargeSchema).min(1, "At least one charge is required"),

	// Passengers array
	passenger_data: z
		.array(passengerSchema)
		.min(1, "At least one passenger is required"),

	// Payment info
	card_holder: z.string().min(1, "Cardholder name is required"),
	card_number: z.string().min(1, "Card number is required"),
	phone: z.string().min(10, "Phone number must be at least 10 digits"),
	email: z.string().email("Valid email is required"),
	payment_method: z.string().min(1, "Payment method is required"),
	purchase_date: z.string().min(1, "Date is required"),

	// Address (required fields marked as such)
	billing_address: z.string().min(1, "Billing address is required"),
	zip: z.string().min(1, "ZIP code is required"),
	city: z.string().min(1, "City is required"),
	state: z.string().min(1, "State is required"),
	country: z.string().min(1, "Country is required"),

	// Optional fields
	image_itinerary: z.string().optional(), // base64 string
	attachments: z.array(z.string()).optional(), // array of base64 strings

	// Required fields from previous flow
	transactionType: z.string().optional(),
	providerId: z.string().optional(),
	queueId: z.string().optional(),
	// currency: z.string().optional().default("USD"),
});

export default bookingSchema;
