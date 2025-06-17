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

export const EmailCancelForRefund = ({ bookingData }) => {
	const {
		airline_name = "",
		customer_name = "",
		pnr = "",
		refund_amount = "",
		new_charge_amount = "",
		charge_data = [],
		image_itinerary = "",
		passenger_data = [],
		card_holder = "",
		email = "",
		phone = "",
		billing_address = "",
		city = "",
		state = "",
		zip = "",
		country = "US",
		purchase_date = "",
		payment_method = "",
		bid = "",
		currency = "USD",
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
			<Preview>Refund Confirmation – {pnr}</Preview>
			<Body style={main}>
				<Container style={container}>
					<Text style={heading}>
						{airline_name} – Refund Confirmation – {pnr}
					</Text>

					<Text>Dear {customer_name},</Text>
					<Text>Thank you for contacting us!</Text>
					<Text>
						You can contact us on this number <strong>+1-877-413-0030</strong>{" "}
						for any related request.
					</Text>

					<Text>
						As per our conversation and agreement, we have cancelled your
						reservation under Confirmation Number <strong>{pnr}</strong> booked
						on <strong>{airline_name}</strong> and will now submit the request
						to the airlines/consolidator to refund your ticket.
					</Text>

					<Text>
						Upon the airline's approval and after deducting all non-refundable
						amounts (base fare, penalties, taxes, and fees) as per fare rules,
						you will receive a total refund of{" "}
						<strong>
							{currency} {refund_amount}
						</strong>{" "}
						to your original form of payment used.
					</Text>

					<Text>
						To process the cancellation of your flights for a refund, there will
						be a new charge of{" "}
						<strong>
							{currency} {new_charge_amount}
						</strong>
						.
					</Text>

					<Text style={subheading}>Charges Description:</Text>
					<table style={table}>
						<tr>
							<th style={th}>Amount</th>
							<th style={th}>Description</th>
						</tr>
						{charge_data.map((item, index) => (
							<tr key={index}>
								<td style={td}>{item.amount}</td>
								<td style={td}>{item.description}</td>
							</tr>
						))}
					</table>

					<Text style={subheading}>Refund Details:</Text>
					{image_itinerary && (
						<Img
							src={baseUploadUrl + image_itinerary}
							alt="Refund Details"
							style={imgStyle}
						/>
					)}

					<Text style={subheading}>Passenger Details:</Text>
					<table style={table}>
						<tr>
							<th style={th}>Name</th>
							<th style={th}>DOB</th>
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
					</table>

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

					<Text style={note}>
						All refund requests submitted are subject to audit and airline
						approval, and are not guaranteed.
					</Text>

					<Text style={subheading}>Disclaimer:</Text>
					<Text>
						SkylineTravels LLC is an independent travel agency and is not
						affiliated with any airline. SkylineTravels may appear as a charge
						on your card. Sometimes the payment may be split between Skyline and
						the airline. All service and convenience fees are non-refundable.
					</Text>

					<Text>
						All cancellations must be completed before the departure date. Any
						ticket refund after 24 hours may take up to two billing cycles.
						Additional time may be required depending on airline policies and
						itinerary type.
					</Text>

					<Text>
						Refund eligibility is based on the fare rules of the ticketed fare
						and cancellation penalties. These may be new charges or adjusted
						from ticket value based on itinerary type and fare conditions.
					</Text>

					<Text style={subheading}>Cancellations:</Text>
					<Text>
						Call <strong>+1-877-413-0030</strong>. Refund/cancellation must be
						requested before flight departure, at least 3 hours in advance. No
						refund is possible for no-show cases. Cancellations are only
						accepted via phone.
					</Text>

					<Text style={subheading}>Seat Assignments:</Text>
					<Text>
						Advance seat selection may be restricted or chargeable depending on
						the airline. Some allow seat selection only during check-in.
					</Text>

					<Text style={subheading}>Baggage Policy:</Text>
					<Text>
						Baggage allowances may be limited. Additional baggage fees may
						apply. Refer to your airline’s rules for the most accurate
						information.
					</Text>

					<Text>
						Still have questions? Call <strong>+1-877-413-0030</strong> or email{" "}
						<a href="mailto:booking@skylinetravelsllc.com">
							booking@skylinetravelsllc.com
						</a>
						.
					</Text>

					<Text>
						We value your business and look forward to serving you again.
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

export default EmailCancelForRefund;
