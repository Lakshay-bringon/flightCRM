import API from "../axios";

/**
 * Create a new reservation
 * @param {Object} reservationData - The reservation data
 * @param {string} reservationData.airline_name - Airline name (e.g., "Indigo")
 * @param {string} reservationData.customer_name - Customer name
 * @param {string} reservationData.contact_number - Contact number
 * @param {string} reservationData.confirmation_number - Confirmation number
 * @param {number} reservationData.amount - Booking amount
 * @param {string} reservationData.pnr - PNR number
 * @param {Object} reservationData.charge_data - Charge data object
 * @param {Object} reservationData.passenger_data - Passenger data object
 * @param {string} reservationData.card_type - Card type (e.g., "Visa")
 * @param {string} reservationData.card_holder - Card holder name
 * @param {string} reservationData.phone - Phone number
 * @param {string} reservationData.email - Email address
 * @param {string} reservationData.payment_method - Payment method
 * @param {string} reservationData.purchase_date - Purchase date (YYYY-MM-DD)
 * @param {string} reservationData.billing_address - Billing address
 * @param {string} reservationData.zip - ZIP code
 * @param {string} reservationData.city - City
 * @param {string} reservationData.state - State * @param {string} reservationData.country - Country
 * @param {number} reservationData.agreed_terms - Terms agreement (1 for agreed)
 * @param {string} reservationData.image_itinerary - Base64 encoded itinerary image
 * @param {Array<string>} reservationData.attachments - Array of base64 encoded attachments
 * @param {string} reservationData.transactionType - Transaction type (e.g., "new booking")
 * @param {string} reservationData.providerId - Provider ID
 * @param {string} reservationData.queueId - Queue ID
 * @returns {Promise<Object>} The created reservation data
 */
export const createReservationApi = async (reservationData) => {
	try {
		const res = await API.post("/createReservation", reservationData);
		const { status, msg, data } = res.data;
		if (status !== 200 && status !== 201) {
			throw new Error(msg || "Failed to create reservation");
		}
		return data;
	} catch (err) {
		// Handle API errors
		if (err.response) {
			const errorMsg = err.response.data?.msg || "Failed to create reservation";
			const errorDetails = err.response.data?.errors;

			if (errorDetails && typeof errorDetails === "object") {
				// Handle validation errors from server
				const validationErrors = Object.entries(errorDetails)
					.map(
						([field, messages]) =>
							`${field}: ${
								Array.isArray(messages) ? messages.join(", ") : messages
							}`
					)
					.join("; ");
				throw new Error(`Validation errors: ${validationErrors}`);
			}

			throw new Error(errorMsg);
		}

		throw new Error("Create reservation error: " + err.message);
	}
};
