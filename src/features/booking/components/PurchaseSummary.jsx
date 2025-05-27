import React from "react";
import { useDataContext } from "../../../context/DataContext";

function PurchaseSummary({ register }) {
	const { cards } = useDataContext();
	return (
		<div className="p-3 border border-gray-700 rounded-lg">
			<h3 className="font-semibold mb-2">Purchase Summary</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
				<div>
					<label className="inline-block w-32">Card Holder:</label>
					<input
						{...register("cardholderName")}
						className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full md:w-60"
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
						className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full md:w-60"
					/>
				</div>
				<div>
					<label className="inline-block w-32">Payment Method:</label>
					<select
						{...register("paymentMethod")}
						className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full md:w-60"
					>
						{cards.map((card) => (
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
						{...register("date")}
						className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full md:w-60"
						readOnly
					/>
				</div>
				{/* Address fields - American address style, multi-line, organized */}
				<div className="md:col-span-2">
					<label className="inline-block w-32 mb-1">Address:</label>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
						<input
							{...register("address.streetAddress")}
							className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full"
							placeholder="Street Address (House/Apt No, Building, Street)"
						/>
						<input
							{...register("address.locality")}
							className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full"
							placeholder="Locality (Neighborhood, Area)"
						/>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-4 gap-2">
						<input
							{...register("address.city", { required: true })}
							className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full"
							placeholder="City*"
						/>
						<input
							{...register("address.state", { required: true })}
							className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full"
							placeholder="State*"
							maxLength={2}
							style={{ textTransform: "uppercase" }}
						/>
						<input
							{...register("address.zip", { required: true })}
							className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full"
							placeholder="ZIP Code*"
							maxLength={10}
						/>
						<input
							{...register("address.country", { required: true })}
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
