import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo, useCallback } from "react";
import Section from "./Section";
import BookingDetailsHeader from "./BookingDetailsHeader";
import ImagePreviewModal from "./ImagePreviewModal";
import { LoadingSpinner } from "../../components/ui";
import {
	getBookingByBid,
	updateBookingProviderDetails,
	updateRefundDetails,
	updateChargebackDetails,
	updateBookingChargingDetails,
} from "../../api/booking/bookingApi";
import { showPromiseToast } from "../../utils/showPromiseToast";
import { useAuth } from "../../auth/hooks/useAuth";

import {
	AUTH_STATUS,
	CHARGING_STATUS,
	REFUND_STATUS,
	CHARGEBACK_STATUS,
	BOOKING_STATUS,
} from "../../constants";

// Import form components
import NewBooking from "./components/NewBooking";
import Exchange from "./components/Exchange";
import CancelForFutureCredit from "./components/CancelForFutureCredit";
import CancelForRefund from "./components/CancelForRefund";
import Upgrade from "./components/Upgrade";
import SeatAssignment from "./components/SeatAssignment";

// Convert BOOKING_STATUS object to array for dropdown usage
const BID_STATUS = Object.values(BOOKING_STATUS);

export default function BookingDetails() {
	const { bid } = useParams(); // Extract 'bid'
	const { user } = useAuth();
	const [isAnySectionEditing, setIsAnySectionEditing] = useState(false);
	const [previewImage, setPreviewImage] = useState(null);
	const [showPreview, setShowPreview] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [apiData, setApiData] = useState(null);
	// Get transaction type from booking data

	// Fetch booking details function
	const fetchBookingDetails = async () => {
		if (!bid) {
			setError("No booking ID provided");
			setLoading(false);
			return;
		}

		setLoading(true);
		setError(null);
		try {
			const data = await showPromiseToast(getBookingByBid(bid), {
				loading: "Loading booking details...",
				success: "Booking details loaded successfully!",
				error: "Failed to load booking details",
			});
			console.log(data);
			setApiData(data);
		} catch (err) {
			setError(err.message || "Failed to load booking details");
			console.error("Error fetching booking details:", err);
		} finally {
			setLoading(false);
		}
	};

	// Fetch booking details on mount
	useEffect(() => {
		fetchBookingDetails();
	}, [bid]);

	// Handle refresh
	const handleRefresh = () => {
		fetchBookingDetails();
	};

	// Save provider details function
	const saveProviderDetails = async () => {
		try {
			const updateData = {
				bid: providerDetails.bid,
				authStatus: providerDetails.authStatus,
				bidStatus: providerDetails.bidStatus,
				provider: providerDetails.provider,
				agent: providerDetails.agent,
			};

			await showPromiseToast(updateBookingProviderDetails(updateData), {
				loading: "Updating provider details...",
				success: "Provider details updated successfully!",
				error: "Failed to update provider details",
			});

			// Refresh booking data after successful update
			fetchBookingDetails();
		} catch (err) {
			console.error("Error updating provider details:", err);
			// The error is already handled by showPromiseToast
		}
	};
	// Save refund details function
	const saveRefundDetails = async () => {
		try {
			const updateData = {
				bid: providerDetails.bid,
				refundDetailsAmount: refundDetails[0].amount,
				refundDetailsRefundOn: refundDetails[0].refundedOn,
				refundDetailsStatus: refundDetails[0].status,
				userId: user?.id, // Include userId
			};

			await showPromiseToast(updateRefundDetails(updateData), {
				loading: "Updating refund details...",
				success: "Refund details updated successfully!",
				error: "Failed to update refund details",
			});

			// Refresh booking data after successful update
			fetchBookingDetails();
		} catch (err) {
			console.error("Error updating refund details:", err);
			// The error is already handled by showPromiseToast
		}
	};
	// Save chargeback details function
	const saveChargebackDetails = async () => {
		try {
			const updateData = {
				bid: providerDetails.bid,
				chargebackDetailsAmount: chargebackDetails[0].amount,
				chargebackDetailsChargedOn: chargebackDetails[0].chargebackDate,
				chargebackDetailsStatus: chargebackDetails[0].status,
				userId: user?.id, // Include userId
			};

			await showPromiseToast(updateChargebackDetails(updateData), {
				loading: "Updating chargeback details...",
				success: "Chargeback details updated successfully!",
				error: "Failed to update chargeback details",
			});

			// Refresh booking data after successful update
			fetchBookingDetails();
		} catch (err) {
			console.error("Error updating chargeback details:", err);
			// The error is already handled by showPromiseToast
		}
	};
	// Save charging details function
	const saveChargingDetails = async () => {
		try {
			const updateData = {
				bid: providerDetails.bid,
				chargingDetailsType: chargingDetails[0].type,
				chargingDetailsTransactionId: chargingDetails[0].transactionId,
				chargingDetailsAmount: chargingDetails[0].amount,
				chargingDetailsStatus: chargingDetails[0].status,
				chargingDetailsChargedOn: chargingDetails[0].chargedOn,
				chargingDetailsChargeby: chargingDetails[0].chargedBy,
				chargingDetailsMerchantName: chargingDetails[0].merchantName,
			};

			await showPromiseToast(updateBookingChargingDetails(updateData), {
				loading: "Updating charging details...",
				success: "Charging details updated successfully!",
				error: "Failed to update charging details",
			});

			// Refresh booking data after successful update
			fetchBookingDetails();
		} catch (err) {
			console.error("Error updating charging details:", err);
			// The error is already handled by showPromiseToast
		}
	};

	// Local state for sections that remain
	const [providerDetails, setProviderDetails] = useState({
		bid: bid || "N/A",
		provider: "N/A",
		transactionType: "N/A",
		dateCreated: new Date().toISOString(),
		authStatus: 0, // Use index from AUTH_STATUS (pending)
		bidStatus: 0, // Use index from BID_STATUS (pending)
		agent: "N/A",
	});

	const [refundDetails, setRefundDetails] = useState([
		{
			amount: "0.00",
			refundedOn: "",
			status: 0, // Use index from REFUND_STATUS
		},
	]);

	const [chargebackDetails, setChargebackDetails] = useState([
		{
			amount: "0.00",
			chargebackDate: "",
			status: 0, // Use index from CHARGEBACK_STATUS
		},
	]);

	const [chargingDetails, setChargingDetails] = useState([
		{
			type: "MCO",
			amount: "0.00",
			status: 0, // Use index from CHARGING_STATUS
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
			setProviderDetails({
				bid: apiData.BID || bid || "",
				provider: apiData.providerName || "",
				transactionType: apiData.transaction_type || "",
				dateCreated: apiData.created_at || new Date().toISOString(),
				authStatus: apiData.auth_status,
				bidStatus: apiData.bid_status,
				agent: apiData.agent || apiData.userName || "",
			});

			// Initialize refund details from booking data or default
			setRefundDetails([
				{
					amount: apiData.refundDetailsAmount || "0.00",
					refundedOn: apiData.refundDetailsRefundOn || "",
					status: apiData.refundDetailsStatus || 0,
				},
			]);

			// Initialize chargeback details from booking data or default
			setChargebackDetails([
				{
					amount: apiData.chargebackDetailsAmount || "0.00",
					chargebackDate: apiData.chargebackDetailsChargedOn || "",
					status: apiData.chargebackDetailsStatus,
				},
			]);

			// Initialize charging details from booking data or default
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

	// Memoize bookingDataForForm to avoid new object reference on every render
	const bookingDataForForm = useMemo(() => {
		if (!apiData) return null;
		return {
			transaction_type: apiData?.transaction_type,
			...apiData?.bookingData,
			itinerary_details: apiData?.itinerary_details || "",
			attachments: apiData?.attachments || [],
			bid: apiData?.bid,
			agent_name: apiData?.userName,
		};
	}, [apiData]);

	console.log("rendering BookingDetails");

	const renderFormComponent = useCallback(() => {
		// Only render if bookingData is available
		if (apiData === null || apiData === undefined) {
			return (
				<div className="flex items-center justify-center p-8">
					<div className="text-gray-400">Loading form data...</div>
				</div>
			);
		}
		const commonProps = {
			bookingData: bookingDataForForm,
			onBack: () => window.history.back(),
		};

		switch (apiData?.transaction_type) {
			case "new_booking":
				return <NewBooking {...commonProps} />;
			case "exchange":
				return <Exchange {...commonProps} />;
			case "cancel_for_future_credit":
				return <CancelForFutureCredit {...commonProps} />;
			case "cancel_for_refund":
				return <CancelForRefund {...commonProps} />;
			case "upgrade":
				return <Upgrade {...commonProps} />;
			case "seat_assignment":
				return <SeatAssignment {...commonProps} />;
			default:
				return <NewBooking {...commonProps} />;
		}
	}, [apiData]);

	// Show loading spinner while fetching data
	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<LoadingSpinner label="Loading booking details..." size="lg" />
			</div>
		);
	}
	if (error) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
				<div className="text-red-400 text-lg font-medium">
					Error Loading Booking
				</div>
				<div className="text-gray-400 text-center max-w-md">{error}</div>
				<button
					onClick={() => window.history.back()}
					className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
				>
					Go Back
				</button>
			</div>
		);
	}
	// Show not found state if no booking data is available after loading
	if (!loading && !apiData) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
				<div className="text-gray-400 text-lg font-medium">
					Booking Not Found
				</div>
				<div className="text-gray-500 text-center">
					The booking with ID "{bid}" could not be found.
				</div>
				<button
					onClick={() => window.history.back()}
					className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
				>
					Go Back
				</button>
			</div>
		);
	}

	return (
		<>
			{" "}
			<BookingDetailsHeader
				isEditing={isAnySectionEditing}
				formData={bookingDataForForm}
				onRefresh={handleRefresh}
				providerId={apiData?.provider_id}
			/>
			{!apiData ? (
				<div className="flex items-center justify-center min-h-[200px]">
					<LoadingSpinner label="Loading booking content..." />
				</div>
			) : (
				<div className="space-y-4">
					{" "}
					{/* Provider Details Section */}{" "}
					<Section
						title="Provider Details"
						editable={true}
						onSave={saveProviderDetails}
						onEditStart={() => setIsAnySectionEditing(true)}
						onEditCancel={() => setIsAnySectionEditing(false)}
						onEditSave={() => setIsAnySectionEditing(false)}
					>
						{(isEditing, setIsEditing, editableFields) => (
							<div className="p-3 space-y-4">
								<div className="grid text-white grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
									{" "}
									<div>
										<label className="block text-gray-400 text-xs mb-1">
											BID
										</label>
										<div className="h-8 flex items-center px-2 bg-gray-700/50 rounded text-sm">
											<div className="text-white">{providerDetails.bid}</div>
										</div>
									</div>{" "}
									<div>
										<label className="block text-gray-400 text-xs mb-1">
											PROVIDER
										</label>
										<div className="h-8">
											<div className="h-full flex items-center px-2 bg-gray-700/50 rounded text-sm">
												<div className="text-white">
													{providerDetails.provider}
												</div>
											</div>
										</div>
									</div>
									<div>
										<label className="block text-gray-400 text-xs mb-1">
											TRANSACTION TYPE
										</label>
										<div className="h-8 flex items-center px-2 bg-gray-700/50 rounded text-sm">
											<div className="text-white">
												{providerDetails.transactionType}
											</div>
										</div>
									</div>
									<div>
										<label className="block text-gray-400 text-xs mb-1">
											DATE CREATED
										</label>
										<div className="h-8 flex items-center px-2 bg-gray-700/50 rounded text-sm">
											<div className="text-white">
												{new Date(
													providerDetails.dateCreated
												).toLocaleDateString()}
											</div>
										</div>
									</div>
									<div>
										<label className="block text-gray-400 text-xs mb-1">
											AUTH STATUS
										</label>
										<div className="h-8">
											{isEditing ? (
												<select
													className="w-full h-full bg-gray-700 text-white rounded px-2 border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
													value={providerDetails.authStatus}
													onChange={(e) =>
														setProviderDetails((pd) => ({
															...pd,
															authStatus: e.target.value,
														}))
													}
												>
													{AUTH_STATUS.map((status, index) => (
														<option key={index} value={index}>
															{status}
														</option>
													))}
												</select>
											) : (
												<div className="h-full flex items-center px-2 bg-gray-700/50 rounded text-sm">
													<div className="text-white">
														{providerDetails.authStatus !== undefined &&
														providerDetails.authStatus !== null
															? AUTH_STATUS[providerDetails.authStatus] ||
															  providerDetails.authStatus
															: "N/A"}
													</div>
												</div>
											)}
										</div>
									</div>
									<div>
										<label className="block text-gray-400 text-xs mb-1">
											BID STATUS
										</label>
										<div className="h-8">
											{isEditing ? (
												<select
													className="w-full h-full bg-gray-700 text-white rounded px-2 border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
													value={providerDetails.bidStatus}
													onChange={(e) =>
														setProviderDetails((pd) => ({
															...pd,
															bidStatus: e.target.value,
														}))
													}
												>
													{BID_STATUS.map((status, index) => (
														<option key={index} value={index}>
															{status}
														</option>
													))}
												</select>
											) : (
												<div className="h-full flex items-center px-2 bg-gray-700/50 rounded text-sm">
													<div className="text-white">
														{providerDetails.bidStatus !== undefined &&
														providerDetails.bidStatus !== null
															? BID_STATUS[providerDetails.bidStatus] ||
															  providerDetails.bidStatus
															: "N/A"}
													</div>
												</div>
											)}
										</div>
									</div>{" "}
									<div>
										<label className="block text-gray-400 text-xs mb-1">
											CREATED BY
										</label>
										<div className="h-8 flex items-center px-2 bg-gray-700/50 rounded text-sm">
											<div className="text-white">{providerDetails.agent}</div>
										</div>
									</div>
								</div>
							</div>
						)}
					</Section>{" "}
					{/* Charging Details Section */}
					<Section
						title="Charging Details"
						editable={true}
						onSave={saveChargingDetails}
						onEditStart={() => setIsAnySectionEditing(true)}
						onEditCancel={() => setIsAnySectionEditing(false)}
						onEditSave={() => setIsAnySectionEditing(false)}
					>
						{(isEditing, setIsEditing, editableFields) => (
							<div className="p-3 space-y-4">
								<div className="grid text-white grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
									{/* Type Field */}
									<div>
										<label className="block text-gray-400 text-xs mb-1">
											TYPE
										</label>
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
													placeholder="Enter transaction ID"
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
										<label className="block text-gray-400 text-xs mb-1">
											AMOUNT
										</label>
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
										<label className="block text-gray-400 text-xs mb-1">
											STATUS
										</label>
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
													value={chargingDetails[0]?.chargedOn || ""}
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
														{chargingDetails[0]?.chargedOn
															? new Date(
																	chargingDetails[0].chargedOn
															  ).toLocaleDateString()
															: "N/A"}
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
													placeholder="Enter name"
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
													placeholder="Enter merchant name"
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
					{/* Transaction-specific Form */}
					<div>{renderFormComponent()}</div>
					{/* Refund Details Section */}{" "}
					<Section
						title="Refund Details"
						editable={true}
						onSave={saveRefundDetails}
						onEditStart={() => setIsAnySectionEditing(true)}
						onEditCancel={() => setIsAnySectionEditing(false)}
						onEditSave={() => setIsAnySectionEditing(false)}
					>
						{(isEditing, setIsEditing, editableFields) => (
							<div className="p-3 space-y-4">
								<div className="grid text-white grid-cols-1 md:grid-cols-3 gap-3">
									{" "}
									<div>
										<label className="block text-gray-400 text-xs mb-1">
											AMOUNT
										</label>
										<div className="h-8">
											{isEditing ? (
												<input
													key="refund-amount-number-input"
													type="number"
													step="0.01"
													className="w-full h-full bg-gray-700 text-white rounded px-2 border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
													value={refundDetails[0].amount}
													onChange={(e) =>
														setRefundDetails((rd) => [
															{ ...rd[0], amount: e.target.value },
														])
													}
													onFocus={(e) => {
														// Ensure input type remains number
														e.target.type = "number";
													}}
												/>
											) : (
												<div className="h-full flex items-center px-2 bg-gray-700/50 rounded text-sm">
													<div className="text-white">
														${refundDetails[0].amount}
													</div>
												</div>
											)}
										</div>
									</div>{" "}
									<div>
										<label className="block text-gray-400 text-xs mb-1">
											REFUNDED ON
										</label>
										<div className="h-8 relative">
											{isEditing ? (
												<input
													key="refund-date-input"
													type="date"
													className="w-full h-full bg-gray-700 text-white rounded px-2 border border-gray-600 focus:border-blue-500 focus:outline-none text-sm z-10"
													value={refundDetails[0].refundedOn}
													onChange={(e) =>
														setRefundDetails((rd) => [
															{ ...rd[0], refundedOn: e.target.value },
														])
													}
													// onBlur={() => setIsAnySectionEditing(false)}
												/>
											) : (
												<div className="h-full flex items-center px-2 bg-gray-700/50 rounded text-sm">
													<div className="text-white">
														{refundDetails[0].refundedOn || "N/A"}
													</div>
												</div>
											)}
										</div>
									</div>{" "}
									<div>
										<label className="block text-gray-400 text-xs mb-1">
											STATUS
										</label>
										<div className="h-8">
											{" "}
											{isEditing ? (
												<select
													className="w-full h-full bg-gray-700 text-white rounded px-2 border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
													value={refundDetails[0].status}
													onChange={(e) =>
														setRefundDetails((rd) => [
															{ ...rd[0], status: e.target.value },
														])
													}
												>
													<option value="">Select Status</option>
													{REFUND_STATUS.map((status, index) => (
														<option key={index} value={index}>
															{status}
														</option>
													))}
												</select>
											) : (
												<div className="h-full flex items-center px-2 bg-gray-700/50 rounded text-sm">
													<div className="text-white">
														{refundDetails[0].status !== undefined &&
														refundDetails[0].status !== null
															? REFUND_STATUS[refundDetails[0].status] ||
															  refundDetails[0].status
															: "N/A"}
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						)}
					</Section>{" "}
					{/* Chargeback Details Section */}{" "}
					<Section
						title="Chargeback Details"
						editable={true}
						onSave={saveChargebackDetails}
						onEditStart={() => setIsAnySectionEditing(true)}
						onEditCancel={() => setIsAnySectionEditing(false)}
						onEditSave={() => setIsAnySectionEditing(false)}
					>
						{(isEditing, setIsEditing, editableFields) => (
							<div className="p-3 space-y-4">
								<div className="grid text-white grid-cols-1 md:grid-cols-3 gap-3">
									{" "}
									<div>
										<label className="block text-gray-400 text-xs mb-1">
											AMOUNT
										</label>
										<div className="h-8">
											{isEditing ? (
												<input
													key="chargeback-amount-number-input"
													type="number"
													step="0.01"
													className="w-full h-full bg-gray-700 text-white rounded px-2 border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
													value={chargebackDetails[0].amount}
													onChange={(e) =>
														setChargebackDetails((cd) => [
															{ ...cd[0], amount: e.target.value },
														])
													}
													onFocus={(e) => {
														// Ensure input type remains number
														e.target.type = "number";
													}}
												/>
											) : (
												<div className="h-full flex items-center px-2 bg-gray-700/50 rounded text-sm">
													<div className="text-white">
														${chargebackDetails[0].amount}
													</div>
												</div>
											)}
										</div>
									</div>{" "}
									<div>
										<label className="block text-gray-400 text-xs mb-1">
											CHARGEBACK DATE
										</label>
										<div className="h-8 relative">
											{isEditing ? (
												<input
													key="chargeback-date-input"
													type="date"
													className="w-full h-full bg-gray-700 text-white rounded px-2 border border-gray-600 focus:border-blue-500 focus:outline-none text-sm z-10"
													value={chargebackDetails[0].chargebackDate}
													onChange={(e) =>
														setChargebackDetails((cd) => [
															{ ...cd[0], chargebackDate: e.target.value },
														])
													}
													// onBlur={() => setIsAnySectionEditing(false)}
												/>
											) : (
												<div className="h-full flex items-center px-2 bg-gray-700/50 rounded text-sm">
													<div className="text-white">
														{chargebackDetails[0].chargebackDate || "N/A"}
													</div>
												</div>
											)}
										</div>
									</div>{" "}
									<div>
										<label className="block text-gray-400 text-xs mb-1">
											STATUS
										</label>
										<div className="h-8">
											{" "}
											{isEditing ? (
												<select
													className="w-full h-full bg-gray-700 text-white rounded px-2 border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
													value={chargebackDetails[0].status}
													onChange={(e) =>
														setChargebackDetails((cd) => [
															{ ...cd[0], status: e.target.value },
														])
													}
												>
													<option value="">Select Status</option>
													{CHARGEBACK_STATUS.map((status, index) => (
														<option key={index} value={index}>
															{status}
														</option>
													))}
												</select>
											) : (
												<div className="h-full flex items-center px-2 bg-gray-700/50 rounded text-sm">
													<div className="text-white">
														{chargebackDetails[0].status !== undefined &&
														chargebackDetails[0].status !== null
															? CHARGEBACK_STATUS[
																	chargebackDetails[0].status
															  ] || chargebackDetails[0].status
															: "N/A"}
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						)}
					</Section>
				</div>
			)}
			{showPreview && (
				<ImagePreviewModal
					isOpen={showPreview}
					onClose={() => setShowPreview(false)}
					imageUrl={previewImage}
				/>
			)}
		</>
	);
}
