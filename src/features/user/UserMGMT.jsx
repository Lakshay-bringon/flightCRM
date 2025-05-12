import React, { useState } from 'react';
import RecordsList from '../../components/RecordsList';
import UserCard from './UserCard';
import UserDetailsForm from './UserDetailsForm';

export default function UserMGMT() {
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('name');
  const [userPage, setUserPage] = useState(1);
  const [userPerPage, setUserPerPage] = useState(5);
  const [showUserForm, setShowUserForm] = useState(false);
  const [users] = useState([
    { id: 1, name: 'Sarah Wilson', phone: '+1 234-567-8900', email: 'sarah.w@example.com', role: 'Agent', isActive: true },
    { id: 2, name: 'John Doe', phone: '+1 234-567-8901', email: 'john.d@example.com', role: 'Leader', isActive: true },
    { id: 3, name: 'Jane Smith', phone: '+1 234-567-8902', email: 'jane.s@example.com', role: 'Admin', isActive: false },
    { id: 4, name: 'Mike Brown', phone: '+1 234-567-8903', email: 'mike.b@example.com', role: 'Agent', isActive: true },
    { id: 5, name: 'Priya Singh', phone: '+1 234-567-8904', email: 'priya.s@example.com', role: 'Agent', isActive: true },
    { id: 6, name: 'Amit Sharma', phone: '+1 234-567-8905', email: 'amit.s@example.com', role: 'Leader', isActive: false },
    { id: 7, name: 'Ravi Kumar', phone: '+1 234-567-8906', email: 'ravi.k@example.com', role: 'Agent', isActive: true },
    { id: 8, name: 'Anjali Mehra', phone: '+1 234-567-8907', email: 'anjali.m@example.com', role: 'Admin', isActive: true },
    { id: 9, name: 'Suresh Patel', phone: '+1 234-567-8908', email: 'suresh.p@example.com', role: 'Agent', isActive: true },
    { id: 10, name: 'Neha Verma', phone: '+1 234-567-8909', email: 'neha.v@example.com', role: 'Leader', isActive: true },
    { id: 11, name: 'Extra User', phone: '+1 234-567-8910', email: 'extra.u@example.com', role: 'Agent', isActive: false },
  ]);

  const filteredUsers = users.filter(u => {
    const value = String(u[searchBy] || '').toLowerCase();
    return value.includes(search.toLowerCase());
  });

  // Show only the 5 most recent users if no search, otherwise show search results
  const recordsToShow = search.trim() === '' ? users.slice(-5).reverse() : filteredUsers;

  // Dummy search handler for button (search is already reactive)
  const handleSearch = (e) => {
    e.preventDefault();
    // No-op, search is reactive
  };

  return (
    <div className="w-full h-full">
      {/* Search Form + Add User Button */}
      <div className="mb-4 flex items-center w-full gap-2">
        <form className="flex flex-1 gap-2 max-w-xl" onSubmit={handleSearch}>
          <select
            value={searchBy}
            onChange={e => setSearchBy(e.target.value)}
            className="w-36 px-2 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500 transition-all"
            placeholder={`Search user by ${searchBy}...`}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-semibold whitespace-nowrap"
          >
            Search
          </button>
        </form>
        <button
          className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-semibold whitespace-nowrap"
          onClick={() => setShowUserForm(true)}
        >
          + Add User
        </button>
      </div>
      {/* Users List */}
      <RecordsList
        title="New Users"
        list={recordsToShow}
        CardComponent={({record}) => (
          <UserCard
            user={record}
            onEdit={() => {}}
            onRemove={() => {}}
            onStatusChange={() => {}}
          />
        )}
        currentPage={userPage}
        onPageChange={setUserPage}
        itemsPerPage={userPerPage}
        onItemsPerPageChange={setUserPerPage}
        className="w-full"
      />
      {showUserForm && (
        <UserDetailsForm onClose={() => setShowUserForm(false)} />
      )}
    </div>
  );
}