import React from "react";
import BookingComponent from "./BookingComponent.jsx";
import ChargesDescription from "./ChargesDescription.jsx";
import ItineraryDetailsInput from "./ItineraryDetailsInput.jsx";
import PurchaseSummary from "./PurchaseSummary.jsx";
import AttachmentsSection from "./AttachmentsSection.jsx";
import AuthorizeSection from "./AuthorizeSection.jsx";
import exchangeSchema from "../schemas/exchangeSchema.js";

function Exchange({ bookingData, onBack }) {
	// The actual form content - now with aligned field names
	const ExchangeForm = ({
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
		itineraryImage,
		setItineraryImage,
		showPreview,
		setShowPreview,
		previewImage,
		setPreviewImage,
		attachments,
		setAttachments,
		addCharge,
		removeCharge,
		onBack,
		isEditMode,
		type,
	}) => {
		// Watch values for dynamic updates - using the correct field names
		const pnr = watch("pnr");
		const airline = watch("airline_name");
		const cardNumber = watch("cardNumber");

		return (
			<>
				<div className="flex justify-between items-center mb-4">
					<h2
						className={`text-xl font-bold text-white flex items-center gap-2 ${
							isEditMode ? "justify-center w-full" : ""
						}`}
					>
						<input
							{...register("airline_name")} // Using the schema-matched field name
							className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-40 font-bold text-white mr-2"
							style={{ textTransform: "uppercase" }}
							placeholder="Airline Name"
							value={airline}
							onChange={(e) => setValue("airline_name", e.target.value)}
						/>
						EXCHANGE CONFIRMATION –
						<input
							{...register("pnr")}
							className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-32 font-bold text-white ml-2"
							style={{ minWidth: 60 }}
							value={pnr}
							onChange={(e) => setValue("pnr", e.target.value)}
							placeholder="PNR"
						/>
					</h2>
					{!isEditMode && (
						<button
							onClick={onBack}
							className="px-3 py-1.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
						>
							Back
						</button>
					)}
				</div>

				<form
					onSubmit={handleSubmit(onSubmit, onInvalid)}
					className="space-y-6 text-gray-300 text-sm"
					style={{ lineHeight: 2 }}
				>
					<div className="space-y-6">
						<div className="p-3 border border-gray-700 rounded-lg">
							<div className="leading-loose">
								Dear
								<input
									{...register("customer_name")} // Using the schema-matched field name
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
									{...register("airline_name")}
									className="bg-transparent border-0 border-b border-dashed border-gray-400 focus:border-blue-400 outline-none px-1 w-auto inline-block align-middle mx-1 text-white placeholder-gray-400"
									style={{ minWidth: 60, textTransform: "uppercase" }}
									placeholder="Airline Name"
									value={airline}
									onChange={(e) => setValue("airline_name", e.target.value)}
								/>{" "}
								with a charge of
								<input
									{...register("amount")} // Using the schema-matched field name
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
							</div>
						</div>
						<ChargesDescription
							charges={watch("charge_data")}
							register={register}
							currency={currency}
							addCharge={addCharge}
							removeCharge={removeCharge}
						/>{" "}
						<ItineraryDetailsInput
							image={itineraryImage}
							setImage={setItineraryImage}
							onImageClick={() => {
								setPreviewImage(itineraryImage);
								setShowPreview(true);
							}}
						/>
						<PurchaseSummary
							register={register}
							watch={watch}
							setValue={setValue}
							errors={errors}
						/>
						<AttachmentsSection
							images={attachments}
							setImages={setAttachments}
							onPreview={(img) => {
								setPreviewImage(img);
								setShowPreview(true);
							}}
						/>
						<div className="p-3 border border-gray-700 rounded-lg leading-loose">
							<div className="flex flex-wrap items-center gap-2">
								Make sure that the displayed flight information is as you
								planned. Please review the Names, Dates, Cities, and Departure –
								Arrival times properly
							</div>
						</div>
						<AuthorizeSection
							register={register}
							cardNumber={cardNumber}
							setValue={setValue}
						/>
					</div>{" "}
					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isSubmitting
							? isEditMode
								? "Updating Exchange..."
								: "Processing Exchange..."
							: isEditMode
							? "Update"
							: "Confirm Exchange"}
					</button>
				</form>
			</>
		);
	};
	return (
		<BookingComponent
			defaultValues={bookingData}
			onBack={onBack}
			type="EXCHANGE"
			schema={exchangeSchema} // Use the exchange-specific schema
			loadingMessage={
				bookingData ? "Updating exchange..." : "Creating exchange..."
			}
			successMessage={
				bookingData
					? "Exchange updated successfully!"
					: "Exchange created successfully!"
			}
			errorMessage={
				bookingData ? "Failed to update exchange" : "Failed to create exchange"
			}
			isEditMode={!!bookingData}
		>
			<ExchangeForm />
		</BookingComponent>
	);
}

export default Exchange;
