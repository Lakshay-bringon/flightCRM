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

const EmailCancelForFutureCredit = ({ bookingData = {} }) => {
	// Destructure props with extensive fallback values
	const {
		airline_name = "AIRLINE NAME",
		confirmation_number = "",
		pnr = "",
		customer_name = "Customer Name",
		passenger_name = "",
		email = "customer@email.com",
		phone = "+1 (XXX) XXX-XXXX",

		// Original flight details
		original_departure_city = "Departure City",
		original_arrival_city = "Arrival City",
		original_departure_date = new Date().toLocaleDateString(),
		original_departure_time = "00:00",
		original_arrival_date = new Date().toLocaleDateString(),
		original_arrival_time = "00:00",
		original_flight_number = "XX000",
		original_class = "Economy",

		// Credit details
		credit_amount = "0.00",
		credit_reference = "",
		credit_expiry_date = "",
		currency = "USD",

		// Images
		images = [],
		itinerary_details = "",

		// Additional details
		cancellation_date = new Date().toLocaleDateString(),
		cancellation_reason = "Customer Request",
		credit_type = "Travel Credit",
	} = bookingData;
	// Generate fallback values
	const finalPnr = pnr || confirmation_number || "XXXXXX";
	const finalCreditReference =
		credit_reference || `FC${finalPnr}${Date.now().toString().slice(-4)}`;
	const finalCreditExpiry =
		credit_expiry_date ||
		new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString();
	const displayPassengerName =
		passenger_name || customer_name || "Passenger Name";
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
							Future Credit Confirmation –{" "}
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
								This email serves as confirmation that your booking has been
								cancelled and converted to a future travel credit. Below are the
								details of your cancelled flight and the credit information for
								your future use.
							</p>
							<p
								style={{
									marginBottom: "12px",
									margin: "0 0 12px 0",
								}}
							>
								<strong>Original Confirmation Number:</strong> {finalPnr}
							</p>
							<p
								style={{
									marginBottom: "12px",
									margin: "0 0 12px 0",
								}}
							>
								<strong>Cancellation Date:</strong> {cancellation_date}
							</p>
							<p
								style={{
									marginBottom: "12px",
									margin: "0 0 12px 0",
								}}
							>
								<strong>Cancellation Reason:</strong> {cancellation_reason}
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
							Credit Details
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
										Description
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
										Amount
									</th>
								</tr>
							</thead>
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
										Original Booking Amount
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
										{currency} {credit_amount}
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
										Cancellation Fees
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
										{currency} 0.00
									</td>
								</tr>
								<tr>
									<td
										style={{
											padding: "12px 16px",
											textAlign: "left",
											borderBottom: "none",
											color: "#d1d5db",
											fontSize: "14px",
										}}
									>
										<strong>Future Credit Amount</strong>
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
										<strong>
											{currency} {credit_amount}
										</strong>
									</td>
								</tr>
							</tbody>
						</table>
					</div>{" "}
					{/* Original Flight Details */}
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
							Cancelled Flight Details
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
							<thead>
								<tr>
									<th
										style={{
											padding: "12px 16px",
											textAlign: "left",
											borderBottom: "1px solid #374151",
											borderRight: "1px solid #374151",
											background: "#1f2937",
											color: "#ffffff",
											fontWeight: "600",
											fontSize: "14px",
										}}
									>
										Flight
									</th>
									<th
										style={{
											padding: "12px 16px",
											textAlign: "left",
											borderBottom: "1px solid #374151",
											borderRight: "1px solid #374151",
											background: "#1f2937",
											color: "#ffffff",
											fontWeight: "600",
											fontSize: "14px",
										}}
									>
										From
									</th>
									<th
										style={{
											padding: "12px 16px",
											textAlign: "left",
											borderBottom: "1px solid #374151",
											borderRight: "1px solid #374151",
											background: "#1f2937",
											color: "#ffffff",
											fontWeight: "600",
											fontSize: "14px",
										}}
									>
										To
									</th>
									<th
										style={{
											padding: "12px 16px",
											textAlign: "left",
											borderBottom: "1px solid #374151",
											borderRight: "1px solid #374151",
											background: "#1f2937",
											color: "#ffffff",
											fontWeight: "600",
											fontSize: "14px",
										}}
									>
										Departure
									</th>
									<th
										style={{
											padding: "12px 16px",
											textAlign: "left",
											borderBottom: "1px solid #374151",
											borderRight: "1px solid #374151",
											background: "#1f2937",
											color: "#ffffff",
											fontWeight: "600",
											fontSize: "14px",
										}}
									>
										Arrival
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
										Class
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td
										style={{
											padding: "12px 16px",
											textAlign: "left",
											borderRight: "1px solid #374151",
											color: "#d1d5db",
											fontSize: "14px",
										}}
									>
										{original_flight_number}
									</td>
									<td
										style={{
											padding: "12px 16px",
											textAlign: "left",
											borderRight: "1px solid #374151",
											color: "#d1d5db",
											fontSize: "14px",
										}}
									>
										{original_departure_city}
									</td>
									<td
										style={{
											padding: "12px 16px",
											textAlign: "left",
											borderRight: "1px solid #374151",
											color: "#d1d5db",
											fontSize: "14px",
										}}
									>
										{original_arrival_city}
									</td>
									<td
										style={{
											padding: "12px 16px",
											textAlign: "left",
											borderRight: "1px solid #374151",
											color: "#d1d5db",
											fontSize: "14px",
										}}
									>
										{original_departure_date} {original_departure_time}
									</td>
									<td
										style={{
											padding: "12px 16px",
											textAlign: "left",
											borderRight: "1px solid #374151",
											color: "#d1d5db",
											fontSize: "14px",
										}}
									>
										{original_arrival_date} {original_arrival_time}
									</td>
									<td
										style={{
											padding: "12px 16px",
											textAlign: "left",
											color: "#d1d5db",
											fontSize: "14px",
										}}
									>
										{original_class}
									</td>
								</tr>
							</tbody>
						</table>
					</div>{" "}
					{/* Passenger Details */}
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
							Passenger Details
						</div>
						<div
							style={{
								background: "#111827",
								border: "1px solid #374151",
								borderRadius: "8px",
								padding: "16px",
							}}
						>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									marginBottom: "12px",
									padding: "8px 0",
									borderBottom: "1px solid #374151",
								}}
							>
								<span
									style={{
										color: "#9ca3af",
										fontSize: "14px",
										fontWeight: "500",
									}}
								>
									Passenger Name:
								</span>
								<span
									style={{
										color: "#ffffff",
										fontSize: "14px",
										fontWeight: "600",
									}}
								>
									{displayPassengerName}
								</span>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									marginBottom: "12px",
									padding: "8px 0",
									borderBottom: "1px solid #374151",
								}}
							>
								<span
									style={{
										color: "#9ca3af",
										fontSize: "14px",
										fontWeight: "500",
									}}
								>
									Email:
								</span>
								<span
									style={{
										color: "#ffffff",
										fontSize: "14px",
										fontWeight: "600",
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
								}}
							>
								<span
									style={{
										color: "#9ca3af",
										fontSize: "14px",
										fontWeight: "500",
									}}
								>
									Phone:
								</span>
								<span
									style={{
										color: "#ffffff",
										fontSize: "14px",
										fontWeight: "600",
									}}
								>
									{phone}
								</span>
							</div>
						</div>
					</div>{" "}
					{/* Future Credit Summary */}
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
							Future Credit Information
						</div>
						<div
							style={{
								background: "#111827",
								border: "2px solid #f59e0b",
								borderRadius: "8px",
								padding: "24px",
								textAlign: "center",
							}}
						>
							<p
								style={{
									color: "#d1d5db",
									fontSize: "16px",
									margin: "0 0 12px 0",
								}}
							>
								Your {credit_type} Amount:
							</p>
							<div
								style={{
									color: "#f59e0b",
									fontSize: "32px",
									fontWeight: "700",
									margin: "12px 0",
									textShadow: "0 2px 4px rgba(0,0,0,0.3)",
								}}
							>
								{currency} {credit_amount}
							</div>
							<p
								style={{
									color: "#d1d5db",
									fontSize: "16px",
									margin: "20px 0 12px 0",
								}}
							>
								Credit Reference Number:
							</p>
							<div
								style={{
									background: "#374151",
									color: "#ffffff",
									fontSize: "18px",
									fontWeight: "600",
									padding: "12px 16px",
									borderRadius: "6px",
									border: "1px solid #f59e0b",
									letterSpacing: "1px",
								}}
							>
								{finalCreditReference}
							</div>
						</div>
					</div>{" "}
					{/* Important Credit Notice */}
					<div
						style={{
							background: "#dc2626",
							border: "2px solid #ef4444",
							borderRadius: "8px",
							padding: "20px",
							marginBottom: "24px",
							textAlign: "center",
						}}
					>
						<p
							style={{
								color: "#ffffff",
								fontSize: "16px",
								fontWeight: "600",
								margin: "0 0 12px 0",
							}}
						>
							⚠️ IMPORTANT: Your future credit expires on
						</p>
						<div
							style={{
								background: "#ffffff",
								color: "#dc2626",
								fontSize: "20px",
								fontWeight: "700",
								padding: "12px 16px",
								borderRadius: "6px",
								margin: "12px 0",
								border: "2px solid #ef4444",
							}}
						>
							{finalCreditExpiry}
						</div>
						<p
							style={{
								color: "#ffffff",
								fontSize: "16px",
								fontWeight: "600",
								margin: "12px 0 0 0",
							}}
						>
							Please use your credit before this date to avoid forfeiture.
						</p>
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
							Transaction Summary
						</div>
						<div
							style={{
								background: "#111827",
								border: "1px solid #374151",
								borderRadius: "8px",
								padding: "16px",
							}}
						>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									marginBottom: "12px",
									padding: "8px 0",
									borderBottom: "1px solid #374151",
								}}
							>
								<span
									style={{
										color: "#9ca3af",
										fontSize: "14px",
										fontWeight: "500",
									}}
								>
									Original Booking Amount:
								</span>
								<span
									style={{
										color: "#ffffff",
										fontSize: "14px",
										fontWeight: "600",
									}}
								>
									{currency} {credit_amount}
								</span>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									marginBottom: "12px",
									padding: "8px 0",
									borderBottom: "1px solid #374151",
								}}
							>
								<span
									style={{
										color: "#9ca3af",
										fontSize: "14px",
										fontWeight: "500",
									}}
								>
									Cancellation Fees:
								</span>
								<span
									style={{
										color: "#ffffff",
										fontSize: "14px",
										fontWeight: "600",
									}}
								>
									{currency} 0.00
								</span>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									marginBottom: "12px",
									padding: "8px 0",
									borderBottom: "1px solid #374151",
								}}
							>
								<span
									style={{
										color: "#9ca3af",
										fontSize: "14px",
										fontWeight: "500",
									}}
								>
									Refund to Credit:
								</span>
								<span
									style={{
										color: "#ffffff",
										fontSize: "14px",
										fontWeight: "600",
									}}
								>
									{currency} {credit_amount}
								</span>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									padding: "8px 0",
								}}
							>
								<span
									style={{
										color: "#9ca3af",
										fontSize: "14px",
										fontWeight: "500",
									}}
								>
									Total Future Credit:
								</span>
								<span
									style={{
										color: "#f59e0b",
										fontSize: "16px",
										fontWeight: "700",
									}}
								>
									{currency} {credit_amount}
								</span>
							</div>
						</div>
					</div>{" "}
					{/* Images Section */}
					{(itinerary_details || (images && images.length > 0)) && (
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
								Itinerary Images
							</div>
							<div
								style={{
									background: "#111827",
									border: "1px solid #374151",
									borderRadius: "8px",
									padding: "16px",
								}}
							>
								{itinerary_details && (
									<div style={{ textAlign: "center", marginBottom: "16px" }}>
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
								{images && images.length > 0 && (
									<div
										style={{
											display: "grid",
											gridTemplateColumns:
												"repeat(auto-fit, minmax(300px, 1fr))",
											gap: "16px",
											marginTop: "16px",
										}}
									>
										{images.map((image, index) => (
											<div
												key={index}
												style={{
													background: "#374151",
													borderRadius: "8px",
													padding: "8px",
													textAlign: "center",
												}}
											>
												{image ? (
													<img
														src={getImageSrc(image)}
														alt={`Itinerary ${index + 1}`}
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
														color: "#9ca3af",
														fontSize: "14px",
														padding: "20px",
														fontStyle: "italic",
													}}
												>
													Itinerary Image {index + 1}
												</div>
											</div>
										))}
									</div>
								)}
							</div>
						</div>
					)}{" "}
					{/* Authorization Section */}
					<div
						style={{
							background: "#1e40af",
							border: "2px solid #3b82f6",
							borderRadius: "8px",
							padding: "24px",
							marginBottom: "24px",
							textAlign: "center",
						}}
					>
						<h3
							style={{
								color: "#ffffff",
								fontSize: "18px",
								fontWeight: "700",
								margin: "0 0 16px 0",
							}}
						>
							Credit Acknowledgment
						</h3>
						<p
							style={{
								color: "#e5e7eb",
								fontSize: "14px",
								lineHeight: "1.5",
								margin: "0 0 20px 0",
							}}
						>
							By acknowledging this credit confirmation, you understand and
							agree to the terms and conditions associated with your future
							travel credit, including the expiration date and usage
							restrictions.
						</p>
						<button
							style={{
								background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
								color: "#ffffff",
								border: "none",
								borderRadius: "6px",
								padding: "12px 24px",
								fontSize: "16px",
								fontWeight: "600",
								cursor: "pointer",
								textDecoration: "none",
								display: "inline-block",
								boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
							}}
						>
							I Acknowledge
						</button>
					</div>{" "}
					{/* Important Information */}
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
								paddingBottom: "8px",
								borderBottom: "1px solid #374151",
							}}
						>
							Important Information
						</div>
						<div
							style={{
								color: "#d1d5db",
								fontSize: "14px",
								lineHeight: "1.6",
							}}
						>
							<ul
								style={{
									margin: "0",
									paddingLeft: "20px",
								}}
							>
								<li style={{ marginBottom: "8px" }}>
									Future credits must be used before the expiration date to
									avoid forfeiture
								</li>
								<li style={{ marginBottom: "8px" }}>
									Credits are non-transferable and can only be used by the
									original passenger
								</li>
								<li style={{ marginBottom: "8px" }}>
									Credits can be applied to future bookings with the same
									airline
								</li>
								<li style={{ marginBottom: "8px" }}>
									Additional fees may apply when rebooking depending on fare
									differences
								</li>
								<li style={{ marginBottom: "8px" }}>
									Partial use of credit is allowed, with remaining balance valid
									until expiration
								</li>
								<li style={{ marginBottom: "0" }}>
									Contact customer service to apply your credit to new bookings
								</li>
							</ul>
						</div>
					</div>{" "}
					{/* How to Use Your Credit */}
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
								paddingBottom: "8px",
								borderBottom: "1px solid #374151",
							}}
						>
							How to Use Your Credit
						</div>
						<div
							style={{
								color: "#d1d5db",
								fontSize: "14px",
								lineHeight: "1.6",
							}}
						>
							<p
								style={{
									margin: "0 0 12px 0",
								}}
							>
								To use your future credit for a new booking:
							</p>
							<ul
								style={{
									margin: "0",
									paddingLeft: "20px",
								}}
							>
								<li style={{ marginBottom: "8px" }}>
									Contact our customer service team or visit our website
								</li>
								<li style={{ marginBottom: "8px" }}>
									Provide your credit reference number:{" "}
									<strong style={{ color: "#f59e0b" }}>
										{finalCreditReference}
									</strong>
								</li>
								<li style={{ marginBottom: "8px" }}>
									Select your new travel dates and destinations
								</li>
								<li style={{ marginBottom: "8px" }}>
									Credit will be applied to your new booking automatically
								</li>
								<li style={{ marginBottom: "0" }}>
									Pay any fare difference if the new booking exceeds credit
									amount
								</li>
							</ul>
						</div>
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
								paddingBottom: "8px",
								borderBottom: "1px solid #374151",
							}}
						>
							Disclaimer
						</div>
						<div
							style={{
								color: "#d1d5db",
								fontSize: "14px",
								lineHeight: "1.6",
							}}
						>
							<p style={{ margin: "0" }}>
								This future credit is issued in accordance with {airline_name}{" "}
								terms and conditions. The airline reserves the right to modify
								credit terms and conditions as necessary. Credits are subject to
								availability and booking class restrictions. Additional terms
								may apply.
							</p>
						</div>
					</div>{" "}
					{/* Refund Policy */}
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
								paddingBottom: "8px",
								borderBottom: "1px solid #374151",
							}}
						>
							Credit Policy
						</div>
						<div
							style={{
								color: "#d1d5db",
								fontSize: "14px",
								lineHeight: "1.6",
							}}
						>
							<p style={{ margin: "0" }}>
								Future credits are non-refundable and cannot be converted back
								to cash. Credits must be used within the validity period. Unused
								credits will expire and become invalid after the expiration
								date. The airline is not responsible for expired or unused
								credits.
							</p>
						</div>
					</div>{" "}
					{/* Service Terms */}
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
								paddingBottom: "8px",
								borderBottom: "1px solid #374151",
							}}
						>
							Service Terms
						</div>
						<div
							style={{
								color: "#d1d5db",
								fontSize: "14px",
								lineHeight: "1.6",
							}}
						>
							<p style={{ margin: "0" }}>
								By accepting this future credit, you acknowledge that you have
								read and agree to be bound by
								{airline_name} current terms and conditions of service. For
								complete terms and conditions, please visit our website or
								contact customer service.
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
							marginBottom: "16px",
						}}
					>
						<div
							style={{
								color: "#ffffff",
								fontSize: "16px",
								fontWeight: "600",
								marginBottom: "12px",
								paddingBottom: "8px",
								borderBottom: "1px solid #374151",
							}}
						>
							Need Help?
						</div>
						<div
							style={{
								color: "#d1d5db",
								fontSize: "14px",
								lineHeight: "1.6",
							}}
						>
							<p
								style={{
									margin: "0 0 16px 0",
								}}
							>
								If you have any questions about your future credit or need
								assistance with rebooking, please don't hesitate to contact our
								customer service team. We're here to help make your future
								travel experience seamless.
							</p>
							<p style={{ margin: "0" }}>
								<strong style={{ color: "#ffffff" }}>Customer Service:</strong>{" "}
								Available 24/7
								<br />
								<strong style={{ color: "#ffffff" }}>Phone:</strong>{" "}
								1-800-XXX-XXXX
								<br />
								<strong style={{ color: "#ffffff" }}>Email:</strong> support@
								{airline_name.toLowerCase().replace(/\s+/g, "")}.com
							</p>
						</div>
					</div>
				</div>{" "}
				<div
					style={{
						background: "#111827",
						color: "#9ca3af",
						textAlign: "center",
						padding: "24px",
						borderTop: "1px solid #374151",
						fontSize: "12px",
						lineHeight: "1.5",
					}}
				>
					<p style={{ margin: "0 0 8px 0" }}>
						This future credit confirmation was generated on{" "}
						{new Date().toLocaleDateString()}
					</p>
					<p style={{ margin: "0 0 8px 0" }}>
						Thank you for choosing {airline_name} for your travel needs.
					</p>
					<p style={{ margin: "0" }}>
						{airline_name} &copy; 2025. All rights reserved.
					</p>
				</div>
			</div>
		</div>
	);
};

export default EmailCancelForFutureCredit;
