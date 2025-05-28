import { useState, useEffect } from "react";

// Import the service instance - this will be the singleton instance
const getDataService = async () => {
	const { DataService } = await import("../services/dataService");
	return new DataService();
};

export const useData = () => {
	const [currencies, setCurrencies] = useState([]);
	const [cards, setCards] = useState([]);
	const [providers, setProviders] = useState([]);
	const [callQueue, setCallQueue] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Fetch all currencies
	const fetchCurrencies = async () => {
		setLoading(true);
		setError(null);
		try {
			const dataService = await getDataService();
			const data = await dataService.getCurrencies();
			setCurrencies(data);
			return data;
		} catch (err) {
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	// Fetch all cards
	const fetchCards = async () => {
		setLoading(true);
		setError(null);
		try {
			const dataService = await getDataService();
			const data = await dataService.getCards();
			setCards(data);
			return data;
		} catch (err) {
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	// Fetch all providers
	const fetchProviders = async () => {
		setLoading(true);
		setError(null);
		try {
			const dataService = await getDataService();
			const data = await dataService.getProviders();
			setProviders(data);
			return data;
		} catch (err) {
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	// Fetch call queue
	const fetchCallQueue = async () => {
		setLoading(true);
		setError(null);
		try {
			const dataService = await getDataService();
			const data = await dataService.getCallQueue();
			setCallQueue(data);
			return data;
		} catch (err) {
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	// Create operations
	const createCurrency = async (currencyData) => {
		setError(null);
		try {
			const dataService = await getDataService();
			const result = await dataService.createCurrency(currencyData);
			await fetchCurrencies(); // Refresh list
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	const createCard = async (cardData) => {
		setError(null);
		try {
			const dataService = await getDataService();
			const result = await dataService.createCard(cardData);
			await fetchCards(); // Refresh list
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	const createProvider = async (providerData) => {
		setError(null);
		try {
			const dataService = await getDataService();
			const result = await dataService.createProvider(providerData);
			await fetchProviders(); // Refresh list
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	// Update operations
	const updateCurrency = async (id, updates) => {
		setError(null);
		try {
			const result = await dataService.updateCurrency(id, updates);
			await fetchCurrencies(); // Refresh list
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	const updateCard = async (id, updates) => {
		setError(null);
		try {
			const result = await dataService.updateCard(id, updates);
			await fetchCards(); // Refresh list
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	const updateProvider = async (id, updates) => {
		setError(null);
		try {
			const result = await dataService.updateProvider(id, updates);
			await fetchProviders(); // Refresh list
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	// Delete operations
	const deleteCurrency = async (id) => {
		setError(null);
		try {
			const result = await dataService.deleteCurrency(id);
			await fetchCurrencies(); // Refresh list
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	const deleteCard = async (id) => {
		setError(null);
		try {
			const result = await dataService.deleteCard(id);
			await fetchCards(); // Refresh list
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	const deleteProvider = async (id) => {
		setError(null);
		try {
			const result = await dataService.deleteProvider(id);
			await fetchProviders(); // Refresh list
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	// Search operations
	const searchCurrencies = async (query) => {
		setError(null);
		try {
			const result = await dataService.searchCurrencies(query);
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	const searchCards = async (query) => {
		setError(null);
		try {
			const result = await dataService.searchCards(query);
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	const searchProviders = async (query) => {
		setError(null);
		try {
			const result = await dataService.searchProviders(query);
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	// Bulk operations
	const importCurrencies = async (file) => {
		setLoading(true);
		setError(null);
		try {
			const result = await dataService.importCurrencies(file);
			await fetchCurrencies(); // Refresh list
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const exportCurrencies = async () => {
		setError(null);
		try {
			const result = await dataService.exportCurrencies();
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	// Statistics
	const getDataStats = async () => {
		setError(null);
		try {
			const result = await dataService.getDataStats();
			return result;
		} catch (err) {
			setError(err.message);
			throw err;
		}
	};

	return {
		// State
		currencies,
		cards,
		providers,
		callQueue,
		loading,
		error,

		// Fetch operations
		fetchCurrencies,
		fetchCards,
		fetchProviders,
		fetchCallQueue,

		// Create operations
		createCurrency,
		createCard,
		createProvider,

		// Update operations
		updateCurrency,
		updateCard,
		updateProvider,

		// Delete operations
		deleteCurrency,
		deleteCard,
		deleteProvider,

		// Search operations
		searchCurrencies,
		searchCards,
		searchProviders,

		// Bulk operations
		importCurrencies,
		exportCurrencies,

		// Statistics
		getDataStats,

		// Utility
		refetch: async () => {
			await Promise.all([
				fetchCurrencies(),
				fetchCards(),
				fetchProviders(),
				fetchCallQueue(),
			]);
		},
	};
};

// Hook for data search and filtering
export const useDataSearch = (data, searchQuery, searchField = "name") => {
	const [filteredData, setFilteredData] = useState([]);

	useEffect(() => {
		if (!searchQuery.trim()) {
			setFilteredData(data);
		} else {
			const filtered = data.filter((item) => {
				const value = String(item[searchField] || "").toLowerCase();
				return value.includes(searchQuery.toLowerCase());
			});
			setFilteredData(filtered);
		}
	}, [data, searchQuery, searchField]);

	return filteredData;
};

// Hook for data pagination
export const useDataPagination = (data, itemsPerPage = 10) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPageState, setItemsPerPageState] = useState(itemsPerPage);

	const totalPages = Math.ceil(data.length / itemsPerPageState);
	const startIndex = (currentPage - 1) * itemsPerPageState;
	const endIndex = startIndex + itemsPerPageState;
	const paginatedData = data.slice(startIndex, endIndex);

	const goToPage = (page) => {
		setCurrentPage(Math.max(1, Math.min(page, totalPages)));
	};

	const nextPage = () => goToPage(currentPage + 1);
	const prevPage = () => goToPage(currentPage - 1);

	// Reset to first page when data changes
	useEffect(() => {
		setCurrentPage(1);
	}, [data.length]);

	return {
		currentPage,
		totalPages,
		paginatedData,
		itemsPerPage: itemsPerPageState,
		setItemsPerPage: setItemsPerPageState,
		goToPage,
		nextPage,
		prevPage,
		hasNextPage: currentPage < totalPages,
		hasPrevPage: currentPage > 1,
	};
};

// Hook for data validation
export const useDataValidation = () => {
	const validateCurrency = (currencyData) => {
		const errors = {};

		if (!currencyData.code) {
			errors.code = "Currency code is required";
		}

		if (!currencyData.name) {
			errors.name = "Currency name is required";
		}

		if (!currencyData.rate || currencyData.rate <= 0) {
			errors.rate = "Valid exchange rate is required";
		}

		return {
			isValid: Object.keys(errors).length === 0,
			errors,
		};
	};

	const validateCard = (cardData) => {
		const errors = {};

		if (!cardData.name) {
			errors.name = "Card name is required";
		}

		if (!cardData.type) {
			errors.type = "Card type is required";
		}

		return {
			isValid: Object.keys(errors).length === 0,
			errors,
		};
	};

	const validateProvider = (providerData) => {
		const errors = {};

		if (!providerData.name) {
			errors.name = "Provider name is required";
		}

		if (!providerData.code) {
			errors.code = "Provider code is required";
		}

		return {
			isValid: Object.keys(errors).length === 0,
			errors,
		};
	};

	return {
		validateCurrency,
		validateCard,
		validateProvider,
	};
};
