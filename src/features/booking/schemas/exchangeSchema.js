import { z } from "zod";
import { baseBookingSchema } from "./bookingSchema";

// Create an exchange schema that omits passenger_data
export const exchangeSchema = baseBookingSchema
	.omit({ passenger_data: true })
	.extend({
		// Override image_itinerary with custom error message
		image_itinerary: z.string().min(1, "Itinerary image is required"),
	});

export default exchangeSchema;
