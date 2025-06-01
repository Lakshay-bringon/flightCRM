# Email Template System Documentation

## Overview

The email template system provides a robust, context-free solution for generating dynamic email templates for different transaction types in the React application. The system uses `renderToStaticMarkup` from `react-dom/server` to generate static HTML emails that can be sent via email services.

## Problem Solved

**Original Issue**: The system was trying to render email templates using components that depended on React context (`useDataContext`), which caused the error: "Cannot destructure property 'currencies' of 'useDataContext(...)' as it is undefined" when using `renderToStaticMarkup`.

**Solution**: Created self-contained email template components that receive all data via props instead of relying on React context, making them compatible with server-side rendering.

## Architecture

### File Structure

```
src/
├── features/booking/emailTemplates/
│   ├── components/
│   │   ├── EmailNewBooking.jsx          # New booking confirmation
│   │   ├── EmailUpgrade.jsx             # Upgrade confirmation
│   │   ├── EmailExchange.jsx            # Flight exchange confirmation
│   │   ├── EmailSeatAssignment.jsx      # Seat assignment confirmation
│   │   ├── EmailCancelForRefund.jsx     # Cancellation with refund
│   │   └── EmailCancelForFutureCredit.jsx # Cancellation with future credit
│   ├── DynamicEmailTemplate.jsx         # Main template router
│   └── index.js                         # Exports
├── utils/
│   ├── emailGenerator.jsx               # HTML generation utilities
│   └── emailTemplateTests.js            # Testing utilities
└── constants/index.js                   # Transaction type constants
```

### Transaction Types

The system supports 6 different transaction types defined in `constants/index.js`:

1. `NEW_BOOKING` - New flight bookings
2. `UPGRADE` - Class upgrades
3. `EXCHANGE` - Flight exchanges
4. `SEAT_ASSIGNMENT` - Seat selections
5. `CANCEL_FOR_REFUND` - Cancellations with refunds
6. `CANCEL_FOR_FUTURE_CREDIT` - Cancellations with future credits

## Components

### EmailNewBooking.jsx

- **Purpose**: Comprehensive booking confirmation email
- **Features**:
  - Passenger details table
  - Charges breakdown
  - Flight itinerary display
  - Attachments with image previews
  - Purchase summary grid
  - Authorization section
  - Responsive design with inline CSS

### EmailUpgrade.jsx

- **Purpose**: Flight class upgrade confirmation
- **Features**:
  - Original vs upgraded class comparison
  - Upgrade fee display
  - Contact information grid

### EmailExchange.jsx

- **Purpose**: Flight exchange confirmation
- **Features**:
  - Side-by-side flight comparison
  - Exchange fee details
  - New departure/arrival information
  - Exchange reason display

### EmailSeatAssignment.jsx

- **Purpose**: Seat assignment confirmation
- **Features**:
  - Passenger-to-seat mapping table
  - Flight information display
  - Seat type categorization
  - Contact information

### EmailCancelForRefund.jsx

- **Purpose**: Cancellation with refund processing
- **Features**:
  - Refund amount calculation
  - Processing timeline information
  - Cancellation fee breakdown
  - Important refund notices

### EmailCancelForFutureCredit.jsx

- **Purpose**: Cancellation with future travel credit
- **Features**:
  - Credit amount display
  - Credit reference number generation
  - Expiry date warnings
  - Terms and conditions
  - Usage instructions

## Usage

### Basic Implementation

```javascript
import { generateEmailHTML } from '../utils/emailGenerator';
import { TRANSACTION_TYPES } from '../constants';

// Sample booking data
const bookingData = {
	airline_name: 'SkyLine Airways',
	customer_name: 'John Doe',
	pnr: 'ABC123',
	amount: '299.99',
	email: 'john.doe@example.com',
	phone: '+1-555-0123',
	currency: 'USD',
	// ... additional fields based on transaction type
};

// Generate HTML email
const emailHTML = generateEmailHTML(TRANSACTION_TYPES.NEW_BOOKING, bookingData);

// Use the generated HTML
console.log(emailHTML); // Complete HTML document
```

### Advanced Usage with Preview

```javascript
import { DynamicEmailTemplate } from '../features/booking/emailTemplates';
import { renderToStaticMarkup } from 'react-dom/server';

const PreviewComponent = ({ transactionType, formData }) => {
	const [emailHTML, setEmailHTML] = useState('');

	const generatePreview = () => {
		const html = renderToStaticMarkup(
			<DynamicEmailTemplate
				transactionType={transactionType}
				formData={formData}
			/>
		);
		setEmailHTML(html);
	};

	return (
		<div>
			<button onClick={generatePreview}>Generate Preview</button>
			{emailHTML && (
				<iframe
					srcDoc={emailHTML}
					title="Email Preview"
					style={{ width: '100%', height: '600px' }}
				/>
			)}
		</div>
	);
};
```

## Data Structure

### Required Fields (All Templates)

```javascript
{
  airline_name: string,
  customer_name: string,
  pnr: string,
  amount: string,
  email: string,
  phone: string,
  currency: string // default: 'USD'
}
```

### Transaction-Specific Fields

#### NEW_BOOKING

```javascript
{
  passenger_data: [
    {
      type: 'ADT' | 'CHD' | 'INF',
      firstName: string,
      middleName: string,
      lastName: string,
      dob: string
    }
  ],
  charge_data: [
    {
      amount: string,
      description: string
    }
  ],
  attachments: string[], // base64 image data
  image_itinerary: string,
  card_holder: string,
  card_number: string,
  payment_method: string,
  billing_address: string,
  city: string,
  state: string,
  zip: string,
  country: string,
  purchase_date: string
}
```

#### UPGRADE

```javascript
{
  original_class: string,
  upgraded_class: string,
  upgrade_fee: string
}
```

#### EXCHANGE

```javascript
{
  original_flight: string,
  new_flight: string,
  exchange_fee: string,
  departure_date: string,
  arrival_date: string,
  exchange_reason: string
}
```

#### SEAT_ASSIGNMENT

```javascript
{
  seat_numbers: string,
  flight_number: string,
  departure_date: string,
  departure_time: string,
  seat_fee: string,
  passenger_data: [
    {
      firstName: string,
      lastName: string,
      seat_number: string,
      seat_type: string
    }
  ]
}
```

#### CANCEL_FOR_REFUND

```javascript
{
  refund_amount: string,
  refund_method: string,
  processing_time: string,
  cancellation_reason: string,
  cancellation_fee: string,
  flight_number: string,
  departure_date: string
}
```

#### CANCEL_FOR_FUTURE_CREDIT

```javascript
{
  credit_amount: string,
  credit_expiry: string,
  credit_reference: string,
  cancellation_reason: string,
  flight_number: string,
  departure_date: string,
  terms_conditions: string
}
```

## Styling

All email templates use:

- **Inline CSS** for maximum email client compatibility
- **Dark theme** with professional styling
- **Responsive design** that works on mobile devices
- **Consistent color scheme**:
  - Background: `#0f172a` (dark blue)
  - Content backgrounds: `#1f2937`, `#111827` (gray variants)
  - Text: `#ffffff` (white), `#d1d5db` (light gray)
  - Accents: `#10b981` (green), `#f59e0b` (amber), `#ef4444` (red)

## Testing

### Automated Testing

```javascript
import { runEmailTemplateTests } from '../utils/emailTemplateTests';

// Run all template tests
const results = runEmailTemplateTests();
console.log(results);
```

### Manual Testing

Use the `EmailTemplateDemo` component for interactive testing:

```javascript
import EmailTemplateDemo from '../components/demo/EmailTemplateDemo';

// Use in your development environment
<EmailTemplateDemo />;
```

## Benefits

1. **Context-Free**: No dependency on React context providers
2. **Server-Side Compatible**: Works with `renderToStaticMarkup`
3. **Type Safety**: Consistent data structure across all templates
4. **Maintainable**: Self-contained components with inline styles
5. **Responsive**: Mobile-friendly email designs
6. **Comprehensive**: Covers all booking transaction types
7. **Professional**: Airline industry-standard email layouts

## Migration from Old System

### Before

```javascript
// ❌ Old system with context dependency
import NewBooking from '../components/NewBooking';

const html = renderToStaticMarkup(
	<DataProvider>
		<NewBooking bookingData={data} />
	</DataProvider>
);
// Error: Cannot destructure property 'currencies' of 'useDataContext(...)'
```

### After

```javascript
// ✅ New system without context dependency
import { generateEmailHTML } from '../utils/emailGenerator';

const html = generateEmailHTML(transactionType, data);
// Works perfectly with renderToStaticMarkup
```

## Future Enhancements

1. **Internationalization**: Multi-language email templates
2. **Theming**: Customizable color schemes per airline
3. **A/B Testing**: Template variations for testing
4. **Analytics**: Email engagement tracking
5. **Templates Editor**: Visual email template builder
6. **API Integration**: Direct email sending capabilities

## Troubleshooting

### Common Issues

1. **Missing Data**: Ensure all required fields are provided
2. **Rendering Errors**: Check that transaction type matches constants
3. **Styling Issues**: Verify inline CSS is properly formatted
4. **Image Display**: Ensure base64 images are properly encoded

### Error Handling

```javascript
try {
	const html = generateEmailHTML(transactionType, formData);
	// Success
} catch (error) {
	console.error('Email generation failed:', error.message);
	// Handle error appropriately
}
```

## Conclusion

The email template system provides a robust, scalable solution for generating professional airline booking emails. The context-free design ensures compatibility with server-side rendering while maintaining a clean, maintainable codebase.
