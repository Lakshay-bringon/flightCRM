import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { dispatchEmailApi } from "../api/booking/bookingApi";
import { showPromiseToast } from "../utils/showPromiseToast";
import {
	generateEmailSubject,
	generateEmailHTML,
} from "../utils/emailGenerator";
import EmailEditor from "../components/common/EmailEditor.jsx";
import Modal from "../components/common/Modal";

export default function EmailPreviewPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const [isSending, setIsSending] = useState(false);
	const [emailHTML, setEmailHTML] = useState("");
	const [isGenerating, setIsGenerating] = useState(true);
	const [isEditing, setIsEditing] = useState(false);
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);

	const formData = location.state?.formData;
	const emailType = location.state?.emailType;
	const transactionType =
		location.state?.transactionType || formData.transaction_type;
	const bid = location.state?.bid;
	const providerId = location.state?.providerId;
	const subject = generateEmailSubject(formData, transactionType, emailType);

	// Generate email HTML in useEffect
	useEffect(() => {
		if (transactionType && formData && emailType) {
			setIsGenerating(true);
			try {
				generateEmailHTML(transactionType, formData, emailType)
					.then((generatedHTML) => {
						setEmailHTML(generatedHTML);
					})
					.catch((error) => {
						console.error("Error generating email HTML:", error);
						setEmailHTML("");
					});
			} catch (error) {
				console.error("Error generating email HTML:", error);
				setEmailHTML("");
			} finally {
				setIsGenerating(false);
			}
		} else {
			setIsGenerating(false);
		}
	}, [transactionType, formData, emailType]);
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

		setShowConfirmationModal(true);
	};

	const confirmSendEmail = async () => {
		setShowConfirmationModal(false);
		setIsSending(true);

		// Convert HTML to base64
		const htmlContentBase64 = btoa(unescape(encodeURIComponent(emailHTML)));
		// Generate dynamic email subject
		const subject = generateEmailSubject(
			formData || {},
			transactionType,
			emailType
		);

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

	const handleEditEmail = () => {
		setIsEditing(true);
	};

	const handleSaveEditedEmail = (editedHTML) => {
		setEmailHTML(editedHTML);
		setIsEditing(false);
	};

	const handleCancelEdit = () => {
		setIsEditing(false);
	};
	if (isGenerating) {
		return (
			<div className="w-full h-full flex justify-center items-center">
				<div className="text-center p-8">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
					<h2 className="text-xl font-semibold text-blue-400 mb-2">
						Generating Email...
					</h2>
					<p className="text-gray-300">
						Please wait while we prepare your email content.
					</p>
				</div>
			</div>
		);
	}

	if (!emailHTML) {
		return (
			<div className="w-full h-full flex justify-center items-center">
				<div className="text-center p-8">
					<h2 className="text-xl font-semibold text-red-400 mb-4">
						No Email Content Available
					</h2>
					<p className="text-gray-300 mb-2">
						{!transactionType || !formData || !emailType
							? "Missing required data to generate email content."
							: "Failed to generate email content. Please try again."}
					</p>
					<p className="text-gray-400 text-sm mb-4">
						Required: Transaction Type, Form Data, and Email Type
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
		<div className="w-full h-full flex flex-col">
			{/* Confirmation Modal */}
			<Modal
				isOpen={showConfirmationModal}
				onClose={() => setShowConfirmationModal(false)}
				title="Confirm Email Sending"
			>
				<p className="text-gray-300">
					Have you proofread the email content? Once sent, it cannot be undone.
				</p>
				<div className="flex justify-end gap-4 mt-4">
					<button
						onClick={() => setShowConfirmationModal(false)}
						className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
					>
						Cancel
					</button>
					<button
						onClick={confirmSendEmail}
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
					>
						Confirm
					</button>
				</div>
			</Modal>

			{/* Show Email Editor when in editing mode */}
			{isEditing ? (
				<EmailEditor
					initialHtml={emailHTML}
					onSave={handleSaveEditedEmail}
					onCancel={handleCancelEdit}
					isSaving={false}
				/>
			) : (
				<>
					{/* Fixed header with Go Back, title, subject, edit, and send */}
					<header className="w-full h-16 bg-gray-800 border-b border-gray-600 grid grid-cols-3 items-center px-6">
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
						<div className="flex justify-end gap-3">
							<button
								onClick={handleEditEmail}
								disabled={isGenerating || !emailHTML}
								className={`px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition ${
									isGenerating || !emailHTML
										? "bg-gray-600 text-gray-400 cursor-not-allowed"
										: ""
								}`}
								title={
									isGenerating
										? "Generating email content..."
										: !emailHTML
										? "No email content to edit"
										: "Edit email content"
								}
							>
								{isGenerating ? "Generating..." : "Edit"}
							</button>
							<button
								onClick={handleSendEmail}
								disabled={
									isSending || !emailHTML || !bid || !providerId || isGenerating
								}
								className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ${
									isSending || !emailHTML || !bid || !providerId || isGenerating
										? "bg-gray-600 text-gray-400 cursor-not-allowed"
										: ""
								}`}
								title={
									!bid || !providerId
										? "Missing booking/provider info"
										: isGenerating
										? "Generating email content..."
										: ""
								}
							>
								{isSending
									? "Sending..."
									: isGenerating
									? "Generating..."
									: "Send Email"}
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
						/>
					</div>
				</>
			)}
		</div>
	);
}
