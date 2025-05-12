import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  FileText,
  DollarSign,
  AlertTriangle,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { currencyFormatter } from "../../utils/formatters";

function BookingDetailRow({ data }) {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/details/booking/${data.bookingId}`,                                                                                                                                     {
      state: { returnPath: '/revenue/details' }
    });
  };

  return (
    <tr 
      onClick={handleRowClick}
      className="border-b border-gray-700/50 hover:bg-gray-700/50 cursor-pointer transition-colors even:bg-gray-800/50"
    >
      <td style={{width: "15%"}} className="py-3 px-4 text-white truncate">{data.bookingId}</td>
      <td style={{width: "15%"}} className="py-3 px-4 text-red-400 truncate">
        {currencyFormatter.format(data.mco)}
      </td>
      <td style={{width: "15%"}} className="py-3 px-4 text-gray-300 truncate">{data.date}</td>
      <td style={{width: "25%"}} className="py-3 px-4 text-gray-300 truncate">{data.reason}</td>
      <td style={{width: "15%"}} className="py-3 px-4">
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            data.status === "Processed"
              ? "bg-green-500/20 text-green-400"
              : data.status === "Pending"
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {data.status}
        </span>
      </td>
      <td style={{width: "15%"}} className="py-3 px-4 text-gray-300 truncate">{data.agent || "-"}</td>
    </tr>
  );
}

function RevenueDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = location.state?.searchParams || {};

  // Sample data - replace with actual API call
  const revenueData = {
    totalRevenue: 1250000,
    totalBookings: 145,
    averageBookingValue: 8620,
    revenueDetails: 
      [{
        id: 1,
        bookingId: "BK001",
        mco: 2500,
        date: "2024-03-15",
        reason: "Customer Cancellation",
        status: "Processed",
        agent: "Sarah Wilson",
      },
      {
        id: 2,
        bookingId: "BK002",
        mco: 1800,
        date: "2024-03-14",
        reason: "Service Issue",
        status: "Pending",
        agent: "John Doe",
      },
      {
        id: 3,
        bookingId: "BK004",
        mco: 3200,
        date: "2024-03-13",
        reason: "Flight Schedule Change",
        status: "Processed",
        agent: "Mike Johnson",
      },
      {
        id: 4,
        bookingId: "BK005",
        mco: 4500,
        date: "2024-03-12",
        reason: "Medical Emergency",
        status: "Processed",
        agent: "Emily Brown",
      },
      {
        id: 5,
        bookingId: "BK006",
        mco: 2800,
        date: "2024-03-11",
        reason: "Duplicate Booking",
        status: "Pending",
        agent: "Alex Turner",
      },
      {
        id: 6,
        bookingId: "BK005",
        mco: 4500,
        date: "2024-03-12",
        reason: "Medical Emergency",
        status: "Processed",
        agent: "Emily Brown",
      },
      {
        id: 7,
        bookingId: "BK006",
        mco: 2800,
        date: "2024-03-11",
        reason: "Duplicate Booking",
        status: "Pending",
        agent: "Alex Turner",
      },
    
      {
        id: 8,
        bookingId: "BK003",
        mco: 4200,
        date: "2024-03-13",
        reason: "Dispute",
        status: "Under Review",
        agent: "Jane Smith",
      },
      {
        id: 9,
        bookingId: "BK007",
        mco: 3800,
        date: "2024-03-10",
        reason: "Unauthorized Transaction",
        status: "Under Review",
        agent: "David Wilson",
      }]
   
  };

  // Combine refunds and chargebacks
  const allDetails = [
    ...revenueData.revenueDetails
  ];

  // Sorting state
  const [sortBy, setSortBy] = useState("date");
  const [sortDir, setSortDir] = useState("desc");

  function handleSort(col) {
    if (sortBy === col) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(col);
      setSortDir("asc");
    }
  }

  function getSortedDetails() {
    const sorted = [...allDetails];
    sorted.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      if (sortBy === "mco") {
        aVal = Number(aVal);
        bVal = Number(bVal);
      }
      if (sortBy === "date") {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }
      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const totalPages = Math.ceil(allDetails.length / itemsPerPage);
  const sortedDetails = getSortedDetails();
  const paginatedDetails = sortedDetails.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle rows per page change
  const handleRowsPerPageChange = (newValue) => {
    setItemsPerPage(Number(newValue));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  function SortIcon({ active, dir }) {
    if (!active) return <span className="inline-block w-3" />;
    return dir === "asc" ? (
      <ChevronUp className="inline w-3 h-3 ml-1" />
    ) : (
      <ChevronDown className="inline w-3 h-3 ml-1" />
    );
  }

  const handleExportClick = () => {
    // Get date range from the first and last entry
    const sortedByDate = [...allDetails].sort((a, b) => new Date(a.date) - new Date(b.date));
    const startDate = new Date(sortedByDate[0]?.date);
    const endDate = new Date(sortedByDate[sortedByDate.length - 1]?.date);
    
    // Format dates for filename
    const formatDateForFile = (date) => {
      return date.toISOString().split('T')[0];
    };
    
    // Create CSV content
    const headers = ['Booking ID', 'MCO', 'Date', 'Reason', 'Status', 'Agent'];
    const csvContent = [
      headers.join(','),
      ...allDetails.map(row => [
        row.bookingId,
        currencyFormatter.format(row.mco).replace(/,/g, ''),
        row.date,
        `"${row.reason}"`, // Wrap in quotes to handle commas in reason
        row.status,
        `"${row.agent || '-'}"` // Wrap in quotes to handle commas in agent names
      ].join(','))
    ].join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const fileName = `revenue_details_${formatDateForFile(startDate)}_to_${formatDateForFile(endDate)}.csv`;
    
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, fileName);
    } else {
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="h-screen max-w-7xl mx-auto flex flex-col">
      <div className="flex-1 rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/revenue")}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <h2 className="text-xl font-semibold text-white">
                Revenue Details
              </h2>
            </div>
            <button 
              onClick={handleExportClick}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Summary Bar */}
        <div className="flex-shrink-0 px-4 py-3 border-b border-gray-700 bg-gray-800/40">
          <div className="grid grid-cols-4 gap-4">
            <div className="flex items-center justify-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-xs text-gray-400">Total Revenue</div>
                <div className="text-sm font-medium text-blue-400">
                  {currencyFormatter.format(revenueData.totalRevenue)}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FileText className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-xs text-gray-400">Total Bookings</div>
                <div className="text-sm font-medium text-green-400">
                  {revenueData.totalBookings}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <DollarSign className="w-5 h-5 text-purple-400" />
              <div>
                <div className="text-xs text-gray-400">Avg. Booking Value</div>
                <div className="text-sm font-medium text-purple-400">
                  {currencyFormatter.format(revenueData.averageBookingValue)}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <div>
                <div className="text-xs text-gray-400">Refunds + Chargebacks</div>
                <div className="text-sm font-medium text-red-400">
                  {currencyFormatter.format(
                    allDetails.reduce((sum, r) => sum + r.mco, 0)
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 flex flex-col overflow-hidden">
          {/* Details Record Table */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-hidden">
              <div className="w-full h-full flex flex-col">
                <div className="flex-shrink-0">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-400 border-b border-gray-700">
                        <th style={{width: "15%"}} className="pb-3 px-4 font-medium cursor-pointer select-none" onClick={() => handleSort("bookingId")}>
                          Booking ID <SortIcon active={sortBy === "bookingId"} dir={sortDir} />
                        </th>
                        <th style={{width: "15%"}} className="pb-3 px-4 font-medium cursor-pointer select-none" onClick={() => handleSort("amount")}>
                          MCO <SortIcon active={sortBy === "amount"} dir={sortDir} />
                        </th>
                        <th style={{width: "15%"}} className="pb-3 px-4 font-medium cursor-pointer select-none" onClick={() => handleSort("date")}>
                          Date <SortIcon active={sortBy === "date"} dir={sortDir} />
                        </th>
                        <th style={{width: "25%"}} className="pb-3 px-4 font-medium">Reason</th>
                        <th style={{width: "15%"}} className="pb-3 px-4 font-medium">Status</th>
                        <th style={{width: "15%"}} className="pb-3 px-4 font-medium">Agent</th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <table className="w-full">
                    <tbody className="text-sm">
                      {paginatedDetails.map((detail) => (
                        <BookingDetailRow
                          key={detail.id + detail.bookingId}
                          data={detail}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Pagination Section */}
            <div className="flex-shrink-0">
              {totalPages > 0 && (
                <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 py-3 border-t border-gray-700 bg-gray-800/60 gap-2">
                  <div className="text-sm text-gray-400 mb-2 md:mb-0">
                    Showing {sortedDetails.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedDetails.length)} of {sortedDetails.length} records
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 text-sm rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                          <button
                            key={p}
                            onClick={() => setCurrentPage(p)}
                            className={`w-8 h-8 text-sm rounded-lg ${
                              currentPage === p
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 text-sm rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                    {/* Rows per page selector */}
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm">Rows per page:</span>
                      <select
                        value={itemsPerPage}
                        onChange={(e) => handleRowsPerPageChange(e.target.value)}
                        className="bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm border border-gray-600 focus:outline-none focus:border-blue-500"
                      >
                        {[5, 10, 20, 50].map(value => (
                          <option key={value} value={value}>{value}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevenueDetails;
