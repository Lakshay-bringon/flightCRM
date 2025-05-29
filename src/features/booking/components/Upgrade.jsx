import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ItineraryDetailsInput from "./ItineraryDetailsInput";
import ImagePreviewModal from "../ImagePreviewModal";
import ChargesDescription from "./ChargesDescription";
import PassengerDetails from "./PassengerDetails";
import PurchaseSummary from "./PurchaseSummary";
import AttachmentsSection from "./AttachmentsSection";
import AuthorizeSection from "./AuthorizeSection";
import { showPromiseToast } from "../../../utils/showPromiseToast";
import bookingService from "../services/bookingService";
import { bookingSchema } from "../schemas/bookingSchema";

function Upgrade({ initialData, onBack }) {
	const [itineraryDetails, setItineraryDetails] = useState("");
	const [itineraryImage, setItineraryImage] = useState(null);
	const [showPreview, setShowPreview] = useState(false);
	const [previewImage, setPreviewImage] = useState(null);
	const [attachments, setAttachments] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(bookingSchema),
		defaultValues: {
			bookingType: "UPGRADE",
			pnr: "",
			customerName: "",
			totalCost: "",
			cardType: "VISA",
			cardNumber: "",
			airline: "",
			date: new Date().toISOString().split("T")[0],
			email: "",
			phone: "",
			cardholderName: "",
			paymentMethod: "VISA",
			address: {
				streetAddress: "",
				locality: "",
				city: "",
				state: "",
				zip: "",
				country: "US",
			},
			passengers: [
				{
					type: "ADT",
					firstName: "",
					middleName: "",
					lastName: "",
					dob: "",
				},
			],
			charges: [
				{
					amount: "",
					merchant: "",
					currency: "USD",
				},
				{
					amount: "",
					merchant: "",
					currency: "USD",
				},
			],
			itineraryDetails: "",
			itineraryImage: "",
			attachments: [],
		},
	}); // Watch for form fields
	const pnr = watch("pnr");
	const bookingType = watch("bookingType");
	const airline = watch("airline");
	const cardType = watch("cardType");
	const cardNumber = watch("cardNumber");
	const passengers = watch("passengers");
	const charges = watch("charges");

	const addPassenger = () => {
		const currentPassengers = watch("passengers") || [];
		setValue("passengers", [
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
		const currentPassengers = watch("passengers") || [];
		if (currentPassengers.length > 1) {
			const newPassengers = currentPassengers.filter((_, i) => i !== index);
			setValue("passengers", newPassengers);
		}
	};

	const addCharge = () => {
		const currentCharges = watch("charges") || [];
		setValue("charges", [
			...currentCharges,
			{
				amount: "",
				merchant: "",
				currency: "USD",
			},
		]);
	};

	const removeCharge = (index) => {
		const currentCharges = watch("charges") || [];
		if (currentCharges.length > 1) {
			const newCharges = currentCharges.filter((_, i) => i !== index);
			setValue("charges", newCharges);
		}
	};

	// Helper function to convert file to base64
	const convertToBase64 = (file) => {
		return new Promise((resolve, reject) => {
			if (typeof file === "string") {
				resolve(file); // Already base64
				return;
			}
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	};

	const onSubmit = async (data) => {
		setIsSubmitting(true);

		try {
			// Convert images to base64 if they exist
			let itineraryImageBase64 = "";
			if (itineraryImage) {
				itineraryImageBase64 = await convertToBase64(itineraryImage);
			}

			const attachmentsBase64 = [];
			for (const attachment of attachments) {
				if (attachment) {
					const base64 = await convertToBase64(attachment);
					attachmentsBase64.push(base64);
				}
			}

			// Prepare complete form data
			const completeData = {
				...data,
				itineraryDetails,
				itineraryImage: itineraryImageBase64,
				attachments: attachmentsBase64,
			};

			// Create the booking using showPromiseToast
			await showPromiseToast(bookingService.createBooking(completeData), {
				loading: "Processing upgrade...",
				success: "Upgrade processed successfully!",
				error: "Failed to process upgrade",
			})
				.then(() => {
					navigate("/booking");
				})
				.catch((error) => {
					console.error("Error processing upgrade:", error);
				});
		} catch (error) {
			console.error("Error processing upgrade:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="p-3 max-w-4xl mx-auto">
			<div className="mb-4 p-4 rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700 shadow-xl">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold text-white flex items-center gap-2">
						<input
							{...register("airline")}
							className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-40 font-bold text-white mr-2"
							style={{ textTransform: "uppercase" }}
							placeholder="Airline Name"
							value={airline}
							onChange={(e) => setValue("airline", e.target.value)}
						/>
						UPGRADE CONFIRMATION –
						<input
							{...register("pnr")}
							className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-32 font-bold text-white ml-2"
						/>
					</h2>
					<button
						onClick={onBack}
						className="px-3 py-1.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
					>
						Back
					</button>
				</div>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-6 text-gray-300 text-sm"
					style={{ lineHeight: 2 }}
				>
					<div className="space-y-6">
						<div className="p-3 border border-gray-700 rounded-lg">
							<p className="leading-loose">
								Dear
								<input
									{...register("customerName")}
									className="bg-transparent border-0 border-b border-dashed border-gray-400 focus:border-blue-400 outline-none px-1 w-auto inline-block align-middle mx-1 text-white placeholder-gray-400"
									style={{ minWidth: 60 }}
									placeholder="Customer Name"
								/>
								,
							</p>
							<p className="leading-loose">Thank you for contacting us!</p>
							<p className="leading-loose">
								You can contact us on this number +1-877-413-0030 for any
								related request.
							</p>
							<p className="leading-loose">
								As per our conversation and as agreed, we have upgraded your
								seats from
								<select
									{...register("initialBookingClass")}
									className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-auto inline-block align-middle mx-1 text-white"
									defaultValue=""
								>
									<option value="">Select Class</option>
									<option value="ECONOMY">Economy</option>
									<option value="PREMIUM_ECONOMY">Premium Economy</option>
									<option value="BUSINESS">Business</option>
									<option value="FIRST">First</option>
								</select>
								class to
								<select
									{...register("upgradedClass")}
									className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-auto inline-block align-middle mx-1 text-white"
									defaultValue=""
								>
									<option value="">Select Class</option>
									<option value="ECONOMY">Economy</option>
									<option value="PREMIUM_ECONOMY">Premium Economy</option>
									<option value="BUSINESS">Business</option>
									<option value="FIRST">First</option>
								</select>
								class in your reservation under Confirmation Number
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
									{...register("airline")}
									className="bg-transparent border-0 border-b border-dashed border-gray-400 focus:border-blue-400 outline-none px-1 w-auto inline-block align-middle mx-1 text-white placeholder-gray-400"
									style={{ minWidth: 60, textTransform: "uppercase" }}
									placeholder="Airline Name"
									value={airline}
									onChange={(e) => setValue("airline", e.target.value)}
								/>{" "}
								with a charge of
								<input
									{...register("totalCost")}
									className="bg-transparent border-0 border-b border-dashed border-gray-400 focus:border-blue-400 outline-none px-1 w-auto inline-block align-middle mx-1 text-white placeholder-gray-400"
									style={{ minWidth: 40 }}
									placeholder="Amount"
								/>{" "}
								USD (Including all taxes and fees) as per the below description.
							</p>
						</div>

						{/* Charges Description Section */}
						<ChargesDescription
							charges={charges}
							register={register}
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

						{/* Purchase Summary Section */}
						<PurchaseSummary register={register} />

						{/* Attachments Section */}
						<AttachmentsSection
							images={attachments}
							setImages={setAttachments}
						/>

						<div className="p-3 border border-gray-700 rounded-lg leading-loose">
							<p className="flex flex-wrap items-center gap-2">
								Make sure that the displayed flight information is as you
								planned. Please review the Names, Dates, Cities, and Departure –
								Arrival times properly
							</p>
						</div>

						{/* Authorization Section */}
						<AuthorizeSection
							register={register}
							cardNumber={cardNumber}
							setValue={setValue}
						/>
					</div>

					<button
						type="submit"
						className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 text-sm"
					>
						Confirm Upgrade
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

export default Upgrade;
