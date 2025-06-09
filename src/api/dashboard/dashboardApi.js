import API from "../axios";

// Helper to flatten error messages
function flattenErrorMessages(error) {
	if (!error) return [];
	if (typeof error === "string") return [error];
	if (Array.isArray(error)) return error.flatMap(flattenErrorMessages);
	if (typeof error === "object") {
		return Object.values(error).flatMap(flattenErrorMessages);
	}
	return [String(error)];
}

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
			let errorMsg = res.data?.msg;
			if (typeof errorMsg === "object") {
				errorMsg = flattenErrorMessages(errorMsg).join(" ");
			}
			throw new Error(errorMsg || "Failed to fetch dashboard summary");
		}
		return res.data.data;
	} catch (err) {
		if (err.response) {
			let errorMsg = err.response.data?.message;
			if (typeof errorMsg === "object") {
				errorMsg = flattenErrorMessages(errorMsg).join(" ");
			}
			errorMsg = errorMsg || "Failed to fetch dashboard summary";
			throw new Error(errorMsg);
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
			let errorMsg = res.data?.msg;
			if (typeof errorMsg === "object") {
				errorMsg = flattenErrorMessages(errorMsg).join(" ");
			}
			throw new Error(errorMsg || "Failed to fetch top/bottom agent report");
		}
		const performers = {
			top_agents: res.data.top_agents,
			bottom_agents: res.data.bottom_agents,
		};
		return performers;
	} catch (err) {
		if (err.response) {
			let errorMsg = err.response.data?.message;
			if (typeof errorMsg === "object") {
				errorMsg = flattenErrorMessages(errorMsg).join(" ");
			}
			errorMsg = errorMsg || "Failed to fetch top/bottom agent report";
			throw new Error(errorMsg);
		} else if (err.request) {
			throw new Error("No response from server");
		} else {
			throw new Error("Error: " + err.message);
		}
	}
};
