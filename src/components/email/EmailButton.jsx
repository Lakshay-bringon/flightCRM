import React from "react";
import { useNavigate } from "react-router-dom";
import { TRANSACTION_TYPES } from "../../constants";
import { Mail } from "lucide-react";

const EmailButton = ({
	bookingData,
	transactionType = TRANSACTION_TYPES.NEW_BOOKING,
	buttonText = "Send Email",
	buttonClass = "px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700",
	onEmailSent,
	disabled = false,
}) => {
	const navigate = useNavigate();

	const handleSendEmail = async (emailPayload) => {
		try {
			// Default API endpoint - can be overridden
			const response = await fetch("/api/emails/send", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(emailPayload),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();

			// Call callback if provided
			if (onEmailSent) {
				onEmailSent(result, emailPayload);
			}

			return result;
		} catch (error) {
			console.error("Error sending email:", error);
			throw error;
		}
	};
	const handleOpenComposer = (e) => {
		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}

		// Navigate to email composer with booking data only (no functions)
		navigate("/email-composer", {
			state: {
				bookingData,
				transactionType,
				// Store callback information that can be handled after navigation
				callbackInfo: onEmailSent
					? { hasCallback: true }
					: { hasCallback: false },
			},
		});
	};
	return (
		<button
			onClick={handleOpenComposer}
			disabled={disabled}
			className={`${buttonClass} ${
				disabled ? "opacity-50 cursor-not-allowed" : ""
			} flex items-center gap-2`}
			title={
				disabled ? "Email functionality disabled" : "Compose and send email"
			}
		>
			<Mail className="w-4 h-4" />
			{buttonText}
		</button>
	);
};

export default EmailButton;
