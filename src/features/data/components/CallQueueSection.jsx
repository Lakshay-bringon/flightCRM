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
} from "../../../api";
import { showPromiseToast } from "../../../utils/showPromiseToast";

export default function CallQueueSection({ onClose }) {
	const [callQueues, setCallQueues] = useState([]);
	const [error, setError] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState("add");
	const [editData, setEditData] = useState(null);

	useEffect(() => {
		setError("");
		showPromiseToast(getQueueListApi(), {
			loading: "Loading call queues...",
			success: "Call queues loaded!",
			error: "Failed to load call queues",
		})
			.then(setCallQueues)
			.catch((err) => setError(err.message));
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
		await showPromiseToast(deleteQueueApi(id), {
			loading: "Deleting call queue...",
			success: "Call queue deleted successfully!",
			error: "Failed to delete call queue",
		});
		setCallQueues((prev) => prev.filter((q) => q.id !== id));
	};

	const handleToggleStatus = async (id) => {
		setCallQueues((prev) =>
			prev.map((q) => (q.id === id ? { ...q, _statusLoading: true } : q))
		);
		await showPromiseToast(toggleQueueStatusApi(id), {
			loading: "Toggling status...",
			success: "Status updated!",
			error: "Failed to update status",
		});
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
	};

	const handleFormSubmit = async (formData) => {
		setShowModal(false);
		setEditData(null);
		if (modalType === "add") {
			await showPromiseToast(addQueueApi(formData.name, formData.phone), {
				loading: "Adding call queue...",
				success: "Call queue added!",
				error: "Failed to add call queue",
			});
			const newQueue = await addQueueApi(formData.name, formData.phone);
			setCallQueues((prev) => [{ ...newQueue }, ...prev]);
		} else if (modalType === "edit") {
			await showPromiseToast(
				updateQueueApi({
					id: editData.id,
					queue: formData.name,
					number: formData.phone,
				}),
				{
					loading: "Updating call queue...",
					success: "Call queue updated!",
					error: "Failed to update call queue",
				}
			);
			const freshQueues = await getQueueListApi();
			setCallQueues(freshQueues);
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
				loading={false}
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
