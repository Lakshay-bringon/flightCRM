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

const EmailExchange = ({ bookingData }) => {
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
		zip = "",
		country = "US",
		charge_data = [],
		image_itinerary = "",
		itinerary_details = "",
		attachments = [],
		currency = "USD",
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
					background: "rgba(31, 41, 55, 0.5)",
					backdropFilter: "blur(16px)",
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
								{airline_name || "AIRLINES"}
							</span>{" "}
							EXCHANGE CONFIRMATION –{" "}
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
								{pnr || "PNR"}
							</span>
						</h1>
					</div>{" "}
					{/* Introduction Section */}
					<div
						style={{
							background: "#1f2937",
							border: "1px solid #374151",
							borderRadius: "8px",
							padding: "16px",
							marginBottom: "24px",
						}}
					>
						<div style={{ lineHeight: "1.75", marginBottom: "16px" }}>
							Dear{" "}
							<span
								style={{
									borderBottom: "1px dashed #6b7280",
									padding: "0 4px",
									color: "#ffffff",
									background: "transparent",
								}}
							>
								{customer_name || "First Name"}
							</span>
							,
						</div>
						<div style={{ lineHeight: "1.75", marginBottom: "16px" }}>
							Thank you for contacting us!
						</div>
						<div style={{ lineHeight: "1.75", marginBottom: "16px" }}>
							You can contact us on this number +1-877-413-0030 for any related
							request.
						</div>
						<div style={{ lineHeight: "1.75", marginBottom: "16px" }}>
							As per our conversation and as agreed, we have made the changes to
							your reservation booked with{" "}
							<span
								style={{
									borderBottom: "1px dashed #6b7280",
									padding: "0 4px",
									color: "#ffffff",
									background: "transparent",
								}}
							>
								{airline_name || "Airline Name"}
							</span>{" "}
							under confirmation code{" "}
							<span
								style={{
									borderBottom: "1px dashed #6b7280",
									padding: "0 4px",
									color: "#ffffff",
									background: "transparent",
								}}
							>
								{pnr || "PNR"}
							</span>{" "}
							with a charge of{" "}
							<span
								style={{
									borderBottom: "1px dashed #6b7280",
									padding: "0 4px",
									color: "#ffffff",
									background: "transparent",
									minWidth: "40px",
								}}
							>
								{amount || "TOTAL AMOUNT"}
							</span>
							<select
								style={{
									background: "#374151",
									border: "1px solid #4b5563",
									borderRadius: "4px",
									padding: "4px 8px",
									fontSize: "14px",
									color: "#ffffff",
									marginLeft: "8px",
								}}
								disabled
							>
								<option>{currency}</option>
							</select>{" "}
							all inclusive of taxes and fees as per the below description
						</div>
					</div>{" "}
					{/* Charges Description Section */}
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
						<div
							style={{
								background: "#111827",
								border: "1px solid #374151",
								borderRadius: "8px",
								overflow: "hidden",
							}}
						>
							<table
								style={{
									width: "100%",
									borderCollapse: "collapse",
									margin: "0",
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
												textTransform: "uppercase",
												letterSpacing: "0.025em",
											}}
										>
											Charge
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
												textTransform: "uppercase",
												letterSpacing: "0.025em",
											}}
										>
											Amount
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
												textTransform: "uppercase",
												letterSpacing: "0.025em",
											}}
										>
											Description
										</th>
									</tr>
								</thead>
								<tbody>
									{charge_data && charge_data.length > 0 ? (
										charge_data.map((charge, index) => {
											const { amount: chargeAmount = "", description = "" } =
												charge;
											return (
												<tr key={index}>
													<td
														style={{
															padding: "12px 16px",
															textAlign: "left",
															borderBottom: "1px solid #374151",
															color: "#d1d5db",
															fontSize: "14px",
														}}
													>
														Charge {index + 1}
													</td>
													<td
														style={{
															padding: "12px 16px",
															textAlign: "left",
															borderBottom: "1px solid #374151",
															color: "#d1d5db",
															fontSize: "14px",
														}}
													>
														{chargeAmount || "XXX"} {currency}
													</td>
													<td
														style={{
															padding: "12px 16px",
															textAlign: "left",
															borderBottom: "1px solid #374151",
															color: "#d1d5db",
															fontSize: "14px",
														}}
													>
														{description || "Amount charged"}
													</td>
												</tr>
											);
										})
									) : (
										<>
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
													Charge 1
												</td>
												<td
													style={{
														padding: "12px 16px",
														textAlign: "left",
														borderBottom: "1px solid #374151",
														color: "#d1d5db",
														fontSize: "14px",
													}}
												>
													XXX {currency}
												</td>
												<td
													style={{
														padding: "12px 16px",
														textAlign: "left",
														borderBottom: "1px solid #374151",
														color: "#d1d5db",
														fontSize: "14px",
													}}
												>
													(Amount paid to airline)
												</td>
											</tr>
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
													Charge 2
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
													XXX {currency}
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
													(Amount charged on our merchant)
												</td>
											</tr>
										</>
									)}
								</tbody>
							</table>
						</div>{" "}
					</div>{" "}
					{/* Itinerary Images Section */}
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
							***ITINERARY IMAGES****
						</div>
						{itinerary_details ? (
							<div style={{ textAlign: "center" }}>
								<img
									src={getImageSrc(itinerary_details)}
									alt="Flight Itinerary"
									style={{
										display: "block",
										maxWidth: "100%",
										height: "auto",
										margin: "0 auto",
										border: "1px solid #374151",
										borderRadius: "8px",
									}}
								/>
							</div>
						) : (
							<div
								style={{
									color: "#9ca3af",
									textAlign: "center",
									fontStyle: "italic",
									padding: "24px",
									background: "#111827",
									borderRadius: "8px",
									border: "1px solid #374151",
								}}
							>
								No itinerary image provided
							</div>
						)}
					</div>{" "}
					{/* Authorization Section */}
					<div
						style={{
							background: "#dc2626",
							border: "1px solid #ef4444",
							borderRadius: "8px",
							padding: "24px",
							marginBottom: "24px",
						}}
					>
						<div
							style={{
								lineHeight: "1.75",
								marginBottom: "16px",
								color: "#ffffff",
								fontSize: "14px",
							}}
						>
							I certify that I{" "}
							<span
								style={{
									borderBottom: "1px dashed #fca5a5",
									padding: "0 4px",
									color: "#ffffff",
									background: "transparent",
									fontWeight: "600",
								}}
							>
								{card_holder || customer_name || "CARD HOLDER NAME"}
							</span>{" "}
							is the authorized user of this card and I will not dispute the
							payment with my credit/debit card company/bank as this amount is
							being charged for my personal travel.
						</div>{" "}
						<div
							style={{
								lineHeight: "1.75",
								marginBottom: "24px",
								color: "#ffffff",
								fontSize: "14px",
							}}
						>
							Awaiting your acceptance to the declaration "I Agree / I
							Authorize".
						</div>
						<div style={{ display: "flex", justifyContent: "center" }}>
							<a
								href={`https://apiskyline.aaditravel.com/authrizedAuth?bid=${bookingId}`}
								style={{
									textDecoration: "none",
									display: "inline-block",
									color: "white",
									background: "linear-gradient(135deg, #10b981, #059669)",
									padding: "12px 24px",
									borderRadius: "8px",
									fontWeight: "600",
									fontSize: "16px",
									border: "none",
									boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
									transition: "all 0.2s",
								}}
								target="_blank"
								rel="noopener noreferrer"
							>
								✓ I Agree / I Authorize
							</a>
						</div>
					</div>{" "}
					{/* Important Notes Section */}
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
								lineHeight: "1.75",
								marginBottom: "16px",
								color: "#d1d5db",
								fontSize: "14px",
							}}
						>
							Baggage fee may apply. Check with the airline for the most updated
							baggage rules.
						</div>
						<div
							style={{
								lineHeight: "1.75",
								marginBottom: "0",
								color: "#d1d5db",
								fontSize: "14px",
							}}
						>
							<strong style={{ color: "#ffffff" }}>Note:</strong> Your credit
							card may be billed in split charges not exceeding the total
							amount. All transaction service fees are 100% non-refundable.
						</div>
					</div>
					{/* Disclaimer Section */}
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
							Disclaimer
						</div>
						<div
							style={{
								lineHeight: "1.75",
								color: "#d1d5db",
								fontSize: "14px",
							}}
						>
							SkylineTravels LLC is an independent travel Agency with no
							third-party association. We shall not be associated or considered
							as an airline or an ally of any of the airlines or brands.
							SkylineTravels is shown on your bank account details in most
							cases. However, sometimes we have to split the payment with the
							airline. SkylineTravels and the airline or another company of that
							organization both will appear as recipients on your account. All
							the service fee and convenience fee is non-refundable.
						</div>
					</div>{" "}
					{/* Important Exchange Notice */}
					<div
						style={{
							background: "#dc2626",
							border: "1px solid #ef4444",
							borderRadius: "8px",
							padding: "16px",
							marginBottom: "24px",
						}}
					>
						<div
							style={{
								lineHeight: "1.75",
								color: "#ffffff",
								fontSize: "14px",
							}}
						>
							<strong style={{ color: "#ffffff" }}>Important:</strong> Above
							changes are not confirmed until finalized by the airline. If there
							are any restrictions, updates, or concerns from the airline, we
							will contact you via email or phone. In case, you would like to
							make any further changes to the new itinerary after the tickets
							are exchanged, you will be responsible for the additional
							penalties, fare difference, and fees.
						</div>
					</div>{" "}
					{/* Refund Policy Section */}
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
							Refund Policy
						</div>
						<div
							style={{
								lineHeight: "1.75",
								color: "#d1d5db",
								fontSize: "14px",
							}}
						>
							The booked air tickets are non-refundable, non-transferable, and
							non-cancellable in most cases, the airline may allow a ticket to
							be changed for a fee, plus the increased cost of the new ticket.
							All transaction service fees are 100% non-refundable. Refund of
							any booking depends upon the fare rules of ticketed fare and
							refund/cancellation penalty or fees involved. Cancellation/refund
							penalty can be a new charge or can be adjusted from an existing
							ticket value based on the type of itinerary booked and fare rules
							involved.
						</div>
					</div>
					{/* Contact for Discrepancy */}
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
								lineHeight: "1.75",
								color: "#d1d5db",
								fontSize: "14px",
							}}
						>
							In case of any discrepancy and if an amendment is required, please
							feel free to contact us at +1-877-413-0030 or email us at
							booking@skylinetravelsllc.com within 24 hours and we will be happy
							to assist you.
						</div>
					</div>
					{/* Important Information Section */}
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
							Important Information
						</div>
						<div
							style={{
								lineHeight: "1.75",
								marginBottom: "16px",
								color: "#d1d5db",
								fontSize: "14px",
							}}
						>
							Please review your itinerary carefully to ensure that the
							following key items are correct:
						</div>
						<div
							style={{
								lineHeight: "1.75",
								marginBottom: "12px",
								color: "#d1d5db",
								fontSize: "14px",
							}}
						>
							• Passenger names must be the same as on the passport
							(International travel) OR any government-approved photo ID proof
							for Domestic travel.
						</div>
						<div
							style={{
								lineHeight: "1.75",
								marginBottom: "12px",
								color: "#d1d5db",
								fontSize: "14px",
							}}
						>
							• We advise all passengers to ensure to have all travel documents
							including Passports, and required visas issued and presented at
							the time of travel.
						</div>
						<div
							style={{
								lineHeight: "1.75",
								marginBottom: "12px",
								color: "#d1d5db",
								fontSize: "14px",
							}}
						>
							• All passengers are recommended to be present at the airport 3
							hours before departure for international departures, and 2 before
							domestic travel.
						</div>
						<div
							style={{
								lineHeight: "1.75",
								marginBottom: "12px",
								color: "#d1d5db",
								fontSize: "14px",
							}}
						>
							• All International flights must be confirmed 72 hours before
							departure.
						</div>
						<div
							style={{
								lineHeight: "1.75",
								marginBottom: "12px",
								color: "#d1d5db",
								fontSize: "14px",
							}}
						>
							• Review departure/arrival dates, times, origin/destination
							cities, stopovers, and connections.
						</div>
						<div
							style={{
								lineHeight: "1.75",
								marginBottom: "16px",
								color: "#d1d5db",
								fontSize: "14px",
							}}
						>
							• At least one adult must accompany children below the age of 18
							yrs. Children 12 yrs & above are considered adults for pricing
							purposes.
						</div>
						<div
							style={{
								lineHeight: "1.75",
								marginBottom: "12px",
								color: "#d1d5db",
								fontSize: "14px",
							}}
						>
							In case you get notified that your credit card was declined,
							please call us right away at +1-877-413-0030
						</div>
						<div
							style={{
								lineHeight: "1.75",
								marginBottom: "12px",
								color: "#d1d5db",
								fontSize: "14px",
							}}
						>
							Airline tickets are non-refundable, non-changeable, and
							non-cancellable in most cases, an airline may allow a ticket to be
							changed for a fee, plus the increased cost of the new ticket.
						</div>
						<div
							style={{
								lineHeight: "1.75",
								color: "#d1d5db",
								fontSize: "14px",
							}}
						>
							Please note that fares are not guaranteed until paid and ticketed.
							If there will be any restrictions, updates, or concerns from the
							airline, we will contact you via email or phone. In case, you
							would like to make any changes to this itinerary after the tickets
							are issued, you will be responsible for the additional penalties,
							fare difference, and fees.
						</div>
					</div>
					{/* Changes Query Section */}
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
							For Changes Query
						</div>
						<div
							style={{
								lineHeight: "1.75",
								color: "#d1d5db",
								fontSize: "14px",
							}}
						>
							Call us at +1-877-413-0030 to make any kind of changes to the
							itinerary. Fees will apply due to airline penalties, fare
							differences, and other factors to change the itinerary.
						</div>
					</div>
					{/* Cancellations Section */}
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
							For Cancellations
						</div>
						<div
							style={{
								lineHeight: "1.75",
								color: "#d1d5db",
								fontSize: "14px",
							}}
						>
							Call us at +1-877-413-0030, Booking should be canceled at least 3
							hours before the scheduled departure time of your flight to avoid
							a no-show. Cancellations can only be processed over the phone.
						</div>
					</div>
					{/* Seat Assignments Section */}
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
							Seat Assignments
						</div>
						<div
							style={{
								lineHeight: "1.75",
								color: "#d1d5db",
								fontSize: "14px",
							}}
						>
							Most airlines have restricted rules for advance seat assignment
							and can only be done with a fee. Some fare restrictions only allow
							seat assignment with a fee at the airport during the time of
							check-in. Call us at +1-877-413-0030 for seat assignment, if
							applicable.
						</div>
					</div>
					{/* Baggage Policy Section */}
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
							Baggage Policy
						</div>
						<div
							style={{
								lineHeight: "1.75",
								color: "#d1d5db",
								fontSize: "14px",
							}}
						>
							Your reservation may have a restricted baggage allowance and some
							airlines may charge an additional fee for each allowed checked-in
							or carry-on bag. Please refer to each operating airline for the
							most restricted rules. Call us at +1-877-413-0030 for baggage, if
							applicable.
						</div>
					</div>
					{/* Visa/Travel Documents Section */}
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
							Visa/Travel Documents
						</div>
						<div
							style={{
								lineHeight: "1.75",
								color: "#d1d5db",
								fontSize: "14px",
							}}
						>
							All customers are advised to verify travel documents (transit
							visa/entry visa) for the country through which they are transiting
							or entering. We will not be responsible if proper travel documents
							are not available and you are denied entry or transit into a
							Country. We request you to consult the embassy of the country(s)
							you are visiting or transiting through. Please visit TSA for any
							questions regarding this, as well as information on check-in
							procedures and airport security.
						</div>
					</div>
					{/* Check-In Section */}
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
							Check-In
						</div>
						<div
							style={{
								lineHeight: "1.75",
								color: "#d1d5db",
								fontSize: "14px",
							}}
						>
							We recommend arriving at the airport 3 hours before your departure
							for international flights and 2 hours before your departure for
							domestic flights. For the most updated check-in rules, please
							contact Airlines or TSA directly.
						</div>
					</div>
					{/* Contact Information Section */}
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
								lineHeight: "1.75",
								marginBottom: "16px",
								color: "#d1d5db",
								fontSize: "14px",
							}}
						>
							Still, have questions? Call us at +1-877-413-0030. Our agents are
							available 24 hours a day, 7 days a week to assist you. You can
							also email us at booking@skylinetravelsllc.com
						</div>
						<div
							style={{
								lineHeight: "1.75",
								color: "#d1d5db",
								fontSize: "14px",
							}}
						>
							We value your business and look forward to serving your travel
							needs in the near future.
						</div>
					</div>
				</div>

				{/* Footer Section */}
				<div
					style={{
						background: "#111827",
						borderTop: "1px solid #374151",
						padding: "24px",
						textAlign: "center",
					}}
				>
					<div
						style={{
							lineHeight: "1.75",
							marginBottom: "8px",
							color: "#9ca3af",
							fontSize: "14px",
						}}
					>
						This exchange confirmation was generated on{" "}
						{new Date().toLocaleDateString()}
					</div>
					<div
						style={{
							lineHeight: "1.75",
							color: "#9ca3af",
							fontSize: "14px",
						}}
					>
						SkylineTravels LLC &copy; 2025. All rights reserved.
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmailExchange;
