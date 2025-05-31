import React, { useState } from 'react';
import { RecordsList } from '../data';
import BookingCard from './BookingCard';
import { findBookingApi } from '../../api/booking/bookingApi';
import { showPromiseToast } from '../../utils/showPromiseToast';

export default function FindBookings() {
	const [search, setSearch] = useState('');
	const [searchBy, setSearchBy] = useState('cchName');
	const [bookingPage, setBookingPage] = useState(1);
	const [bookingPerPage, setBookingPerPage] = useState(5);
	const [bookings, setBookings] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [hasSearched, setHasSearched] = useState(false);
	const [searchError, setSearchError] = useState(null);

	// Map search options to API type values
	const searchTypeMap = {
		BID: 'bid',
		cchName: 'cchName',
		email: 'email',
		billingPhone: 'billingPhone',
		PNR: 'pnr',
	};

	// Handle search form submission
	const handleSearch = async (e) => {
		e.preventDefault();

		if (!search.trim()) {
			return;
		}
		setIsLoading(true);
		setHasSearched(true);
		setSearchError(null);

		try {
			const searchData = {
				type: searchTypeMap[searchBy],
				value: search.trim(),
			};

			const results = await showPromiseToast(findBookingApi(searchData), {
				loading: 'Searching bookings...',
				success: (data) => `Found ${data?.length || 0} booking(s)`,
				error: 'Failed to search bookings',
			});

			setBookings(results || []);
			setBookingPage(1); // Reset to first page on new search
		} catch (error) {
			setBookings([]);
			setSearchError(error.message || 'An error occurred while searching');
			console.error('Search error:', error);
		} finally {
			setIsLoading(false);
		}
	};
	// Clear search and results
	const clearSearch = () => {
		setSearch('');
		setBookings([]);
		setHasSearched(false);
		setSearchError(null);
		setBookingPage(1);
	};

	// Records to show - only search results if search has been performed
	const recordsToShow = hasSearched ? bookings : [];

	return (
		<div className="w-full h-full max-h-full">
			{/* Search Form */}
			<div className="mb-4 flex items-center w-full gap-2">
				<form className="flex flex-1 gap-2 max-w-xl" onSubmit={handleSearch}>
					<select
						value={searchBy}
						onChange={(e) => setSearchBy(e.target.value)}
						className="w-36 px-2 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white text-sm focus:outline-none focus:border-blue-500"
						disabled={isLoading}
					>
						<option value="BID">BOOKING ID</option>
						<option value="cchName">CCH NAME</option>
						<option value="email">EMAIL</option>
						<option value="billingPhone">BILLING PHONE</option>
						<option value="PNR">PNR</option>
					</select>
					<input
						type="text"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500 transition-all"
						placeholder={`Search booking by ${searchBy
							.replace(/([A-Z])/g, ' $1')
							.toUpperCase()}...`}
						disabled={isLoading}
						required
					/>
					<button
						type="submit"
						disabled={isLoading || !search.trim()}
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-semibold whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isLoading ? 'Searching...' : 'Search'}
					</button>
					{hasSearched && (
						<button
							type="button"
							onClick={clearSearch}
							className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all text-sm font-semibold whitespace-nowrap"
							disabled={isLoading}
						>
							Clear
						</button>
					)}
				</form>
			</div>{' '}
			{/* Results Section */}
			{hasSearched ? (
				<div className="w-full">
					{searchError ? (
						<div className="text-center py-12">
							<div className="text-red-400 text-lg mb-2">Search Error</div>
							<div className="text-red-300 text-sm mb-4">{searchError}</div>
							<button
								onClick={clearSearch}
								className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all text-sm font-semibold"
							>
								Try Again
							</button>
						</div>
					) : bookings.length > 0 ? (
						<RecordsList
							title={`Search Results (${bookings.length} found)`}
							list={recordsToShow}
							CardComponent={({ record }) => (
								<BookingCard bookingDetails={record} />
							)}
							currentPage={bookingPage}
							onPageChange={setBookingPage}
							itemsPerPage={bookingPerPage}
							onItemsPerPageChange={setBookingPerPage}
							className="w-full"
						/>
					) : !isLoading ? (
						<div className="text-center py-12">
							<div className="text-gray-400 text-lg mb-2">
								No bookings found
							</div>
							<div className="text-gray-500 text-sm">
								Try searching with different criteria
							</div>
						</div>
					) : null}
				</div>
			) : (
				<div className="text-center py-12">
					<div className="text-gray-400 text-lg mb-2">Search for Bookings</div>
					<div className="text-gray-500 text-sm">
						Enter a search term above to find bookings by ID, cardholder name,
						email, or billing phone
					</div>
				</div>
			)}
		</div>
	);
}
