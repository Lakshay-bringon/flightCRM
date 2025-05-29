/**
 * BookingService - Data transformation layer only
 * Purpose: Transform form data to API-compatible format
 * Note: Validation handled by Zod, errors/loading handled by showPromiseToast
 */

import { createReservationApi } from "../../../api/booking/bookingApi.js";

class BookingService {
	// Transform form data to API format
	transformBookingData(formData) {
		// Construct billing address from address components
		const addressParts = [];
		if (formData.address?.streetAddress)
			addressParts.push(formData.address.streetAddress);
		if (formData.address?.locality)
			addressParts.push(formData.address.locality);
		if (formData.address?.city) addressParts.push(formData.address.city);
		if (formData.address?.state) addressParts.push(formData.address.state);
		if (formData.address?.zip) addressParts.push(formData.address.zip);

		const billingAddress =
			addressParts.length > 0
				? addressParts.join(", ")
				: "Address not provided";

		// Sanitize phone number
		const cleanPhone = (formData.phone || "").replace(/[\s\-\(\)\.]/g, "");
		const sanitizedPhone = cleanPhone.length >= 10 ? cleanPhone : "1234567890";

		// Transform form field names to API field names
		const chargeData =
			Array.isArray(formData.charges) && formData.charges.length === 1
				? formData.charges[0]
				: formData.charges;
		const passengerData =
			Array.isArray(formData.passengers) && formData.passengers.length === 1
				? formData.passengers[0]
				: formData.passengers;
		return {
			airline_name: formData.airline || "",
			customer_name: formData.customerName || "",
			contact_number: sanitizedPhone,
			confirmation_number: formData.pnr || "",
			amount: parseFloat(formData.totalCost) || 0,
			pnr: formData.pnr || "",
			charge_data: chargeData,
			passenger_data: passengerData,
			card_type: formData.cardType || "VISA",
			card_holder: formData.cardholderName || formData.customerName || "",
			phone: sanitizedPhone,
			email: formData.email || "customer@example.com",
			payment_method: formData.paymentMethod || "VISA",
			purchase_date: formData.date || new Date().toISOString().split("T")[0],
			billing_address: billingAddress,
			zip: formData.address?.zip || "",
			city: formData.address?.city || "",
			state: formData.address?.state || "",
			country: formData.address?.country || "US",
			agreed_terms: 1,
			image_itinerary: formData.itineraryImage || "",
			attachments: formData.attachments || [],
			itinerary_details: formData.itineraryDetails || "",
			transactionType: formData.transactionType || "",
			providerId: formData.providerId || "",
			queueId: formData.queueId || "",
		};
	}
	// Create booking - just data transformation + API call
	async createBooking(formData) {
		const apiData = this.transformBookingData(formData);
		return createReservationApi(apiData); // Return the promise directly
	}
}

export default new BookingService();
