import React, { useEffect, useState } from "react";
import { Globe, Shield, Plus, X } from "lucide-react";
import { showPromiseToast } from "../utils/showPromiseToast";
import {
	addIpApi,
	updateIpApi,
	getIpListApi,
	toggleIpStatusApi,
	getIpInfoApi,
} from "../api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function IPSetting() {
	const [ipList, setIpList] = useState([]);
	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState("all");
	const [ipProtectionActive, setIpProtectionActive] = useState(true);
	const [showDeactivateTooltip, setShowDeactivateTooltip] = useState(false);
	const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);
	const [form, setForm] = useState({
		ip: "",
		allowed_status: "allowed",
		description: "",
	});
	const [editingId, setEditingId] = useState(null);
	const [ipInfo, setIpInfo] = useState({
		active_ip: 0,
		blocked_ip: 0,
		last_update: null,
	});

	// Normalize API data for UI
	const normalizeIp = (ipObj) => ({
		id: ipObj.id,
		ip: ipObj.ip || ipObj.ip_address || "",
		allowed_status:
			ipObj.allowed_status === "1" || ipObj.allowed_status === 1
				? "allowed"
				: ipObj.allowed_status === "0" || ipObj.allowed_status === 0
				? "blocked"
				: ipObj.allowed_status === "allowed" ||
				  ipObj.allowed_status === "blocked"
				? ipObj.allowed_status
				: ipObj.status === "1" || ipObj.status === 1
				? "allowed"
				: ipObj.status === "0" || ipObj.status === 0
				? "blocked"
				: "blocked",
		description: ipObj.description || ipObj.desc || "",
		status: ipObj.status,
		datetime: ipObj.datetime,
	});

	// Map UI form state to API payload
	const formToApi = (form, editingId) => ({
		id: editingId,
		ip: form.ip,
		allowed_status: form.allowed_status === "allowed" ? 1 : 0, // 1: allowed, 2: blocked
		description: form.description,
	});

	// Utility to refresh both IP list and IP info
	const refreshData = async () => {
		const [list, info] = await Promise.all([
			getIpListApi().catch(() => []),
			getIpInfoApi().catch(() => ({})),
		]);
		setIpList(Array.isArray(list) ? list.map(normalizeIp) : []);
		if (info && typeof info === "object") setIpInfo(info);
	};

	// Fetch IP list and IP info on mount
	useEffect(() => {
		showPromiseToast(getIpListApi(), {
			loading: "Loading IP list...",
			success: "IP list loaded!",
			error: "Failed to load IP list",
		})
			.then((data) =>
				setIpList(Array.isArray(data) ? data.map(normalizeIp) : [])
			)
			.catch(() => {});
		// Fetch IP info
		getIpInfoApi()
			.then((res) => {
				if (res && typeof res === "object") setIpInfo(res);
			})
			.catch(() => {});
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleAddOrUpdate = async (e) => {
		e.preventDefault();
		const apiPayload = formToApi(form, editingId);
		if (editingId) {
			await showPromiseToast(updateIpApi(apiPayload), {
				loading: "Updating IP...",
				success: "IP updated!",
				error: "Failed to update IP",
			});
		} else {
			await showPromiseToast(addIpApi(apiPayload), {
				loading: "Adding IP...",
				success: "IP added!",
				error: "Failed to add IP",
			});
		}
		await refreshData();
		setForm({ ip: "", allowed_status: "allowed", description: "" });
		setEditingId(null);
	};

	const handleEdit = (ipObj) => {
		setForm({
			ip: ipObj.ip,
			allowed_status: ipObj.allowed_status,
			description: ipObj.description,
		});
		setEditingId(ipObj.id);
	};

	const handleDelete = async (ipObj) => {
		// Implement delete API if available
	};

	const handleToggleStatus = async (ipObj) => {
		await showPromiseToast(toggleIpStatusApi(ipObj.id), {
			loading: "Toggling status...",
			success: "Status updated!",
			error: "Failed to update status",
		});
		await refreshData();
	};

	const filteredIPs = ipList.filter((ipObj) => {
		const ipStr = ipObj.ip || "";
		const descStr = ipObj.description || "";
		const matchesSearch =
			ipStr.toLowerCase().includes(search.toLowerCase()) ||
			descStr.toLowerCase().includes(search.toLowerCase());
		const matchesFilter =
			filter === "all" ||
			(filter === "allowed" && ipObj.allowed_status === "allowed") ||
			(filter === "blocked" && ipObj.allowed_status === "blocked");
		return matchesSearch && matchesFilter;
	});

	return (
		<div className="max-w-7xl mx-auto">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				{/* IP Configuration Form */}
				<div className="lg:col-span-2">
					<div className="rounded-lg bg-gray-800 bg-opacity-60 backdrop-blur-lg border border-gray-700">
						<div className="p-4 border-b border-gray-700">
							<h3 className="text-base font-semibold text-white">
								Add IP Address
							</h3>
						</div>
						<div className="p-4">
							<form onSubmit={handleAddOrUpdate}>
								<div className="space-y-4">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-xs font-medium text-gray-400 mb-1">
												IP Address
											</label>
											<input
												type="text"
												name="ip"
												value={form.ip}
												onChange={handleInputChange}
												placeholder="IPv4 or IPv6 address"
												pattern="^(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3}|([a-fA-F0-9:]+))$"
												className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none text-xs"
												required
											/>
										</div>
										<div>
											<label className="block text-xs font-medium text-gray-400 mb-1">
												Access
											</label>
											<select
												name="allowed_status"
												value={form.allowed_status}
												onChange={handleInputChange}
												className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none text-xs"
											>
												<option value="allowed">Allow</option>
												<option value="blocked">Block</option>
											</select>
										</div>
									</div>
									<div>
										<label className="block text-xs font-medium text-gray-400 mb-1">
											Description
										</label>
										<input
											type="text"
											name="description"
											value={form.description}
											onChange={handleInputChange}
											placeholder="Office Network"
											className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none text-xs"
										/>
									</div>
									<div className="flex gap-2">
										<button
											type="submit"
											className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center text-xs"
										>
											<Plus className="w-4 h-4 mr-1" />
											{editingId ? "Update IP Address" : "Add IP Address"}
										</button>
										<button
											type="button"
											onClick={() => {
												setForm({
													ip: "",
													allowed_status: "allowed",
													description: "",
												});
												setEditingId(null);
											}}
											className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-all duration-200 text-xs"
										>
											Clear
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>

				{/* Security Status */}
				<div>
					<div className="rounded-lg bg-gray-800 bg-opacity-60 backdrop-blur-lg border border-gray-700">
						<div className="flex items-center justify-between p-4 border-b border-gray-700">
							<h3 className="text-base font-semibold text-white">
								Security Status
							</h3>
							<div className="relative">
								<button
									className={`px-3 py-1 rounded-lg flex items-center gap-2 text-xs font-semibold transition-all duration-200 ${
										ipProtectionActive
											? "bg-green-500/20 text-green-400 hover:bg-green-500/40"
											: "bg-red-500/20 text-red-400 hover:bg-red-500/40"
									}`}
									onClick={() => {
										if (ipProtectionActive) {
											setShowDeactivateTooltip(false);
											setShowDeactivateConfirm(true);
										} else {
											setIpProtectionActive(true);
										}
									}}
									onMouseEnter={() =>
										ipProtectionActive && setShowDeactivateTooltip(true)
									}
									onMouseLeave={() => setShowDeactivateTooltip(false)}
								>
									<Shield className="w-4 h-4" />
									{ipProtectionActive
										? "IP Protection Active"
										: "IP Protection Deactivated"}
								</button>
								{ipProtectionActive && showDeactivateTooltip && (
									<div className="absolute right-0 top-full mt-1 px-3 py-1 bg-gray-900 text-xs text-gray-200 rounded shadow-lg border border-gray-700 z-10 whitespace-nowrap">
										Deactivate
									</div>
								)}
							</div>
						</div>
						<div className="p-4 space-y-2">
							<div className="flex items-center justify-between text-xs">
								<span className="text-gray-400">Allowed IPs</span>
								<span className="text-white">{ipInfo.active_ip}</span>
							</div>
							<div className="flex items-center justify-between text-xs">
								<span className="text-gray-400">Blocked IPs</span>
								<span className="text-white">{ipInfo.blocked_ip}</span>
							</div>
							<div className="flex items-center justify-between text-xs">
								<span className="text-gray-400">Last Updated</span>
								<span className="text-white">
									{ipInfo.last_update
										? `${dayjs(ipInfo.last_update).format(
												"MMM D, YYYY [at] h:mm A"
										  )} (${dayjs(ipInfo.last_update).fromNow()})`
										: "N/A"}
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* IP List */}
				<div className="lg:col-span-3">
					<div className="rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700 overflow-hidden">
						<div className="p-6 border-b border-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
							<h3 className="text-xl font-semibold text-white">
								IP Access List
							</h3>
							<div className="flex gap-2 items-center w-full md:w-auto">
								<input
									type="text"
									placeholder="Search IP..."
									className="px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-xs focus:outline-none focus:border-blue-500 w-full md:w-48"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
								<button
									className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
										filter === "all"
											? "bg-blue-500/20 text-blue-400"
											: "bg-gray-700 text-gray-300"
									}`}
									onClick={() => setFilter("all")}
								>
									All
								</button>
								<button
									className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
										filter === "allowed"
											? "bg-green-500/20 text-green-400"
											: "bg-gray-700 text-gray-300"
									}`}
									onClick={() => setFilter("allowed")}
								>
									Allowed
								</button>
								<button
									className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
										filter === "blocked"
											? "bg-red-500/20 text-red-400"
											: "bg-gray-700 text-gray-300"
									}`}
									onClick={() => setFilter("blocked")}
								>
									Blocked
								</button>
							</div>
						</div>
						<div className="divide-y divide-gray-700">
							{filteredIPs.length === 0 ? (
								<div className="p-4 text-center text-gray-400 text-xs">
									No IPs found.
								</div>
							) : (
								filteredIPs.map((ipObj, idx) => (
									<div
										key={ipObj.id || ipObj.ip + idx}
										className="p-4 hover:bg-gray-700/50 transition-all duration-200"
									>
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-4">
												<Globe className="w-5 h-5 text-blue-400" />
												<div>
													<h4 className="text-white font-medium text-xs">
														{ipObj.ip}
													</h4>
													<p className="text-xs text-gray-400">
														{ipObj.description}
													</p>
												</div>
											</div>
											<div className="flex items-center space-x-2">
												<button
													className={`px-2 py-0.5 text-xs rounded-full font-semibold transition-all duration-200 focus:outline-none ${
														ipObj.allowed_status === "allowed"
															? "bg-green-500/20 text-green-400 hover:bg-green-500/40"
															: "bg-red-500/20 text-red-400 hover:bg-red-500/40"
													}`}
													onClick={() => handleToggleStatus(ipObj)}
												>
													{ipObj.allowed_status === "allowed"
														? "Allowed"
														: "Blocked"}
												</button>
												<button
													className="p-1 text-blue-400 hover:bg-blue-400/20 rounded-lg transition-all duration-200"
													onClick={() => handleEdit(ipObj)}
												>
													Edit
												</button>
												{/* <button className="p-1 text-red-400 hover:bg-red-400/20 rounded-lg transition-all duration-200">
                          <X className="w-4 h-4" />
                        </button> */}
											</div>
										</div>
									</div>
								))
							)}
						</div>
					</div>
				</div>
			</div>
			{showDeactivateConfirm && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					<div
						className="fixed inset-0 bg-transparent backdrop-blur-[2px]"
						onClick={() => setShowDeactivateConfirm(false)}
					></div>
					<div className="relative bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-sm mx-2 p-6 z-10 flex flex-col items-center">
						<button
							className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-2xl font-bold"
							onClick={() => setShowDeactivateConfirm(false)}
							aria-label="Close"
						>
							&times;
						</button>
						<h2 className="text-lg font-bold text-white mb-2 text-center">
							Deactivate IP Protection?
						</h2>
						<p className="text-gray-300 text-center mb-4">
							If you deactivate IP protection, this CRM can be accessed from
							anywhere. Are you sure you want to proceed?
						</p>
						<div className="flex gap-4 w-full mt-2">
							<button
								className="flex-1 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 font-semibold text-sm"
								onClick={() => setShowDeactivateConfirm(false)}
							>
								Cancel
							</button>
							<button
								className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-semibold text-sm"
								onClick={() => {
									setIpProtectionActive(false);
									setShowDeactivateConfirm(false);
								}}
							>
								Deactivate
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default IPSetting;
