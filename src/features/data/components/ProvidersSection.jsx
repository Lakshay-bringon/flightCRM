// --- DEBUGGING/MAINTENANCE COMMENTS ---
// ProvidersSection handles its own modal and edit state, but all add/edit/delete logic is managed by the parent (ManageData).
// Do not mutate providers state here on add/edit/delete; only close modal and clear editData on submit.
// All CRUD operations are performed via API in the parent and passed down as props.
// SectionTableHeader is used for consistent header/search/add/close UI.
// To debug: Check that onSubmit in ProviderForm only closes modal, and that DataTable always receives an array.
// ----------------------------------------

import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import ProviderForm from "./ProviderForm";
import Modal from "../../../components/Modal";
import SectionTableHeader from "./SectionTableHeader";
import {
	addProviderApi,
	getProvidersApi,
	updateProviderApi,
	deleteProviderApi,
	toggleProviderStatusApi,
} from "../../../api/providerApi";

export default function ProvidersSection({ onClose }) {
	const [providers, setProviders] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState("add");
	const [editData, setEditData] = useState(null);

	useEffect(() => {
		setLoading(true);
		setError("");
		getProvidersApi()
			.then(setProviders)
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
		setEditData(item);
		setShowModal(true);
	};

	const handleDelete = async (id) => {
		try {
			setLoading(true);
			await deleteProviderApi(id);
			setProviders((prev) => prev.filter((p) => p.id !== id));
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleToggleStatus = async (id) => {
		setProviders((prev) =>
			prev.map((p) => (p.id === id ? { ...p, _statusLoading: true } : p))
		);
		try {
			await toggleProviderStatusApi(id);
			setProviders((prev) =>
				prev.map((p) =>
					p.id === id
						? {
								...p,
								status:
									p.status === 1 ||
									p.status === "1" ||
									p.status === "ACTIVE" ||
									p.status === "Active"
										? 0
										: 1,
								_statusLoading: false,
						  }
						: p
				)
			);
		} catch (err) {
			setError(err.message);
			setProviders((prev) =>
				prev.map((p) => (p.id === id ? { ...p, _statusLoading: false } : p))
			);
		}
	};

	const handleFormSubmit = async (formData) => {
		setShowModal(false);
		setEditData(null);
		if (modalType === "add") {
			try {
				setLoading(true);
				const newProvider = await addProviderApi(formData);
				setProviders((prev) => [{ ...newProvider }, ...prev]);
				setError("");
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		} else if (modalType === "edit") {
			try {
				setLoading(true);
				await updateProviderApi({ ...formData, providerId: editData.id });
				const freshProviders = await getProvidersApi();
				setProviders(freshProviders);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
	};

	const filteredProviders = providers.filter((p) =>
		(p.name || "").toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<>
			<SectionTableHeader
				title="Providers"
				onClose={onClose}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				onAdd={handleAdd}
				addLabel="Add Provider"
			/>
			{error && <div className="text-red-400 mb-2">{error}</div>}
			<DataTable
				data={Array.isArray(filteredProviders) ? filteredProviders : []}
				onEdit={handleEdit}
				onDelete={handleDelete}
				columns={["id", "name", "logo", "status"]}
				loading={loading}
				loadingLabel="Loading providers..."
				onToggleStatus={handleToggleStatus}
			/>
			{showModal && (
				<Modal
					isOpen={showModal}
					onClose={() => setShowModal(false)}
					title={`${modalType === "add" ? "Add New" : "Edit"} Provider`}
					maxWidth="md"
				>
					<ProviderForm
						initialData={modalType === "edit" ? editData : {}}
						onSubmit={handleFormSubmit}
						onCancel={() => setShowModal(false)}
					/>
				</Modal>
			)}
		</>
	);
}
