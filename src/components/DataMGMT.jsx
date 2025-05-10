import React, { useState, useMemo } from 'react';
import { Plus, PenSquare, Trash, X, Search, Plane, CreditCard, Briefcase, Globe } from 'lucide-react';
import { StatsCard } from '../features/dashboard/widgets/StatsCard';

function DataMGMT() {
  const [activeSection, setActiveSection] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [editData, setEditData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data arrays
  const [airlines, setAirlines] = useState([
    { id: 1, name: 'United', logo: '/path/to/united.png', status: 'Active' },
    { id: 2, name: 'American', logo: '/path/to/american.png', status: 'Active' },
    { id: 3, name: 'Alaska', logo: '/path/to/alaska.png', status: 'Active' }
  ]);

  const [currencies, setCurrencies] = useState([
    { id: 1, currency: 'USD', status: 'ACTIVE' }
  ]);

  const [cards, setCards] = useState([
    { id: 1, card: 'VISA', aliseName: 'VI', status: 'Active' },
    { id: 2, card: 'MASTER', aliseName: 'MS', status: 'Active' }
  ]);

  const [providers, setProviders] = useState([
    { id: 1, name: 'Air Fare/Flight Fare', logo: '', status: 'Active', datetime: '2024-09-30 12:01:59' },
    { id: 2, name: 'Skyline', logo: '', status: 'Active', datetime: '2025-04-14 14:32:35' }
  ]);

  const sections = [
    { id: 'airlines', title: 'Airlines', color: 'from-blue-500 to-blue-600' },
    { id: 'currency', title: 'Currency', color: 'from-green-500 to-green-600' },
    { id: 'cards', title: 'Cards', color: 'from-purple-500 to-purple-600' },
    { id: 'providers', title: 'Providers', color: 'from-orange-500 to-orange-600' }
  ];

  const handleAdd = () => {
    setModalType('add');
    setEditData(null);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setModalType('edit');
    setEditData(item);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    switch(activeSection) {
      case 'airlines':
        setAirlines(airlines.filter(a => a.id !== id));
        break;
      case 'currency':
        setCurrencies(currencies.filter(c => c.id !== id));
        break;
      case 'cards':
        setCards(cards.filter(c => c.id !== id));
        break;
      case 'providers':
        setProviders(providers.filter(p => p.id !== id));
        break;
    }
  };

  const filterData = (data) => {
    if (!searchQuery) return data;
    
    return data.filter(item => {
      const searchStr = searchQuery.toLowerCase();
      return Object.keys(item).some(key => {
        if (key === 'id') return false;
        const value = item[key];
        if (value === null || value === undefined) return false;
        return value.toString().toLowerCase().includes(searchStr);
      });
    });
  };

  const filteredAirlines = useMemo(() => filterData(airlines), [airlines, searchQuery]);
  const filteredCurrencies = useMemo(() => filterData(currencies), [currencies, searchQuery]);
  const filteredCards = useMemo(() => filterData(cards), [cards, searchQuery]);
  const filteredProviders = useMemo(() => filterData(providers), [providers, searchQuery]);

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
    switch(activeSection) {
      case 'airlines':
        return (
          <>
            {renderSearchBar()}
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-semibold">SR.NO</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold">AIRLINE</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold">LOGO</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold">STATUS</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAirlines.map((airline, index) => (
                    <tr key={airline.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                      <td className="px-3 py-2 text-sm">{index + 1}</td>
                      <td className="px-3 py-2 text-sm">{airline.name}</td>
                      <td className="px-3 py-2 text-sm">
                        <img src={airline.logo} alt={airline.name} className="h-6 w-6" />
                      </td>
                      <td className="px-3 py-2 text-sm">
                        <span className="px-2 py-0.5 rounded text-xs bg-green-500/20 text-green-400">
                          {airline.status}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex gap-1">
                          <button onClick={() => handleEdit(airline)} className="p-1 hover:bg-gray-600 rounded">
                            <PenSquare className="w-4 h-4 text-blue-400" />
                          </button>
                          <button onClick={() => handleDelete(airline.id)} className="p-1 hover:bg-gray-600 rounded">
                            <Trash className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );

      case 'currency':
        return (
          <>
            {renderSearchBar()}
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-semibold">SR.NO</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold">CURRENCY</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold">STATUS</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCurrencies.map((currency, index) => (
                    <tr key={currency.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                      <td className="px-3 py-2 text-sm">{index + 1}</td>
                      <td className="px-3 py-2 text-sm">{currency.currency}</td>
                      <td className="px-3 py-2 text-sm">
                        <span className="px-2 py-0.5 rounded text-xs bg-green-500/20 text-green-400">
                          {currency.status}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex gap-1">
                          <button onClick={() => handleEdit(currency)} className="p-1 hover:bg-gray-600 rounded">
                            <PenSquare className="w-4 h-4 text-blue-400" />
                          </button>
                          <button onClick={() => handleDelete(currency.id)} className="p-1 hover:bg-gray-600 rounded">
                            <Trash className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );

      case 'cards':
        return (
          <>
            {renderSearchBar()}
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-semibold">SR.NO</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold">CARD</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold">ALISE NAME</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold">STATUS</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCards.map((card, index) => (
                    <tr key={card.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                      <td className="px-3 py-2 text-sm">{index + 1}</td>
                      <td className="px-3 py-2 text-sm">{card.card}</td>
                      <td className="px-3 py-2 text-sm">{card.aliseName}</td>
                      <td className="px-3 py-2 text-sm">
                        <span className="px-2 py-0.5 rounded text-xs bg-green-500/20 text-green-400">
                          {card.status}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex gap-1">
                          <button onClick={() => handleEdit(card)} className="p-1 hover:bg-gray-600 rounded">
                            <PenSquare className="w-4 h-4 text-blue-400" />
                          </button>
                          <button onClick={() => handleDelete(card.id)} className="p-1 hover:bg-gray-600 rounded">
                            <Trash className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );

      case 'providers':
        return (
          <>
            {renderSearchBar()}
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-semibold">SR.NO</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold">NAME</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold">LOGO</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold">STATUS</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold">DATETIME</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProviders.map((provider, index) => (
                    <tr key={provider.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                      <td className="px-3 py-2 text-sm">{index + 1}</td>
                      <td className="px-3 py-2 text-sm">{provider.name}</td>
                      <td className="px-3 py-2 text-sm">
                        <img src={provider.logo} alt={provider.name} className="h-6 w-6" />
                      </td>
                      <td className="px-3 py-2 text-sm">
                        <span className="px-2 py-0.5 rounded text-xs bg-green-500/20 text-green-400">
                          {provider.status}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-sm">{provider.datetime}</td>
                      <td className="px-3 py-2">
                        <div className="flex gap-1">
                          <button onClick={() => handleEdit(provider)} className="p-1 hover:bg-gray-600 rounded">
                            <PenSquare className="w-4 h-4 text-blue-400" />
                          </button>
                          <button onClick={() => handleDelete(provider.id)} className="p-1 hover:bg-gray-600 rounded">
                            <Trash className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  const renderForm = () => {
    const formFields = {
      airlines: [
        { name: 'name', label: 'Airline Name', type: 'text' },
        { name: 'logo', label: 'Logo', type: 'file' },
        { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] }
      ],
      currency: [
        { name: 'currency', label: 'Currency Code', type: 'text' },
        { name: 'status', label: 'Status', type: 'select', options: ['ACTIVE', 'INACTIVE'] }
      ],
      cards: [
        { name: 'card', label: 'Card Name', type: 'text' },
        { name: 'aliseName', label: 'Alise Name', type: 'text' },
        { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] }
      ],
      providers: [
        { name: 'name', label: 'Provider Name', type: 'text' },
        { name: 'logo', label: 'Logo', type: 'file' },
        { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] }
      ]
    };

    const fields = formFields[activeSection] || [];

    return (
      <form className="space-y-4">
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">{field.label}</label>
            {field.type === 'select' ? (
              <select 
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                defaultValue={editData?.[field.name]}
              >
                {field.options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                defaultValue={editData?.[field.name]}
              />
            )}
          </div>
        ))}
      </form>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Tiles Grid */}
      {!activeSection && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section) => {
              let value = "0";
              let activeCount = "0";
              let icon = null;
              
              switch(section.id) {
                case 'airlines':
                  value = airlines.length.toString();
                  activeCount = airlines.filter(a => a.status === 'Active').length.toString();
                  icon = Plane;
                  break;
                case 'currency':
                  value = currencies.length.toString();
                  activeCount = currencies.filter(c => c.status === 'ACTIVE').length.toString();
                  icon = Globe;
                  break;
                case 'cards':
                  value = cards.length.toString();
                  activeCount = cards.filter(c => c.status === 'Active').length.toString();
                  icon = CreditCard;
                  break;
                case 'providers':
                  value = providers.length.toString();
                  activeCount = providers.filter(p => p.status === 'Active').length.toString();
                  icon = Briefcase;
                  break;
              }

              return (
                <StatsCard
                  key={section.id}
                  title={`Manage ${section.title}`}
                  value={value}
                  icon={icon}
                  description={`${activeCount} Active`}
                  color={section.id === 'airlines' ? 'blue' : 
                         section.id === 'currency' ? 'green' : 
                         section.id === 'cards' ? 'purple' : 'orange'}
                  onClick={() => setActiveSection(section.id)}
                />
              );
            })}
          </div>
        </>
      )}

      {/* Active Section Content */}
      {activeSection && (
        <div className="rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700">
          <div className="sticky top-0 z-10 p-6 border-b border-gray-700 flex justify-between items-center bg-gray-800/95 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setActiveSection(null)}
                className="p-2 hover:bg-gray-700 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
              <h3 className="text-xl font-semibold text-white">
                {sections.find(s => s.id === activeSection)?.title}
              </h3>
            </div>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white hover:opacity-90 transition-all duration-200 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New
            </button>
          </div>
          <div className="p-6">
            {renderTable()}
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-md">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">
                {modalType === 'add' ? 'Add New' : 'Edit'} {sections.find(s => s.id === activeSection)?.title}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-700 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-6">
              {renderForm()}
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => {
                    // Handle save logic here
                    setShowModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white hover:opacity-90 transition-all duration-200"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataMGMT;