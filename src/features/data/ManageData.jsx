import { useState, useMemo } from "react";
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
// import useAirlines from './hooks/useAirlines';

function ManageData() {
  const [activeSection, setActiveSection] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [editData, setEditData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingRowId, setEditingRowId] = useState(null);

 
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

  const handleAdd = () => {
    setModalType("add");
    setEditData(null);
    setShowModal(true);
  };

  const handleAddRow = () => {
    const newRow = { id: Date.now(), name: "", status: "Active" };

    switch (activeSection) {
      case "airlines":
        setAirlines([newRow, ...airlines]);
        setEditingRowId(newRow.id);
        break;
      case "currency":
        setCurrencies([
          { id: Date.now(), currency: "", status: "ACTIVE" },
          ...currencies,
        ]);
        setEditingRowId(newRow.id);
        break;
      case "cards":
        setCards([
          { id: Date.now(), card: "", aliseName: "", status: "Active" },
          ...cards,
        ]);
        setEditingRowId(newRow.id);
        break;
      case "providers":
        setProviders([
          {
            id: Date.now(),
            name: "",
            logo: "",
            status: "Active",
            datetime: "",
          },
          ...providers,
        ]);
        setEditingRowId(newRow.id);
        break;
      case "callQueue":
        setCallQueues([
          { id: Date.now(), name: "", telephone: "", status: "Active" },
          ...callQueues,
        ]);
        setEditingRowId(newRow.id);
        break;
    }
  };

  const handleEdit = (item) => {
    setModalType("edit");
    setEditData(item);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    switch (activeSection) {
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

  const filterData = (data) => {
    if (!searchQuery) return data;

    return data.filter((item) => {
      const searchStr = searchQuery.toLowerCase();
      return Object.keys(item).some((key) => {
        if (key === "id") return false;
        const value = item[key];
        if (value === null || value === undefined) return false;
        return value.toString().toLowerCase().includes(searchStr);
      });
    });
  };

  const filteredCurrencies = useMemo(
    () => filterData(currencies),
    [currencies, searchQuery]
  );
  const filteredCards = useMemo(() => filterData(cards), [cards, searchQuery]);
  const filteredProviders = useMemo(
    () => filterData(providers),
    [providers, searchQuery]
  );
  const filteredCallQueues = useMemo(
    () => filterData(callQueues),
    [callQueues, searchQuery]
  );

  const renderSearchBar = () => (
    <div className="mb-4 relative">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
      />
      <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
    </div>
  );

  const renderTable = () => {
    switch (activeSection) {
      case "airlines":
        return (
          <DataTable
            data={airlines}
            // handleEdit={editAirline}
            // handleDelete={deleteAirline}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        );
      case "currency":
        return (
          <DataTable
            data={currencies}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        );

      case "cards":
        return (
          <DataTable
            data={cards}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        );

      case "providers":
        return (
          <DataTable
            data={providers}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        );

      case "callQueue":
        return (
          <DataTable
            data={callQueues}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
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
                  className={`absolute right-[-20px] bottom-[-20px] w-24 h-24 ${iconColor} transform transition-transform group-hover:scale-110`}
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
          <div className="p-6">{renderTable()}</div>
        </div>
      )}
    </div>
  );
}

export default ManageData;
