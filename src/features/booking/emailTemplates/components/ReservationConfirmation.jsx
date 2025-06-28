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
						You can contact us on this number <strong>+1-877-413-0030</strong>{" "}
						for any related request.
					</Text>
					<Text>
						As per our conversation and as agreed, we have booked your
						reservation under Confirmation Number <strong>{pnr}</strong> on{" "}
						<strong>{airline_name}</strong> with a charge of{" "}
						<strong>
							{amount} {currency}
						</strong>{" "}
						all inclusive of taxes and fees as per the below description.
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
									{item.amount} {item.currency}
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
						Your e-tickets will be sent via email within 24 hours or early if
						there is no delay from the airline's end. Please note that fares are
						not guaranteed until paid and ticketed. If there will be any
						restrictions, updates, or concerns from the airline, we will contact
						you via email or phone. In case, you would like to make any changes
						to this itinerary after the tickets are issued, you will be
						responsible for the additional penalties, fare difference, and fees.
					</Text>
					<Text>
						Note: As agreed, your credit card may be billed in split charges not
						exceeding the total amount. All transaction service fees are 100%
						non-refundable
					</Text>
					<Text style={subheading}>Disclaimer:</Text>
					<Text>
						SkylineTravels LLC is an independent travel Agency with no
						third-party association. We shall not be associated with or
						considered as an airline or an ally of any of the airlines or
						brands. SkylineTravels is shown on your bank account details in most
						cases. However, sometimes we have to split the payment with the
						airline. SkylineTravels and the airline or another company of that
						organization both will appear as recipients on your account. All the
						service fee and convenience fee is non-refundable.
					</Text>
					<Text>
						In case of any discrepancy and if an amendment is required, please
						feel free to contact us at <strong>+1-877-413-0030</strong> or email
						us at{" "}
						<a href="mailto:booking@skylinetravelsllc.com">
							booking@skylinetravelsllc.com
						</a>{" "}
						 within 24 hours and we will be happy to assist you. or within 24
						hours.
					</Text>
					<Text style={subheading}>Important Information:</Text>
					<Text>
						• Passenger names must be the same as on the passport (International
						travel) OR any government-approved photo ID proof for Domestic
						travel.
					</Text>
					<Text>
						• We advise all passengers to ensure that all travel documents
						including Passports and required visas are issued and presented at
						the time of travel.{" "}
					</Text>
					<Text>
						• All passengers are recommended to be present at the airport 3
						hours before departure for international departures, and 2 before
						domestic travel.
					</Text>
					<Text>
						• All International flights must be confirmed 72 hours before
						departure.
					</Text>
					<Text>
						• Review departure/arrival dates, times, origin/destination cities,
						stopovers, and connections.
					</Text>
					<Text>
						In case you get notified that your credit card was declined, please
						call us right away at <strong>+1-877-413-0030</strong>. At least one
						adult must accompany children below the age of 18 years. Children 12
						years & above are considered adults for pricing purposes.
					</Text>
					<Text style={subheading}>For Changes Query:</Text>
					<Text>
						Call us at <strong>+1-877-413-0030</strong> to make any kind of
						changes to the itinerary. Fees will apply due to airline penalties,
						fare differences, and other factors to change the itinerary.
					</Text>
					<Text style={subheading}>For Cancellations:</Text>
					<Text>
						Call us at <strong>+1-877-413-0030</strong>, booking should be
						canceled at least 3-4 hours before the scheduled departure time of
						your flight to avoid a no-show for a future travel / Refund credit
						if allowed by the airline. Cancellations can only be processed over
						the phone.
					</Text>
					<Text style={subheading}>Seat Assignments:</Text>
					<Text>
						Most airlines have restricted rules for advance seat assignment and
						can only be done with a fee. Some fare restrictions only allow seat
						assignment at the airport during the time of check-in. Please refer
						to each operating airline for the most restricted rules. Call us at
						<strong>+1-877-413-0030</strong> for seat assignment, if applicable.
					</Text>
					<Text style={subheading}>Baggage Policy:</Text>
					<Text>
						Your reservation may have a restricted baggage allowance and some
						airlines may charge an additional fee for each allowed checked-in or
						carry-on bag. Please refer to each operating airline for the most
						restricted rules. Call us at <strong>+1-877-413-0030</strong> for
						baggage, if applicable.
					</Text>
					<Text style={subheading}>Visa/Travel Documents:</Text>
					<Text>
						All customers are advised to verify travel documents (transit
						visa/entry visa) for the country through which they are transiting
						or entering. We will not be responsible if proper travel documents
						are not available and you are denied entry or transit into a
						Country. We request you consult the embassy of the country(s) you
						are visiting or transiting through. Please visit TSA for any
						questions regarding this, as well as information on check-in
						procedures and airport security.
					</Text>
					<Text style={subheading}>Check-In:</Text>
					<Text>
						We recommend arriving at the airport 3 hours before your departure
						for international flights and 2 hours before your departure for
						domestic flights. For the most updated check-in rules, please
						contact Airlines or TSA directly.
					</Text>
					<Text>
						Still have questions? Call us at <strong>+1-877-413-0030</strong>.
						Our agents are available 24 hours a day, 7 days a week to assist
						you. You can also email us at{" "}
						<a href="mailto:booking@skylinetravelsllc.com">
							booking@skylinetravelsllc.com
						</a>
						.
					</Text>
					<Text>
						We value your business and look forward to serving your travel needs
						in the near future.
					</Text>
					<Text>
						Best Regards, <br />
						<strong>{agent_name}</strong>
					</Text>
					<br />
					<br />
					<Text>
						I certify that I, <strong>{card_holder}</strong> is the authorized
						user of this card and I will not dispute the payment with my credit
						/debit card company/bank as this amount is being charged for my
						personal travel.
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
