import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useLocation } from 'react-router-dom';
import ImagePreviewModal from '../ImagePreviewModal.jsx';
import { useDataContext } from '../../../context/DataContext.jsx';
import { showPromiseToast } from '../../../utils/showPromiseToast.js';
import {
	createReservationApi,
	updateBookingApi,
} from '../../../api/booking/bookingApi.js';
import { bookingSchema } from '../schemas/bookingSchema.js';
import toast from 'react-hot-toast';
import { useAuth } from '../../../auth/hooks/useAuth.jsx';
import { processBookingImagesForApi } from '../../../utils/imageUtils.js';

/**
 * BookingFormWrapper - A reusable component that handles all the common booking logic
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The form content to be rendered
 * @param {Object} props.defaultValues - Default values for the form
 * @param {Function} props.onBack - Function to execute when back button is clicked
 * @param {String} props.type - Type of the booking (e.g., 'NEW BOOKING', 'EXCHANGE', 'UPGRADE')
 * @param {String} props.loadingMessage - Message to show during API call
 * @param {String} props.successMessage - Message to show on success
 * @param {String} props.errorMessage - Message to show on error
 * @param {Object} props.schema - Custom Zod schema for form validation
 * @param {Boolean} props.isEditMode - Whether component is in edit mode (when bookingData is provided)
 */
function BookingComponent({
	children,
	defaultValues,
	onBack,
	type = 'NEW BOOKING',
	loadingMessage = 'Processing...',
	successMessage = 'Processed successfully!',
	errorMessage = 'Processing failed',
	schema = bookingSchema, // Use the base bookingSchema as default
	isEditMode = false,
}) {
	const { currencies, cards, fetchCurrencies, fetchCards } = useDataContext();
	const location = useLocation();
	const { transactionType, providerId, queueId } = location.state || {};
	const navigate = useNavigate();
	const { user } = useAuth();
	React.useEffect(() => {
		fetchCards();
		fetchCurrencies();
	}, []);
	// Use defaultValues directly without transformation since they already have the correct field names
	const formDefaultValues = React.useMemo(() => {
		if (!defaultValues) return null;

		return defaultValues;
	}, [defaultValues]);

	// State management
	const [itineraryDetails, setItineraryDetails] = useState('');
	const [itineraryImage, setItineraryImage] = useState(null);
	const [showPreview, setShowPreview] = useState(false);
	const [previewImage, setPreviewImage] = useState(null);
	const [attachments, setAttachments] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [currency, setCurrency] = useState('USD'); // Form setup
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema), // Use the passed schema instead of hardcoding bookingSchema
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
	});

	// Initialize state from form default values when available
	React.useEffect(() => {
		if (formDefaultValues) {
			// Reset form with the new data
			reset(formDefaultValues);

			// Set itinerary details and attachments state
			setItineraryDetails(formDefaultValues.itinerary_details || '');
			setAttachments(formDefaultValues.attachments || []);

			if (formDefaultValues.currency) {
				setCurrency(formDefaultValues.currency);
			}
		}
	}, [formDefaultValues, reset]);

	// Passenger management
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

	// Charge management
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
	}; // Form submission
	const onSubmit = async (data) => {
		if (!user) {
			toast.error(
				`You must be logged in to ${isEditMode ? 'update' : 'create'} a ${type}`
			);
			return;
		}

		setIsSubmitting(true);

		try {
			// Process images to ensure proper format for API
			console.log('Processing images for API submission...');
			const processedImages = await processBookingImagesForApi({
				itineraryImage,
				attachments,
				itineraryDetails,
			});

			console.log('Processed images:', {
				itinerary: processedImages.itinerary ? 'converted' : 'not provided',
				attachments: processedImages.attachments.length,
			});

			if (isEditMode) {
				// In edit mode, use bid instead of providerId/queueId/transactionType
				const updateData = {
					bid: defaultValues?.BID || defaultValues?.bid,
					userId: user.id, // Add missing userId field
					email: data.email,
					cchName: data.card_holder,
					billingPhone: data.phone,
					itinerary: processedImages.itinerary,
					attachments: processedImages.attachments,
					bookingData: { ...data, currency: currency },
				};

				console.log('Update booking data being sent:', {
					...updateData,
					itinerary: updateData.itinerary ? 'base64 data' : 'none',
					attachments: `${updateData.attachments.length} attachments`,
				});

				await showPromiseToast(updateBookingApi(updateData), {
					loading: loadingMessage,
					success: successMessage,
					error: (err) => {
						console.error('Update booking error:', err);
						return err.message || errorMessage;
					},
				});
			} else {
				// Normal create mode
				const completeData = {
					transactionType,
					userId: user.id,
					providerId,
					queueId,
					email: data.email,
					cchName: data.card_holder,
					billingPhone: data.phone,
					itinerary: processedImages.itinerary,
					attachments: processedImages.attachments,
					bookingData: { ...data, currency: currency },
				};

				console.log('Create booking data being sent:', {
					...completeData,
					itinerary: completeData.itinerary ? 'base64 data' : 'none',
					attachments: `${completeData.attachments.length} attachments`,
				});

				await showPromiseToast(createReservationApi(completeData), {
					loading: loadingMessage,
					success: successMessage,
					error: (err) => {
						console.error('Create booking error:', err);
						return err.message || errorMessage;
					},
				});
			} // setIsSubmitting(true); // Keep button disabled after successful creation/update
		} catch (error) {
			console.error(
				`Error ${isEditMode ? 'updating' : 'creating'} ${type}:`,
				error
			);

			// Handle specific API validation errors
			if (error.message && error.message.includes('Validation errors:')) {
				toast.error(error.message);
			} else if (error.message) {
				toast.error(error.message);
			} else {
				toast.error(`Failed to ${isEditMode ? 'update' : 'create'} ${type}`);
			}

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
	// Create props to pass to the children
	const childrenProps = {
		register,
		handleSubmit,
		watch,
		setValue,
		errors,
		onSubmit,
		onInvalid,
		isSubmitting,
		currencies,
		currency,
		setCurrency,
		itineraryDetails,
		setItineraryDetails,
		itineraryImage,
		setItineraryImage,
		showPreview,
		setShowPreview,
		previewImage,
		setPreviewImage,
		attachments,
		setAttachments,
		addPassenger,
		removePassenger,
		addCharge,
		removeCharge,
		onBack,
		isEditMode,
		type,
	}; // Render the wrapper with children components
	return (
		<div className="p-3 space-y-4" data-form-section="true">
			<div className="mb-4 p-3 rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700 shadow-xl">
				{React.Children.map(children, (child) =>
					React.cloneElement(child, { ...childrenProps })
				)}

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

export default BookingComponent;
