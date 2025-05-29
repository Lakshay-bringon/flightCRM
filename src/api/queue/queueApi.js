import API from "../axios";

// Get active queue
export const activeQueuesApi = async () => {
	try {
		const res = await API.get("/activeQueues");
		const { status, msg, data } = res.data;
		if (status !== 200) throw new Error(msg || "Failed to fetch active queue");
		return data;
	} catch (err) {
		if (err.response)
			throw new Error(err.response.data.msg || "Failed to fetch active queue");
		throw new Error("Get active queue error: " + err.message);
	}
};

// Add a new queue
export const addQueueApi = async (queue, number) => {
	try {
		const res = await API.post("/addQueue", { queue, number });
		const { status, msg, data } = res.data;
		if (status !== 201) throw new Error(msg || "Failed to add queue");
		return data;
	} catch (err) {
		if (err.response)
			throw new Error(err.response.data.msg || "Failed to add queue");
		throw new Error("Add queue error: " + err.message);
	}
};

// Update an existing queue
export const updateQueueApi = async ({ id, queue, number }) => {
	try {
		const res = await API.post("/updateQueue", { id, queue, number });
		const { status, msg, data } = res.data;
		if (status !== 200) throw new Error(msg || "Failed to update queue");
		return data;
	} catch (err) {
		if (err.response)
			throw new Error(err.response.data.msg || "Failed to update queue");
		throw new Error("Update queue error: " + err.message);
	}
};

// Delete a queue by id
export const deleteQueueApi = async (id) => {
	try {
		const res = await API.get("/deleteQueue", { params: { id } });
		const { status, msg } = res.data;
		if (status !== 200) throw new Error(msg || "Failed to delete queue");
		return true;
	} catch (err) {
		if (err.response)
			throw new Error(err.response.data.msg || "Failed to delete queue");
		throw new Error("Delete queue error: " + err.message);
	}
};

// Get a queue by id
export const getQueueApi = async (id) => {
	try {
		const res = await API.get(`/getQueue/${id}`);
		const { status, msg, data } = res.data;
		if (status !== 200) throw new Error(msg || "Failed to fetch queue");
		return data;
	} catch (err) {
		if (err.response)
			throw new Error(err.response.data.msg || "Failed to fetch queue");
		throw new Error("Get queue error: " + err.message);
	}
};

// Toggle queue status by id
export const toggleQueueStatusApi = async (id) => {
	try {
		const res = await API.get("/toggleQueueStatus", { params: { id } });
		const { status, msg, data } = res.data;
		if (status !== 200) throw new Error(msg || "Failed to toggle queue status");
		return data;
	} catch (err) {
		if (err.response)
			throw new Error(err.response.data.msg || "Failed to toggle queue status");
		throw new Error("Toggle queue status error: " + err.message);
	}
};

// Get the list of all currencies
export const getQueueListApi = async () => {
	try {
		const res = await API.get("/getQueues");
		const { status, msg, data } = res.data;
		if (status !== 200) throw new Error(msg || "Failed to fetch queue list");
		return data;
	} catch (err) {
		if (err.response)
			throw new Error(err.response.data.msg || "Failed to fetch queue list");
		throw new Error("Get queue list error: " + err.message);
	}
};
