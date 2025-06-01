import React from 'react';

const EmailNewBooking = ({ bookingData }) => {
	const {
		airline_name = '',
		customer_name = '',
		pnr = '',
		amount = '',
		email = '',
		phone = '',
		card_holder = '',
		card_number = '',
		payment_method = 'VISA',
		purchase_date = '',
		billing_address = '',
		city = '',
		state = '',
		zip = '',
		country = 'US',
		passenger_data = [],
		charge_data = [],
		image_itinerary = '',
		attachments = [],
		currency = 'USD',
	} = bookingData;

	// Format passenger details
	const renderPassengerDetails = () => {
		if (!passenger_data || passenger_data.length === 0) {
			return (
				<div className="passengers-table">
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
								<td>
									<span className="passenger-type">ADT</span>
								</td>
								<td>Not provided</td>
								<td>-</td>
								<td>Not provided</td>
								<td>Not provided</td>
							</tr>
						</tbody>
					</table>
				</div>
			);
		}

		return (
			<div className="passengers-table">
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
						{passenger_data.map((passenger, index) => {
							const {
								type = 'ADT',
								firstName = '',
								middleName = '',
								lastName = '',
								dob = '',
							} = passenger;

							return (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>
										<span className="passenger-type">{type}</span>
									</td>
									<td>{firstName || 'Not provided'}</td>
									<td>{middleName || '-'}</td>
									<td>{lastName || 'Not provided'}</td>
									<td>{dob || 'Not provided'}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	};

	// Format charges
	const renderCharges = () => {
		if (!charge_data || charge_data.length === 0) {
			return (
				<div className="charges-table">
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
								<td>
									{amount || '0.00'} {currency}
								</td>
								<td>Total booking amount</td>
							</tr>
						</tbody>
					</table>
				</div>
			);
		}

		return (
			<div className="charges-table">
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Amount</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{charge_data.map((charge, index) => {
							const { amount: chargeAmount = '', description = '' } = charge;
							return (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>
										{chargeAmount || '0.00'} {currency}
									</td>
									<td>{description || 'No description'}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	};

	// Format attachments
	const renderAttachments = () => {
		if (!attachments || attachments.length === 0) {
			return (
				<div className="attachments-table">
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
								<td colSpan="3" className="no-attachments">
									No additional attachments
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			);
		}

		return (
			<div className="attachments-table">
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>File Name</th>
							<th>Preview</th>
						</tr>
					</thead>
					<tbody>
						{attachments.map((attachment, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>Attachment_{index + 1}.jpg</td>
								<td className="attachment-preview">
									<img
										src={attachment}
										alt={`Attachment ${index + 1}`}
										className="attachment-thumbnail"
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	};

	return (
		<div>
			<style>{`
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
        }        .header {
          text-align: center;
          margin-bottom: 24px;
        }

        .header h1 {
          color: #ffffff;
          font-size: 20px;
          font-weight: 700;
          line-height: 1.4;
        }

        .airline-input, .pnr-input {
          background: transparent;
          border: 0;
          border-bottom: 1px dashed #6b7280;
          color: #ffffff;
          font-weight: 700;
          text-transform: uppercase;
          padding: 0 4px;
          outline: none;
          display: inline;
        }

        .airline-input:focus, .pnr-input:focus {
          border-bottom: 1px dashed #3b82f6;
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

        .customer-name {
          border-bottom: 1px dashed #6b7280;
          padding: 0 4px;
          color: #ffffff;
          background: transparent;
        }

        .amount-input {
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

        .charges-table, .passengers-table, .attachments-table {
          background: #111827;
          border: 1px solid #374151;
          border-radius: 8px;
          overflow: hidden;
        }

        .charges-table table, .passengers-table table, .attachments-table table {
          width: 100%;
          border-collapse: collapse;
          margin: 0;
        }

        .charges-table th, .charges-table td,
        .passengers-table th, .passengers-table td,
        .attachments-table th, .attachments-table td {
          padding: 12px 16px;
          text-align: left;
          border-bottom: 1px solid #374151;
        }

        .charges-table th, .passengers-table th, .attachments-table th {
          background: #1f2937;
          color: #ffffff;
          font-weight: 600;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }

        .charges-table td, .passengers-table td, .attachments-table td {
          color: #d1d5db;
          font-size: 14px;
        }

        .passenger-type {
          background: #1e40af;
          color: #ffffff;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
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
        }

        .purchase-summary-grid {
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

        .itinerary-image {
          max-width: 100%;
          height: auto;
          border: 1px solid #374151;
          border-radius: 8px;
          margin: 16px 0;
        }

        .authorization-section {
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
        }

        .footer {
          text-align: center;
          padding: 24px;
          border-top: 1px solid #374151;
          background: rgba(17, 24, 39, 0.5);
          color: #6b7280;
          font-size: 14px;
        }
      `}</style>

			<div className="email-container">
				<div className="email-content">
					{' '}
					{/* Header */}
					<div className="header">
						<h1>
							<span className="airline-input">
								{airline_name || 'AIRLINE NAME'}
							</span>{' '}
							RESERVATION CONFIRMATION –{' '}
							<span className="pnr-input">{pnr || 'PNR'}</span>
						</h1>
					</div>
					{/* Introduction Section */}
					<div className="section">
						<div className="intro-text">
							Dear{' '}
							<span className="customer-name">
								{customer_name || 'Customer Name'}
							</span>
							,
						</div>
						<div className="intro-text">Thank you for contacting us!</div>
						<div className="intro-text">
							You can contact us on this number +1-877-413-0030 for any related
							request.
						</div>
						<div className="intro-text">
							As per our conversation and as agreed, we have booked your
							reservation under Confirmation number
							<span className="customer-name"> {pnr || 'PNR'}</span> on
							<span className="customer-name">
								{' '}
								{airline_name || 'AIRLINE NAME'}
							</span>{' '}
							with a charge of
							<span className="amount-input"> {amount || '0.00'}</span>
							<select className="currency-select" disabled>
								<option>{currency}</option>
							</select>
							(Including all taxes and fees) as per the below description.
						</div>
					</div>
					{/* Charges Description Section */}
					<div className="section">
						<div className="section-title">Charges Description</div>
						{renderCharges()}
					</div>
					{/* Itinerary Details Section */}
					<div className="section">
						<div className="section-title">Itinerary Details</div>
						{image_itinerary ? (
							<div style={{ textAlign: 'center' }}>
								<img
									src={image_itinerary}
									alt="Flight Itinerary"
									className="itinerary-image"
								/>
							</div>
						) : (
							<p className="no-attachments">No itinerary image provided</p>
						)}
					</div>
					{/* Passenger Details Section */}
					<div className="section">
						<div className="section-title">Passenger Details</div>
						{renderPassengerDetails()}
					</div>
					{/* Attachments Section */}
					<div className="section">
						<div className="section-title">Attachments</div>
						{renderAttachments()}
					</div>
					{/* Purchase Summary Section */}
					<div className="section">
						<div className="section-title">Purchase Summary</div>
						<div className="purchase-summary-grid">
							<div className="grid-item">
								<label>Card Holder:</label>
								<span className="value">
									{card_holder || customer_name || 'Not provided'}
								</span>
							</div>
							<div className="grid-item">
								<label>Email:</label>
								<span className="value">{email || 'Not provided'}</span>
							</div>
							<div className="grid-item">
								<label>Phone:</label>
								<span className="value">{phone || 'Not provided'}</span>
							</div>
							<div className="grid-item">
								<label>Billing Address:</label>
								<span className="value">
									{billing_address || 'Not provided'}
								</span>
							</div>
							<div className="grid-item">
								<label>City:</label>
								<span className="value">{city || 'Not provided'}</span>
							</div>
							<div className="grid-item">
								<label>State:</label>
								<span className="value">{state || 'Not provided'}</span>
							</div>
							<div className="grid-item">
								<label>ZIP:</label>
								<span className="value">{zip || 'Not provided'}</span>
							</div>
							<div className="grid-item">
								<label>Country:</label>
								<span className="value">{country || 'US'}</span>
							</div>
							<div className="grid-item">
								<label>Payment Method:</label>
								<span className="value">{payment_method || 'VISA'}</span>
							</div>
							<div className="grid-item">
								<label>Purchase Date:</label>
								<span className="value">
									{purchase_date || new Date().toLocaleDateString()}
								</span>
							</div>
						</div>
					</div>
					{/* Authorization Section */}
					<div className="authorization-section">
						<div className="auth-title">Authorization</div>
						<p className="auth-paragraph">
							"I hereby certify that I,{' '}
							<span className="auth-highlight">
								{card_holder || '___________'}
							</span>
							, am the authorized user of the{' '}
							<span className="auth-highlight">{payment_method || 'VISA'}</span>{' '}
							bearing the number{' '}
							<span className="auth-highlight">
								{card_number || '___________'}
							</span>
							, and I will not dispute the payment with my credit/debit card
							company or bank. I acknowledge that this amount is being charged
							for my personal travel expenses."
						</p>
						<div className="auth-button-container">
							<button
								className="auth-button"
								onClick={() =>
									alert(
										'Authorization confirmed! This booking is now authorized.'
									)
								}
							>
								✓ I Authorize This Transaction
							</button>
						</div>
					</div>
				</div>

				<div className="footer">
					<p>
						This booking confirmation was generated on{' '}
						{new Date().toLocaleDateString()}
					</p>
					<p>SkylineTravels LLC &copy; 2025. All rights reserved.</p>
				</div>
			</div>
		</div>
	);
};

export default EmailNewBooking;
