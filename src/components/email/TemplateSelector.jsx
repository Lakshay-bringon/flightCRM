import React from "react";
import { EMAIL_TEMPLATE_TYPES } from "./constants/emailVariables";

const TemplateSelector = ({
	selectedTemplate,
	onTemplateChange,
	className = "w-full p-2 bg-gray-700 border border-gray-600 rounded text-white",
}) => {
	const templateOptions = [
		{
			value: EMAIL_TEMPLATE_TYPES.BOOKING_CONFIRMATION,
			label: "Booking Confirmation",
		},
		{
			value: EMAIL_TEMPLATE_TYPES.BOOKING_CANCELLATION,
			label: "Booking Cancellation",
		},
		{
			value: EMAIL_TEMPLATE_TYPES.PAYMENT_CONFIRMATION,
			label: "Payment Confirmation",
		},
		{ value: EMAIL_TEMPLATE_TYPES.ITINERARY_UPDATE, label: "Itinerary Update" },
		{ value: EMAIL_TEMPLATE_TYPES.CUSTOM, label: "Custom Email" },
	];

	return (
		<div>
			<label className="block text-sm font-medium text-gray-300 mb-1">
				Email Template
			</label>
			<select
				value={selectedTemplate}
				onChange={(e) => onTemplateChange(e.target.value)}
				className={className}
			>
				{templateOptions.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default TemplateSelector;
