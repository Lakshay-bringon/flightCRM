// Test script to verify email template generation
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { DynamicEmailTemplate } from '../features/booking/emailTemplates';
import { TRANSACTION_TYPES } from '../constants';

/**
 * Test function to verify that all email templates can render without context errors
 */
export const testEmailTemplates = () => {
	// Sample booking data for testing
	const sampleBookingData = {
		airline_name: 'SkyLine Airways',
		customer_name: 'John Doe',
		pnr: 'ABC123',
		amount: '299.99',
		email: 'john.doe@example.com',
		phone: '+1-555-0123',
		currency: 'USD',
		passenger_data: [
			{
				type: 'ADT',
				firstName: 'John',
				lastName: 'Doe',
				dob: '1985-01-15',
			},
		],
		charge_data: [
			{
				amount: '299.99',
				description: 'Base fare + taxes',
			},
		],
		card_holder: 'John Doe',
		card_number: '**** **** **** 1234',
		payment_method: 'VISA',
		billing_address: '123 Main St',
		city: 'New York',
		state: 'NY',
		zip: '10001',
		country: 'US',
	};

	const testResults = {};

	// Test all transaction types
	const transactionTypes = [
		TRANSACTION_TYPES.NEW_BOOKING,
		TRANSACTION_TYPES.UPGRADE,
		TRANSACTION_TYPES.EXCHANGE,
		TRANSACTION_TYPES.SEAT_ASSIGNMENT,
		TRANSACTION_TYPES.CANCEL_FOR_REFUND,
		TRANSACTION_TYPES.CANCEL_FOR_FUTURE_CREDIT,
	];

	transactionTypes.forEach((transactionType) => {
		try {
			const html = renderToStaticMarkup(
				<DynamicEmailTemplate
					transactionType={transactionType}
					formData={sampleBookingData}
				/>
			);

			testResults[transactionType] = {
				success: true,
				htmlLength: html.length,
				message: 'Template rendered successfully',
			};
		} catch (error) {
			testResults[transactionType] = {
				success: false,
				error: error.message,
				message: 'Template failed to render',
			};
		}
	});

	return testResults;
};

/**
 * Function to generate and log test results
 */
export const runEmailTemplateTests = () => {
	console.log('🧪 Testing Email Templates...\n');

	const results = testEmailTemplates();

	Object.entries(results).forEach(([transactionType, result]) => {
		const status = result.success ? '✅' : '❌';
		console.log(`${status} ${transactionType}`);
		console.log(`   ${result.message}`);
		if (result.success) {
			console.log(`   Generated HTML: ${result.htmlLength} characters`);
		} else {
			console.log(`   Error: ${result.error}`);
		}
		console.log('');
	});

	const successCount = Object.values(results).filter((r) => r.success).length;
	const totalCount = Object.keys(results).length;

	console.log(
		`📊 Test Results: ${successCount}/${totalCount} templates passed`
	);

	if (successCount === totalCount) {
		console.log('🎉 All email templates are working correctly!');
	} else {
		console.log('⚠️  Some email templates need attention.');
	}

	return results;
};

export default { testEmailTemplates, runEmailTemplateTests };
