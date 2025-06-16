import { z } from "zod";
import { baseBookingSchema } from "./bookingSchema";

// Create an exchange schema that omits passenger_data
export const exchangeSchema = baseBookingSchema.omit({ passenger_data: true });

export default exchangeSchema;
