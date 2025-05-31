import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useLocation } from 'react-router-dom';
import ItineraryDetailsInput from './ItineraryDetailsInput';
import ImagePreviewModal from '../ImagePreviewModal';
import PurchaseSummary from './PurchaseSummary';
import PassengerDetails from './PassengerDetails';
import ChargesDescription from './ChargesDescription';
import AttachmentsSection from './AttachmentsSection';
import AuthorizeSection from './AuthorizeSection';
import { useDataContext } from '../../../context/DataContext';
import { showPromiseToast } from '../../../utils/showPromiseToast';
import { createReservationApi } from '../../../api/booking/bookingApi.js';
import { bookingSchema } from '../schemas/bookingSchema';
import toast from 'react-hot-toast';
import { useAuth } from '../../../auth/hooks/useAuth.jsx';

function NewBooking({ bookingData, onBack }) {
	// data prop will be used for autofilling the form in find booking
	const { currencies, cards, fetchCurrencies, fetchCards } = useDataContext();
	const location = useLocation();
	const { transactionType, providerId, queueId } = location.state || {};
	const navigate = useNavigate();
	const { user } = useAuth();
	React.useEffect(() => {
		fetchCards();
		fetchCurrencies();
	}, []);
	const [itineraryDetails, setItineraryDetails] = useState('');
	const [itineraryImage, setItineraryImage] = useState(null);
	const [showPreview, setShowPreview] = useState(false);
	const [previewImage, setPreviewImage] = useState(null);
	const [attachments, setAttachments] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [currency, setCurrency] = useState('USD'); // Use booking data directly without transformation since it already has the correct field names
	const formDefaultData = React.useMemo(() => {
		if (!bookingData) return null;

		return bookingData;
	}, [bookingData]);
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(bookingSchema),
		defaultValues: {
			pnr: '',
			customer_name: '',
			amount: '',
			cardNumber: '',
			airline_name: '',
			purchase_date: new Date().toISOString().split('T')[0],
			email: '',
			phone: '',
			card_holder: '',
			payment_method: 'VISA',

			billing_address: '',

			city: '',
			state: '',
			zip: '',
			country: 'US',

			passenger_data: [
				{
					type: 'ADT',
					firstName: '',
					middleName: '',
					lastName: '',
					dob: '',
				},
			],
			charge_data: [
				{
					amount: '',
					description: '',
				},
				{
					amount: '',
					description: '',
				},
			],

			image_itinerary: '',
			attachments: [],
		},
	}); // Initialize state from booking data when available
	React.useEffect(() => {
		if (formDefaultData) {
			reset(formDefaultData);

			if (formDefaultData.itinerary_details) {
				setItineraryDetails(formDefaultData.itinerary_details);
			}

			if (
				formDefaultData.attachments &&
				Array.isArray(formDefaultData.attachments)
			) {
				setAttachments(formDefaultData.attachments);
			}

			if (formDefaultData.currency) {
				setCurrency(formDefaultData.currency);
			}
		}
	}, [formDefaultData, reset]);

	// Watch for form fields
	const pnr = watch('pnr');
	const airline = watch('airline_name');
	const passengers = watch('passenger_data');
	const charges = watch('charge_data');

	const addPassenger = () => {
		const currentPassengers = watch('passenger_data') || [];
		setValue('passenger_data', [
			...currentPassengers,
			{
				type: 'ADT',
				firstName: '',
				middleName: '',
				lastName: '',
				dob: '',
			},
		]);
	};

	const removePassenger = (index) => {
		const currentPassengers = watch('passenger_data') || [];
		if (currentPassengers.length > 1) {
			const newPassengers = currentPassengers.filter((_, i) => i !== index);
			setValue('passenger_data', newPassengers);
		}
	};

	const addCharge = () => {
		const currentCharges = watch('charge_data') || [];
		setValue('charge_data', [
			...currentCharges,
			{
				amount: '',
				description: '',
			},
		]);
	};

	const removeCharge = (index) => {
		const currentCharges = watch('charge_data') || [];
		if (currentCharges.length > 1) {
			const newCharges = currentCharges.filter((_, i) => i !== index);
			setValue('charge_data', newCharges);
		}
	};
	const onSubmit = async (data) => {
		setIsSubmitting(true);

		try {
			const itineraryImageBase64 = itineraryImage || '';
			const attachmentsBase64 = attachments;

			// Prepare complete form data
			// Get user from auth context
			const completeData = {
				transactionType,
				userId: user.id,
				providerId,
				queueId,
				email: data.email,
				cchName: data.card_holder,
				billingPhone: data.phone,
				itinerary: itineraryImageBase64,
				attachments: attachmentsBase64,
				bookingData: { ...data, currency: currency },
			};

			// Create the booking using showPromiseToast
			await showPromiseToast(createReservationApi(completeData), {
				loading: 'Creating booking...',
				success: 'Booking created successfully!',
				error: 'Failed to create booking',
			});
		} catch (error) {
			console.error('Error creating booking:', error);
			setIsSubmitting(false);
		}
	};

	// Show validation errors using toast (recursive for nested errors)
	const showAllErrors = (formErrors) => {
		const show = (errObj) => {
			Object.values(errObj).forEach((err) => {
				if (err?.message) {
					toast.error(err.message);
				}
				if (err?.types) {
					Object.values(err.types).forEach((msg) => toast.error(msg));
				}
				if (err?.ref === undefined && typeof err === 'object') {
					show(err);
				}
			});
		};
		show(formErrors);
	};
	const onInvalid = (formErrors) => {
		showAllErrors(formErrors);
	};
	return (
		<div className="p-3 space-y-4">
			<div className="mb-4 p-3 rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700 shadow-xl">
				<form
					onSubmit={handleSubmit(onSubmit, onInvalid)}
					className="space-y-6 text-gray-300 text-sm"
					style={{ lineHeight: 2 }}
				>
					{/* this will become email subject */}
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-bold text-white flex items-center gap-2">
							<input
								{...register('airline_name')}
								className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-40 font-bold text-white mr-2"
								style={{ textTransform: 'uppercase' }}
								placeholder="Airline Name"
								value={airline}
								onChange={(e) => setValue('airline_name', e.target.value)}
							/>
							RESERVATION CONFIRMATION –
							<input
								{...register('pnr')}
								className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-32 font-bold text-white ml-2"
								style={{ minWidth: 60 }}
								value={pnr}
								onChange={(e) => {
									setValue('pnr', e.target.value);
								}}
								placeholder="PNR"
							/>
						</h2>
						<button
							type="button"
							onClick={onBack}
							className="px-3 py-1.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
						>
							Back
						</button>{' '}
					</div>
					<div className="space-y-6">
						<div className="p-3 border border-gray-700 rounded-lg">
							<div className="leading-loose">
								Dear
								<input
									{...register('customer_name')}
									className="bg-transparent border-0 border-b border-dashed border-gray-400 focus:border-blue-400 outline-none px-1 w-auto inline-block align-middle mx-1 text-white placeholder-gray-400"
									style={{ minWidth: 60 }}
									placeholder="Customer Name"
								/>
								,
							</div>
							<div className="leading-loose">Thank you for contacting us!</div>
							<div className="leading-loose">
								You can contact us on this number +1-877-413-0030 for any
								related request.
							</div>
							<div className="leading-loose">
								As per our conversation and as agreed, we have booked your
								reservation under Confirmation number
								<input
									{...register('pnr')}
									className="bg-transparent border-0 border-b border-dashed border-gray-400 focus:border-blue-400 outline-none px-1 w-auto inline-block align-middle mx-1 text-white placeholder-gray-400"
									style={{ minWidth: 60 }}
									value={pnr}
									onChange={(e) => {
										setValue('pnr', e.target.value);
									}}
									placeholder="PNR"
								/>
								on{' '}
								<input
									{...register('airline_name')}
									className="bg-transparent border-0 border-b border-dashed border-gray-400 focus:border-blue-400 outline-none px-1 w-auto inline-block align-middle mx-1 text-white placeholder-gray-400"
									style={{ minWidth: 60, textTransform: 'uppercase' }}
									placeholder="Airline Name"
									value={airline}
									onChange={(e) => setValue('airline_name', e.target.value)}
								/>{' '}
								with a charge of
								<input
									{...register('amount')}
									className="bg-transparent border-0 border-b border-dashed border-gray-400 focus:border-blue-400 outline-none px-1 w-auto inline-block align-middle mx-1 text-white placeholder-gray-400"
									style={{ minWidth: 40 }}
									placeholder="Amount"
								/>{' '}
								<select
									className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white ml-2"
									value={currency}
									onChange={(e) => setCurrency(e.target.value)}
								>
									{currencies && currencies.length > 0 ? (
										currencies.map((currency) => (
											<option key={currency.id} value={currency.Currency}>
												{currency.Currency}
											</option>
										))
									) : (
										<option value="">Select Currency</option>
									)}
								</select>{' '}
								(Including all taxes and fees) as per the below description.
								{/* Card Selector */}
							</div>
						</div>
						{/* Charges Description Section */}
						<ChargesDescription
							charges={charges}
							register={register}
							currency={currency}
							addCharge={addCharge}
							removeCharge={removeCharge}
						/>
						{/* Itinerary Details Section */}
						<ItineraryDetailsInput
							value={itineraryDetails}
							onChange={setItineraryDetails}
							image={itineraryImage}
							setImage={setItineraryImage}
							onImageClick={() => {
								setPreviewImage(itineraryImage);
								setShowPreview(true);
							}}
						/>
						{/* Passenger Details Section */}
						<PassengerDetails
							passengers={passengers}
							register={register}
							addPassenger={addPassenger}
							removePassenger={removePassenger}
						/>
						{/* Attachments Section */}
						<AttachmentsSection
							images={attachments}
							setImages={setAttachments}
							onPreview={(img) => {
								setPreviewImage(img);
								setShowPreview(true);
							}}
						/>{' '}
						{/* Purchase Summary Section */}
						<PurchaseSummary
							register={register}
							watch={watch}
							setValue={setValue}
							errors={errors}
						/>
						<div className="p-3 border border-gray-700 rounded-lg leading-loose">
							<p className="flex flex-wrap items-center gap-2">
								Make sure that the displayed flight information is as you
								planned. Please review the Names, Dates, Cities, and Departure –
								Arrival times properly
							</p>
						</div>{' '}
						{/* Authorization Section */}
						<AuthorizeSection
							cardholderName={watch('card_holder')}
							cardType={watch('payment_method')}
							cardNumber={watch('card_number')}
						/>
					</div>{' '}
					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isSubmitting ? 'Creating Booking...' : 'Create new Booking'}
					</button>
				</form>

				{showPreview && (
					<ImagePreviewModal
						isOpen={showPreview}
						onClose={() => setShowPreview(false)}
						imageUrl={previewImage}
					/>
				)}
			</div>
		</div>
	);
}

export default NewBooking;
