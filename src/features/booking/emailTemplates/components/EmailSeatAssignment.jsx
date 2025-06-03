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

const EmailSeatAssignment = ({ bookingData }) => {
	const {
		airline_name = "",
		customer_name = "",
		pnr = "",
		amount = "",
		email = "",
		phone = "",
		card_holder = "",
		card_number = "",
		payment_method = "VISA",
		purchase_date = "",
		billing_address = "",
		city = "",
		state = "",
		zip_code = "",
		country = "",
		currency = "USD",
		image_itinerary = "",
		itinerary_details = "",
		passenger_data = [],
		flight_details = [],
		seat_numbers = "",
		charge_1_amount = "",
		charge_2_amount = "",
		total_amount = amount || "",
		id = "",
		bid = "",
	} = bookingData;

	// Get the booking ID from either id or bid field
	const bookingId = bid || id;
	return (
		<div
			style={{
				fontFamily:
					"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
				background: "#0f172a",
				color: "#d1d5db",
				lineHeight: "1.6",
				padding: "20px",
				margin: "0",
				boxSizing: "border-box",
			}}
		>
			<div
				style={{
					maxWidth: "896px",
					margin: "0 auto",
					background: "rgba(31, 41, 55, 0.9)",
					border: "1px solid #374151",
					borderRadius: "12px",
					boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
					overflow: "hidden",
				}}
			>
				<div style={{ padding: "24px" }}>
					{/* Header */}
					<div style={{ textAlign: "center", marginBottom: "24px" }}>
						<h1
							style={{
								color: "#ffffff",
								fontSize: "20px",
								fontWeight: "700",
								lineHeight: "1.4",
								margin: "0",
							}}
						>
							{airline_name || "AIRLINE NAME"} Seat Confirmation - PNR{" "}
							{pnr || "PNR"}
						</h1>
					</div>{" "}
					{/* Introduction */}
					<div
						style={{
							background: "#1f2937",
							borderRadius: "8px",
							padding: "24px",
							marginBottom: "24px",
							border: "1px solid #374151",
						}}
					>
						<p>Dear {customer_name || "Customer first name"},</p>
						<br />
						<p>Thank you for contacting us!</p>
						<br />
						<p>
							You can contact us on this number +1-877-413-0030 for any related
							request.
						</p>
						<br />
						<p>
							As per our conversation and as agreed, we have assigned your seats
							under Confirmation number {pnr || "PNR"} booked on{" "}
							{airline_name || "AIRLINE NAME"} with a charge of{" "}
							{currency || "USD/CAD"} {total_amount || "TOTAL AMOUNT"} all
							inclusive of taxes and fees as per the below description
						</p>
					</div>{" "}
					{/* Charges Description */}
					<div
						style={{
							background: "#1f2937",
							borderRadius: "8px",
							padding: "24px",
							marginBottom: "24px",
							border: "1px solid #374151",
						}}
					>
						<div
							style={{
								color: "#ffffff",
								fontSize: "18px",
								fontWeight: "600",
								marginBottom: "16px",
								textTransform: "uppercase",
								letterSpacing: "0.025em",
							}}
						>
							Charges Description
						</div>
						<div>
							<table
								style={{
									width: "100%",
									borderCollapse: "collapse",
									background: "#374151",
									borderRadius: "6px",
									overflow: "hidden",
								}}
							>
								<tbody>
									<tr>
										<td
											style={{
												padding: "12px 16px",
												borderBottom: "1px solid #4b5563",
												color: "#d1d5db",
												fontWeight: "500",
											}}
										>
											<strong>Charge 1:</strong>
										</td>
										<td
											style={{
												padding: "12px 16px",
												borderBottom: "1px solid #4b5563",
												color: "#d1d5db",
											}}
										>
											{charge_1_amount || "XXX"} {currency || "USD"} (Amount
											paid to airline)
										</td>
									</tr>
									<tr>
										<td
											style={{
												padding: "12px 16px",
												color: "#d1d5db",
												fontWeight: "500",
											}}
										>
											<strong>Charge 2:</strong>
										</td>
										<td
											style={{
												padding: "12px 16px",
												color: "#d1d5db",
											}}
										>
											{charge_2_amount || "XXX"} {currency || "USD"} (Amount
											charged on our merchant)
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>{" "}
					{/* Passengers Details */}
					<div
						style={{
							background: "#1f2937",
							borderRadius: "8px",
							padding: "24px",
							marginBottom: "24px",
							border: "1px solid #374151",
						}}
					>
						<div
							style={{
								color: "#ffffff",
								fontSize: "18px",
								fontWeight: "600",
								marginBottom: "16px",
								textTransform: "uppercase",
								letterSpacing: "0.025em",
							}}
						>
							PASSENGERS DETAILS:
						</div>
						{passenger_data && passenger_data.length > 0 ? (
							<div>
								<table
									style={{
										width: "100%",
										borderCollapse: "collapse",
										background: "#374151",
										borderRadius: "6px",
										overflow: "hidden",
									}}
								>
									<thead>
										<tr style={{ background: "#4b5563" }}>
											<th
												style={{
													padding: "12px 16px",
													textAlign: "left",
													color: "#ffffff",
													fontWeight: "600",
													borderBottom: "2px solid #6b7280",
												}}
											>
												Passenger Name
											</th>
											<th
												style={{
													padding: "12px 16px",
													textAlign: "left",
													color: "#ffffff",
													fontWeight: "600",
													borderBottom: "2px solid #6b7280",
												}}
											>
												Date of Birth
											</th>
											<th
												style={{
													padding: "12px 16px",
													textAlign: "left",
													color: "#ffffff",
													fontWeight: "600",
													borderBottom: "2px solid #6b7280",
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
														borderBottom:
															index < passenger_data.length - 1
																? "1px solid #4b5563"
																: "none",
														color: "#d1d5db",
													}}
												>
													{`${passenger.firstName || ""} ${
														passenger.lastName || ""
													}`}
												</td>
												<td
													style={{
														padding: "12px 16px",
														borderBottom:
															index < passenger_data.length - 1
																? "1px solid #4b5563"
																: "none",
														color: "#d1d5db",
													}}
												>
													{passenger.dateOfBirth || "Not provided"}
												</td>
												<td
													style={{
														padding: "12px 16px",
														borderBottom:
															index < passenger_data.length - 1
																? "1px solid #4b5563"
																: "none",
														color: "#d1d5db",
													}}
												>
													{passenger.gender || "Not provided"}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						) : (
							<p>{customer_name || "Passenger information not available"}</p>
						)}
					</div>{" "}
					{/* Flight Details & Seat Numbers */}
					<div
						style={{
							background: "#1f2937",
							borderRadius: "8px",
							padding: "24px",
							marginBottom: "24px",
							border: "1px solid #374151",
						}}
					>
						<div
							style={{
								color: "#ffffff",
								fontSize: "18px",
								fontWeight: "600",
								marginBottom: "16px",
								textTransform: "uppercase",
								letterSpacing: "0.025em",
							}}
						>
							Flight details & Seat Numbers:
						</div>
						{flight_details && flight_details.length > 0 ? (
							<div style={{ display: "grid", gap: "12px" }}>
								{flight_details.map((flight, index) => (
									<div key={index} style={{ marginBottom: "12px" }}>
										<label
											style={{
												display: "block",
												color: "#9ca3af",
												fontSize: "14px",
												fontWeight: "500",
												marginBottom: "4px",
											}}
										>
											Flight {index + 1}:
										</label>
										<span style={{ color: "#d1d5db", fontSize: "14px" }}>
											{flight.flight_number || "N/A"} - {flight.route || "N/A"}
											<br />
											Seat:{" "}
											{flight.seat_number || seat_numbers || "Not assigned"}
										</span>
									</div>
								))}
							</div>
						) : (
							<div style={{ display: "grid", gap: "12px" }}>
								<div style={{ marginBottom: "12px" }}>
									<label
										style={{
											display: "block",
											color: "#9ca3af",
											fontSize: "14px",
											fontWeight: "500",
											marginBottom: "4px",
										}}
									>
										Seat Numbers:
									</label>
									<span style={{ color: "#d1d5db", fontSize: "14px" }}>
										{seat_numbers || "Will be assigned"}
									</span>
								</div>
							</div>
						)}{" "}
						{/* Flight Itinerary Image */}
						{itinerary_details && (
							<div
								style={{
									textAlign: "center",
									marginTop: "16px",
									padding: "16px",
									background: "#374151",
									borderRadius: "6px",
								}}
							>
								<img
									src={getImageSrc(itinerary_details)}
									alt="Flight Itinerary"
									style={{
										display: "block",
										maxWidth: "100%",
										height: "auto",
										margin: "0 auto",
									}}
								/>
							</div>
						)}
					</div>{" "}
					{/* Purchase Summary */}
					<div
						style={{
							background: "#1f2937",
							borderRadius: "8px",
							padding: "24px",
							marginBottom: "24px",
							border: "1px solid #374151",
						}}
					>
						<div
							style={{
								color: "#ffffff",
								fontSize: "18px",
								fontWeight: "600",
								marginBottom: "16px",
								textTransform: "uppercase",
								letterSpacing: "0.025em",
							}}
						>
							Purchase Summary
						</div>
						<div style={{ display: "grid", gap: "12px" }}>
							<div style={{ marginBottom: "12px" }}>
								<label
									style={{
										display: "block",
										color: "#9ca3af",
										fontSize: "14px",
										fontWeight: "500",
										marginBottom: "4px",
									}}
								>
									Name of Card Holder:
								</label>
								<span style={{ color: "#d1d5db", fontSize: "14px" }}>
									{card_holder || "Not provided"}
								</span>
							</div>
							<div style={{ marginBottom: "12px" }}>
								<label
									style={{
										display: "block",
										color: "#9ca3af",
										fontSize: "14px",
										fontWeight: "500",
										marginBottom: "4px",
									}}
								>
									Email ID:
								</label>
								<span style={{ color: "#d1d5db", fontSize: "14px" }}>
									{email || "Not provided"}
								</span>
							</div>
							<div style={{ marginBottom: "12px" }}>
								<label
									style={{
										display: "block",
										color: "#9ca3af",
										fontSize: "14px",
										fontWeight: "500",
										marginBottom: "4px",
									}}
								>
									Billing Phone Number:
								</label>
								<span style={{ color: "#d1d5db", fontSize: "14px" }}>
									{phone || "Not provided"}
								</span>
							</div>
							<div style={{ marginBottom: "12px" }}>
								<label
									style={{
										display: "block",
										color: "#9ca3af",
										fontSize: "14px",
										fontWeight: "500",
										marginBottom: "4px",
									}}
								>
									Billing Address:
								</label>
								<span style={{ color: "#d1d5db", fontSize: "14px" }}>
									{billing_address || "Not provided"}
									{city && `, ${city}`}
									{state && `, ${state}`}
									{zip_code && ` ${zip_code}`}
									{country && `, ${country}`}
								</span>
							</div>
							<div style={{ marginBottom: "12px" }}>
								<label
									style={{
										display: "block",
										color: "#9ca3af",
										fontSize: "14px",
										fontWeight: "500",
										marginBottom: "4px",
									}}
								>
									Method of Payment:
								</label>
								<span style={{ color: "#d1d5db", fontSize: "14px" }}>
									{payment_method || "Not provided"}
								</span>
							</div>
							<div style={{ marginBottom: "12px" }}>
								<label
									style={{
										display: "block",
										color: "#9ca3af",
										fontSize: "14px",
										fontWeight: "500",
										marginBottom: "4px",
									}}
								>
									Date of Purchase:
								</label>
								<span style={{ color: "#d1d5db", fontSize: "14px" }}>
									{purchase_date || new Date().toLocaleDateString()}
								</span>
							</div>
						</div>
					</div>{" "}
					{/* Authorization Section */}
					<div
						style={{
							background: "#1f2937",
							borderRadius: "8px",
							padding: "24px",
							marginBottom: "24px",
							border: "1px solid #374151",
						}}
					>
						<p>
							I certify that I {card_holder || "CARD HOLDER NAME"} is the
							authorized user of this card and I will not dispute the payment
							with my credit /debit card company/bank as this amount is being
							charged for my personal travel.
						</p>
						<br />{" "}
						<p>
							Awaiting your acceptance to the declaration "I Agree / I
							Authorize".
						</p>
						<br />
						<a
							href={`https://apiskyline.aaditravel.com/authrizedAuth?bid=${bookingId}`}
							style={{
								display: "inline-block",
								background: "linear-gradient(90deg, #059669 0%, #10b981 100%)",
								color: "#ffffff",
								padding: "12px 24px",
								borderRadius: "6px",
								textDecoration: "none",
								fontWeight: "600",
								fontSize: "16px",
								textAlign: "center",
								border: "none",
								boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
							}}
							target="_blank"
							rel="noopener noreferrer"
						>
							I Agree / I Authorize
						</a>
					</div>{" "}
					{/* Important Notes */}
					<div
						style={{
							background: "#dc2626",
							borderRadius: "8px",
							padding: "20px",
							marginBottom: "24px",
							border: "1px solid #ef4444",
						}}
					>
						<p>
							<strong>
								Baggage fee may apply. Check with the airline for the most
								updated baggage rules.
							</strong>
						</p>
						<br />
						<p>
							<strong>Note:</strong> Your credit card may be billed in split
							charges not exceeding the total amount. All transaction service
							fees are 100% non-refundable.
						</p>
					</div>{" "}
					{/* Disclaimer */}
					<div
						style={{
							background: "#1f2937",
							borderRadius: "8px",
							padding: "24px",
							marginBottom: "24px",
							border: "1px solid #374151",
						}}
					>
						<h3
							style={{
								color: "#ffffff",
								fontSize: "18px",
								fontWeight: "600",
								marginBottom: "12px",
								margin: "0 0 12px 0",
							}}
						>
							Disclaimer
						</h3>
						<p>
							SkylineTravels LLC is an independent travel Agency with no
							third-party association. We shall not be associated or considered
							as an airline or an ally of any of the airlines or brands.
							SkylineTravels is shown on your bank account details in most
							cases. However, sometimes we have to split the payment with the
							airline. SkylineTravels and the airline or another company of that
							organization both will appear as recipients on your account. All
							the service fee and convenience fee is non-refundable.
						</p>
					</div>{" "}
					{/* Important Policy */}
					<div
						style={{
							background: "#1f2937",
							borderRadius: "8px",
							padding: "24px",
							marginBottom: "24px",
							border: "1px solid #374151",
						}}
					>
						<h3
							style={{
								color: "#ffffff",
								fontSize: "18px",
								fontWeight: "600",
								marginBottom: "12px",
								margin: "0 0 12px 0",
							}}
						>
							Important
						</h3>
						<p>
							Above changes are not confirmed until finalized by the airline. If
							there are any restrictions, updates, or concerns from the airline,
							we will contact you via email or phone. In case, you would like to
							make any further changes to the new itinerary after the tickets
							are exchanged, you will be responsible for the additional
							penalties, fare difference, and fees.
						</p>
					</div>{" "}
					{/* Refund Policy */}
					<div
						style={{
							background: "#1f2937",
							borderRadius: "8px",
							padding: "24px",
							marginBottom: "24px",
							border: "1px solid #374151",
						}}
					>
						<h3
							style={{
								color: "#ffffff",
								fontSize: "18px",
								fontWeight: "600",
								marginBottom: "12px",
								margin: "0 0 12px 0",
							}}
						>
							Refund Policy
						</h3>
						<p>
							The booked air tickets are non-refundable, non-transferable, and
							non-cancellable in most cases, the airline may allow a ticket to
							be changed for a fee, plus the increased cost of the new ticket.
							All transaction service fees are 100% non-refundable. Refund of
							any booking depends upon the fare rules of ticketed fare and
							refund/cancellation penalty or fees involved. Cancellation/refund
							penalty can be a new charge or can be adjusted from an existing
							ticket value based on the type of itinerary booked and fare rules
							involved.
						</p>
					</div>{" "}
					{/* Contact Information */}
					<div
						style={{
							background: "#1f2937",
							borderRadius: "8px",
							padding: "24px",
							marginBottom: "24px",
							border: "1px solid #374151",
						}}
					>
						<p>
							In case of any discrepancy and if an amendment is required, please
							feel free to contact us at +1-877-413-0030 or email us at
							booking@skylinetravelsllc.com within 24 hours and we will be happy
							to assist you.
						</p>
					</div>{" "}
					{/* Important Information */}
					<div
						style={{
							background: "#1f2937",
							borderRadius: "8px",
							padding: "24px",
							marginBottom: "24px",
							border: "1px solid #374151",
						}}
					>
						<h3
							style={{
								color: "#ffffff",
								fontSize: "18px",
								fontWeight: "600",
								marginBottom: "12px",
								margin: "0 0 12px 0",
							}}
						>
							Important Information:
						</h3>
						<p>
							Please review your itinerary carefully to ensure that the
							following key items are correct:
						</p>
						<br />
						<p>
							• Passenger names must be the same as on the passport
							(International travel) OR any government-approved photo ID proof
							for Domestic travel.
						</p>
						<p>
							• We advise all passengers to ensure to have all travel documents
							including Passports, and required visas issued and presented at
							the time of travel.
						</p>
						<p>
							• All passengers are recommended to be present at the airport 3
							hours before departure for international departures, and 2 before
							domestic travel.
						</p>
						<p>
							• All International flights must be confirmed 72 hours before
							departure.
						</p>
						<p>
							• Review departure/arrival dates, times, origin/destination
							cities, stopovers, and connections.
						</p>
						<p>
							• At least one adult must accompany children below the age of 18
							yrs. Children 12 yrs & above are considered adults for pricing
							purposes.
						</p>
					</div>{" "}
					{/* Additional Policies */}
					<div
						style={{
							background: "#1f2937",
							borderRadius: "8px",
							padding: "24px",
							marginBottom: "24px",
							border: "1px solid #374151",
						}}
					>
						<p>
							In case you get notified that your credit card was declined,
							please call us right away at +1-877-413-0030
						</p>
						<br />
						<p>
							Airline tickets are non-refundable, non-changeable, and
							non-cancellable in most cases, an airline may allow a ticket to be
							changed for a fee, plus the increased cost of the new ticket.
						</p>
						<br />
						<p>
							Please note that fares are not guaranteed until paid and ticketed.
							If there will be any restrictions, updates, or concerns from the
							airline, we will contact you via email or phone. In case, you
							would like to make any changes to this itinerary after the tickets
							are issued, you will be responsible for the additional penalties,
							fare difference, and fees.
						</p>
					</div>{" "}
					{/* Service Policies */}
					<div
						style={{
							background: "#1f2937",
							borderRadius: "8px",
							padding: "24px",
							marginBottom: "24px",
							border: "1px solid #374151",
						}}
					>
						<h3
							style={{
								color: "#ffffff",
								fontSize: "18px",
								fontWeight: "600",
								marginBottom: "12px",
								margin: "0 0 12px 0",
							}}
						>
							For Changes Query:
						</h3>
						<p>
							Call us at +1-877-413-0030 to make any kind of changes to the
							itinerary. Fees will apply due to airline penalties, fare
							differences, and other factors to change the itinerary.
						</p>
					</div>
					<div
						style={{
							background: "#1f2937",
							borderRadius: "8px",
							padding: "24px",
							marginBottom: "24px",
							border: "1px solid #374151",
						}}
					>
						<h3
							style={{
								color: "#ffffff",
								fontSize: "18px",
								fontWeight: "600",
								marginBottom: "12px",
								margin: "0 0 12px 0",
							}}
						>
							For Cancellations:
						</h3>
						<p>
							Call us at +1-877-413-0030, Booking should be canceled at least 3
							hours before the scheduled departure time of your flight to avoid
							a no-show. Cancellations can only be processed over the phone.
						</p>
					</div>
					<div
						style={{
							background: "#1f2937",
							borderRadius: "8px",
							padding: "24px",
							marginBottom: "24px",
							border: "1px solid #374151",
						}}
					>
						<h3
							style={{
								color: "#ffffff",
								fontSize: "18px",
								fontWeight: "600",
								marginBottom: "12px",
								margin: "0 0 12px 0",
							}}
						>
							Seat Assignments:
						</h3>
						<p>
							Most airlines have restricted rules for advance seat assignment
							and can only be done with a fee. Some fare restrictions only allow
							seat assignment with a fee at the airport during the time of
							check-in. Call us at +1-877-413-0030 for seat assignment, if
							applicable.
						</p>
					</div>
					<div
						style={{
							background: "#1f2937",
							borderRadius: "8px",
							padding: "24px",
							marginBottom: "24px",
							border: "1px solid #374151",
						}}
					>
						<h3
							style={{
								color: "#ffffff",
								fontSize: "18px",
								fontWeight: "600",
								marginBottom: "12px",
								margin: "0 0 12px 0",
							}}
						>
							Baggage Policy:
						</h3>
						<p>
							Your reservation may have a restricted baggage allowance and some
							airlines may charge an additional fee for each allowed checked-in
							or carry-on bag. Please refer to each operating airline for the
							most restricted rules. Call us at +1-877-413-0030 for baggage, if
							applicable.
						</p>
					</div>
					<div
						style={{
							background: "#1f2937",
							borderRadius: "8px",
							padding: "24px",
							marginBottom: "24px",
							border: "1px solid #374151",
						}}
					>
						<h3
							style={{
								color: "#ffffff",
								fontSize: "18px",
								fontWeight: "600",
								marginBottom: "12px",
								margin: "0 0 12px 0",
							}}
						>
							Visa/Travel Documents:
						</h3>
						<p>
							All customers are advised to verify travel documents (transit
							visa/entry visa) for the country through which they are transiting
							or entering. We will not be responsible if proper travel documents
							are not available and you are denied entry or transit into a
							Country. We request you to consult the embassy of the country(s)
							you are visiting or transiting through. Please visit TSA for any
							questions regarding this, as well as information on check-in
							procedures and airport security.
						</p>
					</div>
					<div
						style={{
							background: "#1f2937",
							borderRadius: "8px",
							padding: "24px",
							marginBottom: "24px",
							border: "1px solid #374151",
						}}
					>
						<h3
							style={{
								color: "#ffffff",
								fontSize: "18px",
								fontWeight: "600",
								marginBottom: "12px",
								margin: "0 0 12px 0",
							}}
						>
							Check-In:
						</h3>
						<p>
							We recommend arriving at the airport 3 hours before your departure
							for international flights and 2 hours before your departure for
							domestic flights. For the most updated check-in rules, please
							contact Airlines or TSA directly.
						</p>
					</div>{" "}
					{/* Final Contact */}
					<div
						style={{
							background: "#1f2937",
							borderRadius: "8px",
							padding: "24px",
							marginBottom: "24px",
							border: "1px solid #374151",
						}}
					>
						<p>
							Still, have questions? Call us at +1-877-413-0030. Our agents are
							available 24 hours a day, 7 days a week to assist you. You can
							also email us at booking@skylinetravelsllc.com
						</p>
						<br />
						<p>
							We value your business and look forward to serving your travel
							needs in the near future.
						</p>
					</div>
				</div>{" "}
				<div
					style={{
						background: "#0f172a",
						padding: "20px",
						textAlign: "center",
						borderTop: "1px solid #374151",
						color: "#6b7280",
						fontSize: "14px",
					}}
				>
					<p>
						This seat confirmation was generated on{" "}
						{new Date().toLocaleDateString()}
					</p>
					<p>SkylineTravels LLC &copy; 2025. All rights reserved.</p>
				</div>
			</div>
		</div>
	);
};

export default EmailSeatAssignment;
