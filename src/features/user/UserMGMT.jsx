import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDetailsForm from './UserDetailsForm';
import UserProfile from './UserProfile';
import UserCard from './UserCard';

function UserMGMT() {
  const [showUserForm, setShowUserForm] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [userToRemove, setUserToRemove] = useState(null);
  const [search, setSearch] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [profileUser, setProfileUser] = useState(null);
  const [roleFilter, setRoleFilter] = useState('all');
  const navigate = useNavigate();

  // Initialize users state with the dummy data
  const [users, setUsers] = useState([
    { id: 1, name: 'Sarah Wilson', phone: '+1 234-567-8900', email: 'sarah.w@example.com', role: 'Agent', team: 'Team A', isActive: true },
    { id: 2, name: 'John Doe', phone: '+1 234-567-8901', email: 'john.d@example.com', role: 'Leader', team: 'Team B', isActive: true },
    { id: 3, name: 'Jane Smith', phone: '+1 234-567-8902', email: 'jane.s@example.com', role: 'Admin', team: '', isActive: false },
    { id: 4, name: 'Mike Brown', phone: '+1 234-567-8903', email: 'mike.b@example.com', role: 'Agent', team: 'Team A', isActive: true },
  ]);

  function handleAddUser() {
    setEditUser(null);
    setShowUserForm(true);
  }

  function handleEditUser(user) {
    setEditUser(user);
    setShowUserForm(true);
  }

  function handleRemoveUser(user) {
    setUserToRemove(user);
    setShowRemoveConfirm(true);
  }

  function confirmRemoveUser() {
    // TODO: Remove user from list or call API
    setShowRemoveConfirm(false);
    setUserToRemove(null);
    // Optionally show a toast/notification
  }

  function cancelRemoveUser() {
    setShowRemoveConfirm(false);
    setUserToRemove(null);
  }

  function handleCloseForm() {
    setShowUserForm(false);
    setEditUser(null);
  }

  function handleUserCardClick(user) {
    navigate(`/details/user/${user.id}`, { 
      state: { 
        user: {
          ...user,
          alias: user.name.split(' ').map(n => n[0]).join('').toUpperCase(),
          department: user.team || 'General',
          joinedDate: '2024-01-01', // This would come from the backend
          performanceRating: '4.5/5', // This would come from the backend
          totalBookings: '150', // This would come from the backend
          lastActive: '2 hours ago', // This would come from the backend
          permissions: ['Booking Management', 'Customer Support'] // This would come from the backend
        }
      } 
    });
  }

  function handleCloseProfile() {
    setShowProfile(false);
    setProfileUser(null);
  }

  // Dummy team list for selector (to be fetched from DB in real app)
  const teams = ['Team A', 'Team B', 'Team C'];

  const handleStatusChange = (userId, newStatus) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, isActive: newStatus }
          : user
      )
    );
  };

  const activeUsersCount = users.filter(u => u.isActive).length;

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search);
    
    const matchesRole = roleFilter === 'all' || u.role.toLowerCase() === roleFilter.toLowerCase();
    
    return matchesSearch && matchesRole;
  });

  const getRoleCount = (role) => {
    return users.filter(u => u.role.toLowerCase() === role.toLowerCase()).length;
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* User List */}
      <div className="rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-4 min-h-[72px] border-b border-gray-700">
          <h3 className="text-xl font-semibold text-white">Users</h3>
          <div className="flex flex-1 md:mx-4 max-w-md">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500 transition-all"
              placeholder="Search user..."
            />
          </div>
          <button
            onClick={handleAddUser}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 text-sm font-medium"
          >
            + Add User
          </button>
        </div>
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-gray-800/60">
          <div className="flex gap-2">
            <span className="text-xs text-gray-400 bg-gray-700 rounded px-2 py-1">Total: {users.length}</span>
            <span className="text-xs text-green-400 bg-gray-700 rounded px-2 py-1">Active: {activeUsersCount}</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setRoleFilter('all')}
              className={`text-xs rounded px-2 py-1 transition-all duration-200 ${
                roleFilter === 'all' 
                  ? 'bg-blue-500/20 text-blue-400' 
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
            >
              All ({users.length})
            </button>
            <button 
              onClick={() => setRoleFilter('admin')}
              className={`text-xs rounded px-2 py-1 transition-all duration-200 ${
                roleFilter === 'admin' 
                  ? 'bg-purple-500/20 text-purple-400' 
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
            >
              Admin ({getRoleCount('admin')})
            </button>
            <button 
              onClick={() => setRoleFilter('leader')}
              className={`text-xs rounded px-2 py-1 transition-all duration-200 ${
                roleFilter === 'leader' 
                  ? 'bg-yellow-500/20 text-yellow-400' 
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
            >
              Leader ({getRoleCount('leader')})
            </button>
            <button 
              onClick={() => setRoleFilter('agent')}
              className={`text-xs rounded px-2 py-1 transition-all duration-200 ${
                roleFilter === 'agent' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
            >
              Agent ({getRoleCount('agent')})
            </button>
          </div>
        </div>
        <div>
          {filteredUsers.length === 0 ? (
            <div className="p-6 text-center text-gray-400">No users found.</div>
          ) : (
            <div>
              {filteredUsers.map((user) => (
                <div key={user.id} onClick={() => handleUserCardClick(user)}>
                  <UserCard 
                    user={user}
                    onEdit={handleEditUser}
                    onRemove={handleRemoveUser}
                    onStatusChange={handleStatusChange}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {showUserForm && (
        <UserDetailsForm user={editUser} onClose={handleCloseForm} />
      )}
      {showRemoveConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-transparent backdrop-blur-[2px]" onClick={cancelRemoveUser}></div>
          <div className="relative bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-sm mx-2 p-6 z-10 flex flex-col items-center">
            <button
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-2xl font-bold"
              onClick={cancelRemoveUser}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-lg font-bold text-white mb-2 text-center">Confirm Removal</h2>
            <p className="text-gray-300 text-center mb-4">Are you sure you want to remove <span className="font-semibold text-red-400">{userToRemove?.name}</span>?<br/>This action <span className="font-bold text-red-500">cannot be undone</span>.</p>
            <div className="flex gap-4 w-full mt-2">
              <button
                className="flex-1 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 font-semibold text-sm"
                onClick={cancelRemoveUser}
              >
                Cancel
              </button>
              <button
                className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-semibold text-sm"
                onClick={confirmRemoveUser}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
      {showProfile && profileUser && (
        <UserProfile agent={profileUser} onClose={handleCloseProfile} />
      )}
    </div>
  );
}

export default UserMGMT;