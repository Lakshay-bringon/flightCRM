import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import BookingCard from './BookingCard';

const searchSchema = z.object({
  searchBy: z.string().min(1, { message: 'Please select search criteria' }),
  searchInput: z.string().min(1, { message: 'Search input is required' })
});

// Dummy booking data for testing
const DUMMY_BOOKINGS = [
  {
    BID: "B001",
    PNR: "ABC123",
    status: "confirmed",
    flightType: "round-trip",
    passengers: {
      adult: 2,
      child: 1,
      infant: 0
    },
    segments: [
      {
        type: "outbound",
        from: "New York (JFK)",
        to: "Los Angeles (LAX)",
        travelDate: "May 10, 2025",
        travelTime: "10:30 AM"
      },
      {
        type: "return",
        from: "Los Angeles (LAX)",
        to: "New York (JFK)",
        travelDate: "May 17, 2025",
        travelTime: "2:30 PM"
      }
    ],
    agent: "John Doe",
    cchName: "Skyline CCH",
    provider: "Delta Airlines",
    mco: "50"
  },
  {
    BID: "B002",
    PNR: "XYZ789",
    status: "pending",
    flightType: "one-way",
    passengers: {
      adult: 1,
      child: 0,
      infant: 1
    },
    segments: [
      {
        type: "outbound",
        from: "Chicago (ORD)",
        to: "Miami (MIA)",
        travelDate: "May 12, 2025",
        travelTime: "2:15 PM"
      }
    ],
    agent: "Jane Smith",
    cchName: "Travel CCH",
    provider: "United Airlines",
    mco: null
  },
  {
    BID: "B003",
    PNR: "DEF456",
    status: "cancelled",
    flightType: "multi-city",
    passengers: {
      adult: 2,
      child: 0,
      infant: 0
    },
    segments: [
      {
        type: "segment-1",
        from: "San Francisco (SFO)",
        to: "Chicago (ORD)",
        travelDate: "May 15, 2025",
        travelTime: "8:45 AM"
      },
      {
        type: "segment-2",
        from: "Chicago (ORD)",
        to: "Boston (BOS)",
        travelDate: "May 18, 2025",
        travelTime: "3:20 PM"
      },
      {
        type: "segment-3",
        from: "Boston (BOS)",
        to: "Seattle (SEA)",
        travelDate: "May 20, 2025",
        travelTime: "11:15 AM"
      }
    ],
    agent: "Mike Johnson",
    cchName: "Global CCH",
    provider: "American Airlines",
    mco: "150"
  }
];

function FindBookings() {
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(searchSchema)
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call with dummy data
      await new Promise(resolve => setTimeout(resolve, 1000));
      const results = DUMMY_BOOKINGS.filter(booking => {
        const searchTerm = data.searchInput.toLowerCase();
        switch (data.searchBy) {
          case 'bookingId':
            return booking.BID.toLowerCase().includes(searchTerm);
          case 'pnr':
            return booking.PNR.toLowerCase().includes(searchTerm);
          case 'agent':
            return booking.agent.toLowerCase().includes(searchTerm);
          default:
            return true;
        }
      });

      if (results.length === 0) {
        setSearchResults({ error: 'No results found' });
      } else {
        setSearchResults(results);
      }
    } catch (error) {
      setSearchResults({ error: 'Search failed' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Search Form */}
      <div className="mb-8 p-6 rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700">
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 mb-6">
          <div className="flex-1">
            <label htmlFor="searchBy" className="block text-sm font-medium text-gray-300 mb-1">Search By</label>
            <select
              id="searchBy"
              {...register('searchBy')}
              className="w-full px-3 py-2 h-[42px] rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm">
              <option value="">Select search criteria</option>
              <option value="bookingId">Booking ID</option>
              <option value="pnr">PNR</option>
              <option value="agent">Agent Name</option>
            </select>
            {errors.searchBy && (
              <p className="mt-1 text-sm text-red-400">{errors.searchBy.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="searchInput" className="block text-sm font-medium text-gray-300 mb-1">Search Input</label>
            <input
              type="text"
              id="searchInput"
              {...register('searchInput')}
              className="w-full px-3 py-2 h-[42px] bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              placeholder="Search here..."
            />
            {errors.searchInput && (
              <p className="mt-1 text-sm text-red-400">{errors.searchInput.message}</p>
            )}
          </div>
          <div className={`flex ${errors.searchBy || errors.searchInput ? 'items-center': 'items-end'}`}>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 h-[42px] bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Search Results Section */}
      {searchResults && (
        <div className="mb-8 p-6 rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Search Results</h3>
          {searchResults.error ? (
            <div className="p-4 rounded-lg bg-gray-700/50 border border-gray-600">
              <p className="text-gray-400">{searchResults.error}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {searchResults.map((booking) => (
                <BookingCard key={booking.BID} bookingDetails={booking} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Recent Bookings Section */}
      <div className="mb-8 p-6 rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4">Recent Bookings</h3>
          {DUMMY_BOOKINGS.map((booking) => (
            <BookingCard key={booking.BID} bookingDetails={booking} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FindBookings;