import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	DollarSign,
	AlertTriangle,
	Search,
	RotateCcw,
	Filter,
	FileText,
	BarChart2,
} from "lucide-react";
import { StatsCard } from "../../features/dashboard/widgets/StatsCard";
import { TimelineSelector } from "../common";

function Revenue() {
	const navigate = useNavigate();
	const [dateRange, setDateRange] = useState({
		start: new Date(),
		end: new Date(),
	});

	const [filters, setFilters] = useState({
		agent: "",
		provider: "",
		includeRefund: true,
		includeChargeback: true,
		detailedReport: false,
	});

	const handleDateRangeChange = (range) => {
		setDateRange(range);
	};

	const handleFilterChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFilters((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSearch = (e) => {
		e.preventDefault();
		// Navigate to details page with search parameters
		navigate("/revenue/details", {
			state: {
				searchParams: {
					dateRange,
					filters,
				},
			},
			replace: true,
		});
	};

	// Sample data for dropdowns
	const agents = [
		{ id: 1, name: "Sarah Wilson" },
		{ id: 2, name: "Michael Chen" },
		{ id: 3, name: "Emma Rodriguez" },
	];

	const providers = [
		{ id: 1, name: "Air Fare" },
		{ id: 2, name: "Skyline" },
		{ id: 3, name: "Global Travel" },
	];

	return (
		<div className="max-w-7xl mx-auto space-y-6">
			{/* Quick Stats Section */}
			<div>
				<div className="flex items-center gap-2 mb-4">
					<BarChart2 className="w-5 h-5 text-blue-400" />
					<h2 className="text-xl font-semibold text-white">
						Quick Monthly Stats
					</h2>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
					<StatsCard
						title="Total Revenue"
						value="$1.2M"
						icon={DollarSign}
						trend="up"
						trendValue="+8.2%"
						color="blue"
					/>
					<StatsCard
						title="Chargeback"
						value="$4.2K"
						icon={AlertTriangle}
						color="red"
					/>
					<StatsCard
						title="Refund"
						value="$2.3K"
						icon={RotateCcw}
						color="orange"
					/>
					<StatsCard
						title="Net Revenue"
						value="$1.19M"
						icon={FileText}
						color="green"
					/>
				</div>
			</div>

			{/* Search Form Container */}
			<div className="rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700 overflow-hidden">
				<div className="p-6">
					<form onSubmit={handleSearch}>
						<div className="space-y-6">
							{/* Top Row: Date Range and Search Button */}
							<div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
								<div className="flex-1 space-y-2">
									<label className="block text-sm font-medium text-gray-400">
										Date Range
									</label>
									<TimelineSelector onRangeChange={handleDateRangeChange} />
								</div>
								<button
									type="submit"
									className="w-full md:w-auto px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
								>
									<Search className="w-4 h-4" />
									Search
								</button>
							</div>

							{/* Filters Section */}
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
								{/* Left Column: Agent */}
								<div className="space-y-2">
									<label className="block text-sm font-medium text-gray-400">
										Agent
									</label>
									<select
										name="agent"
										value={filters.agent}
										onChange={handleFilterChange}
										className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
									>
										<option value="">All Agents</option>
										{agents.map((agent) => (
											<option key={agent.id} value={agent.id}>
												{agent.name}
											</option>
										))}
									</select>
								</div>

								{/* Middle Column: Provider */}
								<div className="space-y-2">
									<label className="block text-sm font-medium text-gray-400">
										Provider
									</label>
									<select
										name="provider"
										value={filters.provider}
										onChange={handleFilterChange}
										className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
									>
										<option value="">All Providers</option>
										{providers.map((provider) => (
											<option key={provider.id} value={provider.id}>
												{provider.name}
											</option>
										))}
									</select>
								</div>

								{/* Right Column: Report Type */}
								<div className="space-y-2">
									<label className="block text-sm font-medium text-gray-400">
										Report Type
									</label>
									<div className="bg-gray-700/50 p-3 rounded-lg">
										<label className="flex items-center gap-2 text-sm text-gray-300">
											<input
												type="checkbox"
												name="detailedReport"
												checked={filters.detailedReport}
												onChange={handleFilterChange}
												className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
											/>
											Show Detailed Report
										</label>
									</div>
								</div>
							</div>

							{/* Filters Row */}
							<div className="space-y-2">
								<label className="block text-sm font-medium text-gray-400">
									Filters
								</label>
								<div className="flex gap-6 bg-gray-700/50 p-3 rounded-lg">
									<label className="flex items-center gap-2 text-sm text-gray-300">
										<input
											type="checkbox"
											name="includeRefund"
											checked={filters.includeRefund}
											onChange={handleFilterChange}
											className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
										/>
										Refund
									</label>
									<label className="flex items-center gap-2 text-sm text-gray-300">
										<input
											type="checkbox"
											name="includeChargeback"
											checked={filters.includeChargeback}
											onChange={handleFilterChange}
											className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
										/>
										Chargeback
									</label>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Revenue;
