import API from "../axios";

/**
 * Fetch dashboard summary data
 * @param {Object} payload - { dateFilter, startDate, endDate }
 * @returns {Promise<Object>} Dashboard summary data
 */
export const dashboardSummaryApi = async (payload) => {
	try {
		if (!payload?.dateFilter) throw new Error("dateFilter is required");
		if (
			payload.dateFilter === "custom" &&
			(!payload.startDate || !payload.endDate)
		) {
			throw new Error(
				"startDate and endDate are required for custom dateFilter"
			);
		}
		const res = await API.post("/dashboardSummary", payload);
		if (res.data?.status !== 200) {
			throw new Error(res.data?.msg || "Failed to fetch dashboard summary");
		}
		return res.data.data;
	} catch (err) {
		if (err.response) {
			throw new Error(
				err.response.data?.message || "Failed to fetch dashboard summary"
			);
		} else if (err.request) {
			throw new Error("No response from server");
		} else {
			throw new Error("Error: " + err.message);
		}
	}
};

/**
 * Fetch top/bottom agent report
 * @param {Object} payload - { dateFilter, startDate, endDate }
 * @returns {Promise<Object>} Top/Bottom agent report data
 */
export const topBottomAgentReportApi = async (payload) => {
	try {
		if (!payload?.dateFilter) throw new Error("dateFilter is required");
		if (
			payload.dateFilter === "custom" &&
			(!payload.startDate || !payload.endDate)
		) {
			throw new Error(
				"startDate and endDate are required for custom dateFilter"
			);
		}
		const res = await API.post("/topBottomAgentReport", payload);

		if (res.data?.status !== "success") {
			throw new Error(
				res.data?.msg || "Failed to fetch top/bottom agent report"
			);
		}
		const performers = {
			top_agents: res.data.top_agents,
			bottom_agents: res.data.bottom_agents,
		};
		return performers;
	} catch (err) {
		if (err.response) {
			throw new Error(
				err.response.data?.message || "Failed to fetch top/bottom agent report"
			);
		} else if (err.request) {
			throw new Error("No response from server");
		} else {
			throw new Error("Error: " + err.message);
		}
	}
};
