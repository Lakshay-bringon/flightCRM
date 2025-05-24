import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import CurrencyForm from "./CurrencyForm";
import Modal from "../../../components/Modal";
import SectionTableHeader from "./SectionTableHeader";
import {
	addCurrencyApi,
	getCurrencyListApi,
	updateCurrencyApi,
	deleteCurrencyApi,
	toggleCurrencyStatusApi,
} from "../../../api/currencyApi";

// --- DEBUGGING/MAINTENANCE COMMENTS ---
// CurrencySection handles its own modal and edit state, but all add/edit/delete logic is managed by the parent (ManageData).
// Do not mutate currencies state here on add/edit/delete; only close modal and clear editData on submit.
// All CRUD operations are performed via API in the parent and passed down as props.
// SectionTableHeader is used for consistent header/search/add/close UI.
// To debug: Check that onSubmit in CurrencyForm only closes modal, and that DataTable always receives an array.
// ----------------------------------------

export default function CurrencySection({ onClose }) {
	// State
	const [currencies, setCurrencies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState("add");
	const [editData, setEditData] = useState(null);

	// Fetch currencies on mount
	useEffect(() => {
		setLoading(true);
		setError("");
		getCurrencyListApi()
			.then(setCurrencies)
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, []);

	// Add
	const handleAdd = () => {
		setModalType("add");
		setEditData(null);
		setShowModal(true);
	};

	// Edit
	const handleEdit = (item) => {
		setModalType("edit");
		setEditData({
			currency: item.currency || item.Currency || "",
			id: item.id,
		});
		setShowModal(true);
	};

	// Delete
	const handleDelete = async (id) => {
		try {
			setLoading(true);
			await deleteCurrencyApi(id);
			setCurrencies((prev) => prev.filter((c) => c.id !== id));
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	// Toggle status
	const handleToggleStatus = async (id) => {
		setCurrencies((prev) =>
			prev.map((c) => (c.id === id ? { ...c, _statusLoading: true } : c))
		);
		try {
			await toggleCurrencyStatusApi(id);
			setCurrencies((prev) =>
				prev.map((c) =>
					c.id === id
						? {
								...c,
								status:
									c.status === 1 ||
									c.status === "1" ||
									c.status === "ACTIVE" ||
									c.status === "Active"
										? 0
										: 1,
								_statusLoading: false,
						  }
						: c
				)
			);
		} catch (err) {
			setError(err.message);
			setCurrencies((prev) =>
				prev.map((c) => (c.id === id ? { ...c, _statusLoading: false } : c))
			);
		}
	};

	// Form submit
	const handleFormSubmit = async (formData) => {
		setShowModal(false);
		setEditData(null);
		if (modalType === "add") {
			try {
				setLoading(true);
				const newCurrency = await addCurrencyApi(formData.currency);
				setCurrencies((prev) => [{ ...newCurrency }, ...prev]);
				setError("");
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		} else if (modalType === "edit") {
			try {
				setLoading(true);
				await updateCurrencyApi({
					id: editData.id,
					currency: formData.currency,
				});
				const freshCurrencies = await getCurrencyListApi();
				setCurrencies(freshCurrencies);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
	};

	// Filtered data
	const filteredCurrencies = currencies.filter((c) =>
		(c.currency || c.Currency || "")
			.toLowerCase()
			.includes(searchQuery.toLowerCase())
	);

	return (
		<>
			<SectionTableHeader
				title="Currency"
				onClose={onClose}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				onAdd={handleAdd}
				addLabel="Add Currency"
			/>
			{error && <div className="text-red-400 mb-2">{error}</div>}
			<DataTable
				data={Array.isArray(filteredCurrencies) ? filteredCurrencies : []}
				onEdit={handleEdit}
				onDelete={handleDelete}
				columns={["id", "Currency", "status"]}
				loading={loading}
				loadingLabel="Loading currencies..."
				onToggleStatus={handleToggleStatus}
			/>
			{showModal && (
				<Modal
					isOpen={showModal}
					onClose={() => setShowModal(false)}
					title={`${modalType === "add" ? "Add New" : "Edit"} Currency`}
					maxWidth="md"
				>
					<CurrencyForm
						initialData={modalType === "edit" ? editData : {}}
						onSubmit={handleFormSubmit}
						onCancel={() => setShowModal(false)}
					/>
				</Modal>
			)}
		</>
	);
}
