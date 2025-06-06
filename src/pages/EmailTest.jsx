import React, { useState } from "react";
import EmailSystemDemo from "../components/demo/EmailSystemDemo";
import EmailComposer from "../components/email/EmailComposer";
import { TRANSACTION_TYPES } from "../constants";

const EmailTest = () => {
	const [showDirectComposer, setShowDirectComposer] = useState(false);
	
	// Test booking data with table-heavy content
	const testBookingData = {
		bid: "BK-2025-TEST-001",
		pnr: "TABLE123",
		customer_name: "Jane Smith",
		email: "jane.smith@test.com",
		phone: "+1-555-0199",
		airline_name: "Table Test Airlines",
		amount: "899.99",
		currency: "USD",
		passenger_data: [
			{
				type: "ADT",
				firstName: "Jane",
				middleName: "Marie",
				lastName: "Smith",
				dob: "1985-03-15"
			},
			{
				type: "CHD",
				firstName: "Tommy",
				middleName: "",
				lastName: "Smith",
				dob: "2015-07-22"
			}
		],
		charge_data: [
			{
				amount: "750.00",
				description: "Base fare - Adult"
			},
			{
				amount: "120.00",
				description: "Base fare - Child"
			},
			{
				amount: "89.99",
				description: "Taxes and fees"
			},
			{
				amount: "-60.00",
				description: "Discount applied"
			}
		],
		card_holder: "Jane Smith",
		payment_method: "MASTERCARD",
		purchase_date: "2025-06-06",
		billing_address: "456 Oak Avenue",
		city: "Los Angeles",
		state: "CA",
		zip: "90210",
		country: "US"
	};

	return (
		<div className="min-h-screen bg-gray-900">
			<div className="p-6">
				<h1 className="text-3xl font-bold text-white mb-6">Email Composer Table Test</h1>
				
				<div className="bg-gray-800 rounded-lg p-6 mb-6">
					<h2 className="text-xl font-semibold text-white mb-4">Table Rendering Test</h2>
					<p className="text-gray-300 mb-4">
						Testing EmailComposer with booking data that contains complex table structures.
					</p>
					
					<div className="space-y-4">
						<button
							onClick={() => setShowDirectComposer(true)}
							className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
						>
							Test EmailComposer with Table Data
						</button>
						
						<div className="text-sm text-gray-400">
							<p><strong>Test Data:</strong></p>
							<ul className="list-disc list-inside mt-2 space-y-1">
								<li>2 passengers (Adult + Child)</li>
								<li>4 charge items with different descriptions</li>
								<li>Complete billing information</li>
								<li>Should render passenger table and charges table</li>
							</ul>
						</div>
					</div>
				</div>
				
				<EmailSystemDemo />
				
				{showDirectComposer && (
					<div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
						<div className="bg-gray-900 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
							<div className="p-4 border-b border-gray-700 flex justify-between items-center">
								<h3 className="text-lg font-semibold text-white">Table Rendering Test</h3>
								<button
									onClick={() => setShowDirectComposer(false)}
									className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
								>
									Close Test
								</button>
							</div>
							<div className="overflow-auto max-h-[calc(90vh-80px)]">
								<EmailComposer 
									bookingData={testBookingData}
									transactionType={TRANSACTION_TYPES.NEW_BOOKING}
									onClose={() => setShowDirectComposer(false)}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default EmailTest;
