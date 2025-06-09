import React, { useState, useEffect, useCallback } from "react";
import Section from "../Section";
import { useEditingContext } from "../context/EditingContext";
import {
	formatSafeDate,
	formatLocalDateString,
} from "../../../utils/formatters";
import { CHARGING_STATUS } from "../../../constants";

const SECTION_ID = "charging-details";

const ChargingDetailsSection = React.memo(({ apiData, onSave }) => {
	const { startEditing, stopEditing } = useEditingContext();

	const [chargingDetails, setChargingDetails] = useState([
		{
			type: "MCO",
			amount: "0.00",
			status: 0,
			chargedOn: "",
			chargedBy: "",
			merchantName: "",
			refundedOn: "",
			transactionId: "",
		},
	]);

	// Update state when booking data is loaded
	useEffect(() => {
		if (apiData) {
			setChargingDetails([
				{
					type: apiData.chargingDetailsType || "MCO",
					amount:
						apiData.chargingDetailsAmount ||
						apiData.bookingData?.amount ||
						"0.00",
					status: apiData.chargingDetailsStatus,
					chargedOn: apiData.chargingDetailsChargedOn || "",
					chargedBy: apiData.chargingDetailsChargeby || "",
					merchantName: apiData.chargingDetailsMerchantName || "",
					refundedOn: apiData.refundDetailsRefundOn || "",
					transactionId: apiData.chargingDetailsTransactionId || "",
				},
			]);
		}
	}, [apiData]);

	const handleSave = useCallback(async () => {
		if (onSave) {
			await onSave({
				chargingDetailsType: chargingDetails[0].type,
				chargingDetailsTransactionId: chargingDetails[0].transactionId,
				chargingDetailsAmount: chargingDetails[0].amount,
				chargingDetailsStatus: chargingDetails[0].status,
				chargingDetailsChargedOn: chargingDetails[0].chargedOn,
				chargingDetailsChargeby: chargingDetails[0].chargedBy,
				chargingDetailsMerchantName: chargingDetails[0].merchantName,
			});
		}
	}, [onSave, chargingDetails]);

	const handleEditStart = useCallback(() => {
		startEditing(SECTION_ID);
	}, [startEditing]);

	const handleEditCancel = useCallback(() => {
		stopEditing(SECTION_ID);
	}, [stopEditing]);

	const handleEditSave = useCallback(() => {
		stopEditing(SECTION_ID);
	}, [stopEditing]);

	return (
		<Section
			title="Charging Details"
			editable={true}
			onSave={handleSave}
			onEditStart={handleEditStart}
			onEditCancel={handleEditCancel}
			onEditSave={handleEditSave}
		>
			{(isEditing) => (
				<div className="p-3 space-y-4">
					<div className="grid text-white grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
						{/* Type Field */}
						<div>
							<label className="block text-gray-400 text-xs mb-1">TYPE</label>
							<div className="h-8">
								{isEditing ? (
									<select
										className="w-full h-full bg-gray-700 text-white rounded px-2 border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
										value={chargingDetails[0]?.type || "MCO"}
										onChange={(e) =>
											setChargingDetails((cd) => [
												{ ...cd[0], type: e.target.value },
											])
										}
									>
										<option value="MCO">MCO</option>
										<option value="AUTH">AUTH</option>
										<option value="REFUND">REFUND</option>
										<option value="OTHER">OTHER</option>
									</select>
								) : (
									<div className="h-full flex items-center px-2 bg-gray-700/50 rounded text-sm">
										<div className="text-white">
											{chargingDetails[0]?.type || "N/A"}
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Transaction ID Field */}
						<div>
							<label className="block text-gray-400 text-xs mb-1">
								TRANSACTION ID
							</label>
							<div className="h-8">
								{isEditing ? (
									<input
										type="text"
										className="w-full h-full bg-gray-700 text-white rounded px-2 border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
										value={chargingDetails[0]?.transactionId || ""}
										onChange={(e) =>
											setChargingDetails((cd) => [
												{ ...cd[0], transactionId: e.target.value },
											])
										}
										placeholder="Transaction ID"
									/>
								) : (
									<div className="h-full flex items-center px-2 bg-gray-700/50 rounded text-sm">
										<div className="text-white">
											{chargingDetails[0]?.transactionId || "N/A"}
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Amount Field */}
						<div>
							<label className="block text-gray-400 text-xs mb-1">AMOUNT</label>
							<div className="h-8">
								{isEditing ? (
									<input
										type="number"
										step="0.01"
										min="0"
										className="w-full h-full bg-gray-700 text-white rounded px-2 border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
										value={chargingDetails[0]?.amount || ""}
										onChange={(e) =>
											setChargingDetails((cd) => [
												{ ...cd[0], amount: e.target.value },
											])
										}
										placeholder="0.00"
									/>
								) : (
									<div className="h-full flex items-center px-2 bg-gray-700/50 rounded text-sm">
										<div className="text-white">
											${chargingDetails[0]?.amount || "0.00"}
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Status Field */}
						<div>
							<label className="block text-gray-400 text-xs mb-1">STATUS</label>
							<div className="h-8">
								{isEditing ? (
									<select
										className="w-full h-full bg-gray-700 text-white rounded px-2 border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
										value={chargingDetails[0]?.status ?? ""}
										onChange={(e) =>
											setChargingDetails((cd) => [
												{ ...cd[0], status: e.target.value },
											])
										}
									>
										<option value="">Select Status</option>
										{CHARGING_STATUS.map((status, index) => (
											<option key={index} value={index}>
												{status}
											</option>
										))}
									</select>
								) : (
									<div className="h-full flex items-center px-2 bg-gray-700/50 rounded text-sm">
										<div className="text-white">
											{chargingDetails[0]?.status !== undefined &&
											chargingDetails[0]?.status !== null
												? CHARGING_STATUS[chargingDetails[0].status] ||
												  chargingDetails[0].status
												: "N/A"}
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Charged On Field */}
						<div>
							<label className="block text-gray-400 text-xs mb-1">
								CHARGED ON
							</label>
							<div className="h-8 relative">
								{isEditing ? (
									<input
										type="date"
										className="w-full h-full bg-gray-700 text-white rounded px-2 border border-gray-600 focus:border-blue-500 focus:outline-none text-sm z-10"
										value={chargingDetails[0]?.chargedOn}
										onChange={(e) =>
											setChargingDetails((cd) => [
												{ ...cd[0], chargedOn: e.target.value },
											])
										}
										max={new Date().toISOString().split("T")[0]}
									/>
								) : (
									<div className="h-full flex items-center px-2 bg-gray-700/50 rounded text-sm">
										<div className="text-white">
											{formatSafeDate(chargingDetails[0]?.chargedOn)}
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Charged By Field */}
						<div>
							<label className="block text-gray-400 text-xs mb-1">
								CHARGED BY
							</label>
							<div className="h-8">
								{isEditing ? (
									<input
										type="text"
										className="w-full h-full bg-gray-700 text-white rounded px-2 border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
										value={chargingDetails[0]?.chargedBy || ""}
										onChange={(e) =>
											setChargingDetails((cd) => [
												{ ...cd[0], chargedBy: e.target.value },
											])
										}
										placeholder="Charged by"
									/>
								) : (
									<div className="h-full flex items-center px-2 bg-gray-700/50 rounded text-sm">
										<div className="text-white">
											{chargingDetails[0]?.chargedBy || "N/A"}
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Merchant Name Field */}
						<div>
							<label className="block text-gray-400 text-xs mb-1">
								MERCHANT NAME
							</label>
							<div className="h-8">
								{isEditing ? (
									<input
										type="text"
										className="w-full h-full bg-gray-700 text-white rounded px-2 border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
										value={chargingDetails[0]?.merchantName || ""}
										onChange={(e) =>
											setChargingDetails((cd) => [
												{ ...cd[0], merchantName: e.target.value },
											])
										}
										placeholder="Merchant name"
									/>
								) : (
									<div className="h-full flex items-center px-2 bg-gray-700/50 rounded text-sm">
										<div className="text-white">
											{chargingDetails[0]?.merchantName || "N/A"}
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</Section>
	);
});

ChargingDetailsSection.displayName = "ChargingDetailsSection";

export default ChargingDetailsSection;
