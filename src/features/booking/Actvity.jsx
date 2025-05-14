import React, { useMemo } from "react";
import AsideTable from "./AsideTable";
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

export default function Activity({ bookingId = "", open = false, onClose }) {
  // You would fetch activities based on bookingId in a real app
  // For now, just filter by bookingId if needed
  const activities = useMemo(() => MOCK_COMMENTS, []);

  const columns = [
    { key: "date", label: "Date" },
    { key: "time", label: "Time" },
    { key: "activity", label: "Activity" },
    { key: "user", label: "User Name" },
    { key: "role", label: "Role" },
  ];

  return (
    <AsideTable
      open={open}
      onClose={onClose}
      title="Activity"
      columns={columns}
      data={activities}
      searchPlaceholder="Search activities..."
      emptyMessage="No activities found."
      pageSize={10}
    />
  );
}
