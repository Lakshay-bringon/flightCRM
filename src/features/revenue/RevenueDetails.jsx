import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
	ArrowLeft,
	Download,
	DollarSign,
	AlertTriangle,
	ChevronDown,
	ChevronUp,
	FileText,
} from "lucide-react";
import { currencyFormatter } from "../../utils/formatters";

function BookingDetailRow({ data }) {
	const navigate = useNavigate();

	const handleRowClick = () => {
		navigate(`/revenue/details/${data.bid}`);
	};

	return (
		<tr
			onClick={handleRowClick}
			className="border-b border-gray-700/50 hover:bg-gray-700/50 cursor-pointer transition-colors even:bg-gray-800/50"
		>
			<td
				style={{ width: "15%", textAlign: "center" }}
				className="py-3 px-4 text-white truncate"
			>
				{data.bid}
			</td>
			<td
				style={{ width: "15%", textAlign: "center" }}
				className="py-3 px-4 text-green-400 truncate"
			>
				{currencyFormatter.format(data.mco || data.amount)}
			</td>
			<td
				style={{ width: "15%", textAlign: "center" }}
				className="py-3 px-4 text-orange-400 truncate"
			>
				{currencyFormatter.format(data.refund || 0)}
			</td>
			<td
				style={{ width: "15%", textAlign: "center" }}
				className="py-3 px-4 text-red-400 truncate"
			>
				{currencyFormatter.format(data.chargeback || 0)}
			</td>
			<td
				style={{ width: "20%", textAlign: "center" }}
				className="py-3 px-4 text-gray-300 truncate"
			>
				{data.created_at}
			</td>
			<td
				style={{ width: "20%", textAlign: "center" }}
				className="py-3 px-4 text-gray-300 truncate"
			>
				{data.userName}
			</td>
		</tr>
	);
}

function RevenueDetails() {
	const navigate = useNavigate();
	const location = useLocation();
	const searchParams = location.state?.searchParams || {};
	const apiData = location.state?.results || [];

	// If API returned an array, use it. If it's an object with a list, use that list.
	const details = Array.isArray(apiData) ? apiData : apiData?.list || [];

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
		const sorted = [...details];
		sorted.sort((a, b) => {
			let aVal = a[sortBy];
			let bVal = b[sortBy];
			if (sortBy === "amount" || sortBy === "mco") {
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
	const totalPages = Math.ceil(details.length / itemsPerPage);
	const sortedDetails = getSortedDetails();
	const paginatedDetails = sortedDetails.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const handleRowsPerPageChange = (newValue) => {
		setItemsPerPage(Number(newValue));
		setCurrentPage(1);
	};

	function SortIcon({ active, dir }) {
		if (!active) return <span className="inline-block w-3" />;
		return dir === "asc" ? (
			<ChevronUp className="inline w-3 h-3 ml-1" />
		) : (
			<ChevronDown className="inline w-3 h-3 ml-1" />
		);
	}

	return (
		<div className="max-w-7xl mx-auto flex flex-col h-[calc(100vh-4rem)]">
			<div className="rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700 overflow-hidden flex flex-col flex-1">
				{/* Header */}
				<div className="flex items-center justify-between p-4 border-b border-gray-700 gap-2 bg-gray-800/80">
					<div className="flex items-center gap-3">
						<button
							onClick={() => navigate("/revenue")}
							className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors px-2 py-1 rounded-md"
						>
							<ArrowLeft className="w-5 h-5" />
						</button>
						<h2 className="text-lg font-semibold text-white">
							Revenue Details
						</h2>
					</div>
					<button
						onClick={() => {
							// Export logic
							const headers = [
								"Booking ID",
								"MCO",
								"Refund",
								"Chargeback",
								"Date",
								"Agent",
							];
							const csvContent = [
								headers.join(","),
								...details.map((row) =>
									[
										row.bookingId,
										currencyFormatter
											.format(row.mco || row.amount)
											.replace(/,/g, ""),
										currencyFormatter.format(row.refund || 0).replace(/,/g, ""),
										currencyFormatter
											.format(row.chargeback || 0)
											.replace(/,/g, ""),
										row.date,
										`"${row.agent || "-"}"`,
									].join(",")
								),
							].join("\n");
							const blob = new Blob([csvContent], {
								type: "text/csv;charset=utf-8;",
							});
							const link = document.createElement("a");
							const fileName = `revenue_details_export.csv`;
							link.href = URL.createObjectURL(blob);
							link.download = fileName;
							document.body.appendChild(link);
							link.click();
							document.body.removeChild(link);
						}}
						className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-2 text-sm"
					>
						<Download className="w-4 h-4" />
						Export Data
					</button>
				</div>

				{/* Summary Bar */}
				<div className="px-4 py-3 border-b border-gray-700 bg-gray-800/40 grid grid-cols-4 gap-4">
					<div className="flex items-center gap-2">
						<DollarSign className="w-5 h-5 text-blue-400" />
						<div>
							<div className="text-xs text-gray-400">Total Revenue</div>
							<div className="text-sm font-medium text-blue-400">
								{currencyFormatter.format(
									details.reduce(
										(sum, r) => sum + (Number(r.mco || r.amount) || 0),
										0
									)
								)}
							</div>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<FileText className="w-5 h-5 text-green-400" />
						<div>
							<div className="text-xs text-gray-400">Total Bookings</div>
							<div className="text-sm font-medium text-green-400">
								{sortedDetails.length}
							</div>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<DollarSign className="w-5 h-5 text-purple-400" />
						<div>
							<div className="text-xs text-gray-400">Avg. Booking Value</div>
							<div className="text-sm font-medium text-purple-400">
								{currencyFormatter.format(
									details.length > 0
										? details.reduce(
												(sum, r) => sum + (Number(r.mco || r.amount) || 0),
												0
										  ) / details.length
										: 0
								)}
							</div>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<AlertTriangle className="w-5 h-5 text-red-400" />
						<div>
							<div className="text-xs text-gray-400">Refunds + Chargebacks</div>
							<div className="text-sm font-medium text-red-400">
								{/* Placeholder, update if you have this info in API */}-
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
												<th
													style={{ width: "15%" }}
													className="pb-3 px-4 font-medium cursor-pointer select-none text-center"
													onClick={() => handleSort("bid")}
												>
													Booking ID{" "}
													<SortIcon active={sortBy === "bid"} dir={sortDir} />
												</th>
												<th
													style={{ width: "15%" }}
													className="pb-3 px-4 font-medium cursor-pointer select-none text-center"
													onClick={() => handleSort("mco")}
												>
													MCO{" "}
													<SortIcon active={sortBy === "mco"} dir={sortDir} />
												</th>
												<th
													style={{ width: "15%" }}
													className="pb-3 px-4 font-medium cursor-pointer select-none text-center"
													onClick={() => handleSort("refund")}
												>
													Refund{" "}
													<SortIcon
														active={sortBy === "refund"}
														dir={sortDir}
													/>
												</th>
												<th
													style={{ width: "15%" }}
													className="pb-3 px-4 font-medium cursor-pointer select-none text-center"
													onClick={() => handleSort("chargeback")}
												>
													Chargeback{" "}
													<SortIcon
														active={sortBy === "chargeback"}
														dir={sortDir}
													/>
												</th>
												<th
													style={{ width: "20%" }}
													className="pb-3 px-4 font-medium cursor-pointer select-none text-center"
													onClick={() => handleSort("created_at")}
												>
													Date{" "}
													<SortIcon
														active={sortBy === "created_at"}
														dir={sortDir}
													/>
												</th>
												<th
													style={{ width: "20%" }}
													className="pb-3 px-4 font-medium cursor-pointer select-none text-center"
													onClick={() => handleSort("userName")}
												>
													Agent{" "}
													<SortIcon
														active={sortBy === "userName"}
														dir={sortDir}
													/>
												</th>
											</tr>
										</thead>
									</table>
								</div>
								<div className="flex-1 overflow-y-auto min-h-0">
									<table className="w-full">
										<tbody className="text-sm">
											{paginatedDetails.map((row, idx) => (
												<BookingDetailRow key={row.id || idx} data={row} />
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
										Showing{" "}
										{sortedDetails.length === 0
											? 0
											: (currentPage - 1) * itemsPerPage + 1}{" "}
										to{" "}
										{Math.min(currentPage * itemsPerPage, sortedDetails.length)}{" "}
										of {sortedDetails.length} records
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
												{Array.from(
													{ length: totalPages },
													(_, i) => i + 1
												).map((p) => (
													<button
														key={p}
														onClick={() => setCurrentPage(p)}
														className={`w-8 h-8 text-sm rounded-lg ${
															currentPage === p
																? "bg-blue-500 text-white"
																: "bg-gray-700 text-gray-300 hover:bg-gray-600"
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
											<span className="text-gray-400 text-sm">
												Rows per page:
											</span>
											<select
												value={itemsPerPage}
												onChange={(e) =>
													handleRowsPerPageChange(e.target.value)
												}
												className="bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm border border-gray-600 focus:outline-none focus:border-blue-500"
											>
												{[5, 10, 20, 50].map((value) => (
													<option key={value} value={value}>
														{value}
													</option>
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
