import React, { useState } from 'react';
import { generateEmailHTML } from '../utils/emailGenerator';
import { TRANSACTION_TYPES } from '../constants';

/**
 * Demo component showing how to use the new email template system
 */
const EmailTemplateDemo = () => {
	const [selectedType, setSelectedType] = useState(
		TRANSACTION_TYPES.NEW_BOOKING
	);
	const [generatedHTML, setGeneratedHTML] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	// Sample booking data for demonstration
	const sampleData = {
		airline_name: 'SkyLine Airways',
		customer_name: 'John Doe',
		pnr: 'ABC123XY',
		amount: '299.99',
		email: 'john.doe@example.com',
		phone: '+1-555-0123',
		currency: 'USD',
		passenger_data: [
			{
				type: 'ADT',
				firstName: 'John',
				middleName: 'Michael',
				lastName: 'Doe',
				dob: '1985-01-15',
			},
			{
				type: 'CHD',
				firstName: 'Jane',
				middleName: '',
				lastName: 'Doe',
				dob: '2010-06-20',
			},
		],
		charge_data: [
			{
				amount: '250.00',
				description: 'Base fare',
			},
			{
				amount: '49.99',
				description: 'Taxes and fees',
			},
		],
		attachments: [
			'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
		],
		card_holder: 'John Doe',
		card_number: '**** **** **** 1234',
		payment_method: 'VISA',
		billing_address: '123 Main Street',
		city: 'New York',
		state: 'NY',
		zip: '10001',
		country: 'US',
		purchase_date: new Date().toLocaleDateString(),

		// Additional fields for different transaction types
		original_class: 'Economy',
		upgraded_class: 'Business',
		upgrade_fee: '150.00',

		original_flight: 'SL101 JFK-LAX',
		new_flight: 'SL205 JFK-LAX',
		exchange_fee: '75.00',
		departure_date: '2025-07-15',
		arrival_date: '2025-07-15',
		exchange_reason: 'Schedule change',

		seat_numbers: '12A, 12B',
		flight_number: 'SL101',
		departure_time: '08:30 AM',
		seat_fee: '25.00',

		refund_amount: '224.99',
		refund_method: 'Original Payment Method',
		processing_time: '7-10 business days',
		cancellation_reason: 'Travel plans changed',
		cancellation_fee: '75.00',

		credit_amount: '299.99',
		credit_expiry: '2026-05-31',
		credit_reference: 'FC-ABC123-789456',
	};

	const handleGenerateEmail = async () => {
		setIsLoading(true);
		try {
			// Generate the email HTML using the new system
			const html = generateEmailHTML(selectedType, sampleData);
			setGeneratedHTML(html);
		} catch (error) {
			console.error('Error generating email:', error);
			setGeneratedHTML(
				`<div style="color: red;">Error generating email: ${error.message}</div>`
			);
		} finally {
			setIsLoading(false);
		}
	};

	const handlePreview = () => {
		if (generatedHTML) {
			const newWindow = window.open();
			newWindow.document.write(generatedHTML);
			newWindow.document.close();
		}
	};

	const handleDownload = () => {
		if (generatedHTML) {
			const blob = new Blob([generatedHTML], { type: 'text/html' });
			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = `email-${selectedType}-${Date.now()}.html`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);
		}
	};

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<h1 className="text-2xl font-bold mb-6 text-white">
				Email Template Generator Demo
			</h1>

			<div className="bg-gray-800 rounded-lg p-6 mb-6">
				<h2 className="text-lg font-semibold mb-4 text-white">
					Template Configuration
				</h2>

				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-300 mb-2">
						Transaction Type:
					</label>
					<select
						value={selectedType}
						onChange={(e) => setSelectedType(e.target.value)}
						className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value={TRANSACTION_TYPES.NEW_BOOKING}>New Booking</option>
						<option value={TRANSACTION_TYPES.UPGRADE}>Upgrade</option>
						<option value={TRANSACTION_TYPES.EXCHANGE}>Exchange</option>
						<option value={TRANSACTION_TYPES.SEAT_ASSIGNMENT}>
							Seat Assignment
						</option>
						<option value={TRANSACTION_TYPES.CANCEL_FOR_REFUND}>
							Cancel for Refund
						</option>
						<option value={TRANSACTION_TYPES.CANCEL_FOR_FUTURE_CREDIT}>
							Cancel for Future Credit
						</option>
					</select>
				</div>

				<div className="flex gap-4">
					<button
						onClick={handleGenerateEmail}
						disabled={isLoading}
						className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isLoading ? 'Generating...' : 'Generate Email'}
					</button>

					{generatedHTML && (
						<>
							<button
								onClick={handlePreview}
								className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
							>
								Preview
							</button>

							<button
								onClick={handleDownload}
								className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
							>
								Download HTML
							</button>
						</>
					)}
				</div>
			</div>

			{generatedHTML && (
				<div className="bg-gray-800 rounded-lg p-6">
					<h2 className="text-lg font-semibold mb-4 text-white">
						Generated Email Preview
					</h2>
					<div className="bg-white border rounded-lg overflow-hidden">
						<iframe
							srcDoc={generatedHTML}
							title="Email Preview"
							className="w-full h-96 border-0"
							sandbox="allow-same-origin"
						/>
					</div>

					<div className="mt-4">
						<h3 className="text-md font-medium mb-2 text-white">
							HTML Source (First 500 characters):
						</h3>
						<pre className="bg-gray-900 text-green-400 p-4 rounded-md text-xs overflow-x-auto">
							{generatedHTML.substring(0, 500)}...
						</pre>
					</div>
				</div>
			)}

			<div className="mt-8 bg-gray-800 rounded-lg p-6">
				<h2 className="text-lg font-semibold mb-4 text-white">How to Use</h2>
				<div className="text-gray-300 space-y-2">
					<p>
						<strong>1. Import the function:</strong>
					</p>
					<pre className="bg-gray-900 text-green-400 p-2 rounded text-sm">
						{`import { generateEmailHTML } from '../utils/emailGenerator';`}
					</pre>

					<p>
						<strong>2. Generate HTML:</strong>
					</p>
					<pre className="bg-gray-900 text-green-400 p-2 rounded text-sm">
						{`const html = generateEmailHTML(transactionType, formData);`}
					</pre>

					<p>
						<strong>3. Use the HTML:</strong>
					</p>
					<ul className="list-disc list-inside ml-4 space-y-1">
						<li>Send via email API</li>
						<li>Preview in iframe</li>
						<li>Download as file</li>
						<li>Display in new window</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default EmailTemplateDemo;
