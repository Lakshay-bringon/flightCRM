import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Section from './Section';
import BookingDetailsHeader from './BookingDetailsHeader';
import ImagePreviewModal from './ImagePreviewModal';
import { LoadingSpinner } from '../../components/ui';
import { getBookingByBid } from '../../api/booking/bookingApi';
import { showPromiseToast } from '../../utils/showPromiseToast';

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
	]);
	// Update state when booking data is loaded
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
			// Commenting out Charging Details section
			// setChargingDetails([
			//     {
			//         type: 'MCO',
			//         amount: bookingData.bookingData?.amount || '0.00',
			//         status: 'Pending',
			//         chargedOn: '',
			//         chargedBy: '',
			//         merchantName: '',
			//         refundedOn: '',
			//         transactionId: '',
			//     },
			// ]);
		}
	}, [bookingData, id]);

	// Handle preview
	const handlePreviewImage = (imageUrl) => {
		setPreviewImage(imageUrl);
		setShowPreview(true);
	}; // Render the appropriate form component based on transaction type
	const renderFormComponent = () => {
		// Only render if bookingData is available
		if (!bookingData) {
			return (
				<div className="flex items-center justify-center p-8">
					<div className="text-gray-400">Loading form data...</div>
				</div>
			);
		}

		// Prepare form data with bookingData fields + top-level itinerary_details and attachments
		const formData = {
			...bookingData.bookingData, // Spread the nested booking data fields
			itinerary_details:
				bookingData.itinerary_details ||
				bookingData.bookingData?.image_itinerary ||
				'',
			attachments: bookingData.attachments || [],
		};

		const commonProps = {
			bookingData: formData,
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
				onUpdateDetails={handleUpdateDetails}
				onRefresh={handleRefresh}
			/>
			{!bookingData ? (
				<div className="flex items-center justify-center min-h-[200px]">
					<LoadingSpinner label="Loading booking content..." />
				</div>
			) : (
				<div className="space-y-4">
					{/* Provider Details Section */}{' '}
					<Section
						title="Provider Details"
						editable={true}
						// onSave={saveProviderDetails}
						// onEditStart={() => setIsAnySectionEditing(true)}
						// onEditCancel={() => setIsAnySectionEditing(false)}
						// onEditSave={() => setIsAnySectionEditing(false)}
					>
						{(isEditing) => (
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
									</div>
									<div>
										<label className="block text-gray-400 text-xs mb-1">
											PROVIDER
										</label>
										<div className="h-8">
											{isEditing ? (
												<select
													className="w-full h-full bg-gray-700 text-white rounded px-2 border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
													value={providerDetails.provider}
													onChange={(e) =>
														setProviderDetails((pd) => ({
															...pd,
															provider: e.target.value,
														}))
													}
												>
													{PROVIDER_OPTIONS.map((option) => (
														<option key={option} value={option}>
															{option}
														</option>
													))}
												</select>
											) : (
												<div className="h-full flex items-center px-2 bg-gray-700/50 rounded text-sm">
													<div className="text-white">
														{providerDetails.provider}
													</div>
												</div>
											)}
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
									</div>
									<div>
										<label className="block text-gray-400 text-xs mb-1">
											CREATED BY
										</label>
										<div className="h-8">
											{isEditing ? (
												<input
													className="w-full h-full bg-gray-700 text-white rounded px-2 border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
													value={providerDetails.agent}
													onChange={(e) =>
														setProviderDetails((pd) => ({
															...pd,
															agent: e.target.value,
														}))
													}
												/>
											) : (
												<div className="h-full flex items-center px-2 bg-gray-700/50 rounded text-sm">
													<div className="text-white">
														{providerDetails.agent}
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						)}
					</Section>
					{/* Charging Details Section */}
					{/* <Section
						title="Charging Details"
						editable={true}
						// onSave={saveChargingDetails}
						// onEditStart={() => setIsAnySectionEditing(true)}
						// onEditCancel={() => setIsAnySectionEditing(false)}
						// onEditSave={() => setIsAnySectionEditing(false)}
					>
						{(isEditing) => (
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
									</div>
									<div>
										<label className="block text-gray-400 text-sm mb-2">
											TRANSACTION ID
										</label>
										<div className="h-10">
											{isEditing ? (
												<input
													className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
													value={chargingDetails[0].transactionId}
													onChange={(e) =>
														setChargingDetails((cd) => [
															{ ...cd[0], transactionId: e.target.value },
														])
													}
												/>
											) : (
												<div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
													<div className="text-white">
														{chargingDetails[0].transactionId || '123'}
													</div>
												</div>
											)}
										</div>
									</div>
									<div>
										<label className="block text-gray-400 text-sm mb-2">
											AMOUNT
										</label>
										<div className="h-10">
											{isEditing ? (
												<input
													type="number"
													className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
													value={chargingDetails[0].amount}
													onChange={(e) =>
														setChargingDetails((cd) => [
															{ ...cd[0], amount: e.target.value },
														])
													}
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
									</div>
									<div>
										<label className="block text-gray-400 text-sm mb-2">
											CHARGED ON
										</label>
										<div className="h-10">
											{isEditing ? (
												<input
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
									</div>
									<div>
										<label className="block text-gray-400 text-sm mb-2">
											CHARGED BY
										</label>
										<div className="h-10">
											{isEditing ? (
												<input
													className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
													value={chargingDetails[0].chargedBy || ''}
													onChange={(e) =>
														setChargingDetails((cd) => [
															{ ...cd[0], chargedBy: e.target.value },
														])
													}
												/>
											) : (
												<div className="h-full flex items-center px-3 bg-gray-700/50 rounded-lg">
													<div className="text-white">
														{chargingDetails[0].chargedBy || 'N/A'}
													</div>
												</div>
											)}
										</div>
									</div>
									<div>
										<label className="block text-gray-400 text-sm mb-2">
											MERCHANT NAME
										</label>
										<div className="h-10">
											{isEditing ? (
												<input
													className="w-full h-full bg-gray-700 text-white rounded-lg px-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
													value={chargingDetails[0].merchantName || ''}
													onChange={(e) =>
														setChargingDetails((cd) => [
															{ ...cd[0], merchantName: e.target.value },
														])
													}
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
					<div data-form-section="true">{renderFormComponent()}</div>
					{/* Refund Details Section */}
					<Section title="Refund Details">
						{() => (
							<div className="p-4 space-y-6">
								<table className="w-full table-fixed">
									<thead>
										<tr className="text-gray-400 text-sm border-b border-gray-700">
											<th className="text-center py-2 font-medium w-1/3">
												AMOUNT
											</th>
											<th className="text-center py-2 font-medium w-1/3">
												REFUNDED ON
											</th>
											<th className="text-center py-2 font-medium w-1/3">
												STATUS
											</th>
										</tr>
									</thead>
									<tbody>
										{chargingDetails.map((charge, index) => (
											<tr
												key={index}
												className="text-white border-b border-gray-700/50"
											>
												<td className="py-3 text-center">{charge.amount}</td>
												<td className="py-3 text-center">
													{charge.refundedOn || 'N/A'}
												</td>
												<td className="py-3 text-center">N/A</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</Section>{' '}
					{/* Chargeback Details Section */}
					<Section title="Chargeback Details">
						<div className="p-4 space-y-6">
							<table className="w-full table-fixed">
								<thead>
									<tr className="text-gray-400 text-sm border-b border-gray-700">
										<th className="text-center py-2 font-medium w-1/3">
											AMOUNT
										</th>
										<th className="text-center py-2 font-medium w-1/3">
											CHARGEBACK DATE
										</th>
										<th className="text-center py-2 font-medium w-1/3">
											STATUS
										</th>
									</tr>
								</thead>
								<tbody>
									{chargingDetails.map((charge, index) => (
										<tr
											key={index}
											className="text-white border-b border-gray-700/50"
										>
											<td className="py-3 text-center">{charge.amount}</td>
											<td className="py-3 text-center">
												{charge.chargedOn || 'N/A'}
											</td>
											<td className="py-3 text-center">N/A</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
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
