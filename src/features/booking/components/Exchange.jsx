import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ItineraryDetailsInput from "./ItineraryDetailsInput";
import ImagePreviewModal from "../ImagePreviewModal";
import ChargesDescription from "./ChargesDescription";
import PassengerDetails from "./PassengerDetails";
import PurchaseSummary from "./PurchaseSummary";
import AttachmentsSection from "./AttachmentsSection";
import AuthorizeSection from "./AuthorizeSection";

function Exchange({ initialData, onBack }) {
	const [passengers, setPassengers] = useState([{ id: 1 }]);
	const [charges, setCharges] = useState([{ id: 1 }, { id: 2 }]);
	const [attachments, setAttachments] = useState([]);
	const [itineraryDetails, setItineraryDetails] = useState("");
	const [itineraryImage, setItineraryImage] = useState(null);
	const [showPreview, setShowPreview] = useState(false);
	const [previewImage, setPreviewImage] = useState(null);
	const navigate = useNavigate();

	const { register, handleSubmit, watch, setValue } = useForm({
		defaultValues: {
			bookingType: "NEW BOOKING",
			pnr: "",
			customerName: "",
			totalCost: "",
			cardType: "VISA",
			cardNumber: "",
			chargeAmount: "",
			airline: "",
			date: new Date().toISOString().split("T")[0],
			email: "",
			phone: "",
			billingAddress: "",
			paymentMethod: "VISA",
			charge1Amount: "",
			charge1Merchant: "",
			charge1Currency: "USD",
			charge2Amount: "",
			charge2Merchant: "",
			charge2Currency: "USD",
			authorizer: "MARTIN F HOFFMAN",
			passengers: [{}],
			address: {
				street: "",
				city: "",
				state: "",
				zip: "",
			},
			charges: [
				{ amount: "", currency: "USD", merchant: "" },
				{ amount: "", currency: "USD", merchant: "" },
			],
		},
	});

	const pnr = watch("pnr");
	const bookingType = watch("bookingType");
	const airline = watch("airline");
	const cardNumber = watch("cardNumber");
	const cardType = watch("cardType");

	const addPassenger = () => {
		const newId = passengers.length + 1;
		setPassengers([...passengers, { id: newId }]);
	};

	const removePassenger = (index) => {
		if (passengers.length > 1) {
			setPassengers(passengers.filter((_, i) => i !== index));
		}
	};

	const addCharge = () => {
		setCharges([...charges, { id: Date.now() }]);
	};

	const removeCharge = (index) => {
		if (charges.length > 1) {
			setCharges(charges.filter((_, i) => i !== index));
		}
	};

	const onSubmit = (data) => {
		const type = data.bookingType || "NEW BOOKING";
		if (type === "NEW BOOKING") {
			navigate("/transaction/new-booking", { state: data });
		} else if (type === "CHANGE BOOKING") {
			navigate("/transaction/change-booking", { state: data });
		} else if (type === "CANCEL BOOKING") {
			navigate("/transaction/cancel-booking", { state: data });
		} else {
			console.log(data);
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
						EXCHANGE CONFIRMATION –
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
								As per our conversation and as agreed, we have made the changes
								to your reservation under Confirmation number
								<input
									{...register("pnr")}
									className="bg-transparent border-0 border-b border-dashed border-gray-400 focus:border-blue-400 outline-none px-1 w-auto inline-block align-middle mx-1 text-white placeholder-gray-400"
									style={{ minWidth: 60 }}
									value={pnr}
									onChange={(e) => setValue("pnr", e.target.value)}
									placeholder="PNR"
								/>
								on
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
						<ChargesDescription
							charges={charges}
							register={register}
							addCharge={addCharge}
							removeCharge={removeCharge}
						/>
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
						<PurchaseSummary register={register} />
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
						Confirm Exchange
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

export default Exchange;
