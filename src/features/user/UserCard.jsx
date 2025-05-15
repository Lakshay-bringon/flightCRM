import React from 'react';
import { UserCircle, Phone, Mail, PenSquare, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UserCard({ user, onEdit, onRemove, onStatusChange }) {
  const handleStatusToggle = (e) => {
    e.stopPropagation();
    onStatusChange(user.id, !user.isActive);
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/details/user/${user.id}`, { state: { user } });
  };

  return (
    <div onClick={handleClick} className="p-4 hover:bg-gray-700/50 transition-all duration-200 flex items-center justify-between cursor-pointer group border-b border-gray-700 last:border-b-0">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gray-700 rounded-lg">
          <UserCircle className="w-8 h-8 text-blue-400" />
        </div>
        <div>
          <div className="text-white font-medium text-base">{user.name}</div>
          <div className="flex flex-wrap gap-3 text-xs text-gray-400 mt-1">
            <span className="flex items-center"><Phone className="w-3 h-3 mr-1" />{user.phone}</span>
            <span className="flex items-center"><Mail className="w-3 h-3 mr-1" />{user.email}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
        <button 
          onClick={handleStatusToggle}
          className={`px-2 py-1 text-xs rounded-full cursor-pointer transition-all duration-200 ${
            user.isActive 
              ? 'bg-green-500/20 text-green-400 hover:bg-red-500/20 hover:text-red-400' 
              : 'bg-red-500/20 text-red-400 hover:bg-green-500/20 hover:text-green-400'
          }`}
        >
          {user.isActive ? 'Active' : 'Inactive'}
        </button>
        <button className="px-2 py-1 text-xs rounded-full cursor-pointer bg-blue-500/20 text-blue-400">{user.role}</button>
        <button onClick={() => onEdit(user)} className="px-2 py-1 rounded-full hover:bg-blue-500/20 text-blue-400">
          <PenSquare className="w-4 h-4"/>
        </button>
        <button onClick={() => onRemove(user)} className="px-2 py-1 rounded-full hover:bg-red-500/20 text-red-400"><Trash className="w-4 h-4"/></button>
      </div>
    </div>
  );
}