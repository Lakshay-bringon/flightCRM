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

// Add a new IP
export const addIpApi = async ({ ip, allowed_status, description }) => {
	try {
		const res = await API.post("/addIp", { ip, allowed_status, description });
		const { status, msg, data } = res.data;
		if (status !== 200 && status !== 201) {
			let errorMsg = msg;
			if (msg && typeof msg === "object") {
				errorMsg = flattenErrorMessages(msg).join(" ");
			}
			throw new Error(errorMsg || "Failed to add IP");
		}
		return data;
	} catch (err) {
		if (err.response?.data?.msg) {
			let errorMsg = err.response.data.msg;
			if (typeof errorMsg === "object") {
				errorMsg = flattenErrorMessages(errorMsg).join(" ");
			}
			throw new Error(errorMsg || "Failed to add IP");
		}
		throw new Error(err.message || "Add IP error");
	}
};

// Update an existing IP
export const updateIpApi = async ({ id, ip, allowed_status, description }) => {
	try {
		const res = await API.post("/updateIp", {
			id,
			ip,
			allowed_status,
			description,
		});
		const { status, msg, data } = res.data;
		if (status !== 200) throw new Error(msg || "Failed to update IP");
		return data;
	} catch (err) {
		if (err.response?.data?.msg) {
			let errorMsg = err.response.data.msg;
			if (typeof errorMsg === "object") {
				errorMsg = flattenErrorMessages(errorMsg).join(" ");
			}
			throw new Error(errorMsg || "Failed to update IP");
		}
		throw new Error(err.message || "Update IP error");
	}
};

// Get the list of all IPs
export const getIpListApi = async () => {
	try {
		const res = await API.get("/ipList");
		const { status, msg, data } = res.data;
		if (status !== 200) throw new Error(msg || "Failed to fetch IP list");
		return data;
	} catch (err) {
		if (err.response)
			throw new Error(err.response.data.msg || "Failed to fetch IP list");
		throw new Error("Get IP list error: " + err.message);
	}
};

// Toggle IP status by id
export const toggleIpStatusApi = async (id) => {
	try {
		const res = await API.get("/toggleIpStatus", { params: { id } });
		const { status, msg, data } = res.data;
		if (status !== 200) throw new Error(msg || "Failed to toggle IP status");
		return data;
	} catch (err) {
		if (err.response)
			throw new Error(err.response.data.msg || "Failed to toggle IP status");
		throw new Error("Toggle IP status error: " + err.message);
	}
};

// Get IP info
export const getIpInfoApi = async () => {
	try {
		const res = await API.get("/getIpInfo");
		const { status, msg, data } = res.data;
		if (status !== 200) throw new Error(msg || "Failed to fetch IP info");
		return data;
	} catch (err) {
		if (err.response)
			throw new Error(err.response.data.msg || "Failed to fetch IP info");
		throw new Error("Get IP info error: " + err.message);
	}
};
