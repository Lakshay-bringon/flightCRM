/**
 * IP Service - Manages IP address management, access control, and security operations
 * This service handles all IP-related operations including CRUD operations,
 * validation, status management, and security monitoring.
 */

// Mock data for development
const mockIPs = [
	{
		id: 1,
		ip: "192.168.1.100",
		allowed_status: "allowed",
		description: "Office Network - Main",
		createdAt: "2024-01-15T10:30:00Z",
		updatedAt: "2024-01-15T10:30:00Z",
		lastAccess: "2024-03-15T14:22:00Z",
		accessCount: 245,
	},
	{
		id: 2,
		ip: "203.115.33.45",
		allowed_status: "allowed",
		description: "Remote Office - Mumbai",
		createdAt: "2024-01-20T09:15:00Z",
		updatedAt: "2024-02-10T16:45:00Z",
		lastAccess: "2024-03-14T11:30:00Z",
		accessCount: 156,
	},
	{
		id: 3,
		ip: "10.0.0.50",
		allowed_status: "blocked",
		description: "Suspicious Activity",
		createdAt: "2024-02-01T13:20:00Z",
		updatedAt: "2024-02-15T10:00:00Z",
		lastAccess: "2024-02-15T09:45:00Z",
		accessCount: 23,
	},
	{
		id: 4,
		ip: "172.16.0.100",
		allowed_status: "allowed",
		description: "VPN Gateway - Delhi",
		createdAt: "2024-01-25T11:00:00Z",
		updatedAt: "2024-01-25T11:00:00Z",
		lastAccess: "2024-03-15T09:15:00Z",
		accessCount: 89,
	},
	{
		id: 5,
		ip: "123.45.67.89",
		allowed_status: "blocked",
		description: "Failed Authentication Attempts",
		createdAt: "2024-02-20T15:30:00Z",
		updatedAt: "2024-03-01T12:00:00Z",
		lastAccess: "2024-03-01T11:55:00Z",
		accessCount: 45,
	},
];

const mockIPInfo = {
	active_ip: 3,
	blocked_ip: 2,
	total_ip: 5,
	last_update: "2024-03-15T14:22:00Z",
	protection_enabled: true,
	failed_attempts_today: 12,
	successful_access_today: 156,
};

class IPService {
	constructor() {
		this.ips = [...mockIPs];
		this.ipInfo = { ...mockIPInfo };
		this.nextId = 1000; // Start IDs from 1000 for new items
	}

	// Utility methods
	generateId() {
		return ++this.nextId;
	}

	validateIPAddress(ip) {
		// IPv4 validation
		const ipv4Regex =
			/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
		// IPv6 validation (basic)
		const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

		return ipv4Regex.test(ip) || ipv6Regex.test(ip);
	}

	validateRequired(value, fieldName) {
		if (!value || (typeof value === "string" && value.trim() === "")) {
			throw new Error(`${fieldName} is required`);
		}
	}

	formatResponse(success, data = null, message = "") {
		return {
			success,
			data,
			message,
			timestamp: new Date().toISOString(),
		};
	}

	normalizeIPData(ipObj) {
		return {
			id: ipObj.id,
			ip: ipObj.ip || ipObj.ip_address || "",
			allowed_status: this.normalizeStatus(
				ipObj.allowed_status || ipObj.status
			),
			description: ipObj.description || ipObj.desc || "",
			createdAt: ipObj.createdAt || ipObj.datetime || new Date().toISOString(),
			updatedAt: ipObj.updatedAt || new Date().toISOString(),
			lastAccess: ipObj.lastAccess || null,
			accessCount: ipObj.accessCount || 0,
		};
	}

	normalizeStatus(status) {
		// Convert various status formats to standard 'allowed'/'blocked'
		if (status === "1" || status === 1 || status === "allowed") {
			return "allowed";
		}
		if (status === "0" || status === 0 || status === "blocked") {
			return "blocked";
		}
		return "blocked"; // default to blocked for security
	}

	updateIPInfo() {
		this.ipInfo.active_ip = this.ips.filter(
			(ip) => ip.allowed_status === "allowed"
		).length;
		this.ipInfo.blocked_ip = this.ips.filter(
			(ip) => ip.allowed_status === "blocked"
		).length;
		this.ipInfo.total_ip = this.ips.length;
		this.ipInfo.last_update = new Date().toISOString();
	}

	// IP CRUD Operations
	async getIPs(options = {}) {
		try {
			const {
				search = "",
				status = "all",
				sortBy = "createdAt",
				sortOrder = "desc",
				page = 1,
				limit = 50,
			} = options;

			let filteredIPs = [...this.ips];

			// Apply search filter
			if (search) {
				filteredIPs = filteredIPs.filter(
					(ip) =>
						ip.ip.toLowerCase().includes(search.toLowerCase()) ||
						ip.description.toLowerCase().includes(search.toLowerCase())
				);
			}

			// Apply status filter
			if (status !== "all") {
				filteredIPs = filteredIPs.filter((ip) => ip.allowed_status === status);
			}

			// Apply sorting
			filteredIPs.sort((a, b) => {
				let aVal = a[sortBy];
				let bVal = b[sortBy];

				// Handle date sorting
				if (sortBy.includes("At") || sortBy === "lastAccess") {
					aVal = new Date(aVal);
					bVal = new Date(bVal);
				}

				// Handle numeric sorting
				if (sortBy === "accessCount") {
					aVal = parseInt(aVal) || 0;
					bVal = parseInt(bVal) || 0;
				}

				const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
				return sortOrder === "asc" ? comparison : -comparison;
			});

			// Apply pagination
			const startIndex = (page - 1) * limit;
			const paginatedIPs = filteredIPs.slice(startIndex, startIndex + limit);

			const result = {
				ips: paginatedIPs.map((ip) => this.normalizeIPData(ip)),
				pagination: {
					page,
					limit,
					total: filteredIPs.length,
					totalPages: Math.ceil(filteredIPs.length / limit),
				},
			};

			return this.formatResponse(true, result, "IPs retrieved successfully");
		} catch (error) {
			throw new Error(`Failed to fetch IPs: ${error.message}`);
		}
	}

	async getIPById(id) {
		try {
			const ip = this.ips.find((ip) => ip.id === parseInt(id));
			if (!ip) {
				throw new Error("IP not found");
			}
			return this.formatResponse(
				true,
				this.normalizeIPData(ip),
				"IP retrieved successfully"
			);
		} catch (error) {
			throw new Error(`Failed to fetch IP: ${error.message}`);
		}
	}

	async createIP(ipData) {
		try {
			this.validateRequired(ipData.ip, "IP address");
			this.validateRequired(ipData.description, "Description");

			// Validate IP format
			if (!this.validateIPAddress(ipData.ip)) {
				throw new Error("Invalid IP address format");
			}

			// Check for duplicate IP
			const existingIP = this.ips.find((ip) => ip.ip === ipData.ip);
			if (existingIP) {
				throw new Error("IP address already exists");
			}

			const newIP = {
				id: this.generateId(),
				ip: ipData.ip.trim(),
				allowed_status: this.normalizeStatus(
					ipData.allowed_status || "allowed"
				),
				description: ipData.description.trim(),
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				lastAccess: null,
				accessCount: 0,
			};

			this.ips.push(newIP);
			this.updateIPInfo();

			return this.formatResponse(
				true,
				this.normalizeIPData(newIP),
				"IP created successfully"
			);
		} catch (error) {
			throw new Error(`Failed to create IP: ${error.message}`);
		}
	}

	async updateIP(id, ipData) {
		try {
			const ipIndex = this.ips.findIndex((ip) => ip.id === parseInt(id));
			if (ipIndex === -1) {
				throw new Error("IP not found");
			}

			this.validateRequired(ipData.ip, "IP address");
			this.validateRequired(ipData.description, "Description");

			// Validate IP format
			if (!this.validateIPAddress(ipData.ip)) {
				throw new Error("Invalid IP address format");
			}

			// Check for duplicate IP (excluding current IP)
			const existingIP = this.ips.find(
				(ip) => ip.ip === ipData.ip && ip.id !== parseInt(id)
			);
			if (existingIP) {
				throw new Error("IP address already exists");
			}

			const updatedIP = {
				...this.ips[ipIndex],
				ip: ipData.ip.trim(),
				allowed_status: this.normalizeStatus(ipData.allowed_status),
				description: ipData.description.trim(),
				updatedAt: new Date().toISOString(),
			};

			this.ips[ipIndex] = updatedIP;
			this.updateIPInfo();

			return this.formatResponse(
				true,
				this.normalizeIPData(updatedIP),
				"IP updated successfully"
			);
		} catch (error) {
			throw new Error(`Failed to update IP: ${error.message}`);
		}
	}

	async deleteIP(id) {
		try {
			const ipIndex = this.ips.findIndex((ip) => ip.id === parseInt(id));
			if (ipIndex === -1) {
				throw new Error("IP not found");
			}

			const deletedIP = this.ips.splice(ipIndex, 1)[0];
			this.updateIPInfo();

			return this.formatResponse(
				true,
				this.normalizeIPData(deletedIP),
				"IP deleted successfully"
			);
		} catch (error) {
			throw new Error(`Failed to delete IP: ${error.message}`);
		}
	}

	async toggleIPStatus(id) {
		try {
			const ip = this.ips.find((ip) => ip.id === parseInt(id));
			if (!ip) {
				throw new Error("IP not found");
			}

			ip.allowed_status =
				ip.allowed_status === "allowed" ? "blocked" : "allowed";
			ip.updatedAt = new Date().toISOString();

			this.updateIPInfo();

			return this.formatResponse(
				true,
				this.normalizeIPData(ip),
				"IP status updated successfully"
			);
		} catch (error) {
			throw new Error(`Failed to toggle IP status: ${error.message}`);
		}
	}

	// IP Information and Statistics
	async getIPInfo() {
		try {
			this.updateIPInfo();
			return this.formatResponse(
				true,
				this.ipInfo,
				"IP information retrieved successfully"
			);
		} catch (error) {
			throw new Error(`Failed to fetch IP information: ${error.message}`);
		}
	}

	async getIPStats(dateRange = {}) {
		try {
			const { startDate, endDate } = dateRange;

			let filteredIPs = [...this.ips];

			// Apply date filter if provided
			if (startDate && endDate) {
				filteredIPs = filteredIPs.filter((ip) => {
					const ipDate = new Date(ip.createdAt);
					return ipDate >= new Date(startDate) && ipDate <= new Date(endDate);
				});
			}

			const stats = {
				total: filteredIPs.length,
				allowed: filteredIPs.filter((ip) => ip.allowed_status === "allowed")
					.length,
				blocked: filteredIPs.filter((ip) => ip.allowed_status === "blocked")
					.length,
				totalAccess: filteredIPs.reduce((sum, ip) => sum + ip.accessCount, 0),
				mostAccessedIP: filteredIPs.reduce(
					(max, ip) => (ip.accessCount > (max.accessCount || 0) ? ip : max),
					{}
				),
				recentlyAdded: filteredIPs
					.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
					.slice(0, 5),
				securityEvents: {
					blockedAttempts: filteredIPs
						.filter((ip) => ip.allowed_status === "blocked")
						.reduce((sum, ip) => sum + ip.accessCount, 0),
					newThreats: filteredIPs.filter(
						(ip) =>
							ip.allowed_status === "blocked" &&
							new Date(ip.createdAt) >
								new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
					).length,
				},
			};

			return this.formatResponse(
				true,
				stats,
				"IP statistics retrieved successfully"
			);
		} catch (error) {
			throw new Error(`Failed to fetch IP statistics: ${error.message}`);
		}
	}

	// Security and Protection Management
	async enableProtection() {
		try {
			this.ipInfo.protection_enabled = true;
			this.ipInfo.last_update = new Date().toISOString();

			return this.formatResponse(
				true,
				this.ipInfo,
				"IP protection enabled successfully"
			);
		} catch (error) {
			throw new Error(`Failed to enable IP protection: ${error.message}`);
		}
	}

	async disableProtection() {
		try {
			this.ipInfo.protection_enabled = false;
			this.ipInfo.last_update = new Date().toISOString();

			return this.formatResponse(
				true,
				this.ipInfo,
				"IP protection disabled successfully"
			);
		} catch (error) {
			throw new Error(`Failed to disable IP protection: ${error.message}`);
		}
	}

	async checkIPAccess(ipAddress) {
		try {
			if (!this.ipInfo.protection_enabled) {
				return this.formatResponse(
					true,
					{ allowed: true, reason: "Protection disabled" },
					"Access granted"
				);
			}

			const ip = this.ips.find((ip) => ip.ip === ipAddress);

			if (!ip) {
				// IP not in list - default behavior based on protection settings
				return this.formatResponse(
					true,
					{ allowed: false, reason: "IP not in whitelist" },
					"Access denied"
				);
			}

			const allowed = ip.allowed_status === "allowed";

			// Update access tracking
			if (allowed) {
				ip.lastAccess = new Date().toISOString();
				ip.accessCount++;
			}

			return this.formatResponse(
				true,
				{
					allowed,
					reason: allowed ? "IP whitelisted" : "IP blocked",
					ipData: this.normalizeIPData(ip),
				},
				allowed ? "Access granted" : "Access denied"
			);
		} catch (error) {
			throw new Error(`Failed to check IP access: ${error.message}`);
		}
	}

	// Bulk Operations
	async bulkUpdateStatus(ids, status) {
		try {
			const updatedIPs = [];

			for (const id of ids) {
				const ip = this.ips.find((ip) => ip.id === parseInt(id));
				if (ip) {
					ip.allowed_status = this.normalizeStatus(status);
					ip.updatedAt = new Date().toISOString();
					updatedIPs.push(this.normalizeIPData(ip));
				}
			}

			this.updateIPInfo();

			return this.formatResponse(
				true,
				updatedIPs,
				`Bulk status update completed for ${updatedIPs.length} IPs`
			);
		} catch (error) {
			throw new Error(`Failed to perform bulk update: ${error.message}`);
		}
	}

	async bulkDelete(ids) {
		try {
			const deletedIPs = [];

			// Sort IDs in descending order to avoid index issues when splicing
			const sortedIds = ids.map((id) => parseInt(id)).sort((a, b) => b - a);

			for (const id of sortedIds) {
				const ipIndex = this.ips.findIndex((ip) => ip.id === id);
				if (ipIndex !== -1) {
					const deletedIP = this.ips.splice(ipIndex, 1)[0];
					deletedIPs.push(this.normalizeIPData(deletedIP));
				}
			}

			this.updateIPInfo();

			return this.formatResponse(
				true,
				deletedIPs,
				`Bulk delete completed for ${deletedIPs.length} IPs`
			);
		} catch (error) {
			throw new Error(`Failed to perform bulk delete: ${error.message}`);
		}
	}

	// Import/Export functionality
	async exportIPs(format = "json") {
		try {
			const exportData = {
				ips: this.ips.map((ip) => this.normalizeIPData(ip)),
				metadata: {
					exportedAt: new Date().toISOString(),
					totalCount: this.ips.length,
					version: "1.0",
				},
			};

			if (format === "csv") {
				// Convert to CSV format
				const headers = [
					"ID",
					"IP Address",
					"Status",
					"Description",
					"Created At",
					"Access Count",
				];
				const csvRows = [
					headers.join(","),
					...this.ips.map((ip) =>
						[
							ip.id,
							ip.ip,
							ip.allowed_status,
							`"${ip.description}"`,
							ip.createdAt,
							ip.accessCount,
						].join(",")
					),
				];
				exportData.csvContent = csvRows.join("\n");
			}

			return this.formatResponse(true, exportData, "IPs exported successfully");
		} catch (error) {
			throw new Error(`Failed to export IPs: ${error.message}`);
		}
	}

	async importIPs(importData, options = {}) {
		try {
			const { overwrite = false, skipDuplicates = true } = options;

			if (!importData || !Array.isArray(importData.ips)) {
				throw new Error("Invalid import data format");
			}

			const importResults = {
				imported: [],
				skipped: [],
				errors: [],
			};

			for (const ipData of importData.ips) {
				try {
					// Check for duplicates
					const existingIP = this.ips.find((ip) => ip.ip === ipData.ip);

					if (existingIP) {
						if (overwrite) {
							// Update existing IP
							const result = await this.updateIP(existingIP.id, ipData);
							importResults.imported.push(result.data);
						} else if (skipDuplicates) {
							importResults.skipped.push({
								ip: ipData.ip,
								reason: "Duplicate IP",
							});
						} else {
							throw new Error(`Duplicate IP: ${ipData.ip}`);
						}
					} else {
						// Create new IP
						const result = await this.createIP(ipData);
						importResults.imported.push(result.data);
					}
				} catch (error) {
					importResults.errors.push({ ip: ipData.ip, error: error.message });
				}
			}

			this.updateIPInfo();

			return this.formatResponse(true, importResults, "IP import completed");
		} catch (error) {
			throw new Error(`Failed to import IPs: ${error.message}`);
		}
	}

	// Security Monitoring
	async getSecurityEvents(options = {}) {
		try {
			const {
				startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
				endDate = new Date(),
				eventType = "all",
			} = options;

			// Mock security events - in real implementation, this would come from logs
			const events = [
				{
					id: 1,
					type: "access_denied",
					ip: "123.45.67.89",
					timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
					description: "Blocked IP attempted access",
					severity: "medium",
				},
				{
					id: 2,
					type: "ip_blocked",
					ip: "10.0.0.50",
					timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
					description: "IP address blocked due to suspicious activity",
					severity: "high",
				},
				{
					id: 3,
					type: "protection_disabled",
					ip: "system",
					timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
					description: "IP protection was disabled",
					severity: "critical",
				},
			];

			let filteredEvents = events.filter((event) => {
				const eventDate = new Date(event.timestamp);
				return eventDate >= startDate && eventDate <= endDate;
			});

			if (eventType !== "all") {
				filteredEvents = filteredEvents.filter(
					(event) => event.type === eventType
				);
			}

			return this.formatResponse(
				true,
				filteredEvents,
				"Security events retrieved successfully"
			);
		} catch (error) {
			throw new Error(`Failed to fetch security events: ${error.message}`);
		}
	}
}

// Create and export a singleton instance
const ipService = new IPService();
export default ipService;
