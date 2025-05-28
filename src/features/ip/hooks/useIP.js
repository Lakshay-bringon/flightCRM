import { useState, useEffect } from "react";

// Import the service instance - this will be the singleton instance
const getIPService = async () => {
	const { IPService } = await import("../services/ipService");
	return new IPService();
};

export const useIP = () => {
	const [ipAddresses, setIpAddresses] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Fetch all IP addresses
	const fetchIpAddresses = async (filters = {}) => {
		setLoading(true);
		setError(null);
		try {
			const ipService = await getIPService();
			const data = await ipService.getIpAddresses(filters);
			setIpAddresses(data);
			return data;
		} catch (err) {
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	// Get IP address by ID
	const getIpAddressById = async (id) => {
		setError(null);
		try {
			const ipService = await getIPService();
			const data = await ipService.getIpAddressById(id);
			return data;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	// Create new IP address
	const createIpAddress = async (ipData) => {
		setError(null);
		try {
			const result = await ipService.createIpAddress(ipData);
			await fetchIpAddresses(); // Refresh list
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	// Update IP address
	const updateIpAddress = async (id, updates) => {
		setError(null);
		try {
			const result = await ipService.updateIpAddress(id, updates);
			await fetchIpAddresses(); // Refresh list
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	// Delete IP address
	const deleteIpAddress = async (id) => {
		setError(null);
		try {
			const result = await ipService.deleteIpAddress(id);
			await fetchIpAddresses(); // Refresh list
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	// Block IP address
	const blockIpAddress = async (id, reason = "") => {
		setError(null);
		try {
			const result = await ipService.blockIpAddress(id, reason);
			await fetchIpAddresses(); // Refresh list
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	// Unblock IP address
	const unblockIpAddress = async (id) => {
		setError(null);
		try {
			const result = await ipService.unblockIpAddress(id);
			await fetchIpAddresses(); // Refresh list
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	// Search IP addresses
	const searchIpAddresses = async (query) => {
		setError(null);
		try {
			const result = await ipService.searchIpAddresses(query);
			setIpAddresses(result);
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	// Get IP statistics
	const getIpStats = async () => {
		setError(null);
		try {
			const result = await ipService.getIpStats();
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	// Bulk operations
	const bulkBlock = async (ipIds, reason = "") => {
		setLoading(true);
		setError(null);
		try {
			const result = await ipService.bulkBlock(ipIds, reason);
			await fetchIpAddresses(); // Refresh list
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const bulkUnblock = async (ipIds) => {
		setLoading(true);
		setError(null);
		try {
			const result = await ipService.bulkUnblock(ipIds);
			await fetchIpAddresses(); // Refresh list
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const bulkDelete = async (ipIds) => {
		setLoading(true);
		setError(null);
		try {
			const result = await ipService.bulkDelete(ipIds);
			await fetchIpAddresses(); // Refresh list
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	// Security monitoring
	const getSecurityEvents = async (ipId = null) => {
		setError(null);
		try {
			const result = await ipService.getSecurityEvents(ipId);
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	const reportSecurityEvent = async (eventData) => {
		setError(null);
		try {
			const result = await ipService.reportSecurityEvent(eventData);
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	return {
		// State
		ipAddresses,
		loading,
		error,

		// Basic CRUD operations
		fetchIpAddresses,
		getIpAddressById,
		createIpAddress,
		updateIpAddress,
		deleteIpAddress,

		// IP status management
		blockIpAddress,
		unblockIpAddress,

		// Search and stats
		searchIpAddresses,
		getIpStats,

		// Bulk operations
		bulkBlock,
		bulkUnblock,
		bulkDelete,

		// Security monitoring
		getSecurityEvents,
		reportSecurityEvent,

		// Utility
		refetch: fetchIpAddresses,
	};
};

// Hook for IP search and filtering
export const useIPSearch = (ipAddresses, searchQuery, searchBy = "ip") => {
	const [filteredIPs, setFilteredIPs] = useState([]);

	useEffect(() => {
		if (!searchQuery.trim()) {
			setFilteredIPs(ipAddresses);
		} else {
			const filtered = ipAddresses.filter((ip) => {
				const value = String(ip[searchBy] || "").toLowerCase();
				return value.includes(searchQuery.toLowerCase());
			});
			setFilteredIPs(filtered);
		}
	}, [ipAddresses, searchQuery, searchBy]);

	return filteredIPs;
};

// Hook for IP pagination
export const useIPPagination = (ipAddresses, itemsPerPage = 10) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPageState, setItemsPerPageState] = useState(itemsPerPage);

	const totalPages = Math.ceil(ipAddresses.length / itemsPerPageState);
	const startIndex = (currentPage - 1) * itemsPerPageState;
	const endIndex = startIndex + itemsPerPageState;
	const paginatedIPs = ipAddresses.slice(startIndex, endIndex);

	const goToPage = (page) => {
		setCurrentPage(Math.max(1, Math.min(page, totalPages)));
	};

	const nextPage = () => goToPage(currentPage + 1);
	const prevPage = () => goToPage(currentPage - 1);

	// Reset to first page when IP addresses change
	useEffect(() => {
		setCurrentPage(1);
	}, [ipAddresses.length]);

	return {
		currentPage,
		totalPages,
		paginatedIPs,
		itemsPerPage: itemsPerPageState,
		setItemsPerPage: setItemsPerPageState,
		goToPage,
		nextPage,
		prevPage,
		hasNextPage: currentPage < totalPages,
		hasPrevPage: currentPage > 1,
	};
};

// Hook for IP status management
export const useIPStatus = () => {
	const [statusCounts, setStatusCounts] = useState({
		active: 0,
		blocked: 0,
		whitelisted: 0,
		blacklisted: 0,
	});

	const updateStatusCounts = (ipAddresses) => {
		const counts = ipAddresses.reduce(
			(acc, ip) => {
				const status = ip.status?.toLowerCase() || "active";
				acc[status] = (acc[status] || 0) + 1;
				return acc;
			},
			{ active: 0, blocked: 0, whitelisted: 0, blacklisted: 0 }
		);

		setStatusCounts(counts);
	};

	return {
		statusCounts,
		updateStatusCounts,
	};
};

// Hook for IP validation
export const useIPValidation = () => {
	const validateIPAddress = (ip) => {
		const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
		const ipv6Regex = /^([0-9a-f]{1,4}:){7}[0-9a-f]{1,4}$/i;

		if (!ip) {
			return { isValid: false, error: "IP address is required" };
		}

		if (!ipv4Regex.test(ip) && !ipv6Regex.test(ip)) {
			return { isValid: false, error: "Invalid IP address format" };
		}

		// Additional IPv4 validation
		if (ipv4Regex.test(ip)) {
			const parts = ip.split(".");
			const isValidParts = parts.every((part) => {
				const num = parseInt(part, 10);
				return num >= 0 && num <= 255;
			});

			if (!isValidParts) {
				return { isValid: false, error: "Invalid IPv4 address range" };
			}
		}

		return { isValid: true, error: null };
	};

	const validateIPData = (ipData) => {
		const errors = {};

		// Validate IP address
		const ipValidation = validateIPAddress(ipData.ip);
		if (!ipValidation.isValid) {
			errors.ip = ipValidation.error;
		}

		// Validate label
		if (!ipData.label || ipData.label.trim().length === 0) {
			errors.label = "Label is required";
		}

		// Validate type
		if (
			!ipData.type ||
			!["whitelist", "blacklist", "monitoring"].includes(ipData.type)
		) {
			errors.type = "Valid IP type is required";
		}

		return {
			isValid: Object.keys(errors).length === 0,
			errors,
		};
	};

	return {
		validateIPAddress,
		validateIPData,
	};
};

// Hook for IP security monitoring
export const useIPSecurity = () => {
	const [securityEvents, setSecurityEvents] = useState([]);
	const [securityLoading, setSecurityLoading] = useState(false);

	const fetchSecurityEvents = async (ipId = null) => {
		setSecurityLoading(true);
		try {
			const events = await ipService.getSecurityEvents(ipId);
			setSecurityEvents(events);
			return events;
		} catch (err) {
			throw err;
		} finally {
			setSecurityLoading(false);
		}
	};

	const addSecurityEvent = async (eventData) => {
		try {
			const result = await ipService.reportSecurityEvent(eventData);
			await fetchSecurityEvents(); // Refresh events
			return result;
		} catch (err) {
			throw err;
		}
	};

	const getSecuritySummary = (events = securityEvents) => {
		const summary = events.reduce((acc, event) => {
			const type = event.type || "unknown";
			acc[type] = (acc[type] || 0) + 1;
			return acc;
		}, {});

		return {
			total: events.length,
			...summary,
		};
	};

	return {
		securityEvents,
		securityLoading,
		fetchSecurityEvents,
		addSecurityEvent,
		getSecuritySummary,
	};
};
