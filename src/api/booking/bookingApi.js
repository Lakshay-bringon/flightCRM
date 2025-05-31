import API from '../axios';

/**
 * Maps API response data to BookingCard expected format
 * @param {Object} apiData - Raw data from API
 * @returns {Object} Mapped data for BookingCard component
 */
const mapBookingData = (apiData) => {
	if (!apiData || typeof apiData !== 'object') {
		return null;
	}

	// Extract booking data from nested structure
	const bookingData = apiData.bookingData || {};

	// Map transaction type to flight type
	const getFlightType = (transactionType) => {
		switch (transactionType?.toLowerCase()) {
			case 'new_booking':
				return 'one-way';
			case 'exchange':
				return 'exchange';
			case 'cancel_for_future_credit':
				return 'refund';
			default:
				return 'one-way';
		}
	};

	// Map auth/bid status to booking status
	const getBookingStatus = (authStatus, bidStatus) => {
		if (authStatus === '1' && bidStatus === '1') {
			return 'confirmed';
		} else if (authStatus === '0' && bidStatus === '0') {
			return 'pending';
		} else {
			return 'processing';
		}
	};

	const mapped = {
		// Booking ID - use bid field, fallback to id with prefix
		BID: apiData.bid || `BID${apiData.id}` || 'N/A',

		// PNR from bookingData
		PNR: bookingData.pnr || 'N/A',

		// Credit card holder name
		cchName: apiData.cchName || bookingData.card_holder || 'N/A',
		// Status based on auth_status and bid_status
		status: getBookingStatus(apiData.auth_status, apiData.bid_status),

		// Transaction type
		transactionType: apiData.transaction_type || 'new_booking',

		// Flight type based on transaction type (keeping for compatibility)
		flightType: getFlightType(apiData.transaction_type),

		// Provider from airline name or provider_id
		provider:
			bookingData.airline_name || `Provider ${apiData.provider_id}` || 'N/A',

		// Agent from userName
		agent: apiData.userName || 'N/A',

		// MCO - calculate from amount or charges
		mco: bookingData.amount || null,

		// Passengers - parse from passenger_data
		passengers: parsePassengers(apiData, bookingData),
	};

	return mapped;
};

/**
 * Parse passenger data from API response
 * @param {Object} apiData - Raw API data
 * @returns {Object} Parsed passenger counts
 */
const parsePassengers = (apiData, bookingData) => {
	// Parse from passenger_data array in bookingData
	if (
		bookingData &&
		bookingData.passenger_data &&
		Array.isArray(bookingData.passenger_data)
	) {
		const passengerCounts = { adult: 0, child: 0, infant: 0 };

		bookingData.passenger_data.forEach((passenger) => {
			const type = passenger.type?.toUpperCase();
			switch (type) {
				case 'ADT':
				case 'ADULT':
					passengerCounts.adult++;
					break;
				case 'CHD':
				case 'CHILD':
					passengerCounts.child++;
					break;
				case 'INF':
				case 'INFANT':
					passengerCounts.infant++;
					break;
				default:
					// If type is unknown, assume adult
					passengerCounts.adult++;
					break;
			}
		});

		return passengerCounts;
	}

	// Fallback: try other possible structures
	if (apiData.passengers && typeof apiData.passengers === 'object') {
		return {
			adult:
				parseInt(apiData.passengers.adult || apiData.passengers.adults || 0) ||
				0,
			child:
				parseInt(
					apiData.passengers.child || apiData.passengers.children || 0
				) || 0,
			infant:
				parseInt(
					apiData.passengers.infant || apiData.passengers.infants || 0
				) || 0,
		};
	}

	// Default to 1 adult if no passenger data found
	return { adult: 1, child: 0, infant: 0 };
};

export const createReservationApi = async (reservationData) => {
	try {
		const res = await API.post('/createReservation', reservationData, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});
		const { status, msg, data } = res.data;
		if (status !== 200 && status !== 201) {
			throw new Error(msg || 'Failed to create reservation');
		}
		return data;
	} catch (err) {
		// Handle API errors
		if (err.response) {
			const errorMsg = err.response.data?.msg || 'Failed to create reservation';
			const errorDetails = err.response.data?.errors;

			if (errorDetails && typeof errorDetails === 'object') {
				// Handle validation errors from server
				const validationErrors = Object.entries(errorDetails)
					.map(
						([field, messages]) =>
							`${field}: ${
								Array.isArray(messages) ? messages.join(', ') : messages
							}`
					)
					.join('; ');
				throw new Error(`Validation errors: ${validationErrors}`);
			}

			throw new Error(errorMsg);
		}

		throw new Error('Create reservation error: ' + err.message);
	}
};

/**
 * Find bookings by search criteria
 * @param {Object} searchData - The search criteria
 * @param {string} searchData.type - Search type: "bid", "cchName", "billingPhone", "email"
 * @param {string} searchData.value - Search value
 * @returns {Promise<Array>} Array of matching bookings
 */
export const findBookingApi = async (searchData) => {
	try {
		const res = await API.post('/findBooking', searchData, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});
		// Handle different response structures
		if (res.data) {
			const { status, msg, data } = res.data;
			if (status !== 200 && status !== 201) {
				throw new Error(msg || 'Failed to find bookings');
			}

			// Map the data to BookingCard expected format
			const mappedData = Array.isArray(data)
				? data.map(mapBookingData).filter(Boolean)
				: [];

			return mappedData;
		}

		// Fallback if response structure is different
		const fallbackData = Array.isArray(res.data)
			? res.data.map(mapBookingData).filter(Boolean)
			: [];

		return fallbackData;
	} catch (err) {
		// Handle API errors
		if (err.response) {
			const errorMsg =
				err.response.data?.msg ||
				err.response.data?.message ||
				'Failed to find bookings';
			const errorDetails = err.response.data?.errors;

			// Log the error for debugging
			console.error('Find booking API error:', {
				status: err.response.status,
				data: err.response.data,
				searchData,
			});

			if (errorDetails && typeof errorDetails === 'object') {
				// Handle validation errors from server
				const validationErrors = Object.entries(errorDetails)
					.map(
						([field, messages]) =>
							`${field}: ${
								Array.isArray(messages) ? messages.join(', ') : messages
							}`
					)
					.join('; ');
				throw new Error(`Validation errors: ${validationErrors}`);
			}

			throw new Error(errorMsg);
		}

		// Handle network errors
		if (err.request) {
			throw new Error('Network error: Unable to connect to server');
		}

		throw new Error('Find booking error: ' + err.message);
	}
};

/**
 * Get booking details by BID
 * @param {string} bid - The booking ID to fetch details for
 * @returns {Promise<Object>} Booking details object
 */
export const getBookingByBid = async (bid) => {
	try {
		const res = await API.get(`/getBookingByBid`, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			params: {
				bid: bid,
			},
		});

		const { status, msg, data } = res.data;

		if (status !== 200) {
			throw new Error(msg || 'Failed to fetch booking details');
		}

		// Return the mapped booking data
		return data;
	} catch (err) {
		// Handle API errors
		if (err.response) {
			const errorMsg =
				err.response.data?.msg ||
				err.response.data?.message ||
				'Failed to fetch booking details';

			// Log the error for debugging
			console.error('Get booking by BID API error:', {
				status: err.response.status,
				data: err.response.data,
				bid,
			});

			throw new Error(errorMsg);
		}

		// Handle network errors
		if (err.request) {
			throw new Error('Network error: Unable to connect to server');
		}

		throw new Error('Get booking error: ' + err.message);
	}
};
