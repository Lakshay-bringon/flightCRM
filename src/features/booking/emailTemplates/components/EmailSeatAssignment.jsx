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
import { getESTDateForEmails } from "../../../../utils/formatters";

export const EmailSeatAssignment = ({ bookingData }) => {
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
		currency = "USD",
		passenger_data = [],
		charge_data = [],
		image_itinerary = "",
		seat_numbers = "",
		flight_details = [],
		bid = "",
		agent_name = "",
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
			<Preview>Seat Assignment Confirmation – {pnr}</Preview>
			<Body style={main}>
				<Container style={container}>
					<Text style={heading}>
						{airline_name} – Seat Confirmation – {pnr}
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
						As per our conversation and as agreed, we have assigned your seats
						under Confirmation number <strong>{pnr}</strong> booked on{" "}
						<strong>{airline_name}</strong> with a charge of{" "}
						<strong>
							{currency} {amount}
						</strong>{" "}
						all inclusive of taxes and fees as per the below description:
					</Text>
					<Text style={subheading}>Charges Description:</Text>
					<table style={table}>
						<tr>
							<th style={th}>Amount</th>
							<th style={th}>Description</th>
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
					<Text style={subheading}>Passengers Details:</Text>
					{passenger_data && passenger_data.length > 0 ? (
						<table style={table}>
							<tr>
								<th style={th}>Passenger Name</th>
								<th style={th}>Date of Birth</th>
								<th style={th}>Gender</th>
							</tr>
							{passenger_data.map((passenger, index) => (
								<tr key={index}>
									<td style={td}>
										{`${passenger.firstName || ""} ${passenger.lastName || ""}`}
									</td>
									<td style={td}>{passenger.dateOfBirth || "Not provided"}</td>
									<td style={td}>{passenger.gender || "Not provided"}</td>
								</tr>
							))}
						</table>
					) : (
						<Text>
							{customer_name || "Passenger information not available"}
						</Text>
					)}
					<Text style={subheading}>Flight Details & Seat Numbers:</Text>
					{image_itinerary && (
						<Section>
							{Array.isArray(image_itinerary) ? (
								image_itinerary.map((img, index) => (
									<Img
										key={index}
										src={baseUploadUrl + img}
										alt={`Flight Itinerary ${index + 1}`}
										style={imgStyle}
									/>
								))
							) : (
								<Img
									src={baseUploadUrl + image_itinerary}
									alt="Flight Itinerary"
									style={imgStyle}
								/>
							)}
						</Section>
					)}
					<Text style={subheading}>Purchase Summary:</Text>
					<table style={table}>
						<tbody>
							<tr>
								<td style={td}>Name of Card Holder</td>
								<td style={td}>{card_holder || "Not provided"}</td>
							</tr>
							<tr>
								<td style={td}>Email ID</td>
								<td style={td}>{email || "Not provided"}</td>
							</tr>
							<tr>
								<td style={td}>Billing Phone Number</td>
								<td style={td}>{phone || "Not provided"}</td>
							</tr>
							<tr>
								<td style={td}>Billing Address</td>
								<td style={td}>{fullAddress || "Not provided"}</td>
							</tr>
							<tr>
								<td style={td}>Method of Payment</td>
								<td style={td}>{payment_method || "Not provided"}</td>
							</tr>{" "}
							<tr>
								<td style={td}>Date of Purchase</td>
								<td style={td}>{purchase_date || getESTDateForEmails()}</td>
							</tr>
						</tbody>
					</table>
					<Text style={note}>
						<strong>
							Baggage fee may apply. Check with the airline for the most updated
							baggage rules.
						</strong>
					</Text>
					<Text style={note}>
						<strong>Note:</strong> Your credit card may be billed in split
						charges not exceeding the total amount. All transaction service fees
						are 100% non-refundable.
					</Text>
					<Text style={subheading}>Disclaimer:</Text>
					<Text>
						SkylineTravels LLC is an independent travel Agency with no
						third-party association. We shall not be associated or considered as
						an airline or an ally of any of the airlines or brands.
						SkylineTravels is shown on your bank account details in most cases.
						However, sometimes we have to split the payment with the airline.
						SkylineTravels and the airline or another company of that
						organization both will appear as recipients on your account. All the
						service fee and convenience fee is non-refundable.
					</Text>
					<Text style={subheading}>Important:</Text>
					<Text>
						Above changes are not confirmed until finalized by the airline. If
						there are any restrictions, updates, or concerns from the airline,
						we will contact you via email or phone. In case, you would like to
						make any further changes to the new itinerary after the tickets are
						exchanged, you will be responsible for the additional penalties,
						fare difference, and fees.
					</Text>
					<Text style={subheading}>Refund Policy:</Text>
					<Text>
						The booked air tickets are non-refundable, non-transferable, and
						non-cancellable in most cases, the airline may allow a ticket to be
						changed for a fee, plus the increased cost of the new ticket. All
						transaction service fees are 100% non-refundable. Refund of any
						booking depends upon the fare rules of ticketed fare and
						refund/cancellation penalty or fees involved. Cancellation/refund
						penalty can be a new charge or can be adjusted from an existing
						ticket value based on the type of itinerary booked and fare rules
						involved.
					</Text>
					<Text>
						In case of any discrepancy and if an amendment is required, please
						feel free to contact us at <strong>+1-877-413-0030</strong> or email
						us at{" "}
						<a href="mailto:booking@skylinetravelsllc.com">
							booking@skylinetravelsllc.com
						</a>{" "}
						within 24 hours and we will be happy to assist you.
					</Text>
					<Text style={subheading}>Important Information:</Text>
					<Text>
						Please review your itinerary carefully to ensure that the following
						key items are correct:
					</Text>
					<table style={table}>
						<tbody>
							<tr>
								<td style={td}>
									• Passenger names must be the same as on the passport
									(International travel) OR any government-approved photo ID
									proof for Domestic travel.
								</td>
							</tr>
							<tr>
								<td style={td}>
									• We advise all passengers to ensure to have all travel
									documents including Passports, and required visas issued and
									presented at the time of travel.
								</td>
							</tr>
							<tr>
								<td style={td}>
									• All passengers are recommended to be present at the airport
									3 hours before departure for international departures, and 2
									before domestic travel.
								</td>
							</tr>
							<tr>
								<td style={td}>
									• All International flights must be confirmed 72 hours before
									departure.
								</td>
							</tr>
							<tr>
								<td style={td}>
									• Review departure/arrival dates, times, origin/destination
									cities, stopovers, and connections.
								</td>
							</tr>
							<tr>
								<td style={td}>
									• At least one adult must accompany children below the age of
									18 yrs. Children 12 yrs & above are considered adults for
									pricing purposes.
								</td>
							</tr>
						</tbody>
					</table>
					<Text>
						In case you get notified that your credit card was declined, please
						call us right away at <strong>+1-877-413-0030</strong>
					</Text>
					<Text>
						Airline tickets are non-refundable, non-changeable, and
						non-cancellable in most cases, an airline may allow a ticket to be
						changed for a fee, plus the increased cost of the new ticket.
					</Text>
					<Text>
						Please note that fares are not guaranteed until paid and ticketed.
						If there will be any restrictions, updates, or concerns from the
						airline, we will contact you via email or phone. In case, you would
						like to make any changes to this itinerary after the tickets are
						issued, you will be responsible for the additional penalties, fare
						difference, and fees.
					</Text>
					<Text style={subheading}>For Changes Query:</Text>
					<table style={table}>
						<tbody>
							<tr>
								<td style={td}>
									Call us at <strong>+1-877-413-0030</strong> to make any kind
									of changes to the itinerary. Fees will apply due to airline
									penalties, fare differences, and other factors to change the
									itinerary.
								</td>
							</tr>
						</tbody>
					</table>
					<Text style={subheading}>For Cancellations:</Text>
					<table style={table}>
						<tbody>
							<tr>
								<td style={td}>
									Call us at <strong>+1-877-413-0030</strong>, Booking should be
									canceled at least 3 hours before the scheduled departure time
									of your flight to avoid a no-show. Cancellations can only be
									processed over the phone.
								</td>
							</tr>
						</tbody>
					</table>
					<Text style={subheading}>Seat Assignments:</Text>
					<table style={table}>
						<tbody>
							<tr>
								<td style={td}>
									Most airlines have restricted rules for advance seat
									assignment and can only be done with a fee. Some fare
									restrictions only allow seat assignment with a fee at the
									airport during the time of check-in. Call us at{" "}
									<strong>+1-877-413-0030</strong> for seat assignment, if
									applicable.
								</td>
							</tr>
						</tbody>
					</table>
					<Text style={subheading}>Baggage Policy:</Text>
					<table style={table}>
						<tbody>
							<tr>
								<td style={td}>
									Your reservation may have a restricted baggage allowance and
									some airlines may charge an additional fee for each allowed
									checked-in or carry-on bag. Please refer to each operating
									airline for the most restricted rules. Call us at{" "}
									<strong>+1-877-413-0030</strong> for baggage, if applicable.
								</td>
							</tr>
						</tbody>
					</table>
					<Text style={subheading}>Visa/Travel Documents:</Text>
					<table style={table}>
						<tbody>
							<tr>
								<td style={td}>
									All customers are advised to verify travel documents (transit
									visa/entry visa) for the country through which they are
									transiting or entering. We will not be responsible if proper
									travel documents are not available and you are denied entry or
									transit into a Country. We request you to consult the embassy
									of the country(s) you are visiting or transiting through.
									Please visit TSA for any questions regarding this, as well as
									information on check-in procedures and airport security.
								</td>
							</tr>
						</tbody>
					</table>
					<Text style={subheading}>Check-In:</Text>
					<table style={table}>
						<tbody>
							<tr>
								<td style={td}>
									We recommend arriving at the airport 3 hours before your
									departure for international flights and 2 hours before your
									departure for domestic flights. For the most updated check-in
									rules, please contact Airlines or TSA directly.
								</td>
							</tr>
						</tbody>
					</table>
					<Text>
						Still, have questions? Call us at <strong>+1-877-413-0030</strong>.
						Our agents are available 24 hours a day, 7 days a week to assist
						you. You can also email us at{" "}
						<a href="mailto:booking@skylinetravelsllc.com">
							booking@skylinetravelsllc.com
						</a>
					</Text>
					<Text>
						We value your business and look forward to serving your travel needs
						in the near future.
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

export default EmailSeatAssignment;
