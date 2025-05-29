// Email HTML generator utility
// This module generates dynamic email HTML from booking form data

/**
 * Generates email HTML that exactly matches the NewBooking component design
 * @param {Object} bookingData - The booking form data
 * @returns {string} - Complete HTML email content
 */
export const generateBookingEmailHTML = (bookingData) => {
	// Extract form data
	const {
		airline_name = "",
		customer_name = "",
		pnr = "",
		amount = "",
		email = "",
		phone = "",
		card_holder = "",
		card_number = "",
		payment_method = "VISA",

		purchase_date = "",
		billing_address = "",
		city = "",
		state = "",
		zip = "",
		country = "US",
		passenger_data = [],
		charge_data = [],
		image_itinerary = "",
		attachments = [],
		currency = "USD",
	} = bookingData; // Format passenger details in tabular form
	const formatPassengerDetails = () => {
		if (!passenger_data || passenger_data.length === 0) {
			return `
				<div class="passengers-table">
					<table>
						<thead>
							<tr>
								<th>#</th>
								<th>Type</th>
								<th>First Name</th>
								<th>Middle Name</th>
								<th>Last Name</th>
								<th>Date of Birth</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td><span class="passenger-type">ADT</span></td>
								<td>Not provided</td>
								<td>-</td>
								<td>Not provided</td>
								<td>Not provided</td>
							</tr>
						</tbody>
					</table>
				</div>
			`;
		}

		const tableRows = passenger_data
			.map((passenger, index) => {
				const {
					type = "ADT",
					firstName = "",
					middleName = "",
					lastName = "",
					dob = "",
				} = passenger;

				return `
					<tr>
						<td>${index + 1}</td>
						<td><span class="passenger-type">${type}</span></td>
						<td>${firstName || "Not provided"}</td>
						<td>${middleName || "-"}</td>
						<td>${lastName || "Not provided"}</td>
						<td>${dob || "Not provided"}</td>
					</tr>
				`;
			})
			.join("");

		return `
			<div class="passengers-table">
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Type</th>
							<th>First Name</th>
							<th>Middle Name</th>
							<th>Last Name</th>
							<th>Date of Birth</th>
						</tr>
					</thead>
					<tbody>
						${tableRows}
					</tbody>
				</table>
			</div>
		`;
	};
	// Format charges in tabular format with one record per row
	const formatChargesDescription = () => {
		if (!charge_data || charge_data.length === 0) {
			return `
				<div class="charges-table">
					<table>
						<thead>
							<tr>
								<th>#</th>
								<th>Amount</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>${amount || "0.00"} ${currency}</td>
								<td>Total booking amount</td>
							</tr>
						</tbody>
					</table>
				</div>
			`;
		}

		const tableRows = charge_data
			.map((charge, index) => {
				const { amount: chargeAmount = "", description = "" } = charge;
				if (!chargeAmount && !description) return "";

				return `
					<tr>
						<td>${index + 1}</td>
						<td>${chargeAmount || "0.00"} ${currency}</td>
						<td>${description || "No description"}</td>
					</tr>
				`;
			})
			.filter(Boolean)
			.join("");

		return `
			<div class="charges-table">
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Amount</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						${tableRows}
					</tbody>
				</table>
			</div>
		`;
	};
	// Calculate total amount from charges or use provided amount
	const calculateTotalAmount = () => {
		if (charge_data && charge_data.length > 0) {
			const total = charge_data.reduce((sum, charge) => {
				const chargeAmount = parseFloat(charge.amount) || 0;
				return sum + chargeAmount;
			}, 0);
			return total > 0 ? total.toFixed(2) : amount || "0.00";
		}
		return amount || "0.00";
	};
	// Format billing address in grid format
	const formatBillingAddress = () => {
		return `
			<div class="purchase-summary-grid">
				<div class="grid-item">
					<label>Card Holder:</label>
					<span class="value">${card_holder || customer_name || "Not provided"}</span>
				</div>
				<div class="grid-item">
					<label>Email:</label>
					<span class="value">${email || "Not provided"}</span>
				</div>
				<div class="grid-item">
					<label>Phone:</label>
					<span class="value">${phone || "Not provided"}</span>
				</div>
				<div class="grid-item">
					<label>Billing Address:</label>
					<span class="value">${billing_address || "Not provided"}</span>
				</div>
				<div class="grid-item">
					<label>City:</label>
					<span class="value">${city || "Not provided"}</span>
				</div>
				<div class="grid-item">
					<label>State:</label>
					<span class="value">${state || "Not provided"}</span>
				</div>
				<div class="grid-item">
					<label>ZIP:</label>
					<span class="value">${zip || "Not provided"}</span>
				</div>
				<div class="grid-item">
					<label>Country:</label>
					<span class="value">${country || "US"}</span>
				</div>
				<div class="grid-item">
					<label>Payment Method:</label>
					<span class="value">${payment_method || "VISA"}</span>
				</div>
				<div class="grid-item">
					<label>Purchase Date:</label>
					<span class="value">${purchase_date || new Date().toLocaleDateString()}</span>
				</div>
			</div>
		`;
	};
	// Format attachments in tabular format
	const formatAttachments = () => {
		if (!attachments || attachments.length === 0) {
			return `
				<div class="attachments-table">
					<table>
						<thead>
							<tr>
								<th>#</th>
								<th>File Name</th>
								<th>Preview</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td colspan="3" class="no-attachments">No additional attachments</td>
							</tr>
						</tbody>
					</table>
				</div>
			`;
		}

		const tableRows = attachments
			.map((attachment, index) => {
				const fileName = `Attachment_${index + 1}.jpg`;
				return `
					<tr>
						<td>${index + 1}</td>
						<td>${fileName}</td>
						<td class="attachment-preview">
							<img src="${attachment}" alt="Attachment ${
					index + 1
				}" class="attachment-thumbnail" />
						</td>
					</tr>
				`;
			})
			.join("");

		return `
			<div class="attachments-table">
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>File Name</th>
							<th>Preview</th>
						</tr>
					</thead>
					<tbody>
						${tableRows}
					</tbody>
				</table>
			</div>
		`;
	};
	// Email template HTML that matches NewBooking component exactly
	const emailHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${airline_name || "AIRLINE"} RESERVATION CONFIRMATION – ${
		pnr || "PNR"
	}</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            background: #0f172a;
            color: #d1d5db;
            line-height: 1.6;
            padding: 20px;
        }

        .email-container {
            max-width: 896px;
            margin: 0 auto;
            background: rgba(31, 41, 55, 0.5);
            backdrop-filter: blur(16px);
            border: 1px solid #374151;
            border-radius: 12px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            overflow: hidden;
        }

        .email-content {
            padding: 24px;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
        }

        .header h1 {
            color: #ffffff;
            font-size: 20px;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .airline-input, .pnr-input {
            background: #374151;
            border: 1px solid #4b5563;
            border-radius: 6px;
            padding: 4px 8px;
            font-size: 14px;
            color: #ffffff;
            font-weight: 700;
            text-transform: uppercase;
        }

        .airline-input {
            width: 160px;
            margin-right: 8px;
        }

        .pnr-input {
            width: 128px;
            margin-left: 8px;
            min-width: 60px;
        }

        .section {
            background: #1f2937;
            border: 1px solid #374151;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 24px;
        }

        .section-title {
            color: #ffffff;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 16px;
            padding-bottom: 8px;
            border-bottom: 1px solid #374151;
        }

        .intro-text {
            line-height: 1.75;
            margin-bottom: 16px;
        }

        .intro-text .customer-name {
            border-bottom: 1px dashed #6b7280;
            padding: 0 4px;
            color: #ffffff;
            background: transparent;
        }

        .intro-text .amount-input {
            border-bottom: 1px dashed #6b7280;
            padding: 0 4px;
            color: #ffffff;
            background: transparent;
            min-width: 40px;
        }

        .currency-select {
            background: #374151;
            border: 1px solid #4b5563;
            border-radius: 4px;
            padding: 4px 8px;
            font-size: 14px;
            color: #ffffff;
            margin-left: 8px;
        }

        .charge-item, .passenger-card {
            background: #111827;
            border: 1px solid #374151;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 16px;
        }

        .passenger-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
        }

        .passenger-header h4 {
            color: #ffffff;
            font-size: 16px;
            font-weight: 600;
        }

        .passenger-type {
            background: #1e40af;
            color: #ffffff;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
        }

        .input-group {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
            padding: 8px 0;
        }

        .input-group label {
            color: #9ca3af;
            font-size: 14px;
            font-weight: 500;
            min-width: 120px;
        }

        .input-group .value {
            color: #ffffff;
            font-size: 14px;
            padding: 6px 12px;
            background: #374151;
            border: 1px solid #4b5563;
            border-radius: 6px;
            min-width: 200px;
            text-align: left;
        }

        .billing-section {
            background: #111827;
            border: 1px solid #374151;
            border-radius: 8px;
            padding: 16px;
        }

        .itinerary-section {
            text-align: center;
        }

        .itinerary-image {
            max-width: 100%;
            height: auto;
            border: 1px solid #374151;
            border-radius: 8px;
            margin: 16px 0;
        }

        .attachment-item {
            margin-bottom: 16px;
            text-align: center;
        }        .no-attachments {
            color: #6b7280;
            font-style: italic;
            text-align: center;
            padding: 16px;
        }

        .charges-table {
            background: #111827;
            border: 1px solid #374151;
            border-radius: 8px;
            overflow: hidden;
        }

        .charges-table table {
            width: 100%;
            border-collapse: collapse;
            margin: 0;
        }

        .charges-table th,
        .charges-table td {
            padding: 12px 16px;
            text-align: left;
            border-bottom: 1px solid #374151;
        }

        .charges-table th {
            background: #1f2937;
            color: #ffffff;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.025em;
        }

        .charges-table td {
            color: #d1d5db;
            font-size: 14px;
        }

        .charges-table tbody tr:last-child td {
            border-bottom: none;
        }

        .charges-table tbody tr:hover {
            background: rgba(55, 65, 81, 0.3);
        }

        .charges-table td:first-child {
            color: #9ca3af;
            font-weight: 600;
            width: 60px;
            text-align: center;
        }

        .charges-table td:nth-child(2) {
            color: #10b981;
            font-weight: 600;
            font-family: 'Courier New', monospace;
        }        .charges-table td:nth-child(3) {
            color: #e5e7eb;
        }

        .passengers-table, .attachments-table {
            background: #111827;
            border: 1px solid #374151;
            border-radius: 8px;
            overflow: hidden;
        }

        .passengers-table table, .attachments-table table {
            width: 100%;
            border-collapse: collapse;
            margin: 0;
        }

        .passengers-table th, .passengers-table td,
        .attachments-table th, .attachments-table td {
            padding: 12px 16px;
            text-align: left;
            border-bottom: 1px solid #374151;
        }

        .passengers-table th, .attachments-table th {
            background: #1f2937;
            color: #ffffff;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.025em;
        }

        .passengers-table td, .attachments-table td {
            color: #d1d5db;
            font-size: 14px;
        }

        .passengers-table tbody tr:last-child td,
        .attachments-table tbody tr:last-child td {
            border-bottom: none;
        }

        .passengers-table tbody tr:hover,
        .attachments-table tbody tr:hover {
            background: rgba(55, 65, 81, 0.3);
        }

        .passengers-table td:first-child,
        .attachments-table td:first-child {
            color: #9ca3af;
            font-weight: 600;
            width: 60px;
            text-align: center;
        }

        .passengers-table .passenger-type {
            background: #1e40af;
            color: #ffffff;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
        }

        .attachment-preview {
            text-align: center;
        }

        .attachment-thumbnail {
            max-width: 80px;
            max-height: 60px;
            border: 1px solid #374151;
            border-radius: 4px;
            object-fit: cover;
        }

        .no-attachments {
            color: #6b7280;
            font-style: italic;
            text-align: center;
            padding: 16px;
        }        .purchase-summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 12px;
            background: #111827;
            border: 1px solid #374151;
            border-radius: 8px;
            padding: 12px;
        }

        .grid-item {
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: 8px 10px;
            background: #1f2937;
            border: 1px solid #374151;
            border-radius: 4px;
        }

        .grid-item label {
            color: #9ca3af;
            font-size: 12px;
            font-weight: 500;
        }

        .grid-item .value {
            color: #ffffff;
            font-size: 13px;
            font-weight: 500;
        }

        .review-note {
            background: #1f2937;
            border: 1px solid #374151;
            border-radius: 8px;
            padding: 16px;
            margin: 24px 0;
        }

        .review-note p {
            color: #d1d5db;
            line-height: 1.75;
        }        .authorization-section {
            background: #1f2937;
            border: 1px solid #374151;
            border-radius: 8px;
            padding: 24px;
            margin: 24px 0;
            line-height: 1.75;
        }

        .auth-title {
            color: #ffffff;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 16px;
            text-align: center;
        }

        .auth-paragraph {
            color: #d1d5db;
            margin-bottom: 16px;
            text-align: justify;
        }

        .auth-highlight {
            color: #10b981;
            font-weight: 600;
            background: rgba(16, 185, 129, 0.1);
            padding: 2px 6px;
            border-radius: 4px;
            border-bottom: 1px solid #10b981;
        }

        .auth-button-container {
            text-align: center;
            margin-top: 24px;
        }

        .auth-button {
            background: linear-gradient(135deg, #10b981, #059669);
            color: #ffffff;
            border: none;
            padding: 12px 32px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            transition: all 0.2s ease;
        }

        .auth-button:hover {
            background: linear-gradient(135deg, #059669, #047857);
            transform: translateY(-1px);
            box-shadow: 0 6px 8px -1px rgba(0, 0, 0, 0.15);
        }

        .footer {
            text-align: center;
            padding: 24px;
            border-top: 1px solid #374151;
            background: rgba(17, 24, 39, 0.5);
            color: #6b7280;
            font-size: 14px;
        }        @media (max-width: 768px) {
            .email-container {
                margin: 10px;
            }
            
            .email-content {
                padding: 16px;
            }
            
            .header {
                flex-direction: column;
                gap: 16px;
            }
            
            .input-group {
                flex-direction: column;
                align-items: flex-start;
                gap: 8px;
            }
            
            .input-group .value {
                min-width: 100%;
            }

            .purchase-summary-grid {
                grid-template-columns: 1fr;
            }

            .charges-table, .passengers-table, .attachments-table {
                overflow-x: auto;
            }

            .charges-table table, .passengers-table table, .attachments-table table {
                min-width: 600px;
            }

            .auth-button {
                padding: 14px 24px;
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-content">
            <!-- Header matching NewBooking component -->
            <div class="header">
                <h1>
                    <span class="airline-input">${
											airline_name || "AIRLINE NAME"
										}</span>
                    RESERVATION CONFIRMATION –
                    <span class="pnr-input">${pnr || "PNR"}</span>
                </h1>
            </div>

            <!-- Introduction Section -->
            <div class="section">
                <div class="intro-text">
                    Dear <span class="customer-name">${
											customer_name || "Customer Name"
										}</span>,
                </div>
                <div class="intro-text">Thank you for contacting us!</div>
                <div class="intro-text">
                    You can contact us on this number +1-877-413-0030 for any related request.
                </div>
                <div class="intro-text">
                    As per our conversation and as agreed, we have booked your reservation under Confirmation number
                    <span class="customer-name">${pnr || "PNR"}</span> on 
                    <span class="customer-name">${
											airline_name || "AIRLINE NAME"
										}</span> with a charge of
                    <span class="amount-input">${
											amount || calculateTotalAmount()
										}</span>
                    <select class="currency-select" disabled>
                        <option>${currency}</option>
                    </select>
                    (Including all taxes and fees) as per the below description.
                </div>
            </div>

            <!-- Charges Description Section -->
            <div class="section">
                <div class="section-title">Charges Description</div>
                ${formatChargesDescription()}
            </div>

            <!-- Itinerary Details Section -->
            <div class="section">
                <div class="section-title">Itinerary Details</div>
                ${
									image_itinerary
										? `
                    <div class="itinerary-section">
                        <img src="${image_itinerary}" alt="Flight Itinerary" class="itinerary-image" />
                    </div>
                `
										: `
                    <p class="no-attachments">No itinerary image provided</p>
                `
								}
            </div>

            <!-- Passenger Details Section -->
            <div class="section">
                <div class="section-title">Passenger Details</div>
                ${formatPassengerDetails()}
            </div>

            <!-- Attachments Section -->
            <div class="section">
                <div class="section-title">Attachments</div>
                ${formatAttachments()}
            </div>

            <!-- Purchase Summary Section -->
            <div class="section">
                <div class="section-title">Purchase Summary</div>
                ${formatBillingAddress()}
            </div>

            <!-- Review Note -->
            <div class="review-note">
                <p>
                    Make sure that the displayed flight information is as you planned. Please review the Names, Dates, Cities, and Departure – Arrival times properly
                </p>
            </div>            <!-- Authorization Section -->
            <div class="authorization-section">
                <div class="auth-title">Authorization</div>
                
                
                <p class="auth-paragraph">
                    "I hereby certify that I, <span class="auth-highlight">${
											card_holder || "___________"
										}</span>, am the authorized user of the <span class="auth-highlight">${
		payment_method || "VISA"
	}</span> bearing the number <span class="auth-highlight">${
		card_number || "___________"
	}</span>, and I will not dispute the payment with my credit/debit card company or bank. I acknowledge that this amount is being charged for my personal travel expenses."
                </p>
                
                <div class="auth-button-container">
                    <button class="auth-button" onclick="alert('Authorization confirmed! This booking is now authorized.')">
                        ✓ I Authorize This Transaction
                    </button>
                </div>
            </div>
        </div>

        <div class="footer">
            <p>This booking confirmation was generated on ${new Date().toLocaleDateString()}</p>
            <p>SkylineTravels LLC &copy; 2025. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;

	return emailHTML;
};

/**
 * Creates a downloadable HTML file from the generated email content
 * @param {string} emailHTML - The generated email HTML
 * @param {string} filename - Optional filename for the download
 */
export const downloadEmailHTML = (
	emailHTML,
	filename = "booking-confirmation.html"
) => {
	const blob = new Blob([emailHTML], { type: "text/html" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
};

/**
 * Opens the generated email HTML in a new window/tab for preview
 * @param {string} emailHTML - The generated email HTML
 */
export const previewEmailHTML = (emailHTML) => {
	const newWindow = window.open();
	newWindow.document.write(emailHTML);
	newWindow.document.close();
};

/**
 * Generates email subject line from booking data
 * @param {Object} bookingData - The booking form data
 * @returns {string} - Email subject line
 */
export const generateEmailSubject = (bookingData) => {
	const { airline_name = "", pnr = "" } = bookingData;
	if (airline_name && pnr) {
		return `${airline_name.toUpperCase()} RESERVATION CONFIRMATION – ${pnr}`;
	} else if (pnr) {
		return `RESERVATION CONFIRMATION – ${pnr}`;
	} else if (airline_name) {
		return `${airline_name.toUpperCase()} RESERVATION CONFIRMATION`;
	}
	return "RESERVATION CONFIRMATION";
};
