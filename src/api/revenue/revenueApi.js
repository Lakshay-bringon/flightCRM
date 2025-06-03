import API from "../axios";

export const getRevenueDashboardApi = async (userId) => {
	try {
		if (!userId) throw new Error("userId is required");
		const res = await API.get(`revenueDashbord`, { params: { userId } });
		if (res.data?.status !== 200) {
			throw new Error(res.data?.msg || "Failed to fetch revenue dashboard");
		}
		return res.data.data;
	} catch (err) {
		if (err.response) {
			throw new Error(
				err.response.data?.message || "Failed to fetch revenue dashboard"
			);
		} else if (err.request) {
			throw new Error("No response from server");
		} else {
			throw new Error("Error: " + err.message);
		}
	}
};

export const getDetailedRevenueApi = async (payload) => {
	try {
		if (!payload?.userId) throw new Error("userId is required in payload");
		if (
			payload.dateFilter === "custom" &&
			(!payload.startDate || !payload.endDate)
		) {
			throw new Error(
				"startDate and endDate are required for custom dateFilter"
			);
		}
		const res = await API.post(`/detailedRevenue`, payload);
		if (res.data?.status !== 200) {
			throw new Error(res.data?.msg || "Failed to fetch detailed revenue");
		}
		return res.data.data;
	} catch (err) {
		if (err.response) {
			throw new Error(
				err.response.data?.message || "Failed to fetch detailed revenue"
			);
		} else if (err.request) {
			throw new Error("No response from server");
		} else {
			throw new Error("Error: " + err.message);
		}
	}
};
