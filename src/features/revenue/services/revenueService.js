/**
 * Revenue Service - Manages revenue tracking, reporting, and financial analytics
 * This service handles all revenue-related operations including revenue calculations,
 * refunds, chargebacks, reporting, and financial analytics.
 */

// Mock data for development
const mockRevenueData = [
	{
		id: 1,
		bookingId: "BK001",
		amount: 125000,
		type: "booking",
		date: "2024-03-15",
		agent: "Sarah Wilson",
		provider: "Air India",
		currency: "USD",
		status: "completed",
		commission: 12500,
		fees: 2500,
	},
	{
		id: 2,
		bookingId: "BK002",
		amount: 85000,
		type: "booking",
		date: "2024-03-14",
		agent: "John Doe",
		provider: "SpiceJet",
		currency: "USD",
		status: "completed",
		commission: 8500,
		fees: 1700,
	},
	{
		id: 3,
		bookingId: "BK003",
		amount: -2500,
		type: "refund",
		date: "2024-03-13",
		agent: "Mike Johnson",
		provider: "IndiGo",
		currency: "USD",
		status: "processed",
		reason: "Customer Cancellation",
		originalBookingId: "BK001",
	},
	{
		id: 4,
		bookingId: "BK004",
		amount: -1800,
		type: "chargeback",
		date: "2024-03-12",
		agent: "Emily Brown",
		provider: "Vistara",
		currency: "USD",
		status: "pending",
		reason: "Service Issue",
		originalBookingId: "BK002",
	},
];

const mockRefundData = [
	{
		id: 1,
		bookingId: "BK001",
		mco: 2500,
		date: "2024-03-15",
		reason: "Customer Cancellation",
		status: "Processed",
		agent: "Sarah Wilson",
		refundAmount: 2300,
		processingFee: 200,
		refundMethod: "Original Card",
	},
	{
		id: 2,
		bookingId: "BK002",
		mco: 1800,
		date: "2024-03-14",
		reason: "Service Issue",
		status: "Pending",
		agent: "John Doe",
		refundAmount: 1800,
		processingFee: 0,
		refundMethod: "Bank Transfer",
	},
	{
		id: 3,
		bookingId: "BK004",
		mco: 3200,
		date: "2024-03-13",
		reason: "Flight Schedule Change",
		status: "Processed",
		agent: "Mike Johnson",
		refundAmount: 3000,
		processingFee: 200,
		refundMethod: "Original Card",
	},
];

const mockChargebackData = [
	{
		id: 1,
		bookingId: "BK005",
		mco: 4500,
		date: "2024-03-12",
		reason: "Medical Emergency",
		status: "Under Review",
		agent: "Emily Brown",
		disputeId: "CB001",
		cardType: "Visa",
		chargebackFee: 25,
	},
	{
		id: 2,
		bookingId: "BK006",
		mco: 2800,
		date: "2024-03-11",
		reason: "Duplicate Booking",
		status: "Won",
		agent: "Alex Turner",
		disputeId: "CB002",
		cardType: "MasterCard",
		chargebackFee: 25,
	},
];

class RevenueService {
	constructor() {
		this.revenueData = [...mockRevenueData];
		this.refundData = [...mockRefundData];
		this.chargebackData = [...mockChargebackData];
		this.nextId = 1000; // Start IDs from 1000 for new items
	}

	// Utility methods
	generateId() {
		return ++this.nextId;
	}

	validateRequired(value, fieldName) {
		if (!value || (typeof value === "string" && value.trim() === "")) {
			throw new Error(`${fieldName} is required`);
		}
	}

	validateAmount(amount, fieldName = "Amount") {
		const numAmount = parseFloat(amount);
		if (isNaN(numAmount)) {
			throw new Error(`${fieldName} must be a valid number`);
		}
		return numAmount;
	}

	formatResponse(success, data = null, message = "") {
		return {
			success,
			data,
			message,
			timestamp: new Date().toISOString(),
		};
	}

	formatCurrency(amount, currency = "USD") {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: currency,
		}).format(amount);
	}

	calculateDateRange(period) {
		const now = new Date();
		let startDate,
			endDate = new Date(now);

		switch (period) {
			case "today":
				startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
				break;
			case "week":
				startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
				break;
			case "month":
				startDate = new Date(now.getFullYear(), now.getMonth(), 1);
				break;
			case "quarter":
				const quarter = Math.floor(now.getMonth() / 3);
				startDate = new Date(now.getFullYear(), quarter * 3, 1);
				break;
			case "year":
				startDate = new Date(now.getFullYear(), 0, 1);
				break;
			default:
				startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
		}

		return { startDate, endDate };
	}

	// Revenue Analytics and Reporting
	async getRevenueOverview(options = {}) {
		try {
			const {
				startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
				endDate = new Date(),
				agent = null,
				provider = null,
				currency = "USD",
			} = options;

			let filteredData = this.revenueData.filter((item) => {
				const itemDate = new Date(item.date);
				return itemDate >= startDate && itemDate <= endDate;
			});

			// Apply filters
			if (agent) {
				filteredData = filteredData.filter((item) => item.agent === agent);
			}
			if (provider) {
				filteredData = filteredData.filter(
					(item) => item.provider === provider
				);
			}

			// Calculate totals
			const totalRevenue = filteredData
				.filter((item) => item.type === "booking")
				.reduce((sum, item) => sum + item.amount, 0);

			const totalRefunds = Math.abs(
				filteredData
					.filter((item) => item.type === "refund")
					.reduce((sum, item) => sum + item.amount, 0)
			);

			const totalChargebacks = Math.abs(
				filteredData
					.filter((item) => item.type === "chargeback")
					.reduce((sum, item) => sum + item.amount, 0)
			);

			const netRevenue = totalRevenue - totalRefunds - totalChargebacks;

			const totalBookings = filteredData.filter(
				(item) => item.type === "booking"
			).length;
			const averageBookingValue =
				totalBookings > 0 ? totalRevenue / totalBookings : 0;

			const totalCommission = filteredData
				.filter((item) => item.type === "booking")
				.reduce((sum, item) => sum + (item.commission || 0), 0);

			const totalFees = filteredData
				.filter((item) => item.type === "booking")
				.reduce((sum, item) => sum + (item.fees || 0), 0);

			const overview = {
				totalRevenue,
				totalRefunds,
				totalChargebacks,
				netRevenue,
				totalBookings,
				averageBookingValue,
				totalCommission,
				totalFees,
				currency,
				period: {
					startDate: startDate.toISOString(),
					endDate: endDate.toISOString(),
				},
			};

			return this.formatResponse(
				true,
				overview,
				"Revenue overview retrieved successfully"
			);
		} catch (error) {
			throw new Error(`Failed to fetch revenue overview: ${error.message}`);
		}
	}

	async getRevenueDetails(options = {}) {
		try {
			const {
				startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
				endDate = new Date(),
				type = "all", // 'all', 'refund', 'chargeback'
				agent = null,
				provider = null,
				sortBy = "date",
				sortOrder = "desc",
				page = 1,
				limit = 50,
			} = options;

			// Combine refund and chargeback data based on type filter
			let combinedData = [];

			if (type === "all" || type === "refund") {
				combinedData = combinedData.concat(
					this.refundData.map((item) => ({
						...item,
						type: "refund",
						amount: item.mco,
					}))
				);
			}

			if (type === "all" || type === "chargeback") {
				combinedData = combinedData.concat(
					this.chargebackData.map((item) => ({
						...item,
						type: "chargeback",
						amount: item.mco,
					}))
				);
			}

			// Apply date filter
			let filteredData = combinedData.filter((item) => {
				const itemDate = new Date(item.date);
				return itemDate >= startDate && itemDate <= endDate;
			});

			// Apply agent filter
			if (agent) {
				filteredData = filteredData.filter((item) => item.agent === agent);
			}

			// Apply provider filter (if applicable)
			if (provider) {
				filteredData = filteredData.filter(
					(item) => item.provider === provider
				);
			}

			// Apply sorting
			filteredData.sort((a, b) => {
				let aVal = a[sortBy];
				let bVal = b[sortBy];

				if (sortBy === "date") {
					aVal = new Date(aVal);
					bVal = new Date(bVal);
				} else if (sortBy === "amount" || sortBy === "mco") {
					aVal = parseFloat(aVal) || 0;
					bVal = parseFloat(bVal) || 0;
				}

				const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
				return sortOrder === "asc" ? comparison : -comparison;
			});

			// Apply pagination
			const startIndex = (page - 1) * limit;
			const paginatedData = filteredData.slice(startIndex, startIndex + limit);

			const result = {
				details: paginatedData,
				pagination: {
					page,
					limit,
					total: filteredData.length,
					totalPages: Math.ceil(filteredData.length / limit),
				},
				summary: {
					totalAmount: filteredData.reduce((sum, item) => sum + item.amount, 0),
					totalRecords: filteredData.length,
					byType: {
						refunds: filteredData.filter((item) => item.type === "refund")
							.length,
						chargebacks: filteredData.filter(
							(item) => item.type === "chargeback"
						).length,
					},
				},
			};

			return this.formatResponse(
				true,
				result,
				"Revenue details retrieved successfully"
			);
		} catch (error) {
			throw new Error(`Failed to fetch revenue details: ${error.message}`);
		}
	}

	async getRevenueByPeriod(period = "month", year = new Date().getFullYear()) {
		try {
			const revenueByPeriod = {};

			this.revenueData
				.filter((item) => new Date(item.date).getFullYear() === year)
				.forEach((item) => {
					const date = new Date(item.date);
					let key;

					switch (period) {
						case "day":
							key = date.toISOString().split("T")[0];
							break;
						case "week":
							const weekStart = new Date(date);
							weekStart.setDate(date.getDate() - date.getDay());
							key = weekStart.toISOString().split("T")[0];
							break;
						case "month":
							key = `${date.getFullYear()}-${String(
								date.getMonth() + 1
							).padStart(2, "0")}`;
							break;
						case "quarter":
							const quarter = Math.floor(date.getMonth() / 3) + 1;
							key = `${date.getFullYear()}-Q${quarter}`;
							break;
						default:
							key = date.getFullYear().toString();
					}

					if (!revenueByPeriod[key]) {
						revenueByPeriod[key] = {
							period: key,
							revenue: 0,
							bookings: 0,
							refunds: 0,
							chargebacks: 0,
						};
					}

					if (item.type === "booking") {
						revenueByPeriod[key].revenue += item.amount;
						revenueByPeriod[key].bookings += 1;
					} else if (item.type === "refund") {
						revenueByPeriod[key].refunds += Math.abs(item.amount);
					} else if (item.type === "chargeback") {
						revenueByPeriod[key].chargebacks += Math.abs(item.amount);
					}
				});

			const sortedData = Object.values(revenueByPeriod).sort((a, b) =>
				a.period.localeCompare(b.period)
			);

			return this.formatResponse(
				true,
				sortedData,
				`Revenue data by ${period} retrieved successfully`
			);
		} catch (error) {
			throw new Error(`Failed to fetch revenue by period: ${error.message}`);
		}
	}

	// Refund Management
	async getRefunds(options = {}) {
		try {
			const {
				startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
				endDate = new Date(),
				status = "all",
				agent = null,
				sortBy = "date",
				sortOrder = "desc",
				page = 1,
				limit = 50,
			} = options;

			let filteredRefunds = this.refundData.filter((refund) => {
				const refundDate = new Date(refund.date);
				return refundDate >= startDate && refundDate <= endDate;
			});

			// Apply status filter
			if (status !== "all") {
				filteredRefunds = filteredRefunds.filter(
					(refund) => refund.status.toLowerCase() === status.toLowerCase()
				);
			}

			// Apply agent filter
			if (agent) {
				filteredRefunds = filteredRefunds.filter(
					(refund) => refund.agent === agent
				);
			}

			// Apply sorting
			filteredRefunds.sort((a, b) => {
				let aVal = a[sortBy];
				let bVal = b[sortBy];

				if (sortBy === "date") {
					aVal = new Date(aVal);
					bVal = new Date(bVal);
				} else if (sortBy === "mco" || sortBy === "refundAmount") {
					aVal = parseFloat(aVal) || 0;
					bVal = parseFloat(bVal) || 0;
				}

				const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
				return sortOrder === "asc" ? comparison : -comparison;
			});

			// Apply pagination
			const startIndex = (page - 1) * limit;
			const paginatedRefunds = filteredRefunds.slice(
				startIndex,
				startIndex + limit
			);

			const result = {
				refunds: paginatedRefunds,
				pagination: {
					page,
					limit,
					total: filteredRefunds.length,
					totalPages: Math.ceil(filteredRefunds.length / limit),
				},
				summary: {
					totalAmount: filteredRefunds.reduce(
						(sum, refund) => sum + refund.mco,
						0
					),
					totalRefundAmount: filteredRefunds.reduce(
						(sum, refund) => sum + refund.refundAmount,
						0
					),
					totalProcessingFees: filteredRefunds.reduce(
						(sum, refund) => sum + refund.processingFee,
						0
					),
					byStatus: {
						processed: filteredRefunds.filter((r) => r.status === "Processed")
							.length,
						pending: filteredRefunds.filter((r) => r.status === "Pending")
							.length,
						rejected: filteredRefunds.filter((r) => r.status === "Rejected")
							.length,
					},
				},
			};

			return this.formatResponse(
				true,
				result,
				"Refunds retrieved successfully"
			);
		} catch (error) {
			throw new Error(`Failed to fetch refunds: ${error.message}`);
		}
	}

	async createRefund(refundData) {
		try {
			this.validateRequired(refundData.bookingId, "Booking ID");
			this.validateRequired(refundData.reason, "Refund reason");
			this.validateAmount(refundData.mco, "MCO amount");

			const newRefund = {
				id: this.generateId(),
				bookingId: refundData.bookingId.trim(),
				mco: this.validateAmount(refundData.mco),
				date: refundData.date || new Date().toISOString().split("T")[0],
				reason: refundData.reason.trim(),
				status: refundData.status || "Pending",
				agent: refundData.agent || "System",
				refundAmount: this.validateAmount(
					refundData.refundAmount || refundData.mco
				),
				processingFee: this.validateAmount(refundData.processingFee || 0),
				refundMethod: refundData.refundMethod || "Original Card",
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};

			this.refundData.push(newRefund);

			// Add to revenue data as negative entry
			this.revenueData.push({
				id: this.generateId(),
				bookingId: newRefund.bookingId,
				amount: -newRefund.mco,
				type: "refund",
				date: newRefund.date,
				agent: newRefund.agent,
				status: "completed",
				reason: newRefund.reason,
				originalBookingId: refundData.originalBookingId,
			});

			return this.formatResponse(
				true,
				newRefund,
				"Refund created successfully"
			);
		} catch (error) {
			throw new Error(`Failed to create refund: ${error.message}`);
		}
	}

	async updateRefundStatus(id, status, notes = "") {
		try {
			const refundIndex = this.refundData.findIndex(
				(refund) => refund.id === parseInt(id)
			);
			if (refundIndex === -1) {
				throw new Error("Refund not found");
			}

			this.refundData[refundIndex].status = status;
			this.refundData[refundIndex].notes = notes;
			this.refundData[refundIndex].updatedAt = new Date().toISOString();

			// Update corresponding revenue entry
			const revenueEntry = this.revenueData.find(
				(entry) =>
					entry.type === "refund" &&
					entry.bookingId === this.refundData[refundIndex].bookingId
			);
			if (revenueEntry) {
				revenueEntry.status = status === "Processed" ? "completed" : "pending";
			}

			return this.formatResponse(
				true,
				this.refundData[refundIndex],
				"Refund status updated successfully"
			);
		} catch (error) {
			throw new Error(`Failed to update refund status: ${error.message}`);
		}
	}

	// Chargeback Management
	async getChargebacks(options = {}) {
		try {
			const {
				startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
				endDate = new Date(),
				status = "all",
				agent = null,
				sortBy = "date",
				sortOrder = "desc",
				page = 1,
				limit = 50,
			} = options;

			let filteredChargebacks = this.chargebackData.filter((chargeback) => {
				const chargebackDate = new Date(chargeback.date);
				return chargebackDate >= startDate && chargebackDate <= endDate;
			});

			// Apply status filter
			if (status !== "all") {
				filteredChargebacks = filteredChargebacks.filter(
					(chargeback) =>
						chargeback.status.toLowerCase() === status.toLowerCase()
				);
			}

			// Apply agent filter
			if (agent) {
				filteredChargebacks = filteredChargebacks.filter(
					(chargeback) => chargeback.agent === agent
				);
			}

			// Apply sorting
			filteredChargebacks.sort((a, b) => {
				let aVal = a[sortBy];
				let bVal = b[sortBy];

				if (sortBy === "date") {
					aVal = new Date(aVal);
					bVal = new Date(bVal);
				} else if (sortBy === "mco") {
					aVal = parseFloat(aVal) || 0;
					bVal = parseFloat(bVal) || 0;
				}

				const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
				return sortOrder === "asc" ? comparison : -comparison;
			});

			// Apply pagination
			const startIndex = (page - 1) * limit;
			const paginatedChargebacks = filteredChargebacks.slice(
				startIndex,
				startIndex + limit
			);

			const result = {
				chargebacks: paginatedChargebacks,
				pagination: {
					page,
					limit,
					total: filteredChargebacks.length,
					totalPages: Math.ceil(filteredChargebacks.length / limit),
				},
				summary: {
					totalAmount: filteredChargebacks.reduce(
						(sum, chargeback) => sum + chargeback.mco,
						0
					),
					totalFees: filteredChargebacks.reduce(
						(sum, chargeback) => sum + chargeback.chargebackFee,
						0
					),
					byStatus: {
						pending: filteredChargebacks.filter((c) => c.status === "Pending")
							.length,
						underReview: filteredChargebacks.filter(
							(c) => c.status === "Under Review"
						).length,
						won: filteredChargebacks.filter((c) => c.status === "Won").length,
						lost: filteredChargebacks.filter((c) => c.status === "Lost").length,
					},
				},
			};

			return this.formatResponse(
				true,
				result,
				"Chargebacks retrieved successfully"
			);
		} catch (error) {
			throw new Error(`Failed to fetch chargebacks: ${error.message}`);
		}
	}

	async createChargeback(chargebackData) {
		try {
			this.validateRequired(chargebackData.bookingId, "Booking ID");
			this.validateRequired(chargebackData.reason, "Chargeback reason");
			this.validateAmount(chargebackData.mco, "MCO amount");

			const newChargeback = {
				id: this.generateId(),
				bookingId: chargebackData.bookingId.trim(),
				mco: this.validateAmount(chargebackData.mco),
				date: chargebackData.date || new Date().toISOString().split("T")[0],
				reason: chargebackData.reason.trim(),
				status: chargebackData.status || "Pending",
				agent: chargebackData.agent || "System",
				disputeId: chargebackData.disputeId || `CB${this.generateId()}`,
				cardType: chargebackData.cardType || "Unknown",
				chargebackFee: this.validateAmount(chargebackData.chargebackFee || 25),
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};

			this.chargebackData.push(newChargeback);

			// Add to revenue data as negative entry
			this.revenueData.push({
				id: this.generateId(),
				bookingId: newChargeback.bookingId,
				amount: -newChargeback.mco,
				type: "chargeback",
				date: newChargeback.date,
				agent: newChargeback.agent,
				status: "pending",
				reason: newChargeback.reason,
				originalBookingId: chargebackData.originalBookingId,
			});

			return this.formatResponse(
				true,
				newChargeback,
				"Chargeback created successfully"
			);
		} catch (error) {
			throw new Error(`Failed to create chargeback: ${error.message}`);
		}
	}

	async updateChargebackStatus(id, status, notes = "") {
		try {
			const chargebackIndex = this.chargebackData.findIndex(
				(chargeback) => chargeback.id === parseInt(id)
			);
			if (chargebackIndex === -1) {
				throw new Error("Chargeback not found");
			}

			this.chargebackData[chargebackIndex].status = status;
			this.chargebackData[chargebackIndex].notes = notes;
			this.chargebackData[chargebackIndex].updatedAt = new Date().toISOString();

			// Update corresponding revenue entry
			const revenueEntry = this.revenueData.find(
				(entry) =>
					entry.type === "chargeback" &&
					entry.bookingId === this.chargebackData[chargebackIndex].bookingId
			);
			if (revenueEntry) {
				revenueEntry.status =
					status === "Won"
						? "completed"
						: status === "Lost"
						? "completed"
						: "pending";
			}

			return this.formatResponse(
				true,
				this.chargebackData[chargebackIndex],
				"Chargeback status updated successfully"
			);
		} catch (error) {
			throw new Error(`Failed to update chargeback status: ${error.message}`);
		}
	}

	// Reporting and Analytics
	async generateReport(reportType, options = {}) {
		try {
			const {
				startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
				endDate = new Date(),
				format = "json",
			} = options;

			let reportData = {};

			switch (reportType) {
				case "summary":
					reportData = await this.getRevenueOverview({
						startDate,
						endDate,
						...options,
					});
					break;
				case "detailed":
					reportData = await this.getRevenueDetails({
						startDate,
						endDate,
						...options,
					});
					break;
				case "refunds":
					reportData = await this.getRefunds({
						startDate,
						endDate,
						...options,
					});
					break;
				case "chargebacks":
					reportData = await this.getChargebacks({
						startDate,
						endDate,
						...options,
					});
					break;
				default:
					throw new Error("Invalid report type");
			}

			if (format === "csv") {
				// Convert to CSV format based on report type
				reportData.csvContent = this.convertToCSV(reportData.data, reportType);
			}

			reportData.metadata = {
				reportType,
				generatedAt: new Date().toISOString(),
				period: {
					startDate: startDate.toISOString(),
					endDate: endDate.toISOString(),
				},
				format,
			};

			return this.formatResponse(
				true,
				reportData,
				`${reportType} report generated successfully`
			);
		} catch (error) {
			throw new Error(`Failed to generate report: ${error.message}`);
		}
	}

	convertToCSV(data, reportType) {
		if (!data || !Array.isArray(data)) return "";

		let headers = [];
		let rows = [];

		switch (reportType) {
			case "refunds":
				headers = [
					"Booking ID",
					"MCO",
					"Date",
					"Reason",
					"Status",
					"Agent",
					"Refund Amount",
					"Processing Fee",
				];
				rows =
					data.refunds?.map((item) => [
						item.bookingId,
						item.mco,
						item.date,
						`"${item.reason}"`,
						item.status,
						item.agent,
						item.refundAmount,
						item.processingFee,
					]) || [];
				break;
			case "chargebacks":
				headers = [
					"Booking ID",
					"MCO",
					"Date",
					"Reason",
					"Status",
					"Agent",
					"Dispute ID",
					"Card Type",
				];
				rows =
					data.chargebacks?.map((item) => [
						item.bookingId,
						item.mco,
						item.date,
						`"${item.reason}"`,
						item.status,
						item.agent,
						item.disputeId,
						item.cardType,
					]) || [];
				break;
			default:
				headers = ["Booking ID", "Amount", "Date", "Reason", "Status", "Agent"];
				rows =
					data.details?.map((item) => [
						item.bookingId,
						item.amount,
						item.date,
						`"${item.reason || ""}"`,
						item.status,
						item.agent,
					]) || [];
		}

		return [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
	}

	// Agent Performance Analytics
	async getAgentPerformance(options = {}) {
		try {
			const {
				startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
				endDate = new Date(),
				metric = "revenue",
			} = options;

			const agentPerformance = {};

			// Aggregate data by agent
			this.revenueData
				.filter((item) => {
					const itemDate = new Date(item.date);
					return itemDate >= startDate && itemDate <= endDate;
				})
				.forEach((item) => {
					if (!agentPerformance[item.agent]) {
						agentPerformance[item.agent] = {
							agent: item.agent,
							revenue: 0,
							bookings: 0,
							refunds: 0,
							chargebacks: 0,
							commission: 0,
						};
					}

					if (item.type === "booking") {
						agentPerformance[item.agent].revenue += item.amount;
						agentPerformance[item.agent].bookings += 1;
						agentPerformance[item.agent].commission += item.commission || 0;
					} else if (item.type === "refund") {
						agentPerformance[item.agent].refunds += Math.abs(item.amount);
					} else if (item.type === "chargeback") {
						agentPerformance[item.agent].chargebacks += Math.abs(item.amount);
					}
				});

			// Calculate additional metrics
			Object.values(agentPerformance).forEach((agent) => {
				agent.netRevenue = agent.revenue - agent.refunds - agent.chargebacks;
				agent.averageBookingValue =
					agent.bookings > 0 ? agent.revenue / agent.bookings : 0;
				agent.refundRate =
					agent.revenue > 0 ? (agent.refunds / agent.revenue) * 100 : 0;
				agent.chargebackRate =
					agent.revenue > 0 ? (agent.chargebacks / agent.revenue) * 100 : 0;
			});

			// Sort by specified metric
			const sortedPerformance = Object.values(agentPerformance).sort(
				(a, b) => b[metric] - a[metric]
			);

			return this.formatResponse(
				true,
				sortedPerformance,
				"Agent performance data retrieved successfully"
			);
		} catch (error) {
			throw new Error(`Failed to fetch agent performance: ${error.message}`);
		}
	}
}

// Create and export a singleton instance
const revenueService = new RevenueService();
export default revenueService;
