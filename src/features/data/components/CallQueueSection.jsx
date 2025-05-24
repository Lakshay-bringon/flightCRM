import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import CallQueueForm from "./CallQueueForm";
import Modal from "../../../components/Modal";
import SectionTableHeader from "./SectionTableHeader";
import {
	addQueueApi,
	updateQueueApi,
	deleteQueueApi,
	toggleQueueStatusApi,
	getQueueListApi,
} from "../../../api/queueApi";

export default function CallQueueSection({ onClose }) {
	const [callQueues, setCallQueues] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState("add");
	const [editData, setEditData] = useState(null);

	useEffect(() => {
		setLoading(true);
		setError("");
		getQueueListApi()
			.then(setCallQueues)
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, []);

	const handleAdd = () => {
		setModalType("add");
		setEditData(null);
		setShowModal(true);
	};

	const handleEdit = (item) => {
		setModalType("edit");
		// Ensure correct mapping for form fields
		setEditData({
			name: item.name || "",
			phone: item.phone || item.telephone || item.number || "",
			id: item.id,
		});
		setShowModal(true);
	};

	const handleDelete = async (id) => {
		try {
			setLoading(true);
			await deleteQueueApi(id);
			setCallQueues((prev) => prev.filter((q) => q.id !== id));
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleToggleStatus = async (id) => {
		setCallQueues((prev) =>
			prev.map((q) => (q.id === id ? { ...q, _statusLoading: true } : q))
		);
		try {
			await toggleQueueStatusApi(id);
			setCallQueues((prev) =>
				prev.map((q) =>
					q.id === id
						? {
								...q,
								status:
									q.status === 1 ||
									q.status === "1" ||
									q.status === "ACTIVE" ||
									q.status === "Active"
										? 0
										: 1,
								_statusLoading: false,
						  }
						: q
				)
			);
		} catch (err) {
			setError(err.message);
			setCallQueues((prev) =>
				prev.map((q) => (q.id === id ? { ...q, _statusLoading: false } : q))
			);
		}
	};

	const handleFormSubmit = async (formData) => {
		setShowModal(false);
		setEditData(null);
		if (modalType === "add") {
			try {
				setLoading(true);
				// Only send { queue: name, number: phone } to API
				const newQueue = await addQueueApi(formData.name, formData.phone);
				setCallQueues((prev) => [{ ...newQueue }, ...prev]);
				setError("");
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		} else if (modalType === "edit") {
			try {
				setLoading(true);
				await updateQueueApi({
					id: editData.id,
					queue: formData.name,
					number: formData.phone,
				});
				const freshQueues = await getQueueListApi();
				setCallQueues(freshQueues);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
	};

	const filteredQueues = callQueues.filter((q) =>
		(q.name || "").toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<>
			<SectionTableHeader
				title="Call Queue"
				onClose={onClose}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				onAdd={handleAdd}
				addLabel="Add Call Queue"
			/>
			{error && <div className="text-red-400 mb-2">{error}</div>}
			<DataTable
				data={Array.isArray(filteredQueues) ? filteredQueues : []}
				onEdit={handleEdit}
				onDelete={handleDelete}
				columns={["id", "name", "phone", "status"]}
				loading={loading}
				loadingLabel="Loading call queues..."
				onToggleStatus={handleToggleStatus}
			/>
			{showModal && (
				<Modal
					isOpen={showModal}
					onClose={() => setShowModal(false)}
					title={`${modalType === "add" ? "Add New" : "Edit"} Call Queue`}
					maxWidth="md"
				>
					<CallQueueForm
						initialData={modalType === "edit" ? editData : {}}
						onSubmit={handleFormSubmit}
						onCancel={() => setShowModal(false)}
					/>
				</Modal>
			)}
		</>
	);
}
