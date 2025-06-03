import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { dispatchEmailApi } from "../api/booking/bookingApi";
import { showPromiseToast } from "../utils/showPromiseToast";
import { generateEmailSubject } from "../utils/emailGenerator";

export default function EmailPreviewPage() {
	const { emailType } = useParams();
	const location = useLocation();
	const [isSending, setIsSending] = useState(false);
	console.log("Email Type:", emailType, "Location state:", location.state); // Debugging log

	const emailHTML = location.state?.emailHTML;
	const transactionType = location.state?.transactionType;
	const bid = location.state?.bid;
	const providerId = location.state?.providerId;
	const formData = location.state?.formData;
	const handleSendEmail = async () => {
		if (!emailHTML) {
			alert("No email content to send");
			return;
		}

		if (!bid) {
			alert("Booking ID is required to send email");
			return;
		}

		if (!providerId) {
			alert("Provider ID is required to send email");
			return;
		}

		setIsSending(true);

		// Convert HTML to base64
		const htmlContentBase64 = btoa(unescape(encodeURIComponent(emailHTML)));

		// Generate dynamic email subject
		const subject = generateEmailSubject(formData || {});

		// Prepare API payload
		const emailPayload = {
			bid: bid,
			subject: subject,
			htmlContentBase64: htmlContentBase64,
			providerId: providerId,
		};

		// Use showPromiseToast to handle the API call
		const emailPromise = dispatchEmailApi(emailPayload);

		showPromiseToast(
			emailPromise,
			{
				loading: "Sending email...",
				success: "Email sent successfully!",
				error: (err) => `Failed to send email: ${err.message}`,
			},
			{
				duration: 4000,
			}
		).finally(() => {
			setIsSending(false);
		});
	};
	if (!emailHTML) {
		return (
			<div className="w-full h-full flex justify-center items-center">
				<div className="text-center p-8">
					<h2 className="text-xl font-semibold text-red-400 mb-4">
						No Email Content Available
					</h2>
					<p className="text-gray-300">
						No email content was provided. Please go back and try again.
					</p>
					<button
						onClick={() => window.history.back()}
						className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
					>
						Go Back
					</button>
				</div>
			</div>
		);
	}

	// Debug logging for required fields
	console.log("Required fields:", { bid, providerId, emailHTML: !!emailHTML });

	return (
		<div
			className="w-full h-full flex flex-col"
			style={{ minHeight: "calc(100vh - 32px)" }}
		>
			{" "}
			{/* Header with email type info and send button */}
			<div className="p-4 bg-gray-800 border-b border-gray-600 flex justify-between items-center">
				{" "}
				<div>
					<h1 className="text-lg font-semibold text-white">
						Email Preview -{" "}
						{emailType?.charAt(0).toUpperCase() + emailType?.slice(1) ||
							"Unknown"}
					</h1>
					{transactionType && (
						<p className="text-sm text-gray-300">
							Transaction Type: {transactionType}
						</p>
					)}
					{bid && <p className="text-xs text-gray-400">Booking ID: {bid}</p>}{" "}
					{providerId && (
						<p className="text-xs text-gray-400">Provider ID: {providerId}</p>
					)}
				</div>
				{/* Send Email Button */}
				<button
					onClick={handleSendEmail}
					disabled={isSending || !emailHTML || !bid || !providerId}
					className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
						isSending || !emailHTML || !bid || !providerId
							? "bg-gray-600 text-gray-400 cursor-not-allowed"
							: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
					}`}
					title={
						!bid || !providerId
							? "Missing required booking or provider information"
							: ""
					}
				>
					{isSending ? (
						<div className="flex items-center space-x-2">
							<svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
									fill="none"
								/>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								/>
							</svg>
							<span>Sending...</span>
						</div>
					) : (
						<div className="flex items-center space-x-2">
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
								/>
							</svg>
							<span>Send Email</span>
						</div>
					)}
				</button>
			</div>
			{/* Email content */}
			<div className="flex-1 flex justify-center items-center p-4">
				<iframe
					title="Email Preview"
					srcDoc={emailHTML}
					sandbox="allow-same-origin allow-scripts"
					className="w-full max-w-4xl h-[calc(100vh-120px)] min-h-[400px] bg-white border shadow-lg rounded"
					style={{
						background: "white",
						border: "1px solid #e5e7eb",
						borderRadius: "0.75rem",
					}}
				/>
			</div>
		</div>
	);
}
