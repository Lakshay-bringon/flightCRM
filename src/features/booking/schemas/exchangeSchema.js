import { z } from 'zod';
import { bookingSchema } from './bookingSchema';

// Create an exchange schema that omits passenger_data
export const exchangeSchema = bookingSchema.omit({ passenger_data: true });

export default exchangeSchema;
