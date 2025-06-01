import React from 'react';

const EmailSeatAssignment = ({ bookingData }) => {
	const {
		airline_name = '',
		customer_name = '',
		pnr = '',
		amount = '',
		email = '',
		phone = '',
		currency = 'USD',
		seat_numbers = '',
		flight_number = '',
		departure_date = '',
		departure_time = '',
		passenger_data = [],
		seat_fee = '',
	} = bookingData;

	const renderSeatAssignments = () => {
		if (!passenger_data || passenger_data.length === 0) {
			return (
				<div className="seat-table">
					<table>
						<thead>
							<tr>
								<th>Passenger</th>
								<th>Seat Number</th>
								<th>Seat Type</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{customer_name || 'Passenger'}</td>
								<td>{seat_numbers || 'Not assigned'}</td>
								<td>Standard</td>
							</tr>
						</tbody>
					</table>
				</div>
			);
		}

		return (
			<div className="seat-table">
				<table>
					<thead>
						<tr>
							<th>Passenger</th>
							<th>Seat Number</th>
							<th>Seat Type</th>
						</tr>
					</thead>
					<tbody>
						{passenger_data.map((passenger, index) => {
							const passengerName =
								`${passenger.firstName || ''} ${
									passenger.lastName || ''
								}`.trim() || `Passenger ${index + 1}`;
							const seatNumber =
								passenger.seat_number || seat_numbers || 'Not assigned';
							const seatType = passenger.seat_type || 'Standard';

							return (
								<tr key={index}>
									<td>{passengerName}</td>
									<td className="seat-number">{seatNumber}</td>
									<td>{seatType}</td>
								</tr>
							);
						})}
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

        .flight-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          background: #111827;
          border: 1px solid #374151;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 16px;
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

        .seat-table {
          background: #111827;
          border: 1px solid #374151;
          border-radius: 8px;
          overflow: hidden;
        }

        .seat-table table {
          width: 100%;
          border-collapse: collapse;
          margin: 0;
        }

        .seat-table th,
        .seat-table td {
          padding: 12px 16px;
          text-align: left;
          border-bottom: 1px solid #374151;
        }

        .seat-table th {
          background: #1f2937;
          color: #ffffff;
          font-weight: 600;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }

        .seat-table td {
          color: #d1d5db;
          font-size: 14px;
        }

        .seat-table tbody tr:last-child td {
          border-bottom: none;
        }

        .seat-table tbody tr:hover {
          background: rgba(55, 65, 81, 0.3);
        }

        .seat-number {
          color: #10b981 !important;
          font-weight: 600;
          font-family: 'Courier New', monospace;
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
							SEAT ASSIGNMENT CONFIRMATION –{' '}
							<span className="pnr-input">{pnr || 'PNR'}</span>
						</h1>
					</div>
					{/* Introduction Section */}
					<div className="section">
						<p>Dear {customer_name || 'Customer'},</p>
						<br />
						<p>Your seat assignment has been confirmed!</p>
						<p>
							Confirmation Number: <strong>{pnr || 'PNR'}</strong>
						</p>
					</div>
					{/* Flight Information */}
					<div className="section">
						<div className="section-title">Flight Information</div>
						<div className="flight-info">
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
								<label className="detail-label">Departure Time:</label>
								<span className="detail-value">
									{departure_time || 'Not specified'}
								</span>
							</div>
							<div className="detail-item">
								<label className="detail-label">Seat Fee:</label>
								<span className="detail-value">
									{seat_fee || amount || '0.00'} {currency}
								</span>
							</div>
						</div>
					</div>
					{/* Seat Assignments */}
					<div className="section">
						<div className="section-title">Seat Assignments</div>
						{renderSeatAssignments()}
					</div>
					{/* Contact Information */}
					<div className="section">
						<div className="section-title">Contact Information</div>
						<div className="flight-info">
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
							Please arrive at the gate at least 30 minutes before domestic
							flights and 45 minutes before international flights.
						</p>
						<p>
							Seat assignments are subject to aircraft configuration and may
							change due to operational requirements.
						</p>
					</div>
				</div>

				<div className="footer">
					<p>
						This seat assignment confirmation was generated on{' '}
						{new Date().toLocaleDateString()}
					</p>
					<p>SkylineTravels LLC &copy; 2025. All rights reserved.</p>
				</div>
			</div>
		</div>
	);
};

export default EmailSeatAssignment;
