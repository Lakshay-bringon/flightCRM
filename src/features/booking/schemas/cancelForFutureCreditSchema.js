import { z } from 'zod';
import { bookingSchema } from './bookingSchema';

// Create a future credit schema
// Similar to refund but might have different requirements
export const cancelForFutureCreditSchema = bookingSchema.omit({
	passenger_data: true,
	// Other fields that might not be needed for future credit
});

export default cancelForFutureCreditSchema;
