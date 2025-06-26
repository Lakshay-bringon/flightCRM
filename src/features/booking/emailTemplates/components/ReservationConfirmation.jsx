import {
	Html,
	Head,
	Preview,
	Body,
	Container,
	Text,
	Section,
	Img,
	Hr,
} from "@react-email/components";

export const ReservationConfirmation = ({ bookingData }) => {
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
		country = "",
		passenger_data = [],
		charge_data = [],
		image_itinerary = "",
		currency = "",
		bid = "",
		agent_name,
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
			<Preview>Reservation Confirmation – {pnr}</Preview>
			<Body style={main}>
				<Container style={container}>
					<Text style={heading}>
						{airline_name} – Reservation Confirmation – {pnr}
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
						As per our conversation and agreement, we have booked your
						reservation under Confirmation Number <strong>{pnr}</strong> on{" "}
						<strong>{airline_name}</strong> with a charge of{" "}
						<strong>
							{amount} {currency}
						</strong>{" "}
						(inclusive of taxes and fees) as per the below description:
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
					<Text style={subheading}>Flight Details:</Text>
					{image_itinerary &&
						(Array.isArray(image_itinerary) ? (
							image_itinerary.map((img, index) => (
								<Img
									key={index}
									src={baseUploadUrl + img}
									alt={`Itinerary ${index + 1}`}
									style={imgStyle}
								/>
							))
						) : (
							<Img
								src={baseUploadUrl + image_itinerary}
								alt="Itinerary"
								style={imgStyle}
							/>
						))}
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
					<Text>
						Make sure that the displayed flight information is as you planned.
						Please review the Names, Dates, Cities, and Departure – Arrival
						times properly.
					</Text>
					<Text style={note}>
						Baggage fees may apply. Check with the airline for updated baggage
						rules.
					</Text>
					<Text style={subheading}>Important:</Text>
					<Text>
						Your e-tickets will be sent via email within 24 hours if there is no
						airline delay. Fares are not guaranteed until paid and ticketed. For
						post-ticket changes, you are responsible for penalties, fare
						difference, and applicable fees.
					</Text>
					<Text>
						Note: Your card may be billed in split charges not exceeding the
						total amount. All service fees are non-refundable.
					</Text>
					<Text style={subheading}>Disclaimer:</Text>
					<Text>
						SkylineTravels LLC is an independent travel agency and is not
						affiliated with any airline. SkylineTravels may appear as a charge
						on your card. Service fees are non-refundable.
					</Text>
					<Text>
						For any changes or discrepancies, please contact us at{" "}
						<strong>+1-877-413-0030</strong> or{" "}
						<a href="mailto:booking@skylinetravelsllc.com">
							booking@skylinetravelsllc.com
						</a>{" "}
						within 24 hours.
					</Text>
					<Text style={subheading}>Important Information:</Text>
					<table style={table}>
						<tbody>
							<tr>
								<td style={td}>
									• Passenger names must match government ID (Passport for
									international).
								</td>
							</tr>
							<tr>
								<td style={td}>• Ensure all travel documents are prepared.</td>
							</tr>
							<tr>
								<td style={td}>
									• Arrive 3 hours prior (international) or 2 hours prior
									(domestic).
								</td>
							</tr>
							<tr>
								<td style={td}>
									• Confirm international flights 72 hours before departure.
								</td>
							</tr>
						</tbody>
					</table>
					<Text>
						If your credit card is declined, call us immediately at{" "}
						<strong>+1-877-413-0030</strong>. Children 12+ are considered adults
						for pricing.
					</Text>
					<Text style={subheading}>For Changes:</Text>
					<table style={table}>
						<tbody>
							<tr>
								<td style={td}>
									Call <strong>+1-877-413-0030</strong>. Fees apply due to
									penalties or fare differences.
								</td>
							</tr>
						</tbody>
					</table>
					<Text style={subheading}>For Cancellations:</Text>
					<table style={table}>
						<tbody>
							<tr>
								<td style={td}>
									Call at least 3-4 hours before departure to avoid no-show.
									Cancellation must be over the phone.
								</td>
							</tr>
						</tbody>
					</table>
					<Text style={subheading}>Seat Assignments:</Text>
					<table style={table}>
						<tbody>
							<tr>
								<td style={td}>
									Many airlines charge for advance seat assignments. Some allow
									only during check-in. Contact us for assistance.
								</td>
							</tr>
						</tbody>
					</table>
					<Text style={subheading}>Baggage Policy:</Text>
					<table style={table}>
						<tbody>
							<tr>
								<td style={td}>
									Baggage fees may apply. Refer to the airline for rules.
									Contact us for more info.
								</td>
							</tr>
						</tbody>
					</table>
					<Text style={subheading}>Visa/Travel Documents:</Text>
					<table style={table}>
						<tbody>
							<tr>
								<td style={td}>
									Ensure required travel documents and visas are ready. We are
									not responsible for denied boarding due to missing documents.
								</td>
							</tr>
						</tbody>
					</table>
					<Text style={subheading}>Check-In:</Text>
					<table style={table}>
						<tbody>
							<tr>
								<td style={td}>
									Arrive 3 hours before international flights and 2 hours before
									domestic. Confirm check-in procedures with your airline or
									TSA.
								</td>
							</tr>
						</tbody>
					</table>
					<Text>
						Still have questions? Call <strong>+1-877-413-0030</strong> or email
						us at{" "}
						<a href="mailto:booking@skylinetravelsllc.com">
							booking@skylinetravelsllc.com
						</a>
						.
					</Text>
					<Text>
						We value your business and look forward to serving you again!
					</Text>
					<Text>
						I certify that I, <strong>{card_holder}</strong>, am the authorized
						user of this card and I will not dispute the payment with my
						credit/debit card company or bank, as this amount is being charged
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
							<strong>“I Agree / I Authorize”</strong>
						</a>
					</Text>
				</Container>
			</Body>
		</Html>
	);
};

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

export default ReservationConfirmation;
