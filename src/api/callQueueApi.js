import API from "./axios";

export const addCardApi = async ({ card, shortName }, email, token) => {
	try {
		const res = await API.post(
			"/addCard",
			{ name: card, sort_name: shortName },
			{
				headers: {
					// "X-Email-ID": email,
					// "X-Access-Key": token,
				},
			}
		);
		const { status, msg, data } = res.data;
		if (status !== 200) throw new Error(msg || "Failed to add card");
		return data;
	} catch (err) {
		if (err.response)
			throw new Error(err.response.data.msg || "Failed to add card");
		throw new Error("Add card error: " + err.message);
	}
};

export const getCardListApi = async (email, token) => {
	try {
		const res = await API.get("/getCard", {
			headers: {
				"X-Email-ID": email,
				"X-Access-Key": token,
			},
		});
		const { status, msg, data } = res.data;
		if (status !== 200) throw new Error(msg || "Failed to fetch cards");
		return data;
	} catch (err) {
		if (err.response)
			throw new Error(err.response.data.msg || "Failed to fetch cards");
		throw new Error("Get card list error: " + err.message);
	}
};

export const updateCardApi = async ({ id, card, shortName }, email, token) => {
	try {
		const res = await API.put(
			`/updateCard`,
			{ id, name: card, sort_name: shortName },
			{
				headers: {
					"X-Email-ID": email,
					"X-Access-Key": token,
				},
			}
		);
		const { status, msg, data } = res.data;
		if (status !== 200) throw new Error(msg || "Failed to update card");
		return data;
	} catch (err) {
		if (err.response)
			throw new Error(err.response.data.msg || "Failed to update card");
		throw new Error("Update card error: " + err.message);
	}
};

export const toggleCardStatusApi = async (id, email, token) => {
	try {
		const res = await API.patch(
			`/toggleCardStatus`,
			{
				id,
			},
			{
				headers: {
					"X-Email-ID": email,
					"X-Access-Key": token,
				},
			}
		);
		const { status, msg, data } = res.data;
		if (status !== 200) throw new Error(msg || "Failed to toggle card status");
		return data;
	} catch (err) {
		if (err.response)
			throw new Error(err.response.data.msg || "Failed to toggle card status");
		throw new Error("Toggle card status error: " + err.message);
	}
};

export const deleteCardApi = async (id, email, token) => {
	try {
		const res = await API.get(`/deleteCard`, {
			params: { id },
			headers: {
				"X-Email-ID": email,
				"X-Access-Key": token,
			},
		});
		const { status, msg } = res.data;
		if (status !== 200) throw new Error(msg || "Failed to delete card");
		return true;
	} catch (err) {
		if (err.response)
			throw new Error(err.response.data.msg || "Failed to delete card");
		throw new Error("Delete card error: " + err.message);
	}
};
