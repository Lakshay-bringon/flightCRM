import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";

// Example mock data (replace with API fetch in production)
const MOCK_COMMENTS = [
  {
    id: 1,
    date: "2025-05-13",
    time: "18:30",
    activity: "Booking confirmed.",
    user: "Lakshay Sharma",
    role: "Agent",
  },
  {
    id: 2,
    date: "2025-05-13",
    time: "18:35",
    activity: "Sent auth email.",
    user: "Anurag Pandey",
    role: "Admin",
  },
  {
    id: 3,
    date: "2025-05-12",
    time: "16:10",
    activity: "Requested docs.",
    user: "Vivek Kumar",
    role: "Agent",
  },
  {
    id: 4,
    date: "2025-05-13",
    time: "18:35",
    activity: "Sent auth email.",
    user: "Anurag Pandey",
    role: "Admin",
  },
  {
    id: 5,
    date: "2025-05-12",
    time: "16:10",
    activity: "Requested docs.",
    user: "Vivek Kumar",
    role: "Agent",
  },
  {
    id: 6,
    date: "2025-05-13",
    time: "18:35",
    activity: "Sent auth email.",
    user: "Anurag Pandey",
    role: "Admin",
  },
  {
    id: 7,
    date: "2025-05-12",
    time: "16:10",
    activity: "Requested docs.",
    user: "Vivek Kumar",
    role: "Agent",
  },
];

const columns = [
  { key: "date", label: "Date" },
  { key: "time", label: "Time" },
  { key: "activity", label: "Activity" },
  { key: "user", label: "User Name" },
  { key: "role", label: "Role" },
];

function TableRow({ record }) {
  // record = activity object
  return (
    <tr className="border-b border-gray-700/50 hover:bg-gray-700/50 transition-colors even:bg-gray-800/50">
      <td className="py-3 px-4 text-gray-400 truncate">{record.date}</td>
      <td className="py-3 px-4 text-gray-400 truncate">{record.time}</td>
      <td className="py-3 px-4 text-gray-200 truncate">{record.activity}</td>
      <td className="py-3 px-4 text-gray-300 truncate">{record.user}</td>
      <td className="py-3 px-4 text-gray-400 truncate">{record.role}</td>
    </tr>
  );
}

export default function Activity({ bookingId = "" }) {
  const [search, setSearch] = useState("");

  // You would fetch activities based on bookingId in a real app
  const activities = useMemo(() => {
    if (!search) return MOCK_COMMENTS;
    return MOCK_COMMENTS.filter((c) =>
      c.comment.toLowerCase().includes(search.toLowerCase()) ||
      c.user.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div>
    <div className="bg-gray-900 rounded-lg shadow p-4">
      <div className="flex items-center mb-4">
        <Search className="w-4 h-4 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search activities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-800 text-gray-200 rounded px-3 py-1 w-full focus:outline-none focus:ring focus:ring-blue-500/40"
        />
      </div>
    </div>
     
  <div className="flex-1 overflow-y-auto">
  {activities.length === 0 ? (
  <div className="p-6 text-center text-gray-400">No activities found.</div>
) : (
  <table>
    {/* ... */}
    <tbody>
      {activities.map((comment, index) => (
        <TableRow key={comment.id} record={comment} />
      ))}
    </tbody>
  </table>
)}
  </div>
    </div >
    

  );
}
