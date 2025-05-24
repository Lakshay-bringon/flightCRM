import API from "./axios";

// Add a new currency
export const addCurrencyApi = async (currency) => {
	try {
		const res = await API.post("/addCurrency", { currency });
		const { status, msg, data } = res.data;
		if (status !== 201) throw new Error(msg || "Failed to add currency");
		return data;
	} catch (err) {
		if (err.response)
			throw new Error(err.response.data.msg || "Failed to add currency");
		throw new Error("Add currency error: " + err.message);
	}
};

// Update an existing currency
export const updateCurrencyApi = async ({ id, currency }) => {
	try {
		const res = await API.post("/updateCurrency", { id, currency });
		const { status, msg, data } = res.data;
		if (status !== 200) throw new Error(msg || "Failed to update currency");
		return data;
	} catch (err) {
		if (err.response)
			throw new Error(err.response.data.msg || "Failed to update currency");
		throw new Error("Update currency error: " + err.message);
	}
};

// Delete a currency by id
export const deleteCurrencyApi = async (id) => {
	try {
		const res = await API.get("/deleteCurrency", { params: { id } });
		const { status, msg } = res.data;
		if (status !== 200) throw new Error(msg || "Failed to delete currency");
		return true;
	} catch (err) {
		if (err.response)
			throw new Error(err.response.data.msg || "Failed to delete currency");
		throw new Error("Delete currency error: " + err.message);
	}
};

// Get a currency by id
export const getCurrencyApi = async (id) => {
	try {
		const res = await API.get(`/getCurrency/${id}`);
		const { status, msg, data } = res.data;
		if (status !== 200) throw new Error(msg || "Failed to fetch currency");
		return data;
	} catch (err) {
		if (err.response)
			throw new Error(err.response.data.msg || "Failed to fetch currency");
		throw new Error("Get currency error: " + err.message);
	}
};

// Toggle currency status by id
export const toggleCurrencyStatusApi = async (id) => {
	try {
		const res = await API.get("/toggleCurrencyStatus", { params: { id } });
		const { status, msg, data } = res.data;
		if (status !== 200)
			throw new Error(msg || "Failed to toggle currency status");
		return data;
	} catch (err) {
		if (err.response)
			throw new Error(
				err.response.data.msg || "Failed to toggle currency status"
			);
		throw new Error("Toggle currency status error: " + err.message);
	}
};

// Get the list of all currencies
export const getCurrencyListApi = async () => {
	try {
		const res = await API.get("/getCurrencyList");
		const { status, msg, data } = res.data;
		if (status !== 200) throw new Error(msg || "Failed to fetch currency list");
		return data;
	} catch (err) {
		if (err.response)
			throw new Error(err.response.data.msg || "Failed to fetch currency list");
		throw new Error("Get currency list error: " + err.message);
	}
};
