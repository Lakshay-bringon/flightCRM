import { z } from 'zod';
import { bookingSchema } from './bookingSchema';

// Create a refund schema
// For refunds, we can omit passenger data
export const cancelForRefundSchema = bookingSchema.omit({
	passenger_data: true,
});

export default cancelForRefundSchema;
