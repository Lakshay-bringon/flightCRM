import React, { useState } from "react";
import { Globe, Shield, Plus, X } from "lucide-react";

function IPSetting() {
	// Demo IP data
	const [ipList, setIpList] = useState([
		{ ip: "192.168.1.1", desc: "Office Network 1", status: "allowed" },
		{ ip: "192.168.1.2", desc: "Office Network 2", status: "allowed" },
		{ ip: "10.0.0.1", desc: "VPN Gateway", status: "blocked" },
		{
			ip: "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
			desc: "IPv6 Blocked",
			status: "blocked",
		},
		{ ip: "172.16.0.1", desc: "Branch Office", status: "allowed" },
	]);
	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState("all"); // all | allowed | blocked
	const [ipProtectionActive, setIpProtectionActive] = useState(true);
	const [showDeactivateTooltip, setShowDeactivateTooltip] = useState(false);
	const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);

	const handleToggleStatus = (ip) => {
		setIpList((list) =>
			list.map((item) =>
				item.ip === ip
					? {
							...item,
							status: item.status === "allowed" ? "blocked" : "allowed",
					  }
					: item
			)
		);
	};

	const filteredIPs = ipList.filter((ipObj) => {
		const matchesSearch =
			ipObj.ip.toLowerCase().includes(search.toLowerCase()) ||
			ipObj.desc.toLowerCase().includes(search.toLowerCase());
		const matchesFilter = filter === "all" || ipObj.status === filter;
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
							<div className="space-y-4">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="block text-xs font-medium text-gray-400 mb-1">
											IP Address
										</label>
										<input
											type="text"
											placeholder="IPv4 or IPv6 address"
											pattern="^(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3}|([a-fA-F0-9:]+))$"
											className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none text-xs"
										/>
									</div>
									<div>
										<label className="block text-xs font-medium text-gray-400 mb-1">
											Access
										</label>
										<select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none text-xs">
											<option value="full">Allow</option>
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
										placeholder="Office Network"
										className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none text-xs"
									/>
								</div>
								<div className="flex gap-2">
									<button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center text-xs">
										<Plus className="w-4 h-4 mr-1" />
										Add IP Address
									</button>
									<button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-all duration-200 text-xs">
										Clear
									</button>
								</div>
							</div>
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
								<span className="text-gray-400">Total IPs Allowed</span>
								<span className="text-white">12</span>
							</div>
							<div className="flex items-center justify-between text-xs">
								<span className="text-gray-400">Blocked IPs</span>
								<span className="text-white">3</span>
							</div>
							<div className="flex items-center justify-between text-xs">
								<span className="text-gray-400">Last Updated</span>
								<span className="text-white">2 hours ago</span>
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
										key={ipObj.ip + idx}
										className="p-4 hover:bg-gray-700/50 transition-all duration-200"
									>
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-4">
												<Globe className="w-5 h-5 text-blue-400" />
												<div>
													<h4 className="text-white font-medium text-xs">
														{ipObj.ip}
													</h4>
													<p className="text-xs text-gray-400">{ipObj.desc}</p>
												</div>
											</div>
											<div className="flex items-center space-x-2">
												<button
													className={`px-2 py-0.5 text-xs rounded-full font-semibold transition-all duration-200 focus:outline-none ${
														ipObj.status === "allowed"
															? "bg-green-500/20 text-green-400 hover:bg-green-500/40"
															: "bg-red-500/20 text-red-400 hover:bg-red-500/40"
													}`}
													onClick={() => handleToggleStatus(ipObj.ip)}
												>
													{ipObj.status === "allowed" ? "Allowed" : "Blocked"}
												</button>
												<button className="p-1 text-red-400 hover:bg-red-400/20 rounded-lg transition-all duration-200">
													<X className="w-4 h-4" />
												</button>
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
