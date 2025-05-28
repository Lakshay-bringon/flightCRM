import { useState, useEffect } from "react";

// Import the service instance - this will be the singleton instance
const getRevenueService = async () => {
	const { RevenueService } = await import("../services/revenueService");
	return new RevenueService();
};

export const useRevenue = () => {
	const [revenueData, setRevenueData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Fetch revenue data
	const fetchRevenueData = async (filters = {}) => {
		setLoading(true);
		setError(null);
		try {
			const revenueService = await getRevenueService();
			const data = await revenueService.getRevenueData(filters);
			setRevenueData(data);
			return data;
		} catch (err) {
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	// Get revenue by ID
	const getRevenueById = async (id) => {
		setError(null);
		try {
			const data = await revenueService.getRevenueById(id);
			return data;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	// Create revenue entry
	const createRevenue = async (revenueData) => {
		setError(null);
		try {
			const result = await revenueService.createRevenue(revenueData);
			await fetchRevenueData(); // Refresh list
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	// Update revenue entry
	const updateRevenue = async (id, updates) => {
		setError(null);
		try {
			const result = await revenueService.updateRevenue(id, updates);
			await fetchRevenueData(); // Refresh list
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	// Delete revenue entry
	const deleteRevenue = async (id) => {
		setError(null);
		try {
			const result = await revenueService.deleteRevenue(id);
			await fetchRevenueData(); // Refresh list
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	// Revenue analytics
	const getRevenueOverview = async (options = {}) => {
		setError(null);
		try {
			const result = await revenueService.getRevenueOverview(options);
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	const getRevenueByPeriod = async (period = "month", options = {}) => {
		setError(null);
		try {
			const result = await revenueService.getRevenueByPeriod(period, options);
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	const getRevenueByAgent = async (options = {}) => {
		setError(null);
		try {
			const result = await revenueService.getRevenueByAgent(options);
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	// Refund management
	const processRefund = async (refundData) => {
		setError(null);
		try {
			const result = await revenueService.processRefund(refundData);
			await fetchRevenueData(); // Refresh list
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	const getRefunds = async (filters = {}) => {
		setError(null);
		try {
			const result = await revenueService.getRefunds(filters);
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	const updateRefundStatus = async (refundId, status, notes = "") => {
		setError(null);
		try {
			const result = await revenueService.updateRefundStatus(
				refundId,
				status,
				notes
			);
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	// Chargeback management
	const processChargeback = async (chargebackData) => {
		setError(null);
		try {
			const result = await revenueService.processChargeback(chargebackData);
			await fetchRevenueData(); // Refresh list
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	const getChargebacks = async (filters = {}) => {
		setError(null);
		try {
			const result = await revenueService.getChargebacks(filters);
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	const updateChargebackStatus = async (chargebackId, status, notes = "") => {
		setError(null);
		try {
			const result = await revenueService.updateChargebackStatus(
				chargebackId,
				status,
				notes
			);
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	// Reporting
	const generateReport = async (reportType, options = {}) => {
		setLoading(true);
		setError(null);
		try {
			const result = await revenueService.generateReport(reportType, options);
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const exportToCSV = async (data, filename) => {
		setError(null);
		try {
			const result = await revenueService.exportToCSV(data, filename);
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	// Agent performance
	const getAgentPerformance = async (options = {}) => {
		setError(null);
		try {
			const result = await revenueService.getAgentPerformance(options);
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	return {
		// State
		revenueData,
		loading,
		error,

		// Basic CRUD operations
		fetchRevenueData,
		getRevenueById,
		createRevenue,
		updateRevenue,
		deleteRevenue,

		// Analytics
		getRevenueOverview,
		getRevenueByPeriod,
		getRevenueByAgent,

		// Refund management
		processRefund,
		getRefunds,
		updateRefundStatus,

		// Chargeback management
		processChargeback,
		getChargebacks,
		updateChargebackStatus,

		// Reporting
		generateReport,
		exportToCSV,

		// Agent performance
		getAgentPerformance,

		// Utility
		refetch: fetchRevenueData,
	};
};

// Hook for revenue search and filtering
export const useRevenueSearch = (
	revenueData,
	searchQuery,
	searchBy = "bookingId"
) => {
	const [filteredRevenue, setFilteredRevenue] = useState([]);

	useEffect(() => {
		if (!searchQuery.trim()) {
			setFilteredRevenue(revenueData);
		} else {
			const filtered = revenueData.filter((revenue) => {
				const value = String(revenue[searchBy] || "").toLowerCase();
				return value.includes(searchQuery.toLowerCase());
			});
			setFilteredRevenue(filtered);
		}
	}, [revenueData, searchQuery, searchBy]);

	return filteredRevenue;
};

// Hook for revenue pagination
export const useRevenuePagination = (revenueData, itemsPerPage = 10) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPageState, setItemsPerPageState] = useState(itemsPerPage);

	const totalPages = Math.ceil(revenueData.length / itemsPerPageState);
	const startIndex = (currentPage - 1) * itemsPerPageState;
	const endIndex = startIndex + itemsPerPageState;
	const paginatedRevenue = revenueData.slice(startIndex, endIndex);

	const goToPage = (page) => {
		setCurrentPage(Math.max(1, Math.min(page, totalPages)));
	};

	const nextPage = () => goToPage(currentPage + 1);
	const prevPage = () => goToPage(currentPage - 1);

	// Reset to first page when revenue data changes
	useEffect(() => {
		setCurrentPage(1);
	}, [revenueData.length]);

	return {
		currentPage,
		totalPages,
		paginatedRevenue,
		itemsPerPage: itemsPerPageState,
		setItemsPerPage: setItemsPerPageState,
		goToPage,
		nextPage,
		prevPage,
		hasNextPage: currentPage < totalPages,
		hasPrevPage: currentPage > 1,
	};
};

// Hook for revenue analytics
export const useRevenueAnalytics = () => {
	const [analytics, setAnalytics] = useState({});
	const [analyticsLoading, setAnalyticsLoading] = useState(false);

	const calculateTotals = (revenueData) => {
		const totals = revenueData.reduce(
			(acc, item) => {
				if (item.type === "booking") {
					acc.totalRevenue += item.amount;
					acc.totalBookings += 1;
					acc.totalCommission += item.commission || 0;
					acc.totalFees += item.fees || 0;
				} else if (item.type === "refund") {
					acc.totalRefunds += Math.abs(item.amount);
				} else if (item.type === "chargeback") {
					acc.totalChargebacks += Math.abs(item.amount);
				}
				return acc;
			},
			{
				totalRevenue: 0,
				totalBookings: 0,
				totalRefunds: 0,
				totalChargebacks: 0,
				totalCommission: 0,
				totalFees: 0,
			}
		);

		totals.netRevenue =
			totals.totalRevenue - totals.totalRefunds - totals.totalChargebacks;
		totals.averageBookingValue =
			totals.totalBookings > 0 ? totals.totalRevenue / totals.totalBookings : 0;

		return totals;
	};

	const getRevenueByTimeframe = (revenueData, timeframe = "month") => {
		const grouped = {};

		revenueData.forEach((item) => {
			const date = new Date(item.date);
			let key;

			switch (timeframe) {
				case "day":
					key = date.toISOString().split("T")[0];
					break;
				case "week":
					const weekStart = new Date(date);
					weekStart.setDate(date.getDate() - date.getDay());
					key = weekStart.toISOString().split("T")[0];
					break;
				case "month":
					key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
						2,
						"0"
					)}`;
					break;
				case "year":
					key = String(date.getFullYear());
					break;
				default:
					key = date.toISOString().split("T")[0];
			}

			if (!grouped[key]) {
				grouped[key] = [];
			}
			grouped[key].push(item);
		});

		// Calculate totals for each period
		const result = Object.entries(grouped).map(([period, data]) => ({
			period,
			...calculateTotals(data),
			count: data.length,
		}));

		return result.sort((a, b) => a.period.localeCompare(b.period));
	};

	const updateAnalytics = (revenueData) => {
		setAnalyticsLoading(true);

		const totals = calculateTotals(revenueData);
		const byMonth = getRevenueByTimeframe(revenueData, "month");
		const byDay = getRevenueByTimeframe(revenueData, "day");

		// Agent performance
		const byAgent = {};
		revenueData.forEach((item) => {
			if (!byAgent[item.agent]) {
				byAgent[item.agent] = [];
			}
			byAgent[item.agent].push(item);
		});

		const agentPerformance = Object.entries(byAgent).map(([agent, data]) => ({
			agent,
			...calculateTotals(data),
		}));

		setAnalytics({
			totals,
			byMonth,
			byDay,
			agentPerformance,
		});

		setAnalyticsLoading(false);
	};

	return {
		analytics,
		analyticsLoading,
		updateAnalytics,
		calculateTotals,
		getRevenueByTimeframe,
	};
};

// Hook for revenue validation
export const useRevenueValidation = () => {
	const validateRevenueData = (revenueData) => {
		const errors = {};

		if (!revenueData.bookingId) {
			errors.bookingId = "Booking ID is required";
		}

		if (!revenueData.amount || revenueData.amount <= 0) {
			errors.amount = "Valid amount is required";
		}

		if (
			!revenueData.type ||
			!["booking", "refund", "chargeback"].includes(revenueData.type)
		) {
			errors.type = "Valid revenue type is required";
		}

		if (!revenueData.date) {
			errors.date = "Date is required";
		}

		if (!revenueData.agent) {
			errors.agent = "Agent is required";
		}

		return {
			isValid: Object.keys(errors).length === 0,
			errors,
		};
	};

	const validateRefundData = (refundData) => {
		const errors = {};

		if (!refundData.bookingId) {
			errors.bookingId = "Booking ID is required";
		}

		if (!refundData.amount || refundData.amount <= 0) {
			errors.amount = "Valid refund amount is required";
		}

		if (!refundData.reason) {
			errors.reason = "Refund reason is required";
		}

		return {
			isValid: Object.keys(errors).length === 0,
			errors,
		};
	};

	const validateChargebackData = (chargebackData) => {
		const errors = {};

		if (!chargebackData.bookingId) {
			errors.bookingId = "Booking ID is required";
		}

		if (!chargebackData.amount || chargebackData.amount <= 0) {
			errors.amount = "Valid chargeback amount is required";
		}

		if (!chargebackData.reason) {
			errors.reason = "Chargeback reason is required";
		}

		return {
			isValid: Object.keys(errors).length === 0,
			errors,
		};
	};

	return {
		validateRevenueData,
		validateRefundData,
		validateChargebackData,
	};
};
