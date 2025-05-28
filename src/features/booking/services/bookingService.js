/**
 * Booking Service
 * Handles all booking-related API calls and data management
 */

// Mock booking API - replace with actual API calls when available
const mockBookingApi = {
	get: () => Promise.resolve({ data: { bookings: [], total: 0 } }),
	post: () => Promise.resolve({ data: { id: Date.now() } }),
	put: () => Promise.resolve({ data: {} }),
	delete: () => Promise.resolve({ data: {} }),
};

class BookingService {
	// Get all bookings with optional filters
	async getBookings(filters = {}) {
		try {
			const { searchBy, searchTerm, page = 1, limit = 10, status } = filters;
			const params = new URLSearchParams();

			if (searchBy && searchTerm) {
				params.append("searchBy", searchBy);
				params.append("searchTerm", searchTerm);
			}
			if (status) params.append("status", status);
			params.append("page", page);
			params.append("limit", limit);

			// This would be replaced with actual API call
			return await this.getMockBookings(filters);
		} catch (error) {
			throw new Error(`Failed to fetch bookings: ${error.message}`);
		}
	}

	// Get booking by ID
	async getBookingById(id) {
		try {
			// This would be replaced with actual API call
			return await this.getMockBookingById(id);
		} catch (error) {
			throw new Error(`Failed to fetch booking ${id}: ${error.message}`);
		}
	}

	// Create new booking
	async createBooking(bookingData) {
		try {
			// Validate booking data
			this.validateBookingData(bookingData);

			// This would be replaced with actual API call
			return await this.mockCreateBooking(bookingData);
		} catch (error) {
			throw new Error(`Failed to create booking: ${error.message}`);
		}
	}

	// Update booking
	async updateBooking(id, updates) {
		try {
			// This would be replaced with actual API call
			return await this.mockUpdateBooking(id, updates);
		} catch (error) {
			throw new Error(`Failed to update booking ${id}: ${error.message}`);
		}
	}

	// Update specific booking section
	async updateBookingSection(id, section, data) {
		try {
			const validSections = [
				"provider",
				"passenger",
				"billing",
				"charging",
				"price",
				"itinerary",
			];

			if (!validSections.includes(section)) {
				throw new Error(`Invalid section: ${section}`);
			}

			// This would be replaced with actual API call
			return await fetch(`/api/bookings/${id}/${section}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
		} catch (error) {
			throw new Error(`Failed to update booking section: ${error.message}`);
		}
	}

	// Cancel booking
	async cancelBooking(id, reason, refundType = "none") {
		try {
			const cancelData = {
				reason,
				refundType,
				cancelledAt: new Date().toISOString(),
			};

			return await this.updateBooking(id, {
				status: "cancelled",
				cancellation: cancelData,
			});
		} catch (error) {
			throw new Error(`Failed to cancel booking ${id}: ${error.message}`);
		}
	}

	// Search bookings
	async searchBookings(searchBy, searchTerm) {
		try {
			return await this.getBookings({ searchBy, searchTerm });
		} catch (error) {
			throw new Error(`Failed to search bookings: ${error.message}`);
		}
	}

	// Get booking statistics
	async getBookingStats(dateRange = {}) {
		try {
			const { startDate, endDate } = dateRange;

			// This would be replaced with actual API call
			return {
				totalBookings: 150,
				confirmedBookings: 120,
				pendingBookings: 20,
				cancelledBookings: 10,
				totalRevenue: 125000,
				averageBookingValue: 833.33,
			};
		} catch (error) {
			throw new Error(`Failed to fetch booking statistics: ${error.message}`);
		}
	}

	// Add comment/activity to booking
	async addBookingActivity(bookingId, activity) {
		try {
			const activityData = {
				...activity,
				timestamp: new Date().toISOString(),
				id: Date.now().toString(),
			};

			// This would be replaced with actual API call
			return activityData;
		} catch (error) {
			throw new Error(`Failed to add booking activity: ${error.message}`);
		}
	}

	// Upload booking attachments
	async uploadAttachments(bookingId, files) {
		try {
			const formData = new FormData();
			files.forEach((file, index) => {
				formData.append(`attachment_${index}`, file);
			});

			// This would be replaced with actual API call
			return files.map((file, index) => ({
				id: `att_${Date.now()}_${index}`,
				name: file.name,
				size: file.size,
				type: file.type,
				url: URL.createObjectURL(file), // Mock URL
			}));
		} catch (error) {
			throw new Error(`Failed to upload attachments: ${error.message}`);
		}
	}

	// Validate booking data
	validateBookingData(data) {
		const required = ["customerName", "pnr", "airline"];
		const missing = required.filter((field) => !data[field]);

		if (missing.length > 0) {
			throw new Error(`Missing required fields: ${missing.join(", ")}`);
		}

		if (data.email && !this.isValidEmail(data.email)) {
			throw new Error("Invalid email format");
		}

		if (data.phone && !this.isValidPhone(data.phone)) {
			throw new Error("Invalid phone format");
		}
	}

	// Helper validation methods
	isValidEmail(email) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	isValidPhone(phone) {
		return /^\+?[\d\s-()]+$/.test(phone);
	}

	// Mock data methods (replace with actual API calls)
	async getMockBookings(filters) {
		const mockBookings = [
			{
				BID: "BKG001",
				PNR: "PNR001",
				passengers: { adult: 2, child: 1, infant: 0 },
				cchName: "Visa",
				email: "sarah.w@example.com",
				billingPhone: "+1 234-567-8900",
				cardLast4: "1234",
				status: "Confirmed",
				flightType: "Round-Trip",
				provider: "IndiGo",
				agent: "Sarah Wilson",
				mco: 120,
				createdAt: "2024-03-15T10:30:00Z",
			},
			// Add more mock data as needed
		];

		// Apply filters
		let filtered = mockBookings;

		if (filters.searchBy && filters.searchTerm) {
			const searchTerm = filters.searchTerm.toLowerCase();
			filtered = mockBookings.filter((booking) => {
				const value = booking[filters.searchBy]?.toString().toLowerCase() || "";
				return value.includes(searchTerm);
			});
		}

		if (filters.status) {
			filtered = filtered.filter(
				(booking) =>
					booking.status.toLowerCase() === filters.status.toLowerCase()
			);
		}

		return {
			bookings: filtered,
			total: filtered.length,
			page: filters.page || 1,
			totalPages: Math.ceil(filtered.length / (filters.limit || 10)),
		};
	}

	async getMockBookingById(id) {
		return {
			id,
			BID: `BKG${id.padStart(3, "0")}`,
			PNR: `PNR${id.padStart(3, "0")}`,
			status: "Confirmed",
			customerName: "John Doe",
			email: "john.doe@example.com",
			phone: "+1 234-567-8900",
			airline: "IndiGo",
			provider: "Air Fare/Flight",
			agent: "Sarah Wilson",
			createdAt: "2024-03-15T10:30:00Z",
			// Add more detailed booking data
		};
	}

	async mockCreateBooking(data) {
		return {
			id: Date.now().toString(),
			BID: `BKG${Math.random().toString().slice(2, 5)}`,
			...data,
			status: "Pending",
			createdAt: new Date().toISOString(),
		};
	}

	async mockUpdateBooking(id, updates) {
		return {
			id,
			...updates,
			updatedAt: new Date().toISOString(),
		};
	}
}

export default new BookingService();
