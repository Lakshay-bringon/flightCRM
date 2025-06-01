import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

export default function EmailPreviewPage() {
	const { emailType } = useParams();
	const location = useLocation();
	console.log('Email Type:', emailType, 'Location state:', location.state); // Debugging log

	const emailHTML = location.state?.emailHTML;
	const transactionType = location.state?.transactionType;

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
						Go Back
					</button>
				</div>
			</div>
		);
	}

	return (
		<div
			className="w-full h-full flex flex-col"
			style={{ minHeight: 'calc(100vh - 32px)' }}
		>
			{/* Header with email type info */}
			<div className="p-4 bg-gray-800 border-b border-gray-600">
				<h1 className="text-lg font-semibold text-white">
					Email Preview -{' '}
					{emailType?.charAt(0).toUpperCase() + emailType?.slice(1) ||
						'Unknown'}
				</h1>
				{transactionType && (
					<p className="text-sm text-gray-300">
						Transaction Type: {transactionType}
					</p>
				)}
			</div>

			{/* Email content */}
			<div className="flex-1 flex justify-center items-center p-4">
				<iframe
					title="Email Preview"
					srcDoc={emailHTML}
					sandbox="allow-same-origin allow-scripts"
					className="w-full max-w-4xl h-[calc(100vh-120px)] min-h-[400px] bg-white border shadow-lg rounded"
					style={{
						background: 'white',
						border: '1px solid #e5e7eb',
						borderRadius: '0.75rem',
					}}
				/>
			</div>
		</div>
	);
}
