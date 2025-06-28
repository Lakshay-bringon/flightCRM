import { z } from "zod";
import { baseBookingSchema } from "./bookingSchema";

// Create a refund schema
// For refunds, we can omit passenger data but need charge validation and refund amount
export const cancelForRefundSchema = baseBookingSchema.extend({
	// Add the cancellation refund amount field
	cancellation_refund_amount: z
		.string()
		.min(1, "Cancellation refund amount is required"),
	// Override image_itinerary with custom error message
	image_itinerary: z
		.array(z.string())
		.min(1, "Refund Details image is required"),
});

export default cancelForRefundSchema;
