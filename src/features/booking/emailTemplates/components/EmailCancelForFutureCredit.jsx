import React from 'react';

const EmailCancelForFutureCredit = ({ bookingData }) => {
	const {
		airline_name = '',
		customer_name = '',
		pnr = '',
		amount = '',
		email = '',
		phone = '',
		currency = 'USD',
		credit_amount = '',
		credit_expiry = '',
		credit_reference = '',
		cancellation_reason = '',
		flight_number = '',
		departure_date = '',
		terms_conditions = '',
	} = bookingData;

	const finalCreditAmount = credit_amount || amount || '0.00';
	const expiryDate =
		credit_expiry ||
		new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString();

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
        }        .header h1 {
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

        .credit-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          background: #111827;
          border: 1px solid #374151;
          border-radius: 8px;
          padding: 16px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .detail-label {
          color: #9ca3af;
          font-size: 12px;
          font-weight: 500;
        }

        .detail-value {
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
        }

        .credit-summary {
          background: #111827;
          border: 2px solid #f59e0b;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          margin: 16px 0;
        }

        .credit-summary .amount {
          color: #f59e0b;
          font-size: 24px;
          font-weight: 700;
          margin: 8px 0;
        }

        .credit-summary .reference {
          color: #10b981;
          font-size: 18px;
          font-weight: 600;
          font-family: 'Courier New', monospace;
          margin: 8px 0;
          padding: 8px;
          background: rgba(16, 185, 129, 0.1);
          border-radius: 4px;
        }

        .expiry-notice {
          background: #dc2626;
          border: 1px solid #ef4444;
          border-radius: 8px;
          padding: 16px;
          margin: 16px 0;
          text-align: center;
        }

        .expiry-notice p {
          color: #ffffff;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .expiry-date {
          color: #fbbf24;
          font-size: 18px;
          font-weight: 700;
        }

        .terms-box {
          background: #1e40af;
          border: 1px solid #3b82f6;
          border-radius: 8px;
          padding: 16px;
          margin: 16px 0;
        }

        .terms-box h4 {
          color: #ffffff;
          margin-bottom: 12px;
          font-size: 16px;
        }

        .terms-box ul {
          color: #d1d5db;
          padding-left: 20px;
        }

        .terms-box li {
          margin-bottom: 8px;
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
					{/* Header */}{' '}
					<div className="header">
						<h1>
							<span className="airline-input">{airline_name || 'AIRLINE'}</span>{' '}
							FUTURE CREDIT CONFIRMATION –{' '}
							<span className="pnr-input">{pnr || 'PNR'}</span>
						</h1>
					</div>
					{/* Introduction Section */}
					<div className="section">
						<p>Dear {customer_name || 'Customer'},</p>
						<br />
						<p>
							Your booking has been cancelled and converted to a future travel
							credit.
						</p>
						<p>
							Original Confirmation Number: <strong>{pnr || 'PNR'}</strong>
						</p>
						{cancellation_reason && (
							<p>
								Cancellation Reason: <em>{cancellation_reason}</em>
							</p>
						)}
					</div>
					{/* Cancelled Flight Details */}
					<div className="section">
						<div className="section-title">Cancelled Flight Details</div>
						<div className="credit-details">
							<div className="detail-item">
								<label className="detail-label">Flight Number:</label>
								<span className="detail-value">
									{flight_number || 'Not specified'}
								</span>
							</div>
							<div className="detail-item">
								<label className="detail-label">Departure Date:</label>
								<span className="detail-value">
									{departure_date || 'Not specified'}
								</span>
							</div>
							<div className="detail-item">
								<label className="detail-label">Original Amount:</label>
								<span className="detail-value">
									{amount || '0.00'} {currency}
								</span>
							</div>
						</div>
					</div>
					{/* Credit Summary */}
					<div className="section">
						<div className="section-title">Future Credit Details</div>
						<div className="credit-summary">
							<p>Your future travel credit:</p>
							<div className="amount">
								{finalCreditAmount} {currency}
							</div>
							<p>Credit Reference Number:</p>
							<div className="reference">
								{credit_reference ||
									`FC-${pnr || 'XXXXXX'}-${Date.now().toString().slice(-6)}`}
							</div>
						</div>
					</div>
					{/* Expiry Notice */}
					<div className="expiry-notice">
						<p>⚠️ IMPORTANT: Your credit expires on</p>
						<div className="expiry-date">{expiryDate}</div>
					</div>
					{/* Contact Information */}
					<div className="section">
						<div className="section-title">Contact Information</div>
						<div className="credit-details">
							<div className="detail-item">
								<label className="detail-label">Email:</label>
								<span className="detail-value">{email || 'Not provided'}</span>
							</div>
							<div className="detail-item">
								<label className="detail-label">Phone:</label>
								<span className="detail-value">{phone || 'Not provided'}</span>
							</div>
						</div>
					</div>
					{/* Terms and Conditions */}
					<div className="section">
						<div className="section-title">Terms & Conditions</div>
						<div className="terms-box">
							<h4>Important Information about Your Future Credit:</h4>
							<ul>
								<li>
									This credit can be used for future bookings with{' '}
									{airline_name || 'the airline'}
								</li>
								<li>
									Credit must be used before the expiry date:{' '}
									<strong>{expiryDate}</strong>
								</li>
								<li>Credit is non-transferable and non-refundable</li>
								<li>
									Partial use of credit is allowed, remaining balance stays
									active until expiry
								</li>
								<li>
									Credit can be applied to base fare and taxes/fees for new
									bookings
								</li>
								<li>
									Additional fees may apply for rebooking depending on fare
									rules
								</li>
								<li>
									Contact customer service to use your credit for new bookings
								</li>
							</ul>
						</div>
						{terms_conditions && (
							<p>
								<strong>Additional Terms:</strong> {terms_conditions}
							</p>
						)}
					</div>
					{/* How to Use Credit */}
					<div className="section">
						<div className="section-title">How to Use Your Credit</div>
						<p>To use your future credit for a new booking:</p>
						<ol style={{ paddingLeft: '20px', marginTop: '12px' }}>
							<li style={{ marginBottom: '8px' }}>
								Contact our customer service team
							</li>
							<li style={{ marginBottom: '8px' }}>
								Provide your credit reference number
							</li>
							<li style={{ marginBottom: '8px' }}>
								Select your new travel dates and destinations
							</li>
							<li style={{ marginBottom: '8px' }}>
								Credit will be applied to your new booking
							</li>
						</ol>
					</div>
				</div>

				<div className="footer">
					<p>
						This future credit confirmation was generated on{' '}
						{new Date().toLocaleDateString()}
					</p>
					<p>SkylineTravels LLC &copy; 2025. All rights reserved.</p>
				</div>
			</div>
		</div>
	);
};

export default EmailCancelForFutureCredit;
