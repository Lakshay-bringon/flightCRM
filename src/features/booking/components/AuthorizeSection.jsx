import React from "react";
import { useDataContext } from "../../../context/DataContext";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";

function AuthorizeSection({ register, cardNumber, setValue }) {
	const { cards, cardsLoading, fetchCards } = useDataContext();
	React.useEffect(() => {
		fetchCards();
	}, []);
	return (
		<div className="p-3 border border-gray-700 rounded-lg leading-loose">
			<p className="leading-loose">
				"I hereby certify that I,{" "}
				<input
					{...register("cardholderName")}
					className="bg-transparent border-0 border-b border-dashed border-gray-400 focus:border-blue-400 outline-none px-1 w-auto inline-block align-middle mx-1 text-white placeholder-gray-400"
					style={{ minWidth: 60 }}
					placeholder="Cardholder Name"
				/>
				, am the authorized user of the{" "}
				<select
					{...register("paymentMethod")}
					className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full md:w-60"
					disabled={cardsLoading}
				>
					<option value="">
						{cardsLoading ? "Loading..." : "Select Card"}
					</option>
					{!cardsLoading &&
						cards.map((card) => (
							<option key={card.id || card.name} value={card.name}>
								{card.name}
							</option>
						))}
				</select>
				, and I will not dispute the payment with my credit/debit card company
				or bank, as this amount is being charged for my personal travel."{" "}
				<p>
					Please confirm your acceptance of this declaration by selecting:
					<button
						type="button"
						className="inline-block align-middle px-4 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 text-sm font-semibold ml-2"
					>
						I Agree / I Authorize
					</button>
				</p>
			</p>
		</div>
	);
}

export default AuthorizeSection;
