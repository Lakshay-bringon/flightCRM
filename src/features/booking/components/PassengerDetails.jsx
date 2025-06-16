import React from "react";
import { Plus, X } from "lucide-react";

function PassengerDetails({
	passengers,
	register,
	addPassenger,
	removePassenger,
	errors = {}, // Add errors prop
}) {
	// Helper function to get input class with error styling
	const getInputClassName = (fieldPath) => {
		const baseClass = "bg-gray-700 border rounded px-2 py-1 text-sm w-full";
		const hasError = fieldPath.split('.').reduce((obj, key) => obj?.[key], errors);
		const errorClass = hasError ? "border-red-400 bg-red-900/20" : "border-gray-600";
		return `${baseClass} ${errorClass}`;
	};
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
			<div className="overflow-x-auto">				<table className="w-full border-separate border-spacing-y-2">
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
						{passengers?.map((_, index) => {
							const passengerErrors = errors.passenger_data?.[index] || {};
							
							return (
								<tr
									key={index}
									className="border-b border-gray-700/50 bg-gray-900 rounded-lg shadow-sm"
								>
									<td className="py-2 px-2 font-semibold text-center">
										{index + 1}
									</td>
									<td className="py-2 px-2">
										<div className="relative">
											<select
												{...register(`passenger_data.${index}.type`)}
												className={getInputClassName(`passenger_data.${index}.type`) + " cursor-pointer"}
												title={passengerErrors.type?.message}
											>
												<option value="">Select Type</option>
												<option value="ADT">Adult</option>
												<option value="CHD">Child</option>
												<option value="INF">Infant</option>
											</select>
											{passengerErrors.type && (
												<span className="absolute -top-6 left-0 text-xs text-red-400 whitespace-nowrap">
													{passengerErrors.type.message}
												</span>
											)}
										</div>
									</td>
									<td className="py-2 px-2">
										<div className="relative">
											<input
												{...register(`passenger_data.${index}.firstName`)}
												className={getInputClassName(`passenger_data.${index}.firstName`)}
												placeholder={passengerErrors.firstName ? "Required!" : "First Name"}
												title={passengerErrors.firstName?.message}
											/>
											{passengerErrors.firstName && (
												<span className="absolute -top-6 left-0 text-xs text-red-400 whitespace-nowrap">
													{passengerErrors.firstName.message}
												</span>
											)}
										</div>
									</td>
									<td className="py-2 px-2">
										<input
											{...register(`passenger_data.${index}.middleName`)}
											className={getInputClassName(`passenger_data.${index}.middleName`)}
											placeholder="Middle Name"
										/>
									</td>
									<td className="py-2 px-2">
										<div className="relative">
											<input
												{...register(`passenger_data.${index}.lastName`)}
												className={getInputClassName(`passenger_data.${index}.lastName`)}
												placeholder={passengerErrors.lastName ? "Required!" : "Last Name"}
												title={passengerErrors.lastName?.message}
											/>
											{passengerErrors.lastName && (
												<span className="absolute -top-6 left-0 text-xs text-red-400 whitespace-nowrap">
													{passengerErrors.lastName.message}
												</span>
											)}
										</div>
									</td>
									<td className="py-2 px-2">
										<div className="relative">
											<input
												type="date"
												{...register(`passenger_data.${index}.dob`)}
												className={getInputClassName(`passenger_data.${index}.dob`) + " cursor-pointer"}
												onClick={(e) => e.stopPropagation()}
												title={passengerErrors.dob?.message}
											/>
											{passengerErrors.dob && (
												<span className="absolute -top-6 left-0 text-xs text-red-400 whitespace-nowrap">
													{passengerErrors.dob.message}
												</span>											)}
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
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default PassengerDetails;
