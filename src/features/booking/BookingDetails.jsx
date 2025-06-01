import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Section from './Section';
import BookingDetailsHeader from './BookingDetailsHeader';
import ImagePreviewModal from './ImagePreviewModal';
import { LoadingSpinner } from '../../components/ui';
import {
	getBookingByBid,
	updateBookingProviderDetails,
	updateRefundDetails,
	updateChargebackDetails,
	updateBookingChargingDetails,
} from '../../api/booking/bookingApi';
import { showPromiseToast } from '../../utils/showPromiseToast';
import { useAuth } from '../../auth/hooks/useAuth';

// Import form components
import NewBooking from './components/NewBooking';
import Exchange from './components/Exchange';
import CancelForFutureCredit from './components/CancelForFutureCredit';
import CancelForRefund from './components/CancelForRefund';
import Upgrade from './components/Upgrade';
import SeatAssignment from './components/SeatAssignment';

const AUTH_STATUS_OPTIONS = ['Pending', 'Confirmed', 'Rejected'];

const BID_STATUS_OPTIONS = [
	'Pending',
	'Active',
	'Cancelled',
	'Completed',
	'Expired',
];

export default function BookingDetails() {
	const { id } = useParams();
	const { user } = useAuth();
	const [isAnySectionEditing, setIsAnySectionEditing] = useState(false);
	const [previewImage, setPreviewImage] = useState(null);
	const [showPreview, setShowPreview] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [bookingData, setBookingData] = useState(null);
	// Get transaction type from booking data
	const transactionType = bookingData?.transaction_type || 'new_booking';

	// Fetch booking details function
	const fetchBookingDetails = async () => {
		if (!id) {
			setError('No booking ID provided');
			setLoading(false);
			return;
		}

		setLoading(true);
		setError(null);
		try {
			const data = await showPromiseToast(getBookingByBid(id), {
				loading: 'Loading booking details...',
				success: 'Booking details loaded successfully!',
				error: 'Failed to load booking details',
			});
			console.log(data);
			setBookingData(data);
		} catch (err) {
			setError(err.message || 'Failed to load booking details');
			console.error('Error fetching booking details:', err);
		} finally {
			setLoading(false);
		}
	};

	// Fetch booking details on mount
	useEffect(() => {
		fetchBookingDetails();
	}, [id]);

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
				loading: 'Updating provider details...',
				success: 'Provider details updated successfully!',
				error: 'Failed to update provider details',
			});

			// Refresh booking data after successful update
			fetchBookingDetails();
		} catch (err) {
			console.error('Error updating provider details:', err);
			// The error is already handled by showPromiseToast
		}
	};

	// Save refund details function
	const saveRefundDetails = async () => {
		try {
			const updateData = {
				bid: providerDetails.bid,
				amount: refundDetails[0].amount,
				refundedOn: refundDetails[0].refundedOn,
				status: refundDetails[0].status,
				userId: user?.id, // Include userId
			};

			await showPromiseToast(updateRefundDetails(updateData), {
				loading: 'Updating refund details...',
				success: 'Refund details updated successfully!',
				error: 'Failed to update refund details',
			});

			// Refresh booking data after successful update
			fetchBookingDetails();
		} catch (err) {
			console.error('Error updating refund details:', err);
			// The error is already handled by showPromiseToast
		}
	};

	// Save chargeback details function
	const saveChargebackDetails = async () => {
		try {
			const updateData = {
				bid: providerDetails.bid,
				amount: chargebackDetails[0].amount,
				chargebackDate: chargebackDetails[0].chargebackDate,
				status: chargebackDetails[0].status,
				userId: user?.id, // Include userId
			};

			await showPromiseToast(updateChargebackDetails(updateData), {
				loading: 'Updating chargeback details...',
				success: 'Chargeback details updated successfully!',
				error: 'Failed to update chargeback details',
			});

			// Refresh booking data after successful update
			fetchBookingDetails();
		} catch (err) {
			console.error('Error updating chargeback details:', err);
			// The error is already handled by showPromiseToast
		}
	};

	// Save charging details function
	const saveChargingDetails = async () => {
		try {
			const updateData = {
				bid: providerDetails.bid,
				type: chargingDetails[0].type,
				amount: chargingDetails[0].amount,
				status: chargingDetails[0].status,
				chargedOn: chargingDetails[0].chargedOn,
				chargedBy: chargingDetails[0].chargedBy,
				merchantName: chargingDetails[0].merchantName,
				refundedOn: chargingDetails[0].refundedOn,
				transactionId: chargingDetails[0].transactionId,
			};

			await showPromiseToast(updateBookingChargingDetails(updateData), {
				loading: 'Updating charging details...',
				success: 'Charging details updated successfully!',
				error: 'Failed to update charging details',
			});

			// Refresh booking data after successful update
			fetchBookingDetails();
		} catch (err) {
			console.error('Error updating charging details:', err);
			// The error is already handled by showPromiseToast
		}
	};

	// Local state for sections that remain
	const [providerDetails, setProviderDetails] = useState({
		bid: id || 'N/A',
		provider: 'Air Fare/Flight',
		transactionType: 'new_booking',
		dateCreated: new Date().toISOString(),
		authStatus: 'Pending',
		bidStatus: 'Pending',
		agent: 'N/A',
	});

	const [refundDetails, setRefundDetails] = useState([
		{
			amount: '0.00',
			refundedOn: '',
			status: 'Pending',
		},
	]);

	const [chargebackDetails, setChargebackDetails] = useState([
		{
			amount: '0.00',
			chargebackDate: '',
			status: 'Pending',
		},
	]);

	const [chargingDetails, setChargingDetails] = useState([
		{
			type: 'MCO',
			amount: '0.00',
			status: 'Pending',
			chargedOn: '',
			chargedBy: '',
			merchantName: '',
			refundedOn: '',
			transactionId: '',
		},
	]); // Update state when booking data is loaded
	useEffect(() => {
		if (bookingData) {
			setProviderDetails({
				bid: bookingData.BID || id || 'N/A',
				provider: bookingData.providerName || 'Air Fare/Flight',
				transactionType: bookingData.transaction_type || 'new_booking',
				dateCreated: bookingData.created_at || new Date().toISOString(),
				authStatus: bookingData.auth_status === '1' ? 'Confirmed' : 'Pending',
				bidStatus: bookingData.bid_status === '1' ? 'Active' : 'Pending',
				agent: bookingData.agent || bookingData.userName || 'N/A',
			});

			// Initialize refund details from booking data or default
			setRefundDetails([
				{
					amount: bookingData.refundAmount || '0.00',
					refundedOn: bookingData.refundDate || '',
					status: bookingData.refundStatus || 'Pending',
				},
			]);

			// Initialize chargeback details from booking data or default
			setChargebackDetails([
				{
					amount: bookingData.chargebackAmount || '0.00',
					chargebackDate: bookingData.chargebackDate || '',
					status: bookingData.chargebackStatus || 'Pending',
				},
			]);

			// Initialize charging details from booking data or default
			setChargingDetails([
				{
					type: 'MCO',
					amount:
						bookingData.chargingAmount ||
						bookingData.bookingData?.amount ||
						'0.00',
					status: bookingData.chargingStatus || 'Pending',
					chargedOn: bookingData.chargingDate || '',
					chargedBy: bookingData.chargedBy || '',
					merchantName: bookingData.merchantName || '',
					refundedOn: bookingData.refundedOn || '',
					transactionId: bookingData.transactionId || '',
				},
			]);
		}
	}, [bookingData, id]);
	const formData = {
		transaction_type: bookingData?.transaction_type,
		...bookingData?.bookingData, // Spread the nested booking data fields
		itinerary_details:
			bookingData?.itinerary_details ||
			bookingData?.bookingData?.image_itinerary ||
			'',
		attachments: bookingData?.attachments || [],
		BID: bookingData?.BID || id, // Ensure BID is included for edit mode detection
	};

	const renderFormComponent = () => {
		// Only render if bookingData is available
		if (!bookingData) {
			return (
				<div className="flex items-center justify-center p-8">
					<div className="text-gray-400">Loading form data...</div>
				</div>
			);
		}

		// Check if we have sufficient data to enable edit mode
		// Edit mode should be enabled when we have booking data from the details page
		const isEditMode = !!(bookingData?.BID || id);

		console.log('BookingDetails renderFormComponent:', {
			bookingData,
			formData,
			isEditMode,
			transactionType,
		});

		// Prepare form data with bookingData fields + top-level itinerary_details and attachments
		// Pass the complete structured formData as bookingData to enable edit mode
		const commonProps = {
			bookingData: isEditMode ? formData : null, // Only pass data if we're in edit mode
			onBack: () => window.history.back(),
		};

		switch (transactionType) {
			case 'new_booking':
				return <NewBooking {...commonProps} />;
			case 'exchange':
				return <Exchange {...commonProps} />;
			case 'cancel_for_future_credit':
				return <CancelForFutureCredit {...commonProps} />;
			case 'cancel_for_refund':
				return <CancelForRefund {...commonProps} />;
			case 'upgrade':
				return <Upgrade {...commonProps} />;
			case 'seat_assignment':
				return <SeatAssignment {...commonProps} />;
			default:
				return <NewBooking {...commonProps} />;
		}
	};

	// Handle update details - scroll to the form section
	const handleUpdateDetails = () => {
		const formElement = document.querySelector('[data-form-section="true"]');
		if (formElement) {
			formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	// Show loading spinner while fetching data
	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<LoadingSpinner label="Loading booking details..." size="lg" />
			</div>
		);
	}
	// Show error state if there's an error and no booking data
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
	if (!loading && !bookingData) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
				<div className="text-gray-400 text-lg font-medium">
					Booking Not Found
				</div>
				<div className="text-gray-500 text-center">
					The booking with ID "{id}" could not be found.
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
			{' '}
			<BookingDetailsHeader
				isEditing={isAnySectionEditing}
				formData={formData}
				onUpdateDetails={handleUpdateDetails}
				onRefresh={handleRefresh}
			/>
			{!bookingData ? (
				<div className="flex items-center justify-center min-h-[200px]">
					<LoadingSpinner label="Loading booking content..." />
				</div>
			) : (
				<div className="space-y-4">
					{' '}
					{/* Provider Details Section */}{' '}
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
									{' '}
									<div>
										<label className="block text-gray-400 text-xs mb-1">
											BID
										</label>
										<div className="h-8 flex items-center px-2 bg-gray-700/50 rounded text-sm">
											<div className="text-white">{providerDetails.bid}</div>
										</div>
									</div>{' '}
									<div>
										<label className="block text-gray-400 text-xs mb-1">
											PROVIDER
										</label>
										<div className="h-8 flex items-center px-2 bg-gray-700/50 rounded text-sm">
											<div className="text-white">
												{providerDetails.provider}
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
													{AUTH_STATUS_OPTIONS.map((option) => (
														<option key={option} value={option}>
															{option}
														</option>
													))}
												</select>
											) : (
												<div className="h-full flex items-center px-2 bg-gray-700/50 rounded text-sm">
													<div className="text-white">
														{providerDetails.authStatus}
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
													{BID_STATUS_OPTIONS.map((option) => (
														<option key={option} value={option}>
															{option}
														</option>
													))}
												</select>
											) : (
												<div className="h-full flex items-center px-2 bg-gray-700/50 rounded text-sm">
													<div className="text-white">
														{providerDetails.bidStatus}
													</div>
												</div>
											)}
										</div>
									</div>{' '}
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
					</Section>{' '}
					{/* Charging Details Section */}{' '}
					<Section
						title="Charging Details"
						editable={true}
						onSave={saveChargingDetails}
						onEditStart={() => setIsAnySectionEditing(true)}
						onEditCancel={() => setIsAnySectionEditing(false)}
						onEditSave={() => setIsAnySectionEditing(false)}
					>
						{(isEditing, setIsEditing, editableFields) => (
							<div className="p-4 space-y-6">
								<div className="grid text-white grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
									<div>
										<label className="block text-gray-400 text-sm mb-2">
											TYPE
										</label>
										<div className="h-10">
											{isEditing ? (
												<select
													className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
													value={chargingDetails[0].type}
													onChange={(e) =>
														setChargingDetails((cd) => [
															{ ...cd[0], type: e.target.value },
														])
													}
												>
													<option value="MCO">MCO</option>
													<option value="AUTH">AUTH</option>
												</select>
											) : (
												<div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
													<div className="text-white">
														{chargingDetails[0].type}
													</div>
												</div>
											)}
										</div>
									</div>{' '}
									<div>
										<label className="block text-gray-400 text-sm mb-2">
											TRANSACTION ID
										</label>
										<div className="h-10">
											{isEditing ? (
												<input
													key="transaction-id-text-input"
													type="text"
													className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
													value={chargingDetails[0].transactionId}
													onChange={(e) =>
														setChargingDetails((cd) => [
															{ ...cd[0], transactionId: e.target.value },
														])
													}
													onFocus={(e) => {
														// Ensure input type remains text
														e.target.type = 'text';
													}}
												/>
											) : (
												<div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
													<div className="text-white">
														{chargingDetails[0].transactionId || '123'}
													</div>
												</div>
											)}
										</div>
									</div>{' '}
									<div>
										<label className="block text-gray-400 text-sm mb-2">
											AMOUNT
										</label>
										<div className="h-10">
											{isEditing ? (
												<input
													key="charging-amount-number-input"
													type="number"
													step="0.01"
													className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
													value={chargingDetails[0].amount}
													onChange={(e) =>
														setChargingDetails((cd) => [
															{ ...cd[0], amount: e.target.value },
														])
													}
													onFocus={(e) => {
														// Ensure input type remains number
														e.target.type = 'number';
													}}
												/>
											) : (
												<div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
													<div className="text-white">
														{chargingDetails[0].amount}
													</div>
												</div>
											)}
										</div>
									</div>
									<div>
										<label className="block text-gray-400 text-sm mb-2">
											STATUS
										</label>
										<div className="h-10">
											{isEditing ? (
												<select
													className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
													value={chargingDetails[0].status || ''}
													onChange={(e) =>
														setChargingDetails((cd) => [
															{ ...cd[0], status: e.target.value },
														])
													}
												>
													<option value="">Select Status</option>
													<option value="Pending">Pending</option>
													<option value="Processed">Processed</option>
													<option value="Failed">Failed</option>
												</select>
											) : (
												<div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
													<div className="text-white">
														{chargingDetails[0].status || 'N/A'}
													</div>
												</div>
											)}
										</div>
									</div>{' '}
									<div>
										<label className="block text-gray-400 text-sm mb-2">
											CHARGED ON
										</label>
										<div className="h-10">
											{isEditing ? (
												<input
													key="charged-on-datetime-input"
													type="datetime-local"
													className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
													value={chargingDetails[0].chargedOn || ''}
													onChange={(e) =>
														setChargingDetails((cd) => [
															{ ...cd[0], chargedOn: e.target.value },
														])
													}
												/>
											) : (
												<div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
													<div className="text-white">
														{chargingDetails[0].chargedOn || 'N/A'}
													</div>
												</div>
											)}
										</div>
									</div>{' '}
									<div>
										<label className="block text-gray-400 text-sm mb-2">
											CHARGED BY
										</label>
										<div className="h-10">
											{isEditing ? (
												<input
													key="charged-by-text-input"
													type="text"
													className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
													value={chargingDetails[0].chargedBy || ''}
													onChange={(e) =>
														setChargingDetails((cd) => [
															{ ...cd[0], chargedBy: e.target.value },
														])
													}
													onFocus={(e) => {
														// Ensure input type remains text
														e.target.type = 'text';
													}}
												/>
											) : (
												<div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
													<div className="text-white">
														{chargingDetails[0].chargedBy || 'N/A'}
													</div>
												</div>
											)}
										</div>
									</div>{' '}
									<div>
										<label className="block text-gray-400 text-sm mb-2">
											MERCHANT NAME
										</label>
										<div className="h-10">
											{isEditing ? (
												<input
													key="merchant-name-text-input"
													type="text"
													className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
													value={chargingDetails[0].merchantName || ''}
													onChange={(e) =>
														setChargingDetails((cd) => [
															{ ...cd[0], merchantName: e.target.value },
														])
													}
													onFocus={(e) => {
														// Ensure input type remains text
														e.target.type = 'text';
													}}
												/>
											) : (
												<div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
													<div className="text-white">
														{chargingDetails[0].merchantName || 'N/A'}
													</div>
												</div>
											)}
										</div>{' '}
									</div>{' '}
								</div>
							</div>
						)}
					</Section>{' '}
					{/* Transaction-specific Form */}
					<div data-form-section="true">{renderFormComponent()}</div>{' '}
					{/* Refund Details Section */}{' '}
					<Section
						title="Refund Details"
						editable={true}
						onSave={saveRefundDetails}
						onEditStart={() => setIsAnySectionEditing(true)}
						onEditCancel={() => setIsAnySectionEditing(false)}
						onEditSave={() => setIsAnySectionEditing(false)}
					>
						{(isEditing, setIsEditing, editableFields) => (
							<div className="p-4 space-y-6">
								<div className="grid text-white grid-cols-1 md:grid-cols-3 gap-4">
									{' '}
									<div>
										<label className="block text-gray-400 text-sm mb-2">
											AMOUNT
										</label>
										<div className="h-10">
											{isEditing ? (
												<input
													key="refund-amount-number-input"
													type="number"
													step="0.01"
													className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
													value={refundDetails[0].amount}
													onChange={(e) =>
														setRefundDetails((rd) => [
															{ ...rd[0], amount: e.target.value },
														])
													}
													onFocus={(e) => {
														// Ensure input type remains number
														e.target.type = 'number';
													}}
												/>
											) : (
												<div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
													<div className="text-white">
														${refundDetails[0].amount}
													</div>
												</div>
											)}
										</div>
									</div>
									<div>
										<label className="block text-gray-400 text-sm mb-2">
											REFUNDED ON
										</label>
										<div className="h-10 relative">
											{isEditing ? (
												<input
													key="refund-date-input"
													type="date"
													className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none z-10"
													value={refundDetails[0].refundedOn}
													onChange={(e) =>
														setRefundDetails((rd) => [
															{ ...rd[0], refundedOn: e.target.value },
														])
													}
													onBlur={() => setIsAnySectionEditing(false)}
												/>
											) : (
												<div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
													<div className="text-white">
														{refundDetails[0].refundedOn || 'N/A'}
													</div>
												</div>
											)}
										</div>
									</div>
									<div>
										<label className="block text-gray-400 text-sm mb-2">
											STATUS
										</label>
										<div className="h-10">
											{isEditing ? (
												<select
													className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
													value={refundDetails[0].status}
													onChange={(e) =>
														setRefundDetails((rd) => [
															{ ...rd[0], status: e.target.value },
														])
													}
												>
													<option value="Pending">Pending</option>
													<option value="Processing">Processing</option>
													<option value="Completed">Completed</option>
													<option value="Rejected">Rejected</option>
												</select>
											) : (
												<div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
													<div className="text-white">
														{refundDetails[0].status}
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						)}
					</Section>{' '}
					{/* Chargeback Details Section */}{' '}
					<Section
						title="Chargeback Details"
						editable={true}
						onSave={saveChargebackDetails}
						onEditStart={() => setIsAnySectionEditing(true)}
						onEditCancel={() => setIsAnySectionEditing(false)}
						onEditSave={() => setIsAnySectionEditing(false)}
					>
						{(isEditing, setIsEditing, editableFields) => (
							<div className="p-4 space-y-6">
								<div className="grid text-white grid-cols-1 md:grid-cols-3 gap-4">
									{' '}
									<div>
										<label className="block text-gray-400 text-sm mb-2">
											AMOUNT
										</label>
										<div className="h-10">
											{isEditing ? (
												<input
													key="chargeback-amount-number-input"
													type="number"
													step="0.01"
													className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
													value={chargebackDetails[0].amount}
													onChange={(e) =>
														setChargebackDetails((cd) => [
															{ ...cd[0], amount: e.target.value },
														])
													}
													onFocus={(e) => {
														// Ensure input type remains number
														e.target.type = 'number';
													}}
												/>
											) : (
												<div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
													<div className="text-white">
														${chargebackDetails[0].amount}
													</div>
												</div>
											)}
										</div>
									</div>
									<div>
										<label className="block text-gray-400 text-sm mb-2">
											CHARGEBACK DATE
										</label>
										<div className="h-10 relative">
											{isEditing ? (
												<input
													key="chargeback-date-input"
													type="date"
													className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none z-10"
													value={chargebackDetails[0].chargebackDate}
													onChange={(e) =>
														setChargebackDetails((cd) => [
															{ ...cd[0], chargebackDate: e.target.value },
														])
													}
													onBlur={() => setIsAnySectionEditing(false)}
												/>
											) : (
												<div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
													<div className="text-white">
														{chargebackDetails[0].chargebackDate || 'N/A'}
													</div>
												</div>
											)}
										</div>
									</div>
									<div>
										<label className="block text-gray-400 text-sm mb-2">
											STATUS
										</label>
										<div className="h-10">
											{isEditing ? (
												<select
													className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
													value={chargebackDetails[0].status}
													onChange={(e) =>
														setChargebackDetails((cd) => [
															{ ...cd[0], status: e.target.value },
														])
													}
												>
													<option value="Pending">Pending</option>
													<option value="Under Review">Under Review</option>
													<option value="Won">Won</option>
													<option value="Lost">Lost</option>
													<option value="Closed">Closed</option>
												</select>
											) : (
												<div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
													<div className="text-white">
														{chargebackDetails[0].status}
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
