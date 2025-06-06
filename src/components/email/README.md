# Rich Text Email System

This module provides a Gmail-like email composer interface for sending dynamic emails with booking data.

## Features

- 🎨 **Rich Text Editor**: Gmail-like interface with formatting options
- 📧 **Dynamic Templates**: Pre-built templates for different email types
- 🔄 **Variable Insertion**: Easy insertion of booking data into emails
- 👀 **Live Preview**: Real-time preview of email content
- 📱 **Responsive Design**: Works on desktop and mobile
- 🎯 **Easy Integration**: Drop-in components for existing applications

## Quick Start

### 1. Basic Email Button

```jsx
import { EmailButton } from "../components/email";

// In your booking card or details component
<EmailButton
	bookingData={bookingDetails}
	templateType="booking_confirmation"
	buttonText="Send Confirmation"
	onEmailSent={(result) => console.log("Email sent:", result)}
/>;
```

### 2. Full Email Composer

```jsx
import { EmailComposer } from "../components/email";

function MyComponent() {
	const [showComposer, setShowComposer] = useState(false);

	return (
		<>
			<button onClick={() => setShowComposer(true)}>Compose Email</button>

			{showComposer && (
				<EmailComposer
					bookingData={bookingDetails}
					templateType="booking_confirmation"
					isOpen={showComposer}
					onClose={() => setShowComposer(false)}
					onSend={handleEmailSend}
				/>
			)}
		</>
	);
}
```

## Components

### EmailButton

A simple button that opens the email composer.

**Props:**

- `bookingData` (Object): Booking data for template variables
- `templateType` (String): Type of email template to use
- `buttonText` (String): Text to display on button
- `buttonClass` (String): CSS classes for button styling
- `onEmailSent` (Function): Callback when email is sent
- `disabled` (Boolean): Whether button is disabled

### EmailComposer

Full-featured email composer with rich text editing.

**Props:**

- `bookingData` (Object): Booking data for template variables
- `templateType` (String): Type of email template to use
- `isOpen` (Boolean): Whether composer is visible
- `onClose` (Function): Callback when composer is closed
- `onSend` (Function): Callback when email is sent

### TemplateSelector

Dropdown for selecting email templates.

**Props:**

- `selectedTemplate` (String): Currently selected template
- `onTemplateChange` (Function): Callback when template changes
- `className` (String): CSS classes for styling

## Email Templates

### Available Templates

1. **booking_confirmation** - Standard booking confirmation
2. **booking_cancellation** - Booking cancellation notice
3. **payment_confirmation** - Payment confirmation
4. **itinerary_update** - Travel itinerary updates
5. **custom** - Blank template for custom messages

### Template Variables

The system automatically replaces template variables with booking data:

- `{{customer_name}}` - Customer's name
- `{{booking_id}}` - Booking ID
- `{{pnr}}` - PNR number
- `{{airline_name}}` - Airline name
- `{{total_amount}}` - Total amount
- `{{currency}}` - Currency code
- And many more...

## Backend Integration

The email composer sends data to your backend in this format:

```javascript
{
  to: "customer@email.com",
  subject: "Booking Confirmation - ABC123",
  html: "<p>Dear John Doe,</p><p>Your booking...</p>",
  bookingId: "BK-2025-001",
  templateType: "booking_confirmation"
}
```

### Example Backend Handler (Node.js/Express)

```javascript
app.post("/api/emails/send", async (req, res) => {
	const { to, subject, html, bookingId, templateType } = req.body;

	try {
		// Send email using your preferred service (NodeMailer, SendGrid, etc.)
		await emailService.send({
			to,
			subject,
			html,
		});

		// Log email activity
		await logEmailActivity(bookingId, templateType, to);

		res.json({ success: true, messageId: "email-123" });
	} catch (error) {
		res.status(500).json({ error: "Failed to send email" });
	}
});
```

## Customization

### Custom Templates

Add your own templates to `DEFAULT_EMAIL_TEMPLATES`:

```javascript
export const DEFAULT_EMAIL_TEMPLATES = {
	my_custom_template: {
		subject: "Custom Subject - {{booking_id}}",
		body: `
      <h2>Dear {{customer_name}},</h2>
      <p>Your custom message here...</p>
    `,
	},
};
```

### Custom Variables

Add new variables to `VARIABLE_DEFINITIONS`:

```javascript
export const VARIABLE_DEFINITIONS = [
	{
		key: "custom_field",
		label: "Custom Field",
		path: "custom_data.field",
		defaultValue: "Default Value",
		category: "custom",
	},
];
```

### Styling

The components use Tailwind CSS classes. Customize by:

1. Modifying the default `buttonClass` props
2. Overriding CSS classes
3. Creating themed variants

## File Structure

```
src/components/email/
├── EmailComposer.jsx          # Main composer component
├── EmailButton.jsx            # Simple email button
├── TemplateSelector.jsx       # Template dropdown
├── index.js                   # Main exports
├── constants/
│   └── emailVariables.js      # Templates and variables
├── utils/
│   └── templateGenerator.js   # Template processing
└── demo/
    └── EmailSystemDemo.jsx    # Demo component
```

## Demo

To see the email system in action, import and use the demo component:

```jsx
import EmailSystemDemo from "../components/demo/EmailSystemDemo";

function App() {
	return <EmailSystemDemo />;
}
```

## Dependencies

- `react-quill` - Rich text editor
- `lucide-react` - Icons
- `tailwindcss` - Styling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Part of FlightCRM system.
