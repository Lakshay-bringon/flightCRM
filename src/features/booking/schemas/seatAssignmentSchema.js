import { z } from 'zod';
import { bookingSchema } from './bookingSchema';

// Create a seat assignment schema
// For seat assignments, we need passenger data but can omit certain other fields
export const seatAssignmentSchema = bookingSchema.omit({
	// Fields not needed for seat assignment
	charge_data: true,
});

export default seatAssignmentSchema;
