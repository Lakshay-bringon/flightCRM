import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { dispatchEmailApi } from "../api/booking/bookingApi";
import { showPromiseToast } from "../utils/showPromiseToast";
import { generateEmailSubject } from "../utils/emailGenerator";

export default function EmailPreviewPage() {
	const { emailType } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const [isSending, setIsSending] = useState(false);
	console.log("Email Type:", emailType, "Location state:", location.state); // Debugging log

	const emailHTML = location.state?.emailHTML;
	const transactionType = location.state?.transactionType;
	const bid = location.state?.bid;
	const providerId = location.state?.providerId;
	const formData = location.state?.formData;
	const subject =
		location.state?.subject || generateEmailSubject(formData || {});

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
						{"<- Back"}
					</button>
				</div>
			</div>
		);
	}

	// Debug logging for required fields
	console.log("Required fields:", { bid, providerId, emailHTML: !!emailHTML });

	return (
		<div className="w-full h-full flex flex-col min-h-0 flex-1">
			{/* Fixed header with Go Back, title, subject, and send */}
			<header className="w-full h-16 bg-gray-800 border-b border-gray-600 grid grid-cols-3 items-center px-6 flex-shrink-0">
				<div className="flex justify-start">
					<button
						onClick={() => navigate(-1)}
						className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
					>
						Go Back
					</button>
				</div>
				<div className="flex flex-col items-center">
					<h1 className="text-lg font-semibold text-white text-center">
						{subject}
					</h1>
				</div>
				<div className="flex justify-end">
					<button
						onClick={handleSendEmail}
						disabled={isSending || !emailHTML || !bid || !providerId}
						className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ${
							isSending || !emailHTML || !bid || !providerId
								? "bg-gray-600 text-gray-400 cursor-not-allowed"
								: ""
						}`}
						title={!bid || !providerId ? "Missing booking/provider info" : ""}
					>
						{isSending ? "Sending..." : "Send Email"}
					</button>
				</div>
			</header>
			{/* Email preview fills the rest of the space */}
			<div className="flex-1 min-h-0">
				<iframe
					title="Email Preview"
					srcDoc={emailHTML}
					sandbox="allow-same-origin allow-scripts"
					className="w-full h-full bg-white border shadow-lg rounded"
					style={{
						background: "transparent",
						border: "none",
						height: "100%",
						width: "100%",
					}}
				/>
			</div>
		</div>
	);
}
