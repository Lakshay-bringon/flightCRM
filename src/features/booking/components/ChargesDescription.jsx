import React from "react";
import { Plus, X } from "lucide-react";
import { useDataContext } from "../../../context/DataContext";

function ChargesDescription({ charges, register, addCharge, removeCharge }) {
	const { currencies } = useDataContext();
	return (
		<div className="p-3 border border-gray-700 rounded-lg">
			<div className="flex items-center justify-between mb-2">
				<h3 className="font-semibold">Charges Description</h3>
				<button
					type="button"
					onClick={addCharge}
					className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm"
				>
					<Plus className="w-4 h-4" />
					Add Charge
				</button>
			</div>
			<table className="w-full text-sm border border-gray-700 rounded">
				<thead>
					<tr className="bg-gray-700 text-gray-200">
						<th className="px-2 py-2 text-left">Charge #</th>
						<th className="px-2 py-2 text-left">Amount</th>
						<th className="px-2 py-2 text-left">Description</th>
						<th className="px-2 py-2 text-left"></th>
					</tr>
				</thead>
				<tbody>
					{charges.map((charge, index) => (
						<tr key={charge.id}>
							<td className="px-2 py-2">{index + 1}</td>
							<td className="px-2 py-2 flex items-center gap-1">
								<input
									{...register(`charges.${index}.amount`)}
									className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-24"
									placeholder="Amount"
								/>
								<select
									{...register(`charges.${index}.currency`)}
									className="bg-gray-700 border border-gray-600 rounded px-1 py-1 text-sm"
								>
									{currencies.map((currency) => (
										<option key={currency.id} value={currency.Currency}>
											{currency.Currency}
										</option>
									))}
								</select>
							</td>
							<td className="px-2 py-2">
								<input
									{...register(`charges.${index}.merchant`)}
									className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full"
									placeholder="Description (Merchant Name)"
								/>
							</td>
							<td className="px-2 py-2">
								{charges.length > 1 && (
									<button
										type="button"
										onClick={() => removeCharge(index)}
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
	);
}

export default ChargesDescription;
