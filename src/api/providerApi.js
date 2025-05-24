import API from "./axios";

// Add a new provider
export const addProviderApi = async (providerData) => {
	try {
		const res = await API.post("/addProvider", providerData);
		const { status, msg, data } = res.data;
		if (status !== 200) throw new Error(msg || "Failed to add provider");
		return data;
	} catch (err) {
		if (err.response)
			throw new Error(err.response.data.msg || "Failed to add provider");
		throw new Error("Add provider error: " + err.message);
	}
};

// Update an existing provider
export const updateProviderApi = async (providerData) => {
	try {
		const res = await API.post("/updateProvider", providerData);
		const { status, msg, data } = res.data;
		if (status !== 200) throw new Error(msg || "Failed to update provider");
		return data;
	} catch (err) {
		if (err.response)
			throw new Error(err.response.data.msg || "Failed to update provider");
		throw new Error("Update provider error: " + err.message);
	}
};

// Delete a provider by providerId
export const deleteProviderApi = async (providerId) => {
	try {
		const res = await API.get("/deleteProvider", { params: { providerId } });
		const { status, msg } = res.data;
		if (status !== 200) throw new Error(msg || "Failed to delete provider");
		return true;
	} catch (err) {
		if (err.response)
			throw new Error(err.response.data.msg || "Failed to delete provider");
		throw new Error("Delete provider error: " + err.message);
	}
};

// Get all providers
export const getProvidersApi = async () => {
	try {
		const res = await API.get("/getproviders");
		const { status, msg, data } = res.data;
		if (status !== 200) throw new Error(msg || "Failed to fetch providers");
		return data;
	} catch (err) {
		if (err.response)
			throw new Error(err.response.data.msg || "Failed to fetch providers");
		throw new Error("Get providers error: " + err.message);
	}
};

// Toggle provider status by providerId
export const toggleProviderStatusApi = async (providerId) => {
	try {
		const res = await API.get("/toggleproviderStatus", {
			params: { providerId },
		});
		const { status, msg, data } = res.data;
		if (status !== 200)
			throw new Error(msg || "Failed to toggle provider status");
		return data;
	} catch (err) {
		if (err.response)
			throw new Error(
				err.response.data.msg || "Failed to toggle provider status"
			);
		throw new Error("Toggle provider status error: " + err.message);
	}
};

// Get a provider by id
export const getProviderByIdApi = async (id) => {
	try {
		const res = await API.get("/getProviderById", { params: { id } });
		const { status, msg, data } = res.data;
		if (status !== 200) throw new Error(msg || "Failed to fetch provider");
		return data;
	} catch (err) {
		if (err.response)
			throw new Error(err.response.data.msg || "Failed to fetch provider");
		throw new Error("Get provider by id error: " + err.message);
	}
};
