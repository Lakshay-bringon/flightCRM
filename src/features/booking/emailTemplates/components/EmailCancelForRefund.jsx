import React from "react";

// Utility function to handle different image sources
const getImageSrc = (imageData, baseUrl = "") => {
	if (!imageData) return null;

	// If it's already a complete URL (http/https)
	if (imageData.startsWith("http://") || imageData.startsWith("https://")) {
		return imageData;
	}

	// If it's a relative path, construct full URL
	const baseRoute = import.meta.env.VITE_UPLOADS_BASE_URL || baseUrl;
	return `${baseRoute}${imageData}`;
};

const EmailCancelForRefund = ({ bookingData = {} }) => {
	// Destructure props with extensive fallback values
	const {
		airline_name = "AIRLINE NAME",
		confirmation_number = "",
		pnr = "",
		customer_name = "Customer Name",
		passenger_name = "",
		email = "customer@email.com",
		phone = "+1 (XXX) XXX-XXXX",
		card_holder = "CARD HOLDER NAME",
		card_number = "",
		payment_method = "VISA",
		purchase_date = new Date().toLocaleDateString(),
		billing_address = "",
		city = "",
		state = "",
		zip_code = "",
		country = "",

		// Refund specific details
		refund_amount = "XXX.XX",
		cancellation_charge = "XXX.XX",
		charge_1_amount = "XXX.00",
		currency = "USD",

		// Passenger details
		passenger_data = [],
		// Images
		refund_details_image = "",
		images = [],
		itinerary_details = "",

		// Additional details
		total_amount = "XXX.XX",
	} = bookingData;

	// Generate fallback values
	const finalPnr = pnr || confirmation_number || "PNR";
	const displayPassengerName =
		passenger_name || customer_name || "Customer Name";
	return (
		<div>
			<div
				style={{
					maxWidth: "896px",
					margin: "0 auto",
					background: "rgba(31, 41, 55, 0.5)",
					backdropFilter: "blur(16px)",
					border: "1px solid #374151",
					borderRadius: "12px",
					boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
					overflow: "hidden",
				}}
			>
				<div
					style={{
						padding: "24px",
					}}
				>
					{" "}
					{/* Header */}
					<div
						style={{
							textAlign: "center",
							marginBottom: "24px",
						}}
					>
						<h1
							style={{
								color: "#ffffff",
								fontSize: "20px",
								fontWeight: "700",
								lineHeight: "1.4",
								margin: "0",
							}}
						>
							<span
								style={{
									background: "transparent",
									border: "0",
									borderBottom: "1px dashed #6b7280",
									color: "#ffffff",
									fontWeight: "700",
									textTransform: "uppercase",
									padding: "0 4px",
									outline: "none",
									display: "inline",
								}}
							>
								{airline_name}
							</span>{" "}
							Refund Confirmation –{" "}
							<span
								style={{
									background: "transparent",
									border: "0",
									borderBottom: "1px dashed #6b7280",
									color: "#ffffff",
									fontWeight: "700",
									textTransform: "uppercase",
									padding: "0 4px",
									outline: "none",
									display: "inline",
								}}
							>
								{finalPnr}
							</span>
						</h1>
					</div>{" "}
					{/* Introduction */}
					<div
						style={{
							background: "#1f2937",
							border: "1px solid #374151",
							borderRadius: "8px",
							padding: "16px",
							marginBottom: "24px",
						}}
					>
						<div
							style={{
								color: "#d1d5db",
								lineHeight: "1.6",
								marginBottom: "16px",
							}}
						>
							<p
								style={{
									marginBottom: "12px",
									margin: "0 0 12px 0",
								}}
							>
								Dear {displayPassengerName},
							</p>
							<p
								style={{
									marginBottom: "12px",
									margin: "0 0 12px 0",
								}}
							>
								Thank you for contacting us!
							</p>
							<p
								style={{
									marginBottom: "12px",
									margin: "0 0 12px 0",
								}}
							>
								You can contact us on this number +1-877-413-0030 for any
								related request.
							</p>
							<p
								style={{
									marginBottom: "12px",
									margin: "0 0 12px 0",
								}}
							>
								As per our conversation and as agreed, we have cancelled your
								reservation under {finalPnr} booked on {airline_name} and will
								now submit the request to the airlines/consolidator to refund
								your ticket.
							</p>
							<p
								style={{
									marginBottom: "12px",
									margin: "0 0 12px 0",
								}}
							>
								Upon the airline's approval and after deducting all
								non-refundable amounts (base fare, penalties, taxes, and fees)
								as per fare rules, you will receive a total refund of {currency}{" "}
								{refund_amount} to your original form of payment used.
							</p>
							<p
								style={{
									marginBottom: "12px",
									margin: "0 0 12px 0",
								}}
							>
								To process cancellation of your flights for a refund, there will
								be a new charge of {currency} {cancellation_charge}
							</p>
						</div>
					</div>{" "}
					{/* Charges Description */}
					<div
						style={{
							background: "#1f2937",
							border: "1px solid #374151",
							borderRadius: "8px",
							padding: "16px",
							marginBottom: "24px",
						}}
					>
						<div
							style={{
								color: "#ffffff",
								fontSize: "16px",
								fontWeight: "600",
								marginBottom: "16px",
								paddingBottom: "8px",
								borderBottom: "1px solid #374151",
							}}
						>
							Charges Description
						</div>
						<table
							style={{
								width: "100%",
								borderCollapse: "collapse",
								margin: "16px 0",
								background: "#111827",
								border: "1px solid #374151",
								borderRadius: "8px",
								overflow: "hidden",
							}}
						>
							<tbody>
								<tr>
									<td
										style={{
											padding: "12px 16px",
											textAlign: "left",
											borderBottom: "1px solid #374151",
											color: "#d1d5db",
											fontSize: "14px",
										}}
									>
										<strong>Charge 1:</strong>
									</td>
									<td
										style={{
											padding: "12px 16px",
											textAlign: "left",
											borderBottom: "none",
											color: "#d1d5db",
											fontSize: "14px",
										}}
									>
										{currency} {charge_1_amount} (Charged on our merchant)
									</td>
								</tr>
							</tbody>
						</table>
					</div>{" "}
					{/* Refund Details Image */}
					{refund_details_image && (
						<div
							style={{
								background: "#1f2937",
								border: "1px solid #374151",
								borderRadius: "8px",
								padding: "16px",
								marginBottom: "24px",
							}}
						>
							<div
								style={{
									color: "#ffffff",
									fontSize: "16px",
									fontWeight: "600",
									marginBottom: "16px",
									paddingBottom: "8px",
									borderBottom: "1px solid #374151",
								}}
							>
								Refund Details
							</div>
							<div
								style={{
									background: "#111827",
									border: "1px solid #374151",
									borderRadius: "8px",
									padding: "12px",
									textAlign: "center",
									margin: "16px 0",
								}}
							>
								{refund_details_image ? (
									<img
										src={getImageSrc(refund_details_image)}
										alt="Refund Details"
										style={{
											maxWidth: "100%",
											height: "auto",
											borderRadius: "4px",
										}}
										onError={(e) => {
											e.target.style.display = "none";
											e.target.nextSibling.style.display = "block";
										}}
									/>
								) : null}
								<div
									style={{
										display: "none",
										background: "#374151",
										color: "#9ca3af",
										padding: "40px 20px",
										borderRadius: "4px",
										fontSize: "14px",
									}}
								>
									Refund Details IMAGE
								</div>
							</div>
						</div>
					)}{" "}
					{/* Passengers Details */}
					<div
						style={{
							background: "#1f2937",
							border: "1px solid #374151",
							borderRadius: "8px",
							padding: "16px",
							marginBottom: "24px",
						}}
					>
						<div
							style={{
								color: "#ffffff",
								fontSize: "16px",
								fontWeight: "600",
								marginBottom: "16px",
								paddingBottom: "8px",
								borderBottom: "1px solid #374151",
							}}
						>
							PASSENGERS DETAILS:
						</div>
						{passenger_data && passenger_data.length > 0 ? (
							<table
								style={{
									width: "100%",
									borderCollapse: "collapse",
									margin: "16px 0",
									background: "#111827",
									border: "1px solid #374151",
									borderRadius: "8px",
									overflow: "hidden",
								}}
							>
								<thead>
									<tr>
										<th
											style={{
												padding: "12px 16px",
												textAlign: "left",
												borderBottom: "1px solid #374151",
												background: "#1f2937",
												color: "#ffffff",
												fontWeight: "600",
												fontSize: "14px",
											}}
										>
											Passenger Name
										</th>
										<th
											style={{
												padding: "12px 16px",
												textAlign: "left",
												borderBottom: "1px solid #374151",
												background: "#1f2937",
												color: "#ffffff",
												fontWeight: "600",
												fontSize: "14px",
											}}
										>
											Date of Birth
										</th>
										<th
											style={{
												padding: "12px 16px",
												textAlign: "left",
												borderBottom: "1px solid #374151",
												background: "#1f2937",
												color: "#ffffff",
												fontWeight: "600",
												fontSize: "14px",
											}}
										>
											Gender
										</th>
									</tr>
								</thead>
								<tbody>
									{passenger_data.map((passenger, index) => (
										<tr key={index}>
											<td
												style={{
													padding: "12px 16px",
													textAlign: "left",
													borderBottom:
														index === passenger_data.length - 1
															? "none"
															: "1px solid #374151",
													color: "#d1d5db",
													fontSize: "14px",
												}}
											>{`${passenger.firstName || ""} ${
												passenger.lastName || ""
											}`}</td>
											<td
												style={{
													padding: "12px 16px",
													textAlign: "left",
													borderBottom:
														index === passenger_data.length - 1
															? "none"
															: "1px solid #374151",
													color: "#d1d5db",
													fontSize: "14px",
												}}
											>
												{passenger.dateOfBirth || "Not provided"}
											</td>
											<td
												style={{
													padding: "12px 16px",
													textAlign: "left",
													borderBottom:
														index === passenger_data.length - 1
															? "none"
															: "1px solid #374151",
													color: "#d1d5db",
													fontSize: "14px",
												}}
											>
												{passenger.gender || "Not provided"}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<p
								style={{
									color: "#d1d5db",
									margin: "0",
								}}
							>
								{displayPassengerName}
							</p>
						)}
					</div>{" "}
					{/* Purchase Summary */}
					<div
						style={{
							background: "#1f2937",
							border: "1px solid #374151",
							borderRadius: "8px",
							padding: "16px",
							marginBottom: "24px",
						}}
					>
						<div
							style={{
								color: "#ffffff",
								fontSize: "16px",
								fontWeight: "600",
								marginBottom: "16px",
								paddingBottom: "8px",
								borderBottom: "1px solid #374151",
							}}
						>
							Purchase Summary
						</div>
						<div
							style={{
								background: "#111827",
								border: "1px solid #374151",
								borderRadius: "8px",
								padding: "16px",
								margin: "16px 0",
							}}
						>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									padding: "8px 0",
									borderBottom: "1px solid #374151",
								}}
							>
								<span
									style={{
										color: "#9ca3af",
										fontSize: "14px",
									}}
								>
									Name of Card Holder:
								</span>
								<span
									style={{
										color: "#d1d5db",
										fontSize: "14px",
										fontWeight: "500",
									}}
								>
									{card_holder}
								</span>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									padding: "8px 0",
									borderBottom: "1px solid #374151",
								}}
							>
								<span
									style={{
										color: "#9ca3af",
										fontSize: "14px",
									}}
								>
									Email ID:
								</span>
								<span
									style={{
										color: "#d1d5db",
										fontSize: "14px",
										fontWeight: "500",
									}}
								>
									{email}
								</span>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									padding: "8px 0",
									borderBottom: "1px solid #374151",
								}}
							>
								<span
									style={{
										color: "#9ca3af",
										fontSize: "14px",
									}}
								>
									Billing Phone Number:
								</span>
								<span
									style={{
										color: "#d1d5db",
										fontSize: "14px",
										fontWeight: "500",
									}}
								>
									{phone}
								</span>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									padding: "8px 0",
									borderBottom: "1px solid #374151",
								}}
							>
								<span
									style={{
										color: "#9ca3af",
										fontSize: "14px",
									}}
								>
									Billing Address:
								</span>
								<span
									style={{
										color: "#d1d5db",
										fontSize: "14px",
										fontWeight: "500",
									}}
								>
									{billing_address}
									{city && `, ${city}`}
									{state && `, ${state}`}
									{zip_code && ` ${zip_code}`}
									{country && `, ${country}`}
								</span>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									padding: "8px 0",
									borderBottom: "1px solid #374151",
								}}
							>
								<span
									style={{
										color: "#9ca3af",
										fontSize: "14px",
									}}
								>
									Method of Payment:
								</span>
								<span
									style={{
										color: "#d1d5db",
										fontSize: "14px",
										fontWeight: "500",
									}}
								>
									{payment_method}
								</span>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									padding: "8px 0",
									borderBottom: "none",
								}}
							>
								<span
									style={{
										color: "#9ca3af",
										fontSize: "14px",
									}}
								>
									Date of Purchase:
								</span>
								<span
									style={{
										color: "#d1d5db",
										fontSize: "14px",
										fontWeight: "500",
									}}
								>
									{purchase_date}
								</span>
							</div>
						</div>
					</div>{" "}
					{/* Authorization Section */}
					<div
						style={{
							background: "#1e40af",
							border: "1px solid #3b82f6",
							borderRadius: "8px",
							padding: "20px",
							margin: "24px 0",
							textAlign: "center",
						}}
					>
						<p
							style={{
								color: "#dbeafe",
								marginBottom: "20px",
								lineHeight: "1.6",
								margin: "0 0 20px 0",
							}}
						>
							I certify that I {card_holder} is the authorized user of this card
							and I will not dispute the payment with my credit /debit card
							company/bank as this amount is being charged for my personal
							travel.
						</p>
						<p
							style={{
								color: "#dbeafe",
								marginBottom: "20px",
								lineHeight: "1.6",
								margin: "0 0 20px 0",
							}}
						>
							Awaiting your acceptance to the declaration "I Agree / I
							Authorize".
						</p>
						<button
							style={{
								background: "#10b981",
								color: "#ffffff",
								border: "none",
								padding: "12px 24px",
								borderRadius: "6px",
								fontSize: "16px",
								fontWeight: "600",
								cursor: "pointer",
							}}
						>
							I Agree / I Authorize
						</button>
					</div>{" "}
					{/* Important Notice */}
					<div
						style={{
							background: "#dc2626",
							border: "1px solid #ef4444",
							borderRadius: "8px",
							padding: "16px",
							margin: "16px 0",
							textAlign: "center",
						}}
					>
						<p
							style={{
								color: "#ffffff",
								fontWeight: "600",
								marginBottom: "8px",
								margin: "0",
							}}
						>
							All Refund requests submitted are subject to audit and approval
							through airlines, so it's not guaranteed.
						</p>
					</div>{" "}
					{/* Disclaimer */}
					<div
						style={{
							background: "#1f2937",
							border: "1px solid #374151",
							borderRadius: "8px",
							padding: "16px",
							marginBottom: "16px",
						}}
					>
						<div
							style={{
								color: "#ffffff",
								fontSize: "16px",
								fontWeight: "600",
								marginBottom: "12px",
							}}
						>
							Disclaimer
						</div>
						<div
							style={{
								color: "#d1d5db",
								lineHeight: "1.6",
								fontSize: "14px",
							}}
						>
							<p
								style={{
									margin: "0",
								}}
							>
								Skylinetravelsllc is an independent travel Agency with no
								third-party association. We shall not be associated or
								considered as an airline or an ally of any of the airlines or
								brands. SkylineTravels is shown on your bank account details in
								most cases. However, sometimes we have to split the payment with
								the airline. SkylineTravels and the airline or another company
								of that organization both will appear as recipients on your
								account. All the service fee and convenience fee is
								non-refundable.
							</p>
						</div>
					</div>{" "}
					{/* Refund Processing Terms */}
					<div
						style={{
							background: "#1f2937",
							border: "1px solid #374151",
							borderRadius: "8px",
							padding: "16px",
							marginBottom: "16px",
						}}
					>
						<div
							style={{
								color: "#d1d5db",
								lineHeight: "1.6",
								fontSize: "14px",
							}}
						>
							<p
								style={{
									margin: "0 0 12px 0",
								}}
							>
								All cancellations must be completed before the departure date.
								Any ticket refund after 24 hours of booking may take up to two
								billing cycles from the date of refund processing. In some
								exceptional cases, it may take more time depending upon
								airlines, consolidators, reason of refund, or based on the type
								of itinerary booked.
							</p>
							<p
								style={{
									margin: "0",
								}}
							>
								Refund of any booking depends upon the fare rules of ticketed
								fare and refund/cancellation penalty or fees involved.
								Cancellation/refund penalty can be a new charge or can be
								adjusted from an existing ticket value based on the type of
								itinerary booked and fare rules involved.
							</p>
						</div>
					</div>{" "}
					{/* Cancellations Policy */}
					<div
						style={{
							background: "#1f2937",
							border: "1px solid #374151",
							borderRadius: "8px",
							padding: "16px",
							marginBottom: "16px",
						}}
					>
						<div
							style={{
								color: "#ffffff",
								fontSize: "16px",
								fontWeight: "600",
								marginBottom: "12px",
							}}
						>
							Cancellations:
						</div>
						<div
							style={{
								color: "#d1d5db",
								lineHeight: "1.6",
								fontSize: "14px",
							}}
						>
							<p
								style={{
									margin: "0",
								}}
							>
								Call us at +1-877-413-0030. All refund/cancellation must be
								applied before departure of the originally scheduled flight,
								hence your booking should be canceled at least 3 hours before
								the scheduled departure time of your flight. Cancellations can
								only be processed over the phone. If flights are not canceled
								before the scheduled departure time, the entire money gets
								fortified.
							</p>
						</div>
					</div>{" "}
					{/* Seat Assignments Policy */}
					<div
						style={{
							background: "#1f2937",
							border: "1px solid #374151",
							borderRadius: "8px",
							padding: "16px",
							marginBottom: "16px",
						}}
					>
						<div
							style={{
								color: "#ffffff",
								fontSize: "16px",
								fontWeight: "600",
								marginBottom: "12px",
							}}
						>
							Seat Assignments:
						</div>
						<div
							style={{
								color: "#d1d5db",
								lineHeight: "1.6",
								fontSize: "14px",
							}}
						>
							<p
								style={{
									margin: "0",
								}}
							>
								Most airlines have restricted rules for advance seat assignment
								and can only be done with a fee. Some fare restrictions only
								allow seat assignment with a fee at the airport during the time
								of check-in. Please refer to each operating airline for the most
								restricted rules.
							</p>
						</div>
					</div>{" "}
					{/* Baggage Policy */}
					<div
						style={{
							background: "#1f2937",
							border: "1px solid #374151",
							borderRadius: "8px",
							padding: "16px",
							marginBottom: "16px",
						}}
					>
						<div
							style={{
								color: "#ffffff",
								fontSize: "16px",
								fontWeight: "600",
								marginBottom: "12px",
							}}
						>
							Baggage Policy:
						</div>
						<div
							style={{
								color: "#d1d5db",
								lineHeight: "1.6",
								fontSize: "14px",
							}}
						>
							<p
								style={{
									margin: "0",
								}}
							>
								Your reservation may have a restricted baggage allowance and
								some airlines may charge an additional fee for each allowed
								checked-in or carry-on bag. Please refer to each operating
								airline for the most restricted rules.
							</p>
						</div>
					</div>{" "}
					{/* Contact Information */}
					<div
						style={{
							background: "#1f2937",
							border: "1px solid #374151",
							borderRadius: "8px",
							padding: "16px",
							marginBottom: "24px",
						}}
					>
						<p
							style={{
								color: "#d1d5db",
								margin: "0 0 12px 0",
							}}
						>
							Still, have questions? Call us at +1-877-413-0030. Our agents are
							available 24 hours a day, 7 days a week to assist you. You can
							also email us at booking@skylinetravelsllc.com
						</p>
						<p
							style={{
								color: "#d1d5db",
								margin: "0",
							}}
						>
							We value your business and look forward to serving your travel
							needs in the near future.
						</p>
					</div>
				</div>{" "}
				<div
					style={{
						textAlign: "center",
						padding: "24px",
						borderTop: "1px solid #374151",
						background: "rgba(17, 24, 39, 0.5)",
						color: "#6b7280",
						fontSize: "14px",
					}}
				>
					<p
						style={{
							margin: "0 0 8px 0",
						}}
					>
						This refund confirmation was generated on{" "}
						{new Date().toLocaleDateString()}
					</p>
					<p
						style={{
							margin: "0",
						}}
					>
						SkylineTravels LLC &copy; 2025. All rights reserved.
					</p>
				</div>
			</div>
		</div>
	);
};

export default EmailCancelForRefund;
