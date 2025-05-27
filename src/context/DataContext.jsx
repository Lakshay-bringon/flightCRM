import React, { createContext, useContext, useEffect, useState } from "react";
import { getCardListApi } from "../api/cardApi";
import { getCurrencyListApi } from "../api/currencyApi";
import { getProvidersApi } from "../api/providerApi";
import { getQueueListApi } from "../api/queueApi";
import { getUserByRoleApi } from "../api/userApi";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
	const [cards, setCards] = useState([]);
	const [currencies, setCurrencies] = useState([]);
	const [providers, setProviders] = useState([]);
	const [callQueues, setCallQueues] = useState([]);
	const [leaders, setLeaders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const [
					cardsData,
					currenciesData,
					providersData,
					queuesData,
					leadersData,
				] = await Promise.all([
					getCardListApi(),
					getCurrencyListApi(),
					getProvidersApi(),
					getQueueListApi(),
					getUserByRoleApi(2),
				]);
				setCards(cardsData || []);
				setCurrencies(currenciesData || []);
				setProviders(providersData || []);
				setCallQueues(queuesData || []);
				setLeaders(leadersData || []);
			} catch (err) {
				setError(err.message || "Failed to load data");
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	return (
		<DataContext.Provider
			value={{
				cards,
				currencies,
				providers,
				callQueues,
				leaders,
				loading,
				error,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

export const useDataContext = () => useContext(DataContext);
