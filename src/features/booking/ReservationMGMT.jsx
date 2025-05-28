import React, { useState } from "react";
import { TRANSACTION_TYPES } from "../../constants";
import NewBooking from "../../features/booking/components/NewBooking";
import Exchange from "../../features/booking/components/Exchange";
import SeatAssignment from "../../features/booking/components/SeatAssignment";
import Upgrade from "../../features/booking/components/Upgrade";
import CancelForRefund from "../../features/booking/components/CancelForRefund";
import CancelForFutureCredit from "../../features/booking/components/CancelForFutureCredit";

function ReservationMGMT() {
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [selectedType, setSelectedType] = useState(null);

	const handleTileClick = (type) => {
		setSelectedType(type);
		setShowConfirmation(true);
	};
	if (showConfirmation) {
		const componentProps = {
			initialData: { transactionType: selectedType },
			onBack: () => setShowConfirmation(false),
		};

		switch (selectedType) {
			case TRANSACTION_TYPES.BOOKING:
				return <NewBooking {...componentProps} />;
			case TRANSACTION_TYPES.EXCHANGE:
				return <Exchange {...componentProps} />;
			case TRANSACTION_TYPES.SEAT_ASSIGNMENT:
				return <SeatAssignment {...componentProps} />;
			case TRANSACTION_TYPES.UPGRADE:
				return <Upgrade {...componentProps} />;
			case TRANSACTION_TYPES.CANCEL_FOR_REFUND:
				return <CancelForRefund {...componentProps} />;
			case TRANSACTION_TYPES.CANCEL_FOR_FUTURE_CREDIT:
				return <CancelForFutureCredit {...componentProps} />;
			default:
				return <NewBooking {...componentProps} />;
		}
	}

	return (
		<div className="max-w-7xl mx-auto p-4">
			<h2 className="text-xl font-semibold text-white mb-4">
				Select Transaction Type
			</h2>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{Object.entries(TRANSACTION_TYPES).map(([key, value]) => (
					<button
						key={key}
						onClick={() => handleTileClick(value)}
						className="group p-4 rounded-lg bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700 
                     hover:bg-gray-700 hover:border-blue-500 transition-all duration-200 
                     shadow-lg hover:shadow-blue-500/25 text-left flex flex-col"
					>
						<h3 className="text-base font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
							{key
								.split("_")
								.map((word) => word.charAt(0) + word.slice(1).toLowerCase())
								.join(" ")}
						</h3>
						<p className="text-xs text-gray-400 flex-grow">
							Create new{" "}
							{key
								.split("_")
								.map((word) => word.toLowerCase())
								.join(" ")}
						</p>
						<div className="mt-2 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
							Proceed →
						</div>
					</button>
				))}
			</div>
		</div>
	);
}

export default ReservationMGMT;
