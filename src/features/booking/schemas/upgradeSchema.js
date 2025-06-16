import { z } from "zod";
import { baseBookingSchema } from "./bookingSchema";

// Create an upgrade schema
// For upgrades, we need all standard booking fields
// But might want to modify certain validation requirements
export const upgradeSchema = baseBookingSchema
	.extend({
		// We could add upgrade-specific fields or modify existing validation rules if needed
		// For example, making fare_class required for upgrades:
		initial_class: z.string().min(1, "initial class is required for upgrades"),
		upgraded_class: z
			.string()
			.min(1, "upgraded class is required for upgrades"),
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

export default upgradeSchema;
