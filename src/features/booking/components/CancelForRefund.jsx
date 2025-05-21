import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ItineraryDetailsInput from "./ItineraryDetailsInput";
import ImagePreviewModal from "../ImagePreviewModal";

function CancelForRefund({ initialData, onBack }) {
	const [passengers, setPassengers] = useState([{ id: 1 }]);
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
			cardNumber: "4444000000000000",
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
		},
	});

	// Watch for pnr, bookingType, airline, cardNumber, and cardType to keep them in sync in UI
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
						REFUND CONFIRMATION –
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
							You can contact us on this number +1-877-413-0030 for any related
							request.
						</p>
						<p className="leading-loose">
							As per our conversation and as agreed, We have cancelled your
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
								{...register("airline")}
								className="bg-transparent border-0 border-b border-dashed border-gray-400 focus:border-blue-400 outline-none px-1 w-auto inline-block align-middle mx-1 text-white placeholder-gray-400"
								style={{ minWidth: 60, textTransform: "uppercase" }}
								placeholder="Airline Name"
								value={airline}
								onChange={(e) => setValue("airline", e.target.value)}
							/>{" "}
							and will now submit the request to the airlines/consolidator to
							refund your ticket.
						</p>
						<p>
							Upon the airline's approval and after deducting all non-refundable
							amounts (base fare, penalties, taxes, and fees) as per fare rules,
							you will receive a total refund of USD{" "}
							<input
								{...register("totalCost")}
								className="bg-transparent border-0 border-b border-dashed border-gray-400 focus:border-blue-400 outline-none px-1 w-auto inline-block align-middle mx-1 text-white placeholder-gray-400"
								style={{ minWidth: 40 }}
								placeholder="Amount"
							/>{" "}
							to your original form of payment used.
						</p>{" "}
						<p>
							To process cancellation of your flights for a refund, there will
							be a new charge of USD{" "}
							<input
								{...register("totalCost")}
								className="bg-transparent border-0 border-b border-dashed border-gray-400 focus:border-blue-400 outline-none px-1 w-auto inline-block align-middle mx-1 text-white placeholder-gray-400"
								style={{ minWidth: 40 }}
								placeholder="Amount"
							/>{" "}
						</p>
						{/* Charges Description Section */}
						<div className="p-3 border border-gray-700 rounded-lg">
							<h3 className="font-semibold mb-2">Charges Description</h3>
							<table className="w-full text-sm border border-gray-700 rounded">
								<thead>
									<tr className="bg-gray-700 text-gray-200">
										<th className="px-2 py-2 text-left">Charge #</th>
										<th className="px-2 py-2 text-left">Amount</th>
										<th className="px-2 py-2 text-left">Description</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="px-2 py-2">1</td>
										<td className="px-2 py-2 flex items-center gap-1">
											<input
												{...register("charge1Amount")}
												className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-24"
												placeholder="Amount"
											/>
											<select
												{...register("charge1Currency")}
												className="bg-gray-700 border border-gray-600 rounded px-1 py-1 text-sm"
											>
												<option value="USD">USD</option>
												<option value="INR">INR</option>
												<option value="EUR">EUR</option>
												<option value="GBP">GBP</option>
											</select>
										</td>
										<td className="px-2 py-2">
											<input
												{...register("charge1Merchant")}
												className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full"
												placeholder="Description (Merchant Name)"
											/>
										</td>
									</tr>
									<tr>
										<td className="px-2 py-2">2</td>
										<td className="px-2 py-2 flex items-center gap-1">
											<input
												{...register("charge2Amount")}
												className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-24"
												placeholder="Amount"
											/>
											<select
												{...register("charge2Currency")}
												className="bg-gray-700 border border-gray-600 rounded px-1 py-1 text-sm"
											>
												<option value="USD">USD</option>
												<option value="INR">INR</option>
												<option value="EUR">EUR</option>
												<option value="GBP">GBP</option>
											</select>
										</td>
										<td className="px-2 py-2">
											<input
												{...register("charge2Merchant")}
												className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full"
												placeholder="Description (Merchant Name)"
											/>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
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
						<div className="p-3 border border-gray-700 rounded-lg">
							<div className="flex items-center justify-between mb-2">
								<h3 className="font-semibold">Passenger Details</h3>
								<button
									type="button"
									onClick={addPassenger}
									className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm"
								>
									<Plus className="w-4 h-4" />
									Add Passenger
								</button>
							</div>
							<div className="overflow-x-auto">
								<table className="w-full border-separate border-spacing-y-2">
									<thead>
										<tr className="text-left border-b border-gray-700 bg-gray-800">
											<th className="pr-2 pb-2">S. No.</th>
											<th className="px-2 pb-2">Type</th>
											<th className="px-2 pb-2">First Name</th>
											<th className="px-2 pb-2">Middle Name</th>
											<th className="px-2 pb-2">Last Name</th>
											<th className="pl-2 pb-2">DOB</th>
											<th className="pl-2 pb-2"></th>
										</tr>
									</thead>
									<tbody>
										{passengers.map((passenger, index) => (
											<tr
												key={passenger.id}
												className="border-b border-gray-700/50 bg-gray-900 rounded-lg shadow-sm"
											>
												<td className="py-2 px-2 font-semibold text-center">
													{index + 1}
												</td>
												<td className="py-2 px-2">
													<select
														{...register(`passengers.${index}.type`)}
														className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full cursor-pointer"
													>
														<option value="ADT">Adult</option>
														<option value="CHD">Child</option>
														<option value="INF">Infant</option>
													</select>
												</td>
												<td className="py-2 px-2">
													<input
														{...register(`passengers.${index}.firstName`)}
														className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full"
														placeholder="First Name"
													/>
												</td>
												<td className="py-2 px-2">
													<input
														{...register(`passengers.${index}.middleName`)}
														className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full"
														placeholder="Middle Name"
													/>
												</td>
												<td className="py-2 px-2">
													<input
														{...register(`passengers.${index}.lastName`)}
														className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full"
														placeholder="Last Name"
													/>
												</td>
												<td className="py-2 px-2">
													<div className="relative">
														<input
															type="date"
															{...register(`passengers.${index}.dob`)}
															className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full cursor-pointer"
															onClick={(e) => e.stopPropagation()}
														/>
													</div>
												</td>
												<td className="py-2 pl-2 text-center">
													{index > 0 && (
														<button
															type="button"
															onClick={() => removePassenger(index)}
															className="text-red-400 hover:text-red-300 transition-colors"
														>
															<X className="w-4 h-4" />
														</button>
													)}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
						{/* Purchase Summary Section */}
						<div className="p-3 border border-gray-700 rounded-lg">
							<h3 className="font-semibold mb-2">Purchase Summary</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
								<div>
									<label className="inline-block w-32">Card Holder:</label>
									<input
										{...register("cardholderName")}
										className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full md:w-60"
									/>
								</div>
								<div>
									<label className="inline-block w-32">Email:</label>
									<input
										type="email"
										{...register("email")}
										className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full md:w-60"
									/>
								</div>
								<div>
									<label className="inline-block w-32">Phone:</label>
									<input
										{...register("phone")}
										className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full md:w-60"
									/>
								</div>
								<div>
									<label className="inline-block w-32">Address:</label>
									<input
										{...register("billingAddress")}
										className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full md:w-60"
									/>
								</div>
								<div>
									<label className="inline-block w-32">Payment:</label>
									<select
										{...register("paymentMethod")}
										className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full md:w-60"
									>
										<option value="VISA">VISA</option>
										<option value="MASTER">MASTER</option>
										<option value="DISCOVER">DISCOVER</option>
										<option value="AMERICAN EXPRESS">AMERICAN EXPRESS</option>
									</select>
								</div>
								<div>
									<label className="inline-block w-32">Purchase Date:</label>
									<input
										type="date"
										{...register("date")}
										className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full md:w-60"
										readOnly
									/>
								</div>
							</div>
						</div>
						<div className="p-3 border border-gray-700 rounded-lg leading-loose">
							<p className="flex flex-wrap items-center gap-2">
								Make sure that the displayed flight information is as you
								planned. Please review the Names, Dates, Cities, and Departure –
								Arrival times properly
							</p>
						</div>
						{/* Authorization Section */}
						<div className="p-3 border border-gray-700 rounded-lg leading-loose">
							<p className="leading-loose">
								"I hereby certify that I,{" "}
								<input
									{...register("cardholderName")}
									className="bg-transparent border-0 border-b border-dashed border-gray-400 focus:border-blue-400 outline-none px-1 w-auto inline-block align-middle mx-1 text-white placeholder-gray-400"
									style={{ minWidth: 60 }}
									placeholder="Cardholder Name"
								/>
								, am the authorized user of the{" "}
								<select
									{...register("paymentMethod")}
									className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full md:w-60"
								>
									<option value="VISA">VISA</option>
									<option value="MASTER">MASTER</option>
									<option value="DISCOVER">DISCOVER</option>
									<option value="AMERICAN EXPRESS">AMERICAN EXPRESS</option>
								</select>{" "}
								card with number{" "}
								<input
									{...register("cardNumber")}
									className="bg-transparent border-0 border-b border-dashed border-gray-400 focus:border-blue-400 outline-none px-1 w-auto inline-block align-middle mx-1 text-white placeholder-gray-400"
									style={{ minWidth: 60 }}
									placeholder="Card Number"
									value={cardNumber}
									onChange={(e) => setValue("cardNumber", e.target.value)}
								/>
								, and I will not dispute the payment with my credit/debit card
								company or bank, as this amount is being charged for my personal
								travel."{" "}
								<p>
									Please confirm your acceptance of this declaration by
									selecting:
									<button
										type="button"
										className="inline-block align-middle px-4 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 text-sm font-semibold ml-2"
									>
										I Agree / I Authorize
									</button>
								</p>
							</p>
						</div>
					</div>

					<button
						type="submit"
						className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 text-sm"
					>
						Confirm Refund Request
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

export default CancelForRefund;
