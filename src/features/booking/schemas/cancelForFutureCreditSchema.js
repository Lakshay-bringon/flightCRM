import { z } from "zod";
import { baseBookingSchema } from "./bookingSchema";

// Create a future credit schema with specific validation
export const cancelForFutureCreditSchema = baseBookingSchema
	.extend({
		// Override image_itinerary with custom error message
		image_itinerary: z
			.array(z.string())
			.min(1, "E-Credit Details image is required"),
		future_credit_amount: z.string().min(1, "Future credit amount is required"),
		rebooking_penalty: z.string().optional(), // Optional rebooking penalty field
	})
	.refine(
		(data) => {
			// Amount matching validation
			const totalAmount = parseFloat(data.amount) || 0;
			const chargesSum = (data.charge_data || []).reduce((sum, charge) => {
				return sum + (parseFloat(charge.amount) || 0);
			}, 0);
			return Math.abs(totalAmount - chargesSum) < 0.01; // Allow for small floating point differences
		},
		{
			message: "Total amount must match the sum of charges",
			path: ["amount"],
		}
	);

export default cancelForFutureCreditSchema;
