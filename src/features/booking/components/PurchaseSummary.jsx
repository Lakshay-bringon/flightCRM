import React from "react";
import { useDataContext } from "../../../context/DataContext";

function PurchaseSummary({ register }) {
	const { cards, fetchCards } = useDataContext();
	React.useEffect(() => {
		fetchCards();
	}, []);
	return (
		<div className="p-3 border border-gray-700 rounded-lg">
			<h3 className="font-semibold mb-2">Purchase Summary</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
				<div>
					<label className="inline-block w-32">Card Holder:</label>
					<input
						{...register("card_holder")}
						className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full md:w-60"
					/>
				</div>{" "}
				<div>
					<label className="inline-block w-32">Card Number:</label>
					<input
						{...register("card_number")}
						className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full md:w-60"
						maxLength={19}
					/>
				</div>
				<div>
					<label className="inline-block w-32">Email:</label>
					<input
						type="email"
						{...register("email")}
						className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full md:w-60"
					/>
				</div>
				<div>
					<label className="inline-block w-32">Phone:</label>
					<input
						{...register("phone")}
						type="tel"
						className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full md:w-60"
					/>
				</div>
				<div>
					<label className="inline-block w-32">Payment Method:</label>
					<select
						{...register("payment_method")}
						className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full md:w-60"
					>
						{cards?.map((card) => (
							<option key={card.id || card.name} value={card.name}>
								{card.name}
							</option>
						))}
					</select>
				</div>
				<div>
					<label className="inline-block w-32">Purchase Date:</label>
					<input
						type="date"
						{...register("purchase_date")}
						className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full md:w-60"
						readOnly
					/>
				</div>
				{/* Address fields - American address style, multi-line, organized */}
				<div className="md:col-span-2">
					<label className="inline-block w-32 mb-1">Address:</label>
					<div className="grid grid-cols-1  gap-2 mb-2">
						<input
							{...register("billing_address", { required: true })}
							className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full"
							placeholder="Billing Address"
						/>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-4 gap-2">
						<input
							{...register("city", { required: true })}
							className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full"
							placeholder="City*"
						/>
						<input
							{...register("state", { required: true })}
							className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full"
							placeholder="State*"
							// maxLength={2}
							style={{ textTransform: "uppercase" }}
						/>
						<input
							{...register("zip", { required: true })}
							className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full"
							placeholder="ZIP Code*"
							maxLength={10}
						/>
						<input
							{...register("country", { required: true })}
							className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full"
							placeholder="Country*"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PurchaseSummary;
