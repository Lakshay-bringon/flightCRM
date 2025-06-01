import React from 'react';

const EmailExchange = ({ bookingData }) => {
	const {
		airline_name = '',
		customer_name = '',
		pnr = '',
		amount = '',
		email = '',
		phone = '',
		currency = 'USD',
		original_flight = '',
		new_flight = '',
		exchange_fee = '',
		departure_date = '',
		arrival_date = '',
		exchange_reason = '',
	} = bookingData;

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

        .exchange-details {
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

        .flight-comparison {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 16px;
          align-items: center;
          margin: 16px 0;
        }

        .flight-card {
          background: #111827;
          border: 1px solid #374151;
          border-radius: 8px;
          padding: 16px;
          text-align: center;
        }

        .flight-title {
          color: #10b981;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .arrow {
          color: #6b7280;
          font-size: 24px;
          font-weight: bold;
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
							FLIGHT EXCHANGE CONFIRMATION –{' '}
							<span className="pnr-input">{pnr || 'PNR'}</span>
						</h1>
					</div>
					{/* Introduction Section */}
					<div className="section">
						<p>Dear {customer_name || 'Customer'},</p>
						<br />
						<p>Your flight exchange request has been processed successfully!</p>
						<p>
							Confirmation Number: <strong>{pnr || 'PNR'}</strong>
						</p>
						{exchange_reason && (
							<p>
								Exchange Reason: <em>{exchange_reason}</em>
							</p>
						)}
					</div>
					{/* Flight Comparison Section */}
					<div className="section">
						<div className="section-title">Flight Exchange Details</div>
						<div className="flight-comparison">
							<div className="flight-card">
								<div className="flight-title">ORIGINAL FLIGHT</div>
								<div className="detail-value">
									{original_flight || 'Original Flight Details'}
								</div>
							</div>
							<div className="arrow">→</div>
							<div className="flight-card">
								<div className="flight-title">NEW FLIGHT</div>
								<div className="detail-value">
									{new_flight || 'New Flight Details'}
								</div>
							</div>
						</div>
					</div>
					{/* Exchange Details Section */}
					<div className="section">
						<div className="section-title">Exchange Summary</div>
						<div className="exchange-details">
							<div className="detail-item">
								<label className="detail-label">Exchange Fee:</label>
								<span className="detail-value">
									{exchange_fee || amount || '0.00'} {currency}
								</span>
							</div>
							<div className="detail-item">
								<label className="detail-label">New Departure Date:</label>
								<span className="detail-value">
									{departure_date || 'Not specified'}
								</span>
							</div>
							<div className="detail-item">
								<label className="detail-label">New Arrival Date:</label>
								<span className="detail-value">
									{arrival_date || 'Not specified'}
								</span>
							</div>
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
					{/* Important Notice */}
					<div className="section">
						<div className="section-title">Important Notice</div>
						<p>
							Please review your new flight details carefully. Any further
							changes may be subject to additional fees and availability.
						</p>
						<p>
							We recommend arriving at the airport at least 2 hours before
							domestic flights and 3 hours before international flights.
						</p>
					</div>
				</div>

				<div className="footer">
					<p>
						This exchange confirmation was generated on{' '}
						{new Date().toLocaleDateString()}
					</p>
					<p>SkylineTravels LLC &copy; 2025. All rights reserved.</p>
				</div>
			</div>
		</div>
	);
};

export default EmailExchange;
