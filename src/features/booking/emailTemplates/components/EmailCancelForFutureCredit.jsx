import {
	Html,
	Head,
	Preview,
	Body,
	Container,
	Text,
	Section,
	Img,
} from "@react-email/components";

export const EmailCancelForFutureCredit = ({ bookingData }) => {
	const {
		airline_name = "",
		customer_name = "",
		pnr = "",
		amount = "",
		email = "",
		phone = "",
		card_holder = "",
		card_number = "",
		payment_method = "",
		purchase_date = "",
		billing_address = "",
		city = "",
		state = "",
		zip = "",
		country = "US",
		passenger_data = [],
		charge_data = [],
		image_itinerary = "",
		currency = "",
		bid = "",
		agent_name = "",
		future_credit_amount = "",
		rebooking_penalty = "",
	} = bookingData;
	const fullAddress = [billing_address, city, state, zip, country]
		.filter(Boolean)
		.join(", ");

	const baseUploadUrl =
		import.meta.env.VITE_UPLOADS_BASE_URL ||
		"https://apiskyline.aaditravel.com/uploads/";

	return (
		<Html>
			<Head />
			<Preview>Future Credit Confirmation – {pnr}</Preview>
			<Body style={main}>
				<Container style={container}>
					<Text style={heading}>
						{airline_name} – Future Credit Confirmation – {pnr}
					</Text>
					<Text>
						Dear <strong>{customer_name}</strong>,
					</Text>
					<Text>Thank you for contacting us!</Text>
					<Text>
						Your booking has been handled by our travel expert,{" "}
						<strong>{agent_name}</strong>.
					</Text>
					<Text>
						You can contact us on this number <strong>+1-877-413-0030</strong>{" "}
						for any related request.
					</Text>
					<Text>
						As per our conversation and as agreed, your reservation has been
						cancelled directly by <strong>{airline_name}</strong> under
						confirmation no. <strong>{pnr}</strong> for a future credit of{" "}
						<strong>USD {future_credit_amount}</strong> per passenger.
					</Text>
					<Text>
						This credit is valid to travel on <strong>{airline_name}</strong>{" "}
						and is non-transferable to any other airline or person. At the time
						of rebooking, you may have to pay the airline penalty of{" "}
						<strong>USD {rebooking_penalty}</strong> per passenger plus the
						applicable fare difference.
					</Text>
					<Text>
						To process cancellation of your flights with a future credit, there
						will be a new charge of <strong>USD {amount}</strong>.
					</Text>
					<Text style={subheading}>Charges Description:</Text>
					<table style={table}>
						<tr>
							<th style={th}>{"Amount"}</th>
							<th style={th}>{"Description"}</th>
						</tr>
						{charge_data.map((item, index) => (
							<tr key={index}>
								<td style={td}>
									{item.amount} {currency}
								</td>
								<td style={td}>{item.description}</td>
							</tr>
						))}
					</table>{" "}
					{image_itinerary && (
						<>
							<Text style={subheading}>E-Credit Details:</Text>
							{Array.isArray(image_itinerary) ? (
								image_itinerary.map((img, index) => (
									<Img
										key={index}
										src={baseUploadUrl + img}
										alt={`E-Credit Info ${index + 1}`}
										style={imgStyle}
									/>
								))
							) : (
								<Img
									src={baseUploadUrl + image_itinerary}
									alt="E-Credit Info"
									style={imgStyle}
								/>
							)}
						</>
					)}
					<Text style={subheading}>Passenger Details:</Text>
					<table style={table}>
						<tr>
							<th style={th}>{"Name"}</th>
							<th style={th}>{"DOB"}</th>
						</tr>
						{passenger_data.map((item, index) => (
							<tr key={index}>
								<td style={td}>
									{item.firstName + " " + item.middleName + " " + item.lastName}
								</td>
								<td style={td}>{item.dob}</td>
							</tr>
						))}
					</table>
					<Text style={subheading}>Purchase Summary:</Text>
					<table style={table}>
						<tbody>
							{/* <tr>
                                <th style={th}>Field</th>
                                <th style={th}>Value</th>
                            </tr> */}
							<tr>
								<td style={td}>Name of Card Holder</td>
								<td style={td}>{card_holder}</td>
							</tr>
							<tr>
								<td style={td}>Email ID</td>
								<td style={td}>{email}</td>
							</tr>
							<tr>
								<td style={td}>Billing Phone Number</td>
								<td style={td}>{phone}</td>
							</tr>
							<tr>
								<td style={td}>Billing Address</td>
								<td style={td}>{fullAddress}</td>
							</tr>
							<tr>
								<td style={td}>Method of Payment</td>
								<td style={td}>{payment_method}</td>
							</tr>
							<tr>
								<td style={td}>Date of Purchase</td>
								<td style={td}>{purchase_date}</td>
							</tr>
						</tbody>
					</table>
					<Text style={note}>
						Baggage fees may apply. Check with the airline for updated baggage
						rules.
					</Text>
					<Text style={subheading}>Important:</Text>
					<Text>
						Your credit card may be billed in split charges. All service fees
						are 100% non-refundable.
					</Text>
					<Text style={subheading}>Disclaimer:</Text>
					<Text>
						SkylineTravels LLC is an independent travel agency and is not
						affiliated with any airline. SkylineTravels may appear as a charge
						on your card. Service fees are non-refundable.
					</Text>
					<Text>
						Airline changes are not confirmed until finalized by the airline. If
						changes are made after ticket exchange, additional penalties and
						fare differences apply.
					</Text>
					<Text style={subheading}>Refund Policy:</Text>
					<Text>
						Most airline tickets are non-refundable. Some tickets may be changed
						with a fee and fare difference. Refunds depend on airline fare
						rules.
					</Text>
					<Text>
						For discrepancies or amendments, contact{" "}
						<strong>+1-877-413-0030</strong> or{" "}
						<a href="mailto:booking@skylinetravelsllc.com">
							booking@skylinetravelsllc.com
						</a>{" "}
						within 24 hours.
					</Text>
					<Text style={subheading}>Important Information:</Text>
					<Text>
						• Passenger names must match ID/passport.
						<br />
						• Carry valid travel documents and visas.
						<br />
						• Arrive 3 hours (intl) or 2 hours (domestic) before departure.
						<br />
						• Confirm intl. flights 72 hours in advance.
						<br />• Airline tickets are subject to penalties for any change.
					</Text>
					<Text style={subheading}>Still have questions?</Text>
					<Text>
						Call <strong>+1-877-413-0030</strong> or email{" "}
						<a href="mailto:booking@skylinetravelsllc.com">
							booking@skylinetravelsllc.com
						</a>
						.
					</Text>
					<Text>
						We value your business and hope to serve your travel needs soon.
					</Text>
					<Text>
						I certify that I,{" "}
						<strong>{card_holder || "CARD HOLDER NAME"}</strong>, am the
						authorized user of this card and I will not dispute the payment with
						my credit/debit card company/bank as this amount is being charged
						for my personal travel.
					</Text>
					<Text>
						Awaiting your acceptance to the declaration{" "}
						<a
							href={`https://apiskyline.aaditravel.com/authrizedAuth?bid=${bid}`}
							target="_blank"
							rel="noopener noreferrer"
							style={ctaLink}
						>
							<strong>"I Agree / I Authorize"</strong>
						</a>
					</Text>
				</Container>
			</Body>
		</Html>
	);
};

// Reuse same styles
const main = {
	fontFamily: "Arial, sans-serif",
	backgroundColor: "#f9f9f9",
	margin: 0,
	padding: 0,
};

const container = {
	maxWidth: "600px",
	margin: "0 auto",
	backgroundColor: "#ffffff",
	padding: "24px",
	borderRadius: "8px",
};

const heading = {
	fontSize: "18px",
	fontWeight: "bold",
	marginBottom: "16px",
};

const subheading = {
	fontWeight: "bold",
	marginTop: "20px",
	marginBottom: "8px",
};

const note = {
	fontStyle: "italic",
	color: "#666",
	marginTop: "10px",
};

const table = {
	width: "100%",
	borderCollapse: "collapse",
	marginBottom: "12px",
};

const td = {
	border: "1px solid #ccc",
	padding: "8px",
	fontSize: "14px",
	verticalAlign: "top",
};
const th = {
	border: "1px solid #ccc",
	padding: "8px",
	fontSize: "14px",
	fontWeight: "bold",
	backgroundColor: "#f2f2f2",
	textAlign: "left",
};

const imgStyle = {
	width: "100%",
	height: "auto",
	marginTop: "8px",
	marginBottom: "16px",
};

const ctaLink = {
	display: "inline-block",
	padding: "8px 12px",
	backgroundColor: "#007BFF",
	color: "#fff",
	textDecoration: "none",
	borderRadius: "4px",
	fontWeight: "bold",
	marginLeft: "6px",
};

export default EmailCancelForFutureCredit;
