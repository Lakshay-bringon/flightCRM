import { useState, useEffect } from "react";

// Import the service instance - this will be the singleton instance
const getBookingService = async () => {
	const { BookingService } = await import("../services/bookingService");
	return new BookingService();
};

export const useBooking = () => {
	const [bookings, setBookings] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Fetch bookings with optional filters
	const fetchBookings = async (filters = {}) => {
		setLoading(true);
		setError(null);
		try {
			const bookingService = await getBookingService();
			const data = await bookingService.getBookings(filters);
			setBookings(data.bookings || []);
			return data;
		} catch (err) {
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	// Get a specific booking by ID
	const getBookingById = async (id) => {
		setLoading(true);
		setError(null);
		try {
			const bookingService = await getBookingService();
			const data = await bookingService.getBookingById(id);
			return data;
		} catch (err) {
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	// Create new booking
	const createBooking = async (bookingData) => {
		setLoading(true);
		setError(null);
		try {
			const bookingService = await getBookingService();
			const result = await bookingService.createBooking(bookingData);
			await fetchBookings(); // Refresh the list
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	// Update booking
	const updateBooking = async (id, updates) => {
		setLoading(true);
		setError(null);
		try {
			const bookingService = await getBookingService();
			const result = await bookingService.updateBooking(id, updates);
			await fetchBookings(); // Refresh the list
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	// Update booking section
	const updateBookingSection = async (id, section, data) => {
		setLoading(true);
		setError(null);
		try {
			const bookingService = await getBookingService();
			const result = await bookingService.updateBookingSection(
				id,
				section,
				data
			);
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	// Cancel booking
	const cancelBooking = async (id, reason, refundType = "none") => {
		setLoading(true);
		setError(null);
		try {
			const bookingService = await getBookingService();
			const result = await bookingService.cancelBooking(id, reason, refundType);
			await fetchBookings(); // Refresh the list
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	// Search bookings
	const searchBookings = async (searchBy, searchTerm) => {
		setLoading(true);
		setError(null);
		try {
			const bookingService = await getBookingService();
			const result = await bookingService.searchBookings(searchBy, searchTerm);
			setBookings(result.bookings || []);
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	// Get booking statistics
	const getBookingStats = async (dateRange = {}) => {
		setLoading(true);
		setError(null);
		try {
			const bookingService = await getBookingService();
			const result = await bookingService.getBookingStats(dateRange);
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	// Add booking activity
	const addBookingActivity = async (bookingId, activity) => {
		setError(null);
		try {
			const bookingService = await getBookingService();
			const result = await bookingService.addBookingActivity(
				bookingId,
				activity
			);
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	// Upload booking attachments
	const uploadBookingAttachments = async (bookingId, files) => {
		setLoading(true);
		setError(null);
		try {
			const bookingService = await getBookingService();
			const result = await bookingService.uploadAttachments(bookingId, files);
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	return {
		bookings,
		loading,
		error,
		fetchBookings,
		getBookingById,
		createBooking,
		updateBooking,
		updateBookingSection,
		cancelBooking,
		searchBookings,
		getBookingStats,
		addBookingActivity,
		uploadBookingAttachments,
		refetch: fetchBookings,
	};
};

// Hook for booking search and filtering
export const useBookingSearch = (bookings, searchQuery, searchBy = "pnr") => {
	const [filteredBookings, setFilteredBookings] = useState([]);

	useEffect(() => {
		if (!searchQuery.trim()) {
			setFilteredBookings(bookings);
		} else {
			const filtered = bookings.filter((booking) => {
				const value = String(booking[searchBy] || "").toLowerCase();
				return value.includes(searchQuery.toLowerCase());
			});
			setFilteredBookings(filtered);
		}
	}, [bookings, searchQuery, searchBy]);

	return filteredBookings;
};

// Hook for booking pagination
export const useBookingPagination = (bookings, itemsPerPage = 10) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPageState, setItemsPerPageState] = useState(itemsPerPage);

	const totalPages = Math.ceil(bookings.length / itemsPerPageState);
	const startIndex = (currentPage - 1) * itemsPerPageState;
	const endIndex = startIndex + itemsPerPageState;
	const paginatedBookings = bookings.slice(startIndex, endIndex);

	const goToPage = (page) => {
		setCurrentPage(Math.max(1, Math.min(page, totalPages)));
	};

	const nextPage = () => goToPage(currentPage + 1);
	const prevPage = () => goToPage(currentPage - 1);

	// Reset to first page when bookings change
	useEffect(() => {
		setCurrentPage(1);
	}, [bookings.length]);

	return {
		currentPage,
		totalPages,
		paginatedBookings,
		itemsPerPage: itemsPerPageState,
		setItemsPerPage: setItemsPerPageState,
		goToPage,
		nextPage,
		prevPage,
		hasNextPage: currentPage < totalPages,
		hasPrevPage: currentPage > 1,
	};
};

// Hook for booking status management
export const useBookingStatus = () => {
	const [statusCounts, setStatusCounts] = useState({
		confirmed: 0,
		pending: 0,
		cancelled: 0,
	});

	const updateStatusCounts = (bookings) => {
		const counts = bookings.reduce(
			(acc, booking) => {
				const status = booking.status?.toLowerCase() || "pending";
				acc[status] = (acc[status] || 0) + 1;
				return acc;
			},
			{ confirmed: 0, pending: 0, cancelled: 0 }
		);

		setStatusCounts(counts);
	};

	return {
		statusCounts,
		updateStatusCounts,
	};
};
