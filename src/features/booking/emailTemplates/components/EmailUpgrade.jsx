import React from 'react';

const EmailUpgrade = ({ bookingData }) => {
	const {
		airline_name = '',
		customer_name = '',
		pnr = '',
		amount = '',
		email = '',
		phone = '',
		currency = 'USD',
		original_class = '',
		upgraded_class = '',
		upgrade_fee = '',
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

        .upgrade-details {
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
							UPGRADE CONFIRMATION –{' '}
							<span className="pnr-input">{pnr || 'PNR'}</span>
						</h1>
					</div>
					{/* Introduction Section */}
					<div className="section">
						<p>Dear {customer_name || 'Customer'},</p>
						<br />
						<p>Your upgrade request has been processed successfully!</p>
						<p>
							Confirmation Number: <strong>{pnr || 'PNR'}</strong>
						</p>
					</div>
					{/* Upgrade Details Section */}
					<div className="section">
						<div className="section-title">Upgrade Details</div>
						<div className="upgrade-details">
							<div className="detail-item">
								<label className="detail-label">Original Class:</label>
								<span className="detail-value">
									{original_class || 'Economy'}
								</span>
							</div>
							<div className="detail-item">
								<label className="detail-label">Upgraded Class:</label>
								<span className="detail-value">
									{upgraded_class || 'Business'}
								</span>
							</div>
							<div className="detail-item">
								<label className="detail-label">Upgrade Fee:</label>
								<span className="detail-value">
									{upgrade_fee || amount || '0.00'} {currency}
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
				</div>

				<div className="footer">
					<p>
						This upgrade confirmation was generated on{' '}
						{new Date().toLocaleDateString()}
					</p>
					<p>SkylineTravels LLC &copy; 2025. All rights reserved.</p>
				</div>
			</div>
		</div>
	);
};

export default EmailUpgrade;
