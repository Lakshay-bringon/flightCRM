import React from 'react';
import SearchBar from './SearchBar';
import {PenSquare, Trash} from "lucide-react";
function AirlinesTable({ airlines, handleEdit, handleDelete, searchQuery, setSearchQuery }) {
  const filteredAirlines = airlines.filter((airline) =>
    airline.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
}

export default AirlinesTable;
