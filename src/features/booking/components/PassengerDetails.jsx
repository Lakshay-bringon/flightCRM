import React from "react";
import { Plus, X } from "lucide-react";

function PassengerDetails({
	passengers,
	register,
	addPassenger,
	removePassenger,
}) {
	return (
		<div className="p-3 border border-gray-700 rounded-lg">
			<div className="flex items-center justify-between mb-2">
				<h3 className="font-semibold">Passenger Details</h3>
				<button
					type="button"
					onClick={addPassenger}
					className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm"
				>
					<Plus className="w-4 h-4" />
					Add Passenger
				</button>
			</div>
			<div className="overflow-x-auto">
				<table className="w-full border-separate border-spacing-y-2">
					<thead>
						<tr className="text-left border-b border-gray-700 bg-gray-800">
							<th className="pr-2 pb-2">S. No.</th>
							<th className="px-2 pb-2">Type</th>
							<th className="px-2 pb-2">First Name</th>
							<th className="px-2 pb-2">Middle Name</th>
							<th className="px-2 pb-2">Last Name</th>
							<th className="pl-2 pb-2">DOB</th>
							<th className="pl-2 pb-2"></th>
						</tr>
					</thead>
					<tbody>
						{passengers?.map((_, index) => (
							<tr
								key={index}
								className="border-b border-gray-700/50 bg-gray-900 rounded-lg shadow-sm"
							>
								<td className="py-2 px-2 font-semibold text-center">
									{index + 1}
								</td>
								<td className="py-2 px-2">
									<select
										{...register(`passenger_data.${index}.type`)}
										className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full cursor-pointer"
									>
										<option value="ADT">Adult</option>
										<option value="CHD">Child</option>
										<option value="INF">Infant</option>
									</select>
								</td>
								<td className="py-2 px-2">
									<input
										{...register(`passenger_data.${index}.firstName`)}
										className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full"
										placeholder="First Name"
									/>
								</td>
								<td className="py-2 px-2">
									<input
										{...register(`passenger_data.${index}.middleName`)}
										className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full"
										placeholder="Middle Name"
									/>
								</td>
								<td className="py-2 px-2">
									<input
										{...register(`passenger_data.${index}.lastName`)}
										className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full"
										placeholder="Last Name"
									/>
								</td>
								<td className="py-2 px-2">
									<div className="relative">
										<input
											type="date"
											{...register(`passenger_data.${index}.dob`)}
											className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full cursor-pointer"
											onClick={(e) => e.stopPropagation()}
										/>
									</div>
								</td>
								<td className="py-2 pl-2 text-center">
									{index > 0 && (
										<button
											type="button"
											onClick={() => removePassenger(index)}
											className="text-red-400 hover:text-red-300 transition-colors"
										>
											<X className="w-4 h-4" />
										</button>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default PassengerDetails;
