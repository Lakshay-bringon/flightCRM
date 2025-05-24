// Imports
import { useState, useEffect } from "react";
import {
	Plus,
	X,
	Search,
	Plane,
	CreditCard,
	Briefcase,
	Globe,
	Phone,
} from "lucide-react";
import DataTable from "./components/DataTable";
import AirlineForm from "./components/AirlineForm";
import CurrencyForm from "./components/CurrencyForm";
import CardForm from "./components/CardForm";
import ProviderForm from "./components/ProviderForm";
import CallQueueForm from "./components/CallQueueForm";
import Modal from "../../components/Modal";
import {
	addCardApi,
	getCardListApi,
	updateCardApi,
	deleteCardApi,
	toggleCardStatusApi,
} from "../../api/cardApi";
import {
	addCurrencyApi,
	getCurrencyListApi,
	updateCurrencyApi,
	deleteCurrencyApi,
	toggleCurrencyStatusApi,
} from "../../api/currencyApi";
import {
	addProviderApi,
	getProvidersApi,
	updateProviderApi,
	deleteProviderApi,
	toggleProviderStatusApi,
} from "../../api/providerApi";
import { useAuth } from "../../auth/hooks/useAuth";

function ManageData() {
	// Auth context
	const { user, token } = useAuth();

	// UI State
	const [activeSection, setActiveSection] = useState(null);
	const [editData, setEditData] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [editingRowId, setEditingRowId] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState("add");

	// Data State
	const [airlines, setAirlines] = useState([
		{ id: 1, name: "United", logo: "/path/to/united.png", status: "Active" },
		{
			id: 2,
			name: "American",
			logo: "/path/to/american.png",
			status: "Active",
		},
		{ id: 3, name: "Alaska", logo: "/path/to/alaska.png", status: "Active" },
	]);
	const [currencies, setCurrencies] = useState([
		{ id: 1, currency: "USD", status: "ACTIVE" },
	]);
	const [cards, setCards] = useState([]);
	const [cardLoading, setCardLoading] = useState(false);
	const [cardError, setCardError] = useState("");
	const [providers, setProviders] = useState([]);
	const [callQueues, setCallQueues] = useState([
		{
			id: 1,
			name: "Support Queue",
			telephone: "+1-800-123-4567",
			status: "Active",
		},
		{
			id: 2,
			name: "Sales Queue",
			telephone: "+1-800-987-6543",
			status: "Inactive",
		},
	]);
	const [currencyLoading, setCurrencyLoading] = useState(false);
	const [currencyError, setCurrencyError] = useState("");
	const [providerLoading, setProviderLoading] = useState(false);
	const [providerError, setProviderError] = useState("");

	// Table columns for each section
	const tableColumns = {
		airlines: ["id", "name", "logo", "status"],
		currency: ["id", "Currency", "status"],
		cards: ["id", "name", "sort_name", "status"],
		providers: ["id", "name", "logo", "status"],
		callQueue: ["id", "name", "telephone", "status"],
	};

	// Section definitions for UI tiles
	const sections = [
		{
			id: "airlines",
			title: "Airlines",
			color: "from-indigo-500/10 to-indigo-600/10",
			icon: Plane,
			borderColor: "hover:border-indigo-500",
			iconColor: "text-indigo-500/20",
		},
		{
			id: "currency",
			title: "Currency",
			color: "from-teal-500/10 to-teal-600/10",
			icon: Globe,
			borderColor: "hover:border-teal-500",
			iconColor: "text-teal-500/20",
		},
		{
			id: "cards",
			title: "Cards",
			color: "from-rose-500/10 to-rose-600/10",
			icon: CreditCard,
			borderColor: "hover:border-rose-500",
			iconColor: "text-rose-500/20",
		},
		{
			id: "providers",
			title: "Providers",
			color: "from-amber-500/10 to-amber-600/10",
			icon: Briefcase,
			borderColor: "hover:border-amber-500",
			iconColor: "text-amber-500/20",
		},
		{
			id: "callQueue",
			title: "Call Queue",
			color: "from-green-500/10 to-green-600/10",
			icon: Phone,
			borderColor: "hover:border-green-500",
			iconColor: "text-green-500/20",
		},
	];

	// Reset search query when section changes
	useEffect(() => {
		if (activeSection) setSearchQuery("");
	}, [activeSection]);

	// Fetch cards from API when cards section is active
	useEffect(() => {
		if (activeSection === "cards") {
			setCardLoading(true);
			setCardError("");
			getCardListApi(user?.email, token)
				.then(setCards)
				.catch((err) => setCardError(err.message))
				.finally(() => setCardLoading(false));
		}
	}, [activeSection, user, token]);

	// Fetch currencies from API when currency section is active
	useEffect(() => {
		if (activeSection === "currency") {
			setCurrencyLoading(true);
			setCurrencyError("");
			getCurrencyListApi()
				.then(setCurrencies)
				.catch((err) => setCurrencyError(err.message))
				.finally(() => setCurrencyLoading(false));
		}
	}, [activeSection]);

	// Fetch providers from API when providers section is active
	useEffect(() => {
		if (activeSection === "providers") {
			setProviderLoading(true);
			setProviderError("");
			getProvidersApi()
				.then(setProviders)
				.catch((err) => setProviderError(err.message))
				.finally(() => setProviderLoading(false));
		}
	}, [activeSection]);

	// Handle add new row button
	const handleAddRow = () => {
		setModalType("add");
		setEditData(null);
		setShowModal(true);
	};

	// Handle edit button for a row
	const handleEdit = (item) => {
		setModalType("edit");
		// For cards, ensure the edit form is pre-filled with the current data
		if (activeSection === "cards") {
			setEditData({
				card: item.name || item.card || "",
				shortName: item.sort_name || item.shortName || "",
				id: item.id,
			});
		} else if (activeSection === "currency") {
			setEditData({
				currency: item.currency || item.Currency || "",
				id: item.id,
			});
		} else {
			setEditData(item);
		}
		setShowModal(true);
	};

	// Handle delete button for a row
	const handleDelete = async (id) => {
		switch (activeSection) {
			case "airlines":
				setAirlines(airlines.filter((a) => a.id !== id));
				break;
			case "currency":
				try {
					setCurrencyLoading(true);
					await deleteCurrencyApi(id);
					setCurrencies(currencies.filter((c) => c.id !== id));
				} catch (err) {
					setCurrencyError(err.message);
				} finally {
					setCurrencyLoading(false);
				}
				break;
			case "cards":
				try {
					setCardLoading(true);
					await deleteCardApi(id, user?.email, token);
					setCards(cards.filter((c) => c.id !== id));
				} catch (err) {
					setCardError(err.message);
				} finally {
					setCardLoading(false);
				}
				break;
			case "providers":
				try {
					setProviderLoading(true);
					await deleteProviderApi(id);
					setProviders(providers.filter((p) => p.id !== id));
				} catch (err) {
					setProviderError(err.message);
				} finally {
					setProviderLoading(false);
				}
				break;
			case "callQueue":
				setCallQueues(callQueues.filter((q) => q.id !== id));
				break;
		}
	};

	// Card status toggle handler
	const handleToggleCardStatus = async (id) => {
		// Optimistic UI: set loading for this row
		setCards((prev) =>
			prev.map((c) => (c.id === id ? { ...c, _statusLoading: true } : c))
		);
		try {
			await toggleCardStatusApi(id);
			// Update status locally (toggle 1/0 or ACTIVE/INACTIVE)
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
			setCardError(err.message);
			setCards((prev) =>
				prev.map((c) => (c.id === id ? { ...c, _statusLoading: false } : c))
			);
		}
	};

	// Currency status toggle handler
	const handleToggleCurrencyStatus = async (id) => {
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
			setCurrencyError(err.message);
			setCurrencies((prev) =>
				prev.map((c) => (c.id === id ? { ...c, _statusLoading: false } : c))
			);
		}
	};

	// Provider status toggle handler
	const handleToggleProviderStatus = async (id) => {
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
			setProviderError(err.message);
			setProviders((prev) =>
				prev.map((p) => (p.id === id ? { ...p, _statusLoading: false } : p))
			);
		}
	};

	// Handle form submit for add/edit modal
	const handleFormSubmit = async (formData) => {
		// Close modal and clear edit data immediately on submit
		setShowModal(false);
		setEditData(null);
		if (modalType === "add") {
			switch (activeSection) {
				case "airlines":
					setAirlines([{ id: Date.now(), ...formData }, ...airlines]);
					break;
				case "currency":
					try {
						setCurrencyLoading(true);
						const newCurrency = await addCurrencyApi(formData.currency);
						setCurrencies((prev) => [{ ...newCurrency }, ...prev]);
						setCurrencyError(""); // Clear any previous error
					} catch (err) {
						setCurrencyError(err.message);
					} finally {
						setCurrencyLoading(false);
					}
					break;
				case "cards":
					try {
						setCardLoading(true);
						await addCardApi(formData, user?.email, token);
						const freshCards = await getCardListApi(user?.email, token);
						setCards(freshCards);
					} catch (err) {
						setCardError(err.message);
					} finally {
						setCardLoading(false);
					}
					break;
				case "providers":
					try {
						setProviderLoading(true);
						const newProvider = await addProviderApi(formData);
						setProviders((prev) => [{ ...newProvider }, ...prev]);
						setProviderError("");
					} catch (err) {
						setProviderError(err.message);
					} finally {
						setProviderLoading(false);
					}
					break;
				case "callQueue":
					setCallQueues([{ id: Date.now(), ...formData }, ...callQueues]);
					break;
			}
		} else if (modalType === "edit") {
			switch (activeSection) {
				case "airlines":
					setAirlines(
						airlines.map((a) =>
							a.id === editData.id ? { ...a, ...formData } : a
						)
					);
					break;
				case "currency":
					try {
						setCurrencyLoading(true);
						await updateCurrencyApi({
							id: editData.id,
							currency: formData.currency,
						});
						const freshCurrencies = await getCurrencyListApi();
						setCurrencies(freshCurrencies);
					} catch (err) {
						setCurrencyError(err.message);
					} finally {
						setCurrencyLoading(false);
					}
					break;
				case "cards":
					try {
						setCardLoading(true);
						await updateCardApi(
							{
								id: editData.id,
								...formData,
							},
							user?.email,
							token
						);
						// Fetch the latest cards from the backend to ensure fresh data
						const freshCards = await getCardListApi(user?.email, token);
						setCards(freshCards);
					} catch (err) {
						setCardError(err.message);
					} finally {
						setCardLoading(false);
					}
					break;
				case "providers":
					try {
						setProviderLoading(true);
						await updateProviderApi({ ...formData, providerId: editData.id });
						const freshProviders = await getProvidersApi();
						setProviders(freshProviders);
					} catch (err) {
						setProviderError(err.message);
					} finally {
						setProviderLoading(false);
					}
					break;
				case "callQueue":
					setCallQueues(
						callQueues.map((q) =>
							q.id === editData.id ? { ...q, ...formData } : q
						)
					);
					break;
			}
		}
	};

	// Render the correct table for the active section
	const renderTable = () => {
		switch (activeSection) {
			case "airlines":
				return (
					<DataTable
						data={airlines}
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						onEdit={handleEdit}
						onDelete={handleDelete}
						columns={tableColumns.airlines}
					/>
				);
			case "currency":
				if (currencyError)
					return <div className="text-red-400">{currencyError}</div>;
				return (
					<DataTable
						data={currencies}
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						onEdit={handleEdit}
						onDelete={handleDelete}
						columns={tableColumns.currency}
						loading={currencyLoading}
						loadingLabel="Loading currencies..."
						onToggleStatus={handleToggleCurrencyStatus}
					/>
				);
			case "cards":
				if (cardError) return <div className="text-red-400">{cardError}</div>;
				return (
					<DataTable
						data={cards}
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						onEdit={handleEdit}
						onDelete={handleDelete}
						columns={tableColumns.cards}
						loading={cardLoading}
						loadingLabel="Loading cards..."
						onToggleStatus={handleToggleCardStatus}
					/>
				);
			case "providers":
				if (providerError)
					return <div className="text-red-400">{providerError}</div>;
				return (
					<DataTable
						data={providers}
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						onEdit={handleEdit}
						onDelete={handleDelete}
						columns={tableColumns.providers}
						loading={providerLoading}
						loadingLabel="Loading providers..."
						onToggleStatus={handleToggleProviderStatus}
					/>
				);
			case "callQueue":
				return (
					<DataTable
						data={callQueues}
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						onEdit={handleEdit}
						onDelete={handleDelete}
						columns={tableColumns.callQueue}
					/>
				);
			default:
				return null;
		}
	};

	// Section selection UI
	if (!activeSection) {
		return (
			<div className="max-w-7xl mx-auto p-4">
				<h2 className="text-xl font-semibold text-white mb-6">
					Select Data Type to Manage
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{sections.map(
						({ id, title, color, icon: Icon, borderColor, iconColor }) => (
							<button
								key={id}
								onClick={() => setActiveSection(id)}
								className={`group relative h-32 p-6 rounded-xl bg-gradient-to-br ${color} \
                        backdrop-blur-lg border border-gray-800 \
                        ${borderColor} transition-all duration-200 \
                        shadow-lg hover:shadow-xl overflow-hidden`}
							>
								<h3 className="relative z-10 text-2xl font-semibold text-white group-hover:scale-105 transition-transform">
									{title}
								</h3>
								<Icon
									className={`absolute right-[-15px] bottom-[-20px] w-30 h-30 ${iconColor} transform transition-transform group-hover:scale-120`}
								/>
							</button>
						)
					)}
				</div>
			</div>
		);
	}

	// Main render
	return (
		<div className="max-w-7xl mx-auto space-y-8">
			{activeSection && (
				<div className="rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700">
					{/* table header */}
					<div className="sticky rounded-t-xl top-0 z-10 p-2 border-b border-gray-700 flex justify-between items-center bg-gray-800/95 backdrop-blur-sm">
						<div className="flex items-center  gap-4">
							<button
								onClick={() => setActiveSection(null)}
								className="p-2 hover:bg-gray-700 rounded-lg"
							>
								<X className="w-5 h-5 text-gray-400" />
							</button>
							<h3 className="text-xl font-semibold text-white">
								{sections.find((s) => s.id === activeSection)?.title}
							</h3>
						</div>
						<div className=" flex-1 px-6 relative">
							<input
								type="text"
								placeholder="Search..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
							/>
							<Search className="w-5 h-5 text-gray-400 absolute left-8 top-2.5" />
						</div>
						<button
							onClick={handleAddRow}
							className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white hover:opacity-90 transition-all duration-200 flex items-center gap-2"
						>
							<Plus className="w-4 h-4" />
							Add New
						</button>
					</div>
					{/* table with data */}
					<div className="p-6">{renderTable()}</div>
				</div>
			)}
			{showModal && (
				<Modal
					isOpen={showModal}
					onClose={() => setShowModal(false)}
					title={`${modalType === "add" ? "Add New" : "Edit"} ${
						sections.find((s) => s.id === activeSection)?.title
					}`}
					maxWidth="md"
				>
					{activeSection === "airlines" && (
						<AirlineForm
							initialData={modalType === "edit" ? editData : {}}
							onSubmit={handleFormSubmit}
							onCancel={() => setShowModal(false)}
						/>
					)}
					{activeSection === "currency" && (
						<CurrencyForm
							initialData={modalType === "edit" ? editData : {}}
							onSubmit={handleFormSubmit}
							onCancel={() => setShowModal(false)}
						/>
					)}
					{activeSection === "cards" && (
						<CardForm
							initialData={modalType === "edit" ? editData : {}}
							onSubmit={handleFormSubmit}
							onCancel={() => setShowModal(false)}
						/>
					)}
					{activeSection === "providers" && (
						<ProviderForm
							initialData={modalType === "edit" ? editData : {}}
							onSubmit={handleFormSubmit}
							onCancel={() => setShowModal(false)}
						/>
					)}
					{activeSection === "callQueue" && (
						<CallQueueForm
							initialData={modalType === "edit" ? editData : {}}
							onSubmit={handleFormSubmit}
							onCancel={() => setShowModal(false)}
						/>
					)}
				</Modal>
			)}
		</div>
	);
}

export default ManageData;
