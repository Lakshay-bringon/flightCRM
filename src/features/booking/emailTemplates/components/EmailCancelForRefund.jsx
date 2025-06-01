import React from 'react';

const EmailCancelForRefund = ({ bookingData }) => {
	const {
		airline_name = '',
		customer_name = '',
		pnr = '',
		amount = '',
		email = '',
		phone = '',
		currency = 'USD',
		refund_amount = '',
		refund_method = '',
		processing_time = '',
		cancellation_reason = '',
		cancellation_fee = '',
		flight_number = '',
		departure_date = '',
	} = bookingData;

	const netRefund =
		refund_amount ||
		(amount && cancellation_fee
			? (parseFloat(amount) - parseFloat(cancellation_fee || 0)).toFixed(2)
			: amount || '0.00');

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

        .refund-details {
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

        .refund-amount {
          color: #10b981 !important;
          font-weight: 600;
          font-family: 'Courier New', monospace;
        }

        .cancellation-fee {
          color: #ef4444 !important;
          font-weight: 600;
          font-family: 'Courier New', monospace;
        }

        .refund-summary {
          background: #111827;
          border: 2px solid #10b981;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          margin: 16px 0;
        }

        .refund-summary .amount {
          color: #10b981;
          font-size: 24px;
          font-weight: 700;
          margin: 8px 0;
        }

        .alert-box {
          background: #1e40af;
          border: 1px solid #3b82f6;
          border-radius: 8px;
          padding: 16px;
          margin: 16px 0;
        }

        .alert-box p {
          color: #ffffff;
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
							CANCELLATION & REFUND CONFIRMATION –{' '}
							<span className="pnr-input">{pnr || 'PNR'}</span>
						</h1>
					</div>
					{/* Introduction Section */}
					<div className="section">
						<p>Dear {customer_name || 'Customer'},</p>
						<br />
						<p>
							Your booking cancellation has been processed and refund has been
							initiated.
						</p>
						<p>
							Confirmation Number: <strong>{pnr || 'PNR'}</strong>
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
						<div className="refund-details">
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
							<div className="detail-item">
								<label className="detail-label">Cancellation Fee:</label>
								<span className="detail-value cancellation-fee">
									{cancellation_fee || '0.00'} {currency}
								</span>
							</div>
						</div>
					</div>
					{/* Refund Summary */}
					<div className="section">
						<div className="section-title">Refund Summary</div>
						<div className="refund-summary">
							<p>Your refund amount:</p>
							<div className="amount">
								{netRefund} {currency}
							</div>
							<p>will be processed to your original payment method</p>
						</div>
					</div>
					{/* Refund Details */}
					<div className="section">
						<div className="section-title">Refund Processing Details</div>
						<div className="refund-details">
							<div className="detail-item">
								<label className="detail-label">Refund Method:</label>
								<span className="detail-value">
									{refund_method || 'Original Payment Method'}
								</span>
							</div>
							<div className="detail-item">
								<label className="detail-label">Processing Time:</label>
								<span className="detail-value">
									{processing_time || '7-10 business days'}
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
					{/* Important Information */}
					<div className="section">
						<div className="section-title">Important Information</div>
						<div className="alert-box">
							<p>
								<strong>Refund Processing:</strong> Your refund will be
								processed within {processing_time || '7-10 business days'}.
							</p>
							<p>
								<strong>Bank Processing:</strong> Additional time may be
								required by your bank or credit card company.
							</p>
							<p>
								<strong>Confirmation:</strong> You will receive a separate email
								confirmation once the refund is processed.
							</p>
						</div>
						<p>
							If you have any questions about your refund, please contact our
							customer service team.
						</p>
					</div>
				</div>

				<div className="footer">
					<p>
						This cancellation confirmation was generated on{' '}
						{new Date().toLocaleDateString()}
					</p>
					<p>SkylineTravels LLC &copy; 2025. All rights reserved.</p>
				</div>
			</div>
		</div>
	);
};

export default EmailCancelForRefund;
