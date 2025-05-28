import React, { useState } from "react";
import { RecordsList } from "../../components/business";
import BookingCard from "./BookingCard";

export default function FindBookings() {
	const [search, setSearch] = useState("");
	const [searchBy, setSearchBy] = useState("cchName");
	const [bookingPage, setBookingPage] = useState(1);
	const [bookingPerPage, setBookingPerPage] = useState(5);
	const [bookings] = useState([
		{
			BID: "BKG001",
			PNR: "PNR001",
			passengers: { adult: 2, child: 1, infant: 0 },
			cchName: "Visa",
			email: "sarah.w@example.com",
			billingPhone: "+1 234-567-8900",
			cardLast4: "1234",
			status: "Confirmed",
			flightType: "Round-Trip",
			provider: "IndiGo",
			agent: "Sarah Wilson",
			mco: 120,
		},
		{
			BID: "BKG002",
			PNR: "PNR002",
			passengers: { adult: 1, child: 0, infant: 0 },
			cchName: "MasterCard",
			status: "Pending",
			flightType: "One-Way",
			provider: "Air India",
			agent: "John Doe",
			mco: 80,
		},
		{
			BID: "BKG003",
			PNR: "PNR003",
			passengers: { adult: 3, child: 2, infant: 1 },
			cchName: "Amex",
			status: "Cancelled",
			flightType: "Multi-City",
			provider: "SpiceJet",
			agent: "Jane Smith",
			mco: 0,
		},
		{
			BID: "BKG004",
			PNR: "PNR004",
			passengers: { adult: 1, child: 1, infant: 0 },
			cchName: "Visa",
			status: "Confirmed",
			flightType: "One-Way",
			provider: "Vistara",
			agent: "Mike Brown",
			mco: 50,
		},
		{
			BID: "BKG005",
			PNR: "PNR005",
			passengers: { adult: 2, child: 0, infant: 0 },
			cchName: "MasterCard",
			status: "Pending",
			flightType: "Round-Trip",
			provider: "GoAir",
			agent: "Priya Singh",
			mco: 100,
		},
		{
			BID: "BKG006",
			PNR: "PNR006",
			passengers: { adult: 1, child: 1, infant: 1 },
			cchName: "Visa",
			status: "Confirmed",
			flightType: "Multi-City",
			provider: "IndiGo",
			agent: "Amit Sharma",
			mco: 70,
		},
		{
			BID: "BKG007",
			PNR: "PNR007",
			passengers: { adult: 2, child: 2, infant: 0 },
			cchName: "Amex",
			status: "Cancelled",
			flightType: "One-Way",
			provider: "Air India",
			agent: "Ravi Kumar",
			mco: 0,
		},
		{
			BID: "BKG008",
			PNR: "PNR008",
			passengers: { adult: 1, child: 0, infant: 0 },
			cchName: "MasterCard",
			status: "Confirmed",
			flightType: "Round-Trip",
			provider: "SpiceJet",
			agent: "Anjali Mehra",
			mco: 60,
		},
		{
			BID: "BKG009",
			PNR: "PNR009",
			passengers: { adult: 2, child: 1, infant: 1 },
			cchName: "Visa",
			status: "Pending",
			flightType: "Multi-City",
			provider: "Vistara",
			agent: "Suresh Patel",
			mco: 90,
		},
		{
			BID: "BKG010",
			PNR: "PNR010",
			passengers: { adult: 1, child: 0, infant: 0 },
			cchName: "Amex",
			status: "Confirmed",
			flightType: "One-Way",
			provider: "GoAir",
			agent: "Neha Verma",
			mco: 110,
		},
		{
			BID: "BKG011",
			PNR: "PNR011",
			passengers: { adult: 2, child: 2, infant: 2 },
			cchName: "Visa",
			status: "Cancelled",
			flightType: "Round-Trip",
			provider: "IndiGo",
			agent: "Extra User",
			mco: 0,
		},
	]);

	const filteredBookings = bookings.filter((b) => {
		let value = "";
		switch (searchBy) {
			case "BID":
				value = b.BID || "";
				break;
			case "cchName":
				value = b.cchName || "";
				break;
			case "email":
				value = b.email || "";
				break;
			case "billingPhone":
				value = b.billingPhone || "";
				break;
			case "cardLast4":
				value = b.cardLast4 || "";
				break;
			default:
				value = "";
		}
		return value.toLowerCase().includes(search.toLowerCase());
	});

	// Show only the 5 most recent bookings if no search, otherwise show search results
	const recordsToShow =
		search.trim() === "" ? bookings.slice(-5).reverse() : filteredBookings;

	// Dummy search handler for button (search is already reactive)
	const handleSearch = (e) => {
		e.preventDefault();
		// No-op, search is reactive
	};

	return (
		<div className="w-full h-full max-h-full">
			{/* Search Form */}
			<div className="mb-4 flex items-center w-full gap-2">
				<form className="flex flex-1 gap-2 max-w-xl" onSubmit={handleSearch}>
					<select
						value={searchBy}
						onChange={(e) => setSearchBy(e.target.value)}
						className="w-36 px-2 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white text-sm focus:outline-none focus:border-blue-500"
					>
						<option value="BID">BOOKING ID</option>
						<option value="cchName">CCH NAME</option>
						<option value="email">EMAIL</option>
						<option value="billingPhone">BILLING PHONE</option>
						<option value="cardLast4">CARD LAST 4 DIGIT</option>
					</select>
					<input
						type="text"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500 transition-all"
						placeholder={`Search booking by ${searchBy
							.replace(/([A-Z])/g, " $1")
							.toUpperCase()}...`}
					/>
					<button
						type="submit"
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-semibold whitespace-nowrap"
					>
						Search
					</button>
				</form>
			</div>
			{/* Bookings List */}
			<RecordsList
				title="Recent Bookings"
				list={recordsToShow}
				CardComponent={({ record }) => <BookingCard bookingDetails={record} />}
				currentPage={bookingPage}
				onPageChange={setBookingPage}
				itemsPerPage={bookingPerPage}
				onItemsPerPageChange={setBookingPerPage}
				className="w-full"
			/>
		</div>
	);
}
