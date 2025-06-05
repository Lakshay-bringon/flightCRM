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

const EmailNewBooking = ({ bookingData }) => {
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
		passenger_data = [],
		charge_data = [],
		itinerary_details = "",
		attachments = [],
		currency = "USD",
		id = "",
		bid = "",
	} = bookingData;

	// Get the booking ID from either id or bid field
	const bookingId = bid;
	return (
		<div
			style={{
				fontFamily:
					"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
				background: "#0f172a",
				color: "#d1d5db",
				lineHeight: "1.6",
				margin: "0",
				padding: "4px",
				boxSizing: "border-box",
				minWidth: "320px",
				maxWidth: "100%",
			}}
		>
			<div
				style={{
					maxWidth: "896px",
					width: "100%",
					margin: "0 auto",
					background: "rgba(31, 41, 55, 0.9)",
					border: "1px solid #374151",
					borderRadius: "12px",
					boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
					overflow: "auto",
				}}
			>
				<div style={{ padding: "8px" }}>
					{/* Header */}
					<div style={{ textAlign: "center", marginBottom: "12px" }}>
						<h1
							style={{
								color: "#ffffff",
								fontSize: "14px",
								fontWeight: "700",
								lineHeight: "1.4",
								margin: "0",
								wordBreak: "break-word",
								textAlign: "center",
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
									padding: "0 2px",
									outline: "none",
									display: "inline",
								}}
							>
								{airline_name.toUpperCase()}
							</span>{" "}
							RESERVATION CONFIRMATION –{" "}
							<span
								style={{
									background: "transparent",
									border: "0",
									borderBottom: "1px dashed #6b7280",
									color: "#ffffff",
									fontWeight: "700",
									textTransform: "uppercase",
									padding: "0 2px",
									outline: "none",
									display: "inline",
								}}
							>
								{pnr}
							</span>
						</h1>
					</div>

					{/* Introduction Section */}
					<div
						style={{
							background: "#1f2937",
							border: "1px solid #374151",
							borderRadius: "8px",
							padding: "8px",
							marginBottom: "12px",
						}}
					>
						<div style={{ lineHeight: "1.75", marginBottom: "4px" }}>
							Dear{" "}
							<span
								style={{
									borderBottom: "1px dashed #6b7280",
									padding: "0 2px",
									color: "#ffffff",
									background: "transparent",
								}}
							>
								{customer_name}
							</span>
							,
						</div>
						<div style={{ lineHeight: "1.75", marginBottom: "4px" }}>
							Thank you for contacting us!
						</div>
						<div style={{ lineHeight: "1.75", marginBottom: "4px" }}>
							You can contact us on this number +1-877-413-0030 for any related
							request.
						</div>
						<div style={{ lineHeight: "1.75", marginBottom: "4px" }}>
							As per our conversation and as agreed, we have booked your
							reservation under Confirmation Number
							<span
								style={{
									borderBottom: "1px dashed #6b7280",
									padding: "0 2px",
									color: "#ffffff",
									background: "transparent",
								}}
							>
								{" "}
								{pnr || "PNR"}
							</span>{" "}
							on
							<span
								style={{
									borderBottom: "1px dashed #6b7280",
									padding: "0 2px",
									color: "#ffffff",
									background: "transparent",
								}}
							>
								{" "}
								{airline_name || "AIRLINE NAME"}
							</span>{" "}
							with a charge of
							<span
								style={{
									borderBottom: "1px dashed #6b7280",
									padding: "0 2px",
									color: "#ffffff",
									background: "transparent",
									minWidth: "40px",
								}}
							>
								{" "}
								{amount || "0.00"} {currency}
							</span>
							all inclusive of taxes and fees as per the below description.
						</div>
					</div>

					{/* Charges Description Section - Mobile Optimized */}
					<div
						style={{
							background: "#1f2937",
							border: "1px solid #374151",
							borderRadius: "8px",
							padding: "8px",
							marginBottom: "12px",
						}}
					>
						<div
							style={{
								color: "#ffffff",
								fontSize: "14px",
								fontWeight: "600",
								marginBottom: "8px",
								paddingBottom: "6px",
								borderBottom: "1px solid #374151",
							}}
						>
							Charges Description
						</div>
						<div
							style={{
								background: "#111827",
								border: "1px solid #374151",
								borderRadius: "6px",
								overflow: "auto",
								width: "100%",
							}}
						>
							{/* Header row */}
							<div
								style={{
									padding: "6px 8px",
									borderBottom: "1px solid #374151",
									fontSize: "10px",
									display: "flex",
									alignItems: "center",
									gap: "8px",
									background: "#1f2937",
									fontWeight: "600",
									color: "#ffffff",
								}}
							>
								<div style={{ 
									minWidth: "80px",
									fontSize: "10px",
								}}>
									Amount
								</div>
								<div style={{ 
									flex: "1",
									fontSize: "10px",
								}}>
									Description
								</div>
							</div>
							{/* Data rows */}
							{charge_data.map((charge, index) => {
								const { amount: chargeAmount = "", description = "" } = charge;
								return (
									<div
										key={index}
										style={{
											padding: "6px 8px",
											borderBottom: index === charge_data.length - 1 ? "none" : "1px solid #374151",
											fontSize: "11px",
											display: "flex",
											flexWrap: "wrap",
											alignItems: "center",
											gap: "8px",
										}}
									>
										<div style={{ 
											color: "#ffffff", 
											fontWeight: "600",
											minWidth: "80px",
											fontSize: "11px",
										}}>
											{chargeAmount || "0.00"} {currency}
										</div>
										<div style={{ 
											color: "#d1d5db",
											flex: "1",
											fontSize: "11px",
											wordBreak: "break-word",
										}}>
											{description || "No description"}
										</div>
									</div>
								);
							})}
						</div>
					</div>

					{/* Flight Details Section */}
					<div
						style={{
							background: "#1f2937",
							border: "1px solid #374151",
							borderRadius: "8px",
							padding: "8px",
							marginBottom: "12px",
						}}
					>
						<div
							style={{
								color: "#ffffff",
								fontSize: "14px",
								fontWeight: "600",
								marginBottom: "8px",
								paddingBottom: "6px",
								borderBottom: "1px solid #374151",
							}}
						>
							Flight Details
						</div>{" "}
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
							<p
								style={{
									color: "#6b7280",
									fontStyle: "italic",
									textAlign: "center",
									padding: "16px",
									margin: "0",
								}}
							>
								No itinerary image provided
							</p>
						)}
					</div>

					{/* Passenger Details Section - Mobile Optimized */}
					<div
						style={{
							background: "#1f2937",
							border: "1px solid #374151",
							borderRadius: "8px",
							padding: "8px",
							marginBottom: "12px",
						}}
					>
						<div
							style={{
								color: "#ffffff",
								fontSize: "14px",
								fontWeight: "600",
								marginBottom: "8px",
								paddingBottom: "6px",
								borderBottom: "1px solid #374151",
							}}
						>
							Passenger Details
						</div>
						<div
							style={{
								background: "#111827",
								border: "1px solid #374151",
								borderRadius: "6px",
								overflow: "auto",
								width: "100%",
							}}
						>
							{/* Header row */}
							<div
								style={{
									padding: "6px 8px",
									borderBottom: "1px solid #374151",
									fontSize: "10px",
									display: "flex",
									alignItems: "center",
									gap: "8px",
									background: "#1f2937",
									fontWeight: "600",
									color: "#ffffff",
									flexWrap: "wrap",
								}}
							>
								<div style={{ 
									flex: "1",
									minWidth: "120px",
									fontSize: "10px",
								}}>
									Name
								</div>
								<div style={{ 
									minWidth: "80px",
									fontSize: "10px",
								}}>
									Date of Birth
								</div>
								<div style={{ 
									minWidth: "50px",
									fontSize: "10px",
								}}>
									Type
								</div>
							</div>
							{/* Data rows */}
							{passenger_data && passenger_data.length > 0 ? (
								passenger_data.map((passenger, index) => {
									const {
										type = "ADT",
										firstName = "",
										middleName = "",
										lastName = "",
										dob = "",
									} = passenger;

									return (
										<div
											key={index}
											style={{
												padding: "6px 8px",
												borderBottom: index === passenger_data.length - 1 ? "none" : "1px solid #374151",
												fontSize: "11px",
												display: "flex",
												alignItems: "center",
												gap: "8px",
												flexWrap: "wrap",
											}}
										>
											<div style={{ 
												color: "#ffffff", 
												fontWeight: "600", 
												fontSize: "11px",
												wordBreak: "break-word",
												flex: "1",
												minWidth: "120px",
											}}>
												{firstName || "Not provided"} {middleName ? middleName + " " : ""}{lastName || "Not provided"}
											</div>
											<div style={{ 
												color: "#d1d5db",
												fontSize: "10px",
												minWidth: "80px",
											}}>
												{dob || "Not provided"}
											</div>
											<div style={{ 
												minWidth: "50px",
											}}>
												<span
													style={{
														background: "#1e40af",
														color: "#ffffff",
														padding: "2px 4px",
														borderRadius: "3px",
														fontSize: "9px",
														fontWeight: "600",
													}}
												>
													{type}
												</span>
											</div>
										</div>
									);
								})
							) : (
								<div style={{ 
									padding: "6px 8px", 
									fontSize: "11px",
									display: "flex",
									alignItems: "center",
									gap: "8px",
									flexWrap: "wrap",
								}}>
									<div style={{ 
										color: "#ffffff", 
										fontWeight: "600", 
										fontSize: "11px",
										flex: "1",
										minWidth: "120px",
									}}>
										Not provided
									</div>
									<div style={{ 
										color: "#d1d5db", 
										fontSize: "10px",
										minWidth: "80px",
									}}>
										Not provided
									</div>
									<div style={{ 
										minWidth: "50px",
									}}>
										<span
											style={{
												background: "#1e40af",
												color: "#ffffff",
												padding: "2px 4px",
												borderRadius: "3px",
												fontSize: "9px",
												fontWeight: "600",
											}}
										>
											ADT
										</span>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Purchase Summary Section */}
					<div
						style={{
							background: "#1f2937",
							border: "1px solid #374151",
							borderRadius: "8px",
							padding: "8px",
							marginBottom: "12px",
						}}
					>
						<div
							style={{
								color: "#ffffff",
								fontSize: "14px",
								fontWeight: "600",
								marginBottom: "8px",
								paddingBottom: "6px",
								borderBottom: "1px solid #374151",
							}}
						>
							Purchase Summary
						</div>
						<div
							style={{
								background: "#111827",
								border: "1px solid #374151",
								borderRadius: "4px",
								padding: "6px",
							}}
						>
							{/* Stack items vertically for better mobile compatibility */}
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: "6px",
								}}
							>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "2px",
										padding: "6px",
										background: "#1f2937",
										border: "1px solid #374151",
										borderRadius: "4px",
									}}
								>
									<label
										style={{
											color: "#9ca3af",
											fontSize: "10px",
											fontWeight: "500",
											margin: "0",
										}}
									>
										Name of Card Holder:
									</label>
									<span
										style={{
											color: "#ffffff",
											fontSize: "11px",
											fontWeight: "500",
											wordBreak: "break-word",
										}}
									>
										{card_holder || customer_name || "Not provided"}
									</span>
								</div>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "2px",
										padding: "6px",
										background: "#1f2937",
										border: "1px solid #374151",
										borderRadius: "4px",
									}}
								>
									<label
										style={{
											color: "#9ca3af",
											fontSize: "10px",
											fontWeight: "500",
											margin: "0",
										}}
									>
										Email ID:
									</label>
									<span
										style={{
											color: "#ffffff",
											fontSize: "11px",
											fontWeight: "500",
											wordBreak: "break-word",
										}}
									>
										{email || "Not provided"}
									</span>
								</div>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "2px",
										padding: "6px",
										background: "#1f2937",
										border: "1px solid #374151",
										borderRadius: "4px",
									}}
								>
									<label
										style={{
											color: "#9ca3af",
											fontSize: "10px",
											fontWeight: "500",
											margin: "0",
										}}
									>
										Billing Phone Number:
									</label>
									<span
										style={{
											color: "#ffffff",
											fontSize: "11px",
											fontWeight: "500",
											wordBreak: "break-word",
										}}
									>
										{phone || "Not provided"}
									</span>
								</div>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "2px",
										padding: "6px",
										background: "#1f2937",
										border: "1px solid #374151",
										borderRadius: "4px",
									}}
								>
									<label
										style={{
											color: "#9ca3af",
											fontSize: "10px",
											fontWeight: "500",
											margin: "0",
										}}
									>
										Billing Address:
									</label>
									<span
										style={{
											color: "#ffffff",
											fontSize: "11px",
											fontWeight: "500",
											wordBreak: "break-word",
										}}
									>
										{billing_address || "Not provided"}
									</span>
								</div>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "2px",
										padding: "6px",
										background: "#1f2937",
										border: "1px solid #374151",
										borderRadius: "4px",
									}}
								>
									<label
										style={{
											color: "#9ca3af",
											fontSize: "10px",
											fontWeight: "500",
											margin: "0",
										}}
									>
										Method of Payment:
									</label>
									<span
										style={{
											color: "#ffffff",
											fontSize: "11px",
											fontWeight: "500",
										}}
									>
										{payment_method || "VISA"}
									</span>
								</div>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "2px",
										padding: "6px",
										background: "#1f2937",
										border: "1px solid #374151",
										borderRadius: "4px",
									}}
								>
									<label
										style={{
											color: "#9ca3af",
											fontSize: "10px",
											fontWeight: "500",
											margin: "0",
										}}
									>
										Date of Purchase:
									</label>
									<span
										style={{
											color: "#ffffff",
											fontSize: "11px",
											fontWeight: "500",
										}}
									>
										{purchase_date || new Date().toLocaleDateString()}
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Review Information */}
					<div
						style={{
							background: "#1f2937",
							borderRadius: "8px",
							padding: "12px",
							marginBottom: "12px",
							border: "1px solid #374151",
						}}
					>
						<div
							style={{
								color: "#d1d5db",
								fontSize: "12px",
								lineHeight: "1.5",
							}}
						>
							Make sure that the displayed flight information is as you planned.
							Please review the Names, Dates, Cities, and Departure – Arrival
							times properly.
						</div>
					</div>

					{/* Authorization Section */}
					<div
						style={{
							background: "#1f2937",
							border: "1px solid #374151",
							borderRadius: "8px",
							padding: "12px",
							margin: "12px 0",
							lineHeight: "1.6",
						}}
					>
						<p
							style={{
								color: "#d1d5db",
								marginBottom: "12px",
								margin: "0 0 12px 0",
								fontSize: "12px",
								lineHeight: "1.5",
							}}
						>
							I certify that I{" "}
							<span
								style={{
									color: "#10b981",
									fontWeight: "600",
									background: "rgba(16, 185, 129, 0.1)",
									padding: "2px 4px",
									borderRadius: "3px",
									borderBottom: "1px solid #10b981",
								}}
							>
								{card_holder || "CARD HOLDER NAME"}
							</span>{" "}
							is the authorized user of this card and I will not dispute the
							payment with my credit/debit card company/bank as this amount is
							being charged for my personal travel.
						</p>
						<p
							style={{
								color: "#d1d5db",
								marginBottom: "12px",
								margin: "0 0 12px 0",
								fontSize: "12px",
								lineHeight: "1.5",
							}}
						>
							Awaiting your acceptance to the declaration "I Agree / I
							Authorize".
						</p>
						<div style={{ textAlign: "center", marginTop: "16px" }}>
							<a
								href={`https://apiskyline.aaditravel.com/authrizedAuth?bid=${bookingId}`}
								style={{
									background: "linear-gradient(135deg, #10b981, #059669)",
									color: "#ffffff",
									border: "none",
									padding: "8px 16px",
									borderRadius: "6px",
									fontSize: "12px",
									fontWeight: "600",
									cursor: "pointer",
									boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
									textDecoration: "none",
									display: "inline-block",
								}}
								target="_blank"
								rel="noopener noreferrer"
							>
								✓ I Agree / I Authorize
							</a>
						</div>
					</div>

					{/* Important Notes Section */}
					<div
						style={{
							background: "#1f2937",
							borderRadius: "8px",
							padding: "12px",
							marginBottom: "12px",
							border: "1px solid #374151",
						}}
					>
						<div
							style={{
								color: "#d1d5db",
								fontSize: "11px",
								lineHeight: "1.5",
								marginBottom: "8px",
							}}
						>
							Baggage fee may apply. Check with the airline for the most updated
							baggage rules.
						</div>
						<div
							style={{
								color: "#d1d5db",
								fontSize: "11px",
								lineHeight: "1.5",
								marginBottom: "8px",
							}}
						>
							<strong style={{ color: "#fbbf24" }}>Important:</strong> Your
							e-tickets will be sent to you via email within 24 hours or early
							if there is no delay from the airline's end. Please note that
							fares are not guaranteed until paid and ticketed. If there will be
							any restrictions, updates, or concerns from the airline, we will
							contact you via email or phone. In case, you would like to make
							any changes to this itinerary after the tickets are issued, you
							will be responsible for the additional penalties, fare difference,
							and fees.
						</div>
						<div
							style={{
								color: "#d1d5db",
								fontSize: "11px",
								lineHeight: "1.5",
							}}
						>
							<strong style={{ color: "#fbbf24" }}>Note:</strong> As agreed,
							your credit card may be billed in split charges not exceeding the
							total amount. All transaction service fees are 100%
							non-refundable.
						</div>
					</div>{" "}
					{/* Disclaimer Section */}
					<div
						style={{
							background: "#1f2937",
							borderRadius: "8px",
							padding: "12px",
							marginBottom: "12px",
							border: "1px solid #374151",
						}}
					>
						<div
							style={{
								color: "#fbbf24",
								fontSize: "18px",
								fontWeight: "600",
								marginBottom: "8px",
							}}
						>
							Disclaimer
						</div>
						<div
							style={{
								color: "#d1d5db",
								fontSize: "16px",
								lineHeight: "1.6",
								marginBottom: "8px",
							}}
						>
							SkylineTravels LLC is an independent travel Agency with no
							third-party association. We shall not be associated with or
							considered as an airline or an ally of any of the airlines or
							brands. SkylineTravels is shown on your bank account details in
							most cases. However, sometimes we have to split the payment with
							the airline. SkylineTravels and the airline or another company of
							that organization both will appear as recipients on your account.
							All the service fee and convenience fee is non-refundable.
						</div>
						<div
							style={{
								color: "#d1d5db",
								fontSize: "16px",
								lineHeight: "1.6",
							}}
						>
							In case of any discrepancy and if an amendment is required, please
							feel free to contact us at +1-877-413-0030 or email us at
							booking@skylinetravelsllc.com within 24 hours and we will be happy
							to assist you.
						</div>
					</div>{" "}
					{/* Important Information Section */}
					<div
						style={{
							background: "#1f2937",
							borderRadius: "8px",
							padding: "12px",
							marginBottom: "12px",
							border: "1px solid #374151",
						}}
					>
						<div
							style={{
								color: "#fbbf24",
								fontSize: "18px",
								fontWeight: "600",
								marginBottom: "8px",
							}}
						>
							Important Information
						</div>
						<div
							style={{
								color: "#d1d5db",
								fontSize: "16px",
								lineHeight: "1.6",
								marginBottom: "8px",
							}}
						>
							Please review your itinerary carefully to ensure that the
							following key items are correct:
						</div>
						<div
							style={{
								color: "#d1d5db",
								fontSize: "16px",
								lineHeight: "1.6",
								marginBottom: "8px",
							}}
						>
							• Passenger names must be the same as on the passport
							(International travel) OR any government-approved photo ID proof
							for Domestic travel.
						</div>
						<div
							style={{
								color: "#d1d5db",
								fontSize: "16px",
								lineHeight: "1.6",
								marginBottom: "8px",
							}}
						>
							• We advise all passengers to ensure that all travel documents
							including Passports and required visas are issued and presented at
							the time of travel.
						</div>
						<div
							style={{
								color: "#d1d5db",
								fontSize: "16px",
								lineHeight: "1.6",
								marginBottom: "8px",
							}}
						>
							• All passengers are recommended to be present at the airport 3
							hours before departure for international departures, and 2 before
							domestic travel.
						</div>
						<div
							style={{
								color: "#d1d5db",
								fontSize: "16px",
								lineHeight: "1.6",
								marginBottom: "8px",
							}}
						>
							• All International flights must be confirmed 72 hours before
							departure.
						</div>
						<div
							style={{
								color: "#d1d5db",
								fontSize: "16px",
								lineHeight: "1.6",
								marginBottom: "8px",
							}}
						>
							• Review departure/arrival dates, times, origin/destination
							cities, stopovers, and connections.
						</div>
						<div
							style={{
								color: "#d1d5db",
								fontSize: "16px",
								lineHeight: "1.6",
							}}
						>
							• In case you get notified that your credit card was declined,
							please call us right away at +1-877-413-0030. At least one adult
							must accompany children below the age of 18 years. Children 12
							years & above are considered adults for pricing purposes.
						</div>
					</div>{" "}
					{/* Changes Query Section */}
					<div
						style={{
							background: "#1f2937",
							borderRadius: "8px",
							padding: "12px",
							marginBottom: "12px",
							border: "1px solid #374151",
						}}
					>
						<div
							style={{
								color: "#fbbf24",
								fontSize: "18px",
								fontWeight: "600",
								marginBottom: "8px",
							}}
						>
							For Changes Query
						</div>
						<div
							style={{
								color: "#d1d5db",
								fontSize: "16px",
								lineHeight: "1.6",
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
							borderRadius: "8px",
							padding: "12px",
							marginBottom: "12px",
							border: "1px solid #374151",
						}}
					>
						<div
							style={{
								color: "#fbbf24",
								fontSize: "18px",
								fontWeight: "600",
								marginBottom: "8px",
							}}
						>
							For Cancellations
						</div>
						<div
							style={{
								color: "#d1d5db",
								fontSize: "16px",
								lineHeight: "1.6",
							}}
						>
							• Call us at +1-877-413-0030, booking should be canceled at least
							3-4 hours before the scheduled departure time of your flight to
							avoid a no-show for a future travel / Refund credit if allowed by
							the airline. Cancellations can only be processed over the phone.
						</div>
					</div>
					{/* Seat Assignments Section */}
					<div
						style={{
							background: "#1f2937",
							borderRadius: "8px",
							padding: "12px",
							marginBottom: "12px",
							border: "1px solid #374151",
						}}
					>
						<div
							style={{
								color: "#fbbf24",
								fontSize: "18px",
								fontWeight: "600",
								marginBottom: "8px",
							}}
						>
							Seat Assignments
						</div>
						<div
							style={{
								color: "#d1d5db",
								fontSize: "16px",
								lineHeight: "1.6",
							}}
						>
							Most airlines have restricted rules for advance seat assignment
							and can only be done with a fee. Some fare restrictions only allow
							seat assignment at the airport during the time of check-in. Please
							refer to each operating airline for the most restricted rules.
							Call us at +1-877-413-0030 for seat assignment, if applicable.
						</div>
					</div>
					{/* Baggage Policy Section */}
					<div
						style={{
							background: "#1f2937",
							borderRadius: "8px",
							padding: "12px",
							marginBottom: "12px",
							border: "1px solid #374151",
						}}
					>
						<div
							style={{
								color: "#fbbf24",
								fontSize: "18px",
								fontWeight: "600",
								marginBottom: "8px",
							}}
						>
							Baggage Policy
						</div>
						<div
							style={{
								color: "#d1d5db",
								fontSize: "16px",
								lineHeight: "1.6",
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
							borderRadius: "8px",
							padding: "12px",
							marginBottom: "12px",
							border: "1px solid #374151",
						}}
					>
						<div
							style={{
								color: "#fbbf24",
								fontSize: "18px",
								fontWeight: "600",
								marginBottom: "8px",
							}}
						>
							Visa/Travel Documents
						</div>
						<div
							style={{
								color: "#d1d5db",
								fontSize: "16px",
								lineHeight: "1.6",
							}}
						>
							All customers are advised to verify travel documents (transit
							visa/entry visa) for the country through which they are transiting
							or entering. We will not be responsible if proper travel documents
							are not available and you are denied entry or transit into a
							Country. We request you consult the embassy of the country(s) you
							are visiting or transiting through. Please visit TSA for any
							questions regarding this, as well as information on check-in
							procedures and airport security.
						</div>
					</div>
					{/* Check-In Section */}
					<div
						style={{
							background: "#1f2937",
							borderRadius: "8px",
							padding: "12px",
							marginBottom: "12px",
							border: "1px solid #374151",
						}}
					>
						<div
							style={{
								color: "#fbbf24",
								fontSize: "18px",
								fontWeight: "600",
								marginBottom: "8px",
							}}
						>
							Check-In
						</div>
						<div
							style={{
								color: "#d1d5db",
								fontSize: "16px",
								lineHeight: "1.6",
							}}
						>
							We recommend arriving at the airport 3 hours before your departure
							for international flights and 2 hours before your departure for
							domestic flights. For the most updated check-in rules, please
							contact Airlines or TSA directly.
						</div>
					</div>
					{/* Contact Information Section */}{" "}
					<div
						style={{
							background: "#1f2937",
							borderRadius: "8px",
							padding: "12px",
							marginBottom: "12px",
							border: "1px solid #374151",
						}}
					>
						<div
							style={{
								color: "#d1d5db",
								fontSize: "16px",
								lineHeight: "1.6",
								marginBottom: "8px",
							}}
						>
							Still, have questions? Call us at +1-877-413-0030. Our agents are
							available 24 hours a day, 7 days a week to assist you. You can
							also email us at booking@skylinetravelsllc.com
						</div>
						<div
							style={{
								color: "#d1d5db",
								fontSize: "16px",
								lineHeight: "1.6",
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
						textAlign: "center",
						padding: "8px",
						borderTop: "1px solid #374151",
						background: "rgba(17, 24, 39, 0.5)",
						color: "#6b7280",
						fontSize: "10px",
					}}
				>
					<p style={{ margin: "0 0 4px 0" }}>
						This booking confirmation was generated on{" "}
						{new Date().toLocaleDateString()}
					</p>
					<p style={{ margin: "0" }}>
						SkylineTravels LLC &copy; 2025. All rights reserved.
					</p>
				</div>
			</div>
		</div>
	);
};

export default EmailNewBooking;
