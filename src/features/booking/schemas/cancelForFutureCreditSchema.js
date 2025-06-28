import { z } from "zod";
import { baseBookingSchema } from "./bookingSchema";

// Create a future credit schema with specific validation
export const cancelForFutureCreditSchema = baseBookingSchema.extend({
	// Override image_itinerary with custom error message
	image_itinerary: z
		.array(z.string())
		.min(1, "E-Credit Details image is required"),
	future_credit_amount: z.string().min(1, "Future credit amount is required"),
	rebooking_penalty: z.string().optional(), // Optional rebooking penalty field
});

export default cancelForFutureCreditSchema;
