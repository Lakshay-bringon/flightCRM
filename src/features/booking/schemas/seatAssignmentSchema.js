import { z } from "zod";
import { baseBookingSchema } from "./bookingSchema";

// Create a seat assignment schema
// For seat assignments, we need passenger data and charge data (for seat fees)
// We can omit other fields that might not be needed
export const seatAssignmentSchema = baseBookingSchema
	.extend({
		// Override image_itinerary with custom error message
		image_itinerary: z.string().min(1, "Itinerary image is required"),
	})
	.refine(
		(data) => {
			// Custom validation: sum of charges must equal total amount
			const totalAmount = parseFloat(data.amount) || 0;
			const chargesSum = data.charge_data.reduce((sum, charge) => {
				return sum + (parseFloat(charge.amount) || 0);
			}, 0);

			return Math.abs(totalAmount - chargesSum) < 0.01; // Allow small floating point differences
		},
		{
			message: "The sum of all charges must equal the total amount",
			path: ["amount"], // This will show the error on the amount field
		}
	);

export default seatAssignmentSchema;
