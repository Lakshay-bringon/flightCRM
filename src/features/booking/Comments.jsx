import React, { useMemo } from "react";
import AsideTable from "./AsideTable";
// Example mock data (replace with API fetch in production)
const MOCK_COMMENTS = [
  {
    id: 1,
    date: "2025-05-13",
    time: "18:30",
    comment: "Booking confirmed.",
    user: "Lakshay Sharma",
    role: "Agent",
  },
  {
    id: 2,
    date: "2025-05-13",
    time: "18:35",
    comment: "Sent auth email.",
    user: "Anurag Pandey",
    role: "Admin",
  },
  {
    id: 3,
    date: "2025-05-12",
    time: "16:10",
    comment: "Requested docs.",
    user: "Vivek Kumar",
    role: "Agent",
  },
  {
    id: 4,
    date: "2025-05-13",
    time: "18:35",
    comment: "Sent auth email.",
    user: "Anurag Pandey",
    role: "Admin",
  },
  {
    id: 5,
    date: "2025-05-12",
    time: "16:10",
    comment: "Requested docs.",
    user: "Vivek Kumar",
    role: "Agent",
  },
  {
    id: 6,
    date: "2025-05-13",
    time: "18:35",
    comment: "Sent auth email.",
    user: "Anurag Pandey",
    role: "Admin",
  },
  {
    id: 7,
    date: "2025-05-12",
    time: "16:10",
    comment: "Requested docs.",
    user: "Vivek Kumar",
    role: "Agent",
  },
];

const columns = [
  { key: "date", label: "Date" },
  { key: "time", label: "Time" },
  { key: "comment", label: "Comment" },
  { key: "user", label: "User Name" },
  { key: "role", label: "Role" },
];

function TableRow({ record }) {
  // record = comment object
  return (
    <tr className="border-b border-gray-700/50 hover:bg-gray-700/50 transition-colors even:bg-gray-800/50">
      <td className="py-3 px-4 text-gray-400 truncate">{record.date}</td>
      <td className="py-3 px-4 text-gray-400 truncate">{record.time}</td>
      <td className="py-3 px-4 text-gray-200 truncate">{record.comment}</td>
      <td className="py-3 px-4 text-gray-300 truncate">{record.user}</td>
      <td className="py-3 px-4 text-gray-400 truncate">{record.role}</td>
    </tr>
  );
}

export default function Comments({ bookingId = "", open = false, onClose }) {
  // You would fetch comments based on bookingId in a real app
  // For now, just filter by bookingId if needed
  const comments = useMemo(() => MOCK_COMMENTS, []);

  const columns = [
    { key: "date", label: "Date" },
    { key: "time", label: "Time" },
    { key: "comment", label: "Comment" },
    { key: "user", label: "User Name" },
    { key: "role", label: "Role" },
  ];

  return (
    <AsideTable
      open={open}
      onClose={onClose}
      title="Comments"
      columns={columns}
      data={comments}
      searchPlaceholder="Search comments..."
      emptyMessage="No comments found."
      pageSize={10}
    />
  );
}
