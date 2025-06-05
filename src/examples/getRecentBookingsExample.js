/**
 * Example usage of getRecentBookingsApi
 * This file demonstrates how to use the getRecentBookingsApi function
 */

import { getRecentBookingsApi } from '../api/booking/bookingApi.js';

// Example 1: Get default recent bookings (10 latest)
export const getDefaultRecentBookings = async () => {
  try {
    const recentBookings = await getRecentBookingsApi();
    console.log('Recent bookings:', recentBookings);
    return recentBookings;
  } catch (error) {
    console.error('Error fetching recent bookings:', error);
    throw error;
  }
};

// Example 2: Get recent bookings with custom limit
export const getRecentBookingsWithLimit = async (limit = 20) => {
  try {
    const recentBookings = await getRecentBookingsApi({ limit });
    console.log(`Last ${limit} bookings:`, recentBookings);
    return recentBookings;
  } catch (error) {
    console.error('Error fetching recent bookings with limit:', error);
    throw error;
  }
};

// Example 3: Get recent bookings for a specific user
export const getRecentBookingsForUser = async (userId) => {
  try {
    const recentBookings = await getRecentBookingsApi({ userId, limit: 15 });
    console.log(`Recent bookings for user ${userId}:`, recentBookings);
    return recentBookings;
  } catch (error) {
    console.error('Error fetching user recent bookings:', error);
    throw error;
  }
};

// Example 4: Get paginated recent bookings
export const getPaginatedRecentBookings = async (page = 1, itemsPerPage = 10) => {
  try {
    const offset = (page - 1) * itemsPerPage;
    const recentBookings = await getRecentBookingsApi({ 
      limit: itemsPerPage, 
      offset 
    });
    console.log(`Page ${page} of recent bookings:`, recentBookings);
    return recentBookings;
  } catch (error) {
    console.error('Error fetching paginated recent bookings:', error);
    throw error;
  }
};

// Example 5: Using in a React component
export const useRecentBookings = (params = {}) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecentBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRecentBookingsApi(params);
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchRecentBookings();
  }, [fetchRecentBookings]);

  return { bookings, loading, error, refetch: fetchRecentBookings };
};
