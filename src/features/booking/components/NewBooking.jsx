import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation } from "react-router-dom";
import ItineraryDetailsInput from "./ItineraryDetailsInput";
import ImagePreviewModal from "../ImagePreviewModal";
import PurchaseSummary from "./PurchaseSummary";
import PassengerDetails from "./PassengerDetails";
import ChargesDescription from "./ChargesDescription";
import AttachmentsSection from "./AttachmentsSection";
import AuthorizeSection from "./AuthorizeSection";
import { useDataContext } from "../../../context/DataContext";
import { showPromiseToast } from "../../../utils/showPromiseToast";
import { createReservationApi } from "../../../api/booking/bookingApi.js";
import { bookingSchema } from "../schemas/bookingSchema";
import {
	generateBookingEmailHTML,
	downloadEmailHTML,
	previewEmailHTML,
} from "../../../utils/emailGenerator";
import toast from "react-hot-toast";

function NewBooking({ bookingData, onBack }) {
	// data prop will be used for autofilling the form in find booking
	const { currencies, cards, fetchCurrencies, fetchCards } = useDataContext();
	const location = useLocation();
	const { transactionType, providerId, queueId } = location.state || {};
	const navigate = useNavigate();

	React.useEffect(() => {
		fetchCards();
		fetchCurrencies();
	}, []);

	const [itineraryDetails, setItineraryDetails] = useState("");
	const [itineraryImage, setItineraryImage] = useState(null);
	const [showPreview, setShowPreview] = useState(false);
	const [previewImage, setPreviewImage] = useState(null);
	const [attachments, setAttachments] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [currency, setCurrency] = useState("USD");
	const [generatedBooking, setGeneratedBooking] = useState(null);
	const [showEmailActions, setShowEmailActions] = useState(false);
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(bookingSchema),
		defaultValues: {
			pnr: "",
			customer_name: "",
			amount: "",
			cardNumber: "",
			airline_name: "",
			purchase_date: new Date().toISOString().split("T")[0],
			email: "",
			phone: "",
			card_holder: "",
			payment_method: "VISA",

			billing_address: "",

			city: "",
			state: "",
			zip: "",
			country: "US",

			passenger_data: [
				{
					type: "ADT",
					firstName: "",
					middleName: "",
					lastName: "",
					dob: "",
				},
			],
			charge_data: [
				{
					amount: "",
					description: "",
				},
				{
					amount: "",
					description: "",
				},
			],

			image_itinerary: "",
			attachments: [],
		},
	}); // Watch for form fields
	const pnr = watch("pnr");
	const airline = watch("airline_name");
	const passengers = watch("passenger_data");
	const charges = watch("charge_data");

	const addPassenger = () => {
		const currentPassengers = watch("passenger_data") || [];
		setValue("passenger_data", [
			...currentPassengers,
			{
				type: "ADT",
				firstName: "",
				middleName: "",
				lastName: "",
				dob: "",
			},
		]);
	};

	const removePassenger = (index) => {
		const currentPassengers = watch("passenger_data") || [];
		if (currentPassengers.length > 1) {
			const newPassengers = currentPassengers.filter((_, i) => i !== index);
			setValue("passenger_data", newPassengers);
		}
	};

	const addCharge = () => {
		const currentCharges = watch("charge_data") || [];
		setValue("charge_data", [
			...currentCharges,
			{
				amount: "",
				description: "",
			},
		]);
	};

	const removeCharge = (index) => {
		const currentCharges = watch("charge_data") || [];
		if (currentCharges.length > 1) {
			const newCharges = currentCharges.filter((_, i) => i !== index);
			setValue("charge_data", newCharges);
		}
	};
	const onSubmit = async (data) => {
		setIsSubmitting(true);
		console.log("Validation successful, submitting data...");
		console.log("Form data:", data);

		try {
			// No need to convert images to base64, already base64
			const itineraryImageBase64 = itineraryImage || "";
			const attachmentsBase64 = attachments;

			// Prepare complete form data
			const completeData = {
				transactionType,
				providerId,
				queueId,
				...data,
				image_itinerary: itineraryImageBase64,
				attachments: attachmentsBase64,
				currency: currency, // Add selected currency
			};

			// Create the booking using showPromiseToast
			await showPromiseToast(createReservationApi(completeData), {
				loading: "Creating booking...",
				success: "Booking created successfully!",
				error: "Failed to create booking",
			});

			// Store the booking data for email generation
			setGeneratedBooking(completeData);
			setShowEmailActions(true);

			// Generate email HTML automatically after successful booking
			try {
				const emailHTML = generateBookingEmailHTML(completeData);
				console.log("Email HTML generated successfully");
			} catch (emailError) {
				console.error("Error generating email:", emailError);
				toast.error("Booking created but email generation failed");
			}
		} catch (error) {
			console.error("Error creating booking:", error);
		} finally {
			console.log("Submission complete");
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
				if (err?.ref === undefined && typeof err === "object") {
					show(err);
				}
			});
		};
		show(formErrors);
	};
	const onInvalid = (formErrors) => {
		showAllErrors(formErrors);
	};

	// Email generation functions
	const handleDownloadEmail = () => {
		try {
			const emailHTML = generateBookingEmailHTML(generatedBooking);
			const filename = `${generatedBooking.airline_name || "airline"}-${
				generatedBooking.pnr || "booking"
			}-confirmation.html`;
			downloadEmailHTML(emailHTML, filename);
			toast.success("Email HTML downloaded successfully!");
		} catch (error) {
			console.error("Error downloading email:", error);
			toast.error("Failed to download email HTML");
		}
	};
	const handlePreviewEmail = () => {
		try {
			const emailHTML = generateBookingEmailHTML(generatedBooking);
			previewEmailHTML(emailHTML);
			toast.success("Email preview opened in new window");
		} catch (error) {
			console.error("Error previewing email:", error);
			toast.error("Failed to preview email");
		}
	};

	const handleGenerateNewEmail = () => {
		try {
			const emailHTML = generateBookingEmailHTML(generatedBooking);
			console.log("Email HTML regenerated");
			toast.success("Email HTML regenerated successfully!");
		} catch (error) {
			console.error("Error regenerating email:", error);
			toast.error("Failed to regenerate email HTML");
		}
	};

	return (
		<div className="p-3 max-w-4xl mx-auto">
			<div className="mb-4 p-4 rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700 shadow-xl">
				<form
					onSubmit={handleSubmit(onSubmit, onInvalid)}
					className="space-y-6 text-gray-300 text-sm"
					style={{ lineHeight: 2 }}
				>
					{/* this will become email subject */}
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-bold text-white flex items-center gap-2">
							<input
								{...register("airline_name")}
								className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-40 font-bold text-white mr-2"
								style={{ textTransform: "uppercase" }}
								placeholder="Airline Name"
								value={airline}
								onChange={(e) => setValue("airline_name", e.target.value)}
							/>
							RESERVATION CONFIRMATION –
							<input
								{...register("pnr")}
								className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-32 font-bold text-white ml-2"
								style={{ minWidth: 60 }}
								value={pnr}
								onChange={(e) => {
									setValue("pnr", e.target.value);
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
						</button>{" "}
					</div>
					<div className="space-y-6">
						<div className="p-3 border border-gray-700 rounded-lg">
							<div className="leading-loose">
								Dear
								<input
									{...register("customer_name")}
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
									{...register("pnr")}
									className="bg-transparent border-0 border-b border-dashed border-gray-400 focus:border-blue-400 outline-none px-1 w-auto inline-block align-middle mx-1 text-white placeholder-gray-400"
									style={{ minWidth: 60 }}
									value={pnr}
									onChange={(e) => {
										setValue("pnr", e.target.value);
									}}
									placeholder="PNR"
								/>
								on{" "}
								<input
									{...register("airline_name")}
									className="bg-transparent border-0 border-b border-dashed border-gray-400 focus:border-blue-400 outline-none px-1 w-auto inline-block align-middle mx-1 text-white placeholder-gray-400"
									style={{ minWidth: 60, textTransform: "uppercase" }}
									placeholder="Airline Name"
									value={airline}
									onChange={(e) => setValue("airline_name", e.target.value)}
								/>{" "}
								with a charge of
								<input
									{...register("amount")}
									className="bg-transparent border-0 border-b border-dashed border-gray-400 focus:border-blue-400 outline-none px-1 w-auto inline-block align-middle mx-1 text-white placeholder-gray-400"
									style={{ minWidth: 40 }}
									placeholder="Amount"
								/>{" "}
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
								</select>{" "}
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
						/>{" "}
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
						</div>{" "}
						{/* Authorization Section */}
						<AuthorizeSection
							cardholderName={watch("card_holder")}
							cardType={watch("payment_method")}
							cardNumber={watch("card_number")}
						/>
					</div>{" "}
					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isSubmitting ? "Creating Booking..." : "Create new Booking"}
					</button>
				</form>

				{/* Email Generation Actions */}
				{showEmailActions && generatedBooking && (
					<div className="mt-6 p-4 bg-gray-800/70 rounded-lg border border-gray-600">
						<h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
							<svg
								className="w-5 h-5 text-green-400"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clipRule="evenodd"
								/>
							</svg>
							Booking Created Successfully! Generate Email
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<button
								onClick={handlePreviewEmail}
								className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 text-sm flex items-center justify-center gap-2"
							>
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									/>
								</svg>
								Preview Email
							</button>
							<button
								onClick={handleDownloadEmail}
								className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-green-500/25 text-sm flex items-center justify-center gap-2"
							>
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									/>
								</svg>
								Download HTML
							</button>
							<button
								onClick={handleGenerateNewEmail}
								className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-orange-500/25 text-sm flex items-center justify-center gap-2"
							>
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
									/>
								</svg>
								Regenerate Email
							</button>
						</div>
						<div className="mt-4 text-sm text-gray-400">
							<p>
								• <strong>Preview Email:</strong> Opens the generated email in a
								new window for review
							</p>
							<p>
								• <strong>Download HTML:</strong> Downloads the email as an HTML
								file you can send or save
							</p>
							<p>
								• <strong>Regenerate Email:</strong> Creates a fresh email
								template with current form data
							</p>
						</div>
					</div>
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

export default NewBooking;
