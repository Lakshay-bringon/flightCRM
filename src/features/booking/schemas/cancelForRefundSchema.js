import { z } from "zod";
import { baseBookingSchema } from "./bookingSchema";

// Create a refund schema
// For refunds, we can omit passenger data but need charge validation and refund amount
export const cancelForRefundSchema = baseBookingSchema
	.omit({
		passenger_data: true,
	})
	.extend({
		// Add the cancellation refund amount field
		cancellation_refund_amount: z
			.string()
			.min(1, "Cancellation refund amount is required"),
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

export default cancelForRefundSchema;
