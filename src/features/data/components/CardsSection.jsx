import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import CardForm from "./CardForm";
import Modal from "../../../components/Modal";
import SectionTableHeader from "./SectionTableHeader";
import {
	addCardApi,
	getCardListApi,
	updateCardApi,
	deleteCardApi,
	toggleCardStatusApi,
} from "../../../api/cardApi";
import { useAuth } from "../../../auth/hooks/useAuth";

export default function CardsSection({ onClose }) {
	const { user, token } = useAuth();
	const [cards, setCards] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState("add");
	const [editData, setEditData] = useState(null);

	useEffect(() => {
		setLoading(true);
		setError("");
		getCardListApi(user?.email, token)
			.then(setCards)
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, [user, token]);

	const handleAdd = () => {
		setModalType("add");
		setEditData(null);
		setShowModal(true);
	};

	const handleEdit = (item) => {
		setModalType("edit");
		setEditData({
			card: item.name || item.card || "",
			shortName: item.sort_name || item.shortName || "",
			id: item.id,
		});
		setShowModal(true);
	};

	const handleDelete = async (id) => {
		try {
			setLoading(true);
			await deleteCardApi(id, user?.email, token);
			setCards((prev) => prev.filter((c) => c.id !== id));
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleToggleStatus = async (id) => {
		setCards((prev) =>
			prev.map((c) => (c.id === id ? { ...c, _statusLoading: true } : c))
		);
		try {
			await toggleCardStatusApi(id);
			setCards((prev) =>
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
			setCards((prev) =>
				prev.map((c) => (c.id === id ? { ...c, _statusLoading: false } : c))
			);
		}
	};

	const handleFormSubmit = async (formData) => {
		setShowModal(false);
		setEditData(null);
		if (modalType === "add") {
			try {
				setLoading(true);
				await addCardApi(formData, user?.email, token);
				const freshCards = await getCardListApi(user?.email, token);
				setCards(freshCards);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		} else if (modalType === "edit") {
			try {
				setLoading(true);
				await updateCardApi(
					{ id: editData.id, ...formData },
					user?.email,
					token
				);
				const freshCards = await getCardListApi(user?.email, token);
				setCards(freshCards);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
	};

	const filteredCards = cards.filter((c) =>
		(c.name || c.card || "").toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<>
			<SectionTableHeader
				title="Cards"
				onClose={onClose}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				onAdd={handleAdd}
				addLabel="Add Card"
			/>
			{error && <div className="text-red-400 mb-2">{error}</div>}
			<DataTable
				data={Array.isArray(filteredCards) ? filteredCards : []}
				onEdit={handleEdit}
				onDelete={handleDelete}
				columns={["id", "name", "sort_name", "status"]}
				loading={loading}
				loadingLabel="Loading cards..."
				onToggleStatus={handleToggleStatus}
			/>
			{showModal && (
				<Modal
					isOpen={showModal}
					onClose={() => setShowModal(false)}
					title={`${modalType === "add" ? "Add New" : "Edit"} Card`}
					maxWidth="md"
				>
					<CardForm
						initialData={modalType === "edit" ? editData : {}}
						onSubmit={handleFormSubmit}
						onCancel={() => setShowModal(false)}
					/>
				</Modal>
			)}
		</>
	);
}
