import { useState } from "react";
import {
	Plus,
	PenSquare,
	Trash,
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
import { useEffect } from "react";

function ManageData() {
	const [activeSection, setActiveSection] = useState(null);
	const [editData, setEditData] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [editingRowId, setEditingRowId] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState("add");

	const [airlines, setAirlines] = useState([
		{
			id: 1,
			name: "United",
			logo: "/path/to/united.png",
			status: "Active",
		},
		{
			id: 2,
			name: "American",
			logo: "/path/to/american.png",
			status: "Active",
		},
		{
			id: 3,
			name: "Alaska",
			logo: "/path/to/alaska.png",
			status: "Active",
		},
	]);
	const [currencies, setCurrencies] = useState([
		{ id: 1, currency: "USD", status: "ACTIVE" },
	]);
	const [cards, setCards] = useState([
		{ id: 1, card: "VISA", shortName: "VI", status: "Active" },
		{ id: 2, card: "MASTER", shortName: "MS", status: "Active" },
	]);
	const [providers, setProviders] = useState([
		{
			id: 1,
			name: "Air Fare/Flight Fare",
			logo: "",
			status: "Active",
			datetime: "2024-09-30 12:01:59",
		},
		{
			id: 2,
			name: "Skyline",
			logo: "",
			status: "Active",
			datetime: "2025-04-14 14:32:35",
		},
	]);
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

	useEffect(() => {
		activeSection && setSearchQuery("");
	}, [activeSection]);
	// Data Tiles
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

	const tableColumns = {
		airlines: ["id", "name", "logo", "status"],
		currency: ["id", "currency", "status"],
		cards: ["id", "card", "shortName", "status"],
		providers: ["id", "name", "logo", "status", "datetime"],
		callQueue: ["id", "name", "telephone", "status"],
	};

	const handleAddRow = () => {
		setModalType("add");
		setEditData(null);
		setShowModal(true);
	};

	const handleEdit = (item) => {
		setModalType("edit");
		setEditData(item);
		setShowModal(true);
	};

	const handleDelete = (id) => {
		switch (activeSection) {
			case "airlines":
				setAirlines(airlines.filter((a) => a.id !== id));
				break;
			case "currency":
				setCurrencies(currencies.filter((c) => c.id !== id));
				break;
			case "cards":
				setCards(cards.filter((c) => c.id !== id));
				break;
			case "providers":
				setProviders(providers.filter((p) => p.id !== id));
				break;
			case "callQueue":
				setCallQueues(callQueues.filter((q) => q.id !== id));
				break;
		}
	};

	const handleSave = (id, updatedData) => {
		switch (activeSection) {
			case "currency":
				setCurrencies(
					currencies.map((c) => (c.id === id ? { ...c, ...updatedData } : c))
				);
				break;
			case "cards":
				setCards(
					cards.map((c) => (c.id === id ? { ...c, ...updatedData } : c))
				);
				break;
			case "providers":
				setProviders(
					providers.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
				);
				break;
			case "callQueue":
				setCallQueues(
					callQueues.map((q) => (q.id === id ? { ...q, ...updatedData } : q))
				);
				break;
		}
		setEditingRowId(null);
	};

	const handleFormSubmit = (formData) => {
		if (modalType === "add") {
			switch (activeSection) {
				case "airlines":
					setAirlines([{ id: Date.now(), ...formData }, ...airlines]);
					break;
				case "currency":
					setCurrencies([{ id: Date.now(), ...formData }, ...currencies]);
					break;
				case "cards":
					setCards([{ id: Date.now(), ...formData }, ...cards]);
					break;
				case "providers":
					setProviders([{ id: Date.now(), ...formData }, ...providers]);
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
					setCurrencies(
						currencies.map((c) =>
							c.id === editData.id ? { ...c, ...formData } : c
						)
					);
					break;
				case "cards":
					setCards(
						cards.map((c) => (c.id === editData.id ? { ...c, ...formData } : c))
					);
					break;
				case "providers":
					setProviders(
						providers.map((p) =>
							p.id === editData.id ? { ...p, ...formData } : p
						)
					);
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
		setShowModal(false);
		setEditData(null);
	};

	// Render Table According to the active section
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
				return (
					<DataTable
						data={currencies}
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						onEdit={handleEdit}
						onDelete={handleDelete}
						columns={tableColumns.currency}
					/>
				);

			case "cards":
				return (
					<DataTable
						data={cards}
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						onEdit={handleEdit}
						onDelete={handleDelete}
						columns={tableColumns.cards}
					/>
				);

			case "providers":
				return (
					<DataTable
						data={providers}
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						onEdit={handleEdit}
						onDelete={handleDelete}
						columns={tableColumns.providers}
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
								className={`group relative h-32 p-6 rounded-xl bg-gradient-to-br ${color} 
                        backdrop-blur-lg border border-gray-800 
                        ${borderColor} transition-all duration-200 
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
