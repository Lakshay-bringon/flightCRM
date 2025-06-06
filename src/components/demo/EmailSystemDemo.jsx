import React, { useState } from "react";
import {
	EmailButton,
	EmailComposer,
	TemplateSelector,
	EMAIL_TEMPLATE_TYPES,
} from "../email";

// Example booking data for demonstration
const sampleBookingData = {
	bid: "BK-2025-001",
	pnr: "ABC123",
	customer_name: "John Doe",
	email: "john.doe@example.com",
	phone: "+1-555-0123",
	airline_name: "American Airlines",
	amount: "599.99",
	currency: "USD",
	status: "confirmed",
	agent: "Sarah Johnson",
	card_holder: "John Doe",
	payment_method: "VISA",
	purchase_date: "2025-06-05",
	billing_address: "123 Main St",
	city: "New York",
	state: "NY",
	zip: "10001",
	country: "US",
	transactionType: "new_booking",
};

const EmailSystemDemo = () => {
	const [selectedTemplate, setSelectedTemplate] = useState(
		EMAIL_TEMPLATE_TYPES.BOOKING_CONFIRMATION
	);
	const [showComposer, setShowComposer] = useState(false);

	const handleEmailSent = (result, emailPayload) => {
		console.log("Email sent successfully:", result);
		console.log("Email payload:", emailPayload);
		alert("Email sent successfully! Check console for details.");
	};

	return (
		<div className="p-6 bg-gray-900 min-h-screen">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold text-white mb-8">
					Email System Demo
				</h1>

				{/* Demo Booking Card */}
				<div className="bg-gray-800 rounded-lg p-6 mb-6">
					<h2 className="text-xl font-semibold text-white mb-4">
						Sample Booking
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
						<div>
							<div className="text-sm text-gray-400">Booking ID</div>
							<div className="text-white font-medium">
								{sampleBookingData.bid}
							</div>
						</div>
						<div>
							<div className="text-sm text-gray-400">PNR</div>
							<div className="text-white font-medium">
								{sampleBookingData.pnr}
							</div>
						</div>
						<div>
							<div className="text-sm text-gray-400">Customer</div>
							<div className="text-white font-medium">
								{sampleBookingData.customer_name}
							</div>
						</div>
						<div>
							<div className="text-sm text-gray-400">Email</div>
							<div className="text-white font-medium">
								{sampleBookingData.email}
							</div>
						</div>
						<div>
							<div className="text-sm text-gray-400">Airline</div>
							<div className="text-white font-medium">
								{sampleBookingData.airline_name}
							</div>
						</div>
						<div>
							<div className="text-sm text-gray-400">Amount</div>
							<div className="text-white font-medium">
								{sampleBookingData.amount} {sampleBookingData.currency}
							</div>
						</div>
					</div>

					{/* Email Actions */}
					<div className="flex flex-wrap gap-3">
						<EmailButton
							bookingData={sampleBookingData}
							templateType={EMAIL_TEMPLATE_TYPES.BOOKING_CONFIRMATION}
							buttonText="Send Confirmation"
							onEmailSent={handleEmailSent}
						/>

						<EmailButton
							bookingData={sampleBookingData}
							templateType={EMAIL_TEMPLATE_TYPES.PAYMENT_CONFIRMATION}
							buttonText="Send Payment Confirmation"
							buttonClass="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
							onEmailSent={handleEmailSent}
						/>

						<EmailButton
							bookingData={sampleBookingData}
							templateType={EMAIL_TEMPLATE_TYPES.BOOKING_CANCELLATION}
							buttonText="Send Cancellation"
							buttonClass="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
							onEmailSent={handleEmailSent}
						/>

						<button
							onClick={() => setShowComposer(true)}
							className="px-3 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 flex items-center gap-2"
						>
							Open Full Composer
						</button>
					</div>
				</div>

				{/* Template Selector Demo */}
				<div className="bg-gray-800 rounded-lg p-6 mb-6">
					<h2 className="text-xl font-semibold text-white mb-4">
						Template Selector Demo
					</h2>

					<div className="max-w-md">
						<TemplateSelector
							selectedTemplate={selectedTemplate}
							onTemplateChange={setSelectedTemplate}
						/>
					</div>

					<div className="mt-4">
						<div className="text-sm text-gray-400">Selected Template:</div>
						<div className="text-white font-medium">{selectedTemplate}</div>
					</div>
				</div>

				{/* Integration Instructions */}
				<div className="bg-gray-800 rounded-lg p-6">
					<h2 className="text-xl font-semibold text-white mb-4">
						Integration Instructions
					</h2>

					<div className="text-gray-300 space-y-4">
						<div>
							<h3 className="text-lg font-medium text-white mb-2">
								1. Basic Email Button
							</h3>
							<pre className="bg-gray-900 p-3 rounded text-sm overflow-x-auto">
								{`import { EmailButton } from '../components/email';

<EmailButton
  bookingData={bookingDetails}
  templateType="booking_confirmation"
  buttonText="Send Email"
  onEmailSent={(result) => console.log('Email sent:', result)}
/>`}
							</pre>
						</div>

						<div>
							<h3 className="text-lg font-medium text-white mb-2">
								2. Full Email Composer
							</h3>
							<pre className="bg-gray-900 p-3 rounded text-sm overflow-x-auto">
								{`import { EmailComposer } from '../components/email';

<EmailComposer
  bookingData={bookingDetails}
  templateType="booking_confirmation"
  isOpen={showComposer}
  onClose={() => setShowComposer(false)}
  onSend={handleEmailSend}
/>`}
							</pre>
						</div>

						<div>
							<h3 className="text-lg font-medium text-white mb-2">
								3. Available Template Types
							</h3>
							<ul className="list-disc list-inside text-sm space-y-1">
								<li>booking_confirmation</li>
								<li>booking_cancellation</li>
								<li>payment_confirmation</li>
								<li>itinerary_update</li>
								<li>custom</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Full Composer Modal */}
				{showComposer && (
					<EmailComposer
						bookingData={sampleBookingData}
						templateType={selectedTemplate}
						isOpen={showComposer}
						onClose={() => setShowComposer(false)}
						onSend={async (emailPayload) => {
							console.log("Would send email:", emailPayload);
							alert("Demo: Email would be sent. Check console for payload.");
							return { success: true, messageId: "demo-123" };
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default EmailSystemDemo;
