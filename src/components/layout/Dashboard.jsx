import { useState, useEffect } from "react";
import { StatsCard } from "../../features/dashboard/widgets/StatsCard";
import { TopPerformers } from "../../features/dashboard/widgets/TopPerformers";
import { Plane, Users, TrendingUp, AlertTriangle } from "lucide-react";
import { TimelineSelector } from "../common";
import { useAuth } from "../../auth/hooks/useAuth";
import { useHasRole } from "../../auth/hooks/useRole";
import {
	dashboardSummaryApi,
	topBottomAgentReportApi,
} from "../../api/dashboard/dashboardApi";
import { showPromiseToast } from "../../utils/showPromiseToast";

export default function AdminDashboard() {
	// Helper: format a Date to local YYYY-MM-DD (avoids UTC shift)
	const formatLocalDate = (d) => {
		const year = d.getFullYear();
		const month = String(d.getMonth() + 1).padStart(2, "0");
		const day = String(d.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

	const [dateRange, setDateRange] = useState({
		start: new Date(),
		end: new Date(),
	});
	const [summary, setSummary] = useState(null);
	const [topBottom, setTopBottom] = useState(null);
	const { user } = useAuth();
	const isAgent = useHasRole("agent");

	const fetchDashboardData = async (range) => {
		const payload = {
			dateFilter: "custom",
			startDate: formatLocalDate(range.start),
			endDate: formatLocalDate(range.end),
		};
		try {
			const [summaryRes, topBottomRes] = await showPromiseToast(
				Promise.all([
					dashboardSummaryApi(payload),
					topBottomAgentReportApi(payload),
				]),
				{
					loading: "Loading dashboard...",
					success: "Dashboard loaded!",
					error: "Failed to load dashboard",
				}
			);
			const summaryData = summaryRes;
			const topBottomData = topBottomRes;
			console.log("Dashboard Summary:", summaryData);
			console.log("Top/Bottom Agents:", topBottomData);
			setSummary(summaryData);
			setTopBottom(topBottomData);
		} catch (err) {
			setSummary(null);
			setTopBottom(null);
		}
	};

	useEffect(() => {
		fetchDashboardData(dateRange);
	}, [dateRange]);

	const handleDateRangeChange = (range) => {
		setDateRange(range);
	};

	return (
		<div className="max-w-7xl mx-auto">
			<div className="rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700 overflow-hidden mb-4">
				<div className="sticky top-0 z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-4 min-h-[72px] border-b border-gray-700 bg-gray-800/95 backdrop-blur-sm">
					<h3 className="text-xl font-semibold text-white">
						Dashboard Overview
					</h3>
					<TimelineSelector onRangeChange={handleDateRangeChange} />
				</div>

				<div className="p-4 space-y-3">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
						<StatsCard
							title="Total Bookings"
							value={summary ? summary.totalBooking : "-"}
							icon={Plane}
							color="blue"
						/>
						<StatsCard
							title="Active Agents"
							value={summary ? summary.totalActiveAgents : "-"}
							icon={Users}
							color="green"
						/>
						<StatsCard
							title="Revenue"
							value={summary ? summary.totalMcoAmount : "-"}
							icon={TrendingUp}
							color="purple"
						/>
						<StatsCard
							title="Chargeback + Refund"
							value={
								summary
									? Number(summary.totalChargebackAmount || 0) +
									  Number(summary.totalRefundAmount || 0)
									: "-"
							}
							icon={AlertTriangle}
							color="red"
						/>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
						<TopPerformers
							dateRange={dateRange}
							data={
								Array.isArray(topBottom?.top_agents)
									? topBottom.top_agents.map((agent) => ({
											id: agent.agentName,
											name: agent.agentName,
											revenue: agent.totalMCO,
											bookings: agent.totalBookings,
											badge: "Top Performer",
									  }))
									: []
							}
						/>
						{!isAgent && (
							<TopPerformers
								dateRange={dateRange}
								data={
									Array.isArray(topBottom?.bottom_agents)
										? topBottom.bottom_agents.map((agent) => ({
												id: agent.agentName,
												name: agent.agentName,
												revenue: agent.totalMCO,
												bookings: agent.totalBookings,
												badge: "Bottom Performer",
										  }))
										: []
								}
								showBottom={true}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
