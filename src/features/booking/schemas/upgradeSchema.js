import { z } from 'zod';
import { bookingSchema } from './bookingSchema';

// Create an upgrade schema
// For upgrades, we need all standard booking fields
// But might want to modify certain validation requirements
export const upgradeSchema = bookingSchema.extend({
	// We could add upgrade-specific fields or modify existing validation rules if needed
	// For example, making fare_class required for upgrades:
	fare_class: z.string().min(1, 'Fare class is required for upgrades'),
});

export default upgradeSchema;
