import React, { useEffect, useRef } from "react";

export default function CardForm({ initialData = {}, onSubmit, onCancel }) {
	const [form, setForm] = React.useState({
		card: "",
		shortName: "",
		status: "Active",
		...initialData,
	});
	const cardRef = useRef(null);

	useEffect(() => {
		if (cardRef.current) cardRef.current.focus();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((f) => ({ ...f, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(form);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label className="block text-sm text-gray-300">Card Name</label>
				<input
					ref={cardRef}
					name="card"
					value={form.card}
					onChange={handleChange}
					className="w-full px-3 py-2 rounded bg-gray-700 text-white"
					required
				/>
			</div>
			<div>
				<label className="block text-sm text-gray-300">Short Name</label>
				<input
					name="shortName"
					value={form.shortName}
					onChange={handleChange}
					className="w-full px-3 py-2 rounded bg-gray-700 text-white"
					required
				/>
			</div>
			<div>
				<label className="block text-sm text-gray-300">Status</label>
				<select
					name="status"
					value={form.status}
					onChange={handleChange}
					className="w-full px-3 py-2 rounded bg-gray-700 text-white"
				>
					<option value="Active">Active</option>
					<option value="Inactive">Inactive</option>
				</select>
			</div>
			<div className="flex gap-2 justify-end">
				<button
					type="button"
					onClick={onCancel}
					className="px-4 py-2 bg-gray-600 text-white rounded"
				>
					Cancel
				</button>
				<button
					type="submit"
					className="px-4 py-2 bg-blue-600 text-white rounded"
				>
					Save
				</button>
			</div>
		</form>
	);
}
