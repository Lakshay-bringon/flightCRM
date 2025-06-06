import React, { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Send, Eye, RotateCcw, X, FileText, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
	generateEmailHTML,
	generateEmailSubject,
} from "../../utils/emailGenerator";
import { TRANSACTION_TYPES } from "../../constants";
import "./EmailComposer.css";
	const EmailComposer = ({ bookingData: propBookingData, transactionType: propTransactionType, onClose }) => {
	const navigate = useNavigate();
	const location = useLocation(); // Get data from route state
	const bookingData = propBookingData || location.state?.bookingData;
	const transactionType =
		propTransactionType || location.state?.transactionType || TRANSACTION_TYPES.NEW_BOOKING;
	const callbackInfo = location.state?.callbackInfo;
	
	console.log('✅ EmailComposer loaded with:', { bookingData, transactionType });
	const [emailData, setEmailData] = useState({
		to: "",
		subject: "",
		body: "",
		attachments: [],
	});
	const [showPreview, setShowPreview] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [originalTemplate, setOriginalTemplate] = useState("");
	const [placeholderData, setPlaceholderData] = useState({});
	const editorRef = useRef(null);
	// Process placeholders in HTML template
	const processPlaceholders = (htmlContent, data) => {
		if (!htmlContent || !data) return htmlContent;

		let processedContent = htmlContent;

		// Replace common booking placeholders
		const placeholders = {
			"{{customerName}}":
				data.customerName || data.firstName || "Valued Customer",
			"{{firstName}}": data.firstName || "",
			"{{lastName}}": data.lastName || "",
			"{{email}}": data.email || "",
			"{{phone}}": data.phone || "",
			"{{bookingReference}}": data.bookingReference || data.id || "",
			"{{flightNumber}}": data.flightNumber || "",
			"{{departureDate}}": data.departureDate || "",
			"{{returnDate}}": data.returnDate || "",
			"{{departureCity}}": data.departureCity || "",
			"{{arrivalCity}}": data.arrivalCity || "",
			"{{passengers}}": data.passengers || "1",
			"{{totalAmount}}": data.totalAmount || "",
			"{{currency}}": data.currency || "USD",
			"{{airline}}": data.airline || "",
			"{{seatClass}}": data.seatClass || data.class || "",
			"{{departureTime}}": data.departureTime || "",
			"{{arrivalTime}}": data.arrivalTime || "",
			"{{gate}}": data.gate || "",
			"{{terminal}}": data.terminal || "",
			"{{checkInTime}}": data.checkInTime || "",
			"{{baggage}}": data.baggage || "",
			"{{companyName}}": "Flight CRM Pro", // Company branding
			"{{supportEmail}}": "support@flightcrm.com",
			"{{supportPhone}}": "+1 (555) 123-4567",
			"{{date}}": new Date().toLocaleDateString(),
			"{{time}}": new Date().toLocaleTimeString(),
		};

		// Process each placeholder
		Object.entries(placeholders).forEach(([placeholder, value]) => {
			const regex = new RegExp(placeholder.replace(/[{}]/g, "\\$&"), "g");
			processedContent = processedContent.replace(regex, value || "");
		});

		return processedContent;
	};	// Process HTML content to make it CKEditor-friendly
	const processHTMLForEditor = (htmlContent) => {
		if (!htmlContent) return htmlContent;

		console.log('=== EMAIL COMPOSER DEBUG ===');
		console.log('Processing HTML for editor, length:', htmlContent.length);
		console.log('First 300 characters:', htmlContent.substring(0, 300));
		console.log('Contains <table>:', htmlContent.includes('<table'));
		console.log('Contains <tbody>:', htmlContent.includes('<tbody>'));
		console.log('Contains <tr>:', htmlContent.includes('<tr>'));
		
		try {
			// Create a temporary container to process the HTML
			const tempDiv = document.createElement('div');
			tempDiv.innerHTML = htmlContent;
			
			// Check if content has table structures
			const tables = tempDiv.querySelectorAll('table');
			console.log('Found tables count:', tables.length);
			
			if (tables.length === 0) {
				console.log('No tables found, adding basic structure');
				// If no tables found, add some basic structure for editing
				return `
					<h2>Email Content</h2>
					<p>Dear Valued Customer,</p>
					${htmlContent}
					<p>Thank you for choosing our services.</p>
				`;
			}
			
			// Process all tables to ensure CKEditor compatibility
			tables.forEach((table, index) => {
				console.log(`Processing table ${index + 1}:`);
				console.log('- Original HTML length:', table.outerHTML.length);
				console.log('- Has tbody:', !!table.querySelector('tbody'));
				console.log('- Row count:', table.querySelectorAll('tr').length);
				console.log('- Cell count:', table.querySelectorAll('td, th').length);
				
				// Ensure table has proper CKEditor-friendly styling
				table.style.width = '100%';
				table.style.borderCollapse = 'collapse';
				table.style.border = '1px solid #d1d5db';
				table.style.margin = '15px 0';
				table.style.backgroundColor = '#ffffff';
				
				// Set table class for CKEditor
				table.className = 'ck-table';
				
				// Process all cells (td and th)
				const cells = table.querySelectorAll('td, th');
				console.log(`- Processing ${cells.length} cells`);
				
				cells.forEach((cell, cellIndex) => {
					// Log cell content for debugging
					if (cellIndex < 5) { // Log first 5 cells only
						console.log(`  Cell ${cellIndex}: "${cell.textContent.substring(0, 50)}"`);
					}
					
					// Ensure cells have content (prevent empty cells that CKEditor can't handle)
					if (!cell.textContent.trim()) {
						cell.innerHTML = '&nbsp;';
						console.log(`  Cell ${cellIndex}: Added &nbsp; to empty cell`);
					}
					
					// Set consistent cell styling for CKEditor
					cell.style.padding = '12px';
					cell.style.border = '1px solid #d1d5db';
					cell.style.textAlign = cell.style.textAlign || 'left';
					cell.style.verticalAlign = 'top';
					
					// Ensure text is visible in CKEditor (override any problematic colors)
					if (cell.tagName === 'TH') {
						cell.style.backgroundColor = '#f9fafb';
						cell.style.color = '#111827';
						cell.style.fontWeight = 'bold';
					} else {
						cell.style.backgroundColor = '#ffffff';
						cell.style.color = '#374151';
					}
				});
				
				// Ensure table has proper structure for CKEditor
				if (!table.querySelector('tbody') && table.querySelector('tr')) {
					console.log(`- Table ${index + 1}: Adding tbody wrapper`);
					// Wrap loose rows in tbody
					const tbody = document.createElement('tbody');
					const rows = table.querySelectorAll('tr');
					rows.forEach(row => {
						if (row.parentNode === table) {
							tbody.appendChild(row);
						}
					});
					table.appendChild(tbody);
				}
			});
			
			// Process other elements to ensure CKEditor compatibility
			const allElements = tempDiv.querySelectorAll('*');
			let colorChanges = 0;
			let bgChanges = 0;
			
			allElements.forEach(element => {
				// Remove any problematic style attributes that might cause issues
				if (element.style.color && (
					element.style.color.includes('#d1d5db') || 
					element.style.color.includes('#ffffff') ||
					element.style.color.includes('#fbbf24')
				)) {
					element.style.color = '#374151'; // Use dark text for readability
					colorChanges++;
				}
				
				// Ensure backgrounds are CKEditor-friendly
				if (element.style.backgroundColor && (
					element.style.backgroundColor.includes('#374151') ||
					element.style.backgroundColor.includes('#0f172a')
				)) {
					element.style.backgroundColor = '#ffffff';
					bgChanges++;
				}
			});
			
			console.log('Processing completed:');
			console.log('- Tables processed:', tables.length);
			console.log('- Color changes:', colorChanges);
			console.log('- Background changes:', bgChanges);
			console.log('- Final HTML length:', tempDiv.innerHTML.length);
			console.log('=== END DEBUG ===');
			
			return tempDiv.innerHTML;
			
		} catch (error) {
			console.error('Error processing HTML for editor:', error);
			// Return a more comprehensive fallback template
			return `
				<h2>Flight Booking Confirmation</h2>
				<p>Dear Valued Customer,</p>
				<p>Thank you for your booking with us!</p>
				
				<h3>Booking Details</h3>
				<table style="width: 100%; border-collapse: collapse; margin: 15px 0; border: 1px solid #d1d5db;">
					<tbody>
						<tr>
							<td style="padding: 12px; border: 1px solid #d1d5db; font-weight: bold; background-color: #f9fafb;">
								Booking Reference:
							</td>
							<td style="padding: 12px; border: 1px solid #d1d5db; background-color: #ffffff;">
								ABC123
							</td>
						</tr>
						<tr>
							<td style="padding: 12px; border: 1px solid #d1d5db; font-weight: bold; background-color: #f9fafb;">
								Total Amount:
							</td>
							<td style="padding: 12px; border: 1px solid #d1d5db; background-color: #ffffff;">
								$550.00 USD
							</td>
						</tr>
					</tbody>
				</table>
				
				<p>Please contact us if you have any questions.</p>
			`;
		}
	};// CKEditor configuration with GPL license and comprehensive features
	const editorConfiguration = {
		licenseKey: "GPL", // Using GPL license
		toolbar: {
			items: [
				"heading",
				"|",
				"fontSize",
				"fontFamily",
				"fontColor",
				"fontBackgroundColor",
				"|",
				"bold",
				"italic",
				"underline",
				"strikethrough",
				"|",
				"alignment",
				"|",
				"numberedList",
				"bulletedList",
				"|",
				"outdent",
				"indent",
				"|",
				"insertTable",
				"tableColumn",
				"tableRow",
				"mergeTableCells",
				"|",
				"link",
				"imageInsert",
				"mediaEmbed",
				"|",
				"blockQuote",
				"codeBlock",
				"|",
				"horizontalLine",
				"|",
				"undo",
				"redo",
			],
			shouldNotGroupWhenFull: true,
		},
		language: "en",
		image: {
			toolbar: [
				"imageTextAlternative",
				"imageStyle:inline",
				"imageStyle:block",
				"imageStyle:side",
				"linkImage",
			],
		},
		table: {
			contentToolbar: [
				"tableColumn",
				"tableRow",
				"mergeTableCells",
				"tableCellProperties",
				"tableProperties",
			],
		},
		fontSize: {
			options: [
				9,
				10,
				11,
				12,
				"default",
				14,
				16,
				18,
				20,
				22,
				24,
				26,
				28,
				36,
				48,
				72,
			],
		},
		fontFamily: {
			options: [
				"default",
				"Arial, Helvetica, sans-serif",
				"Courier New, Courier, monospace",
				"Georgia, serif",
				"Lucida Sans Unicode, Lucida Grande, sans-serif",
				"Tahoma, Geneva, sans-serif",
				"Times New Roman, Times, serif",
				"Trebuchet MS, Helvetica, sans-serif",
				"Verdana, Geneva, sans-serif",
			],
		},
		fontColor: {
			colors: [
				{ color: "hsl(0, 0%, 0%)", label: "Black" },
				{ color: "hsl(0, 0%, 30%)", label: "Dim grey" },
				{ color: "hsl(0, 0%, 60%)", label: "Grey" },
				{ color: "hsl(0, 0%, 90%)", label: "Light grey" },
				{ color: "hsl(0, 0%, 100%)", label: "White", hasBorder: true },
				{ color: "hsl(0, 75%, 60%)", label: "Red" },
				{ color: "hsl(30, 75%, 60%)", label: "Orange" },
				{ color: "hsl(60, 75%, 60%)", label: "Yellow" },
				{ color: "hsl(90, 75%, 60%)", label: "Light green" },
				{ color: "hsl(120, 75%, 60%)", label: "Green" },
				{ color: "hsl(150, 75%, 60%)", label: "Aquamarine" },
				{ color: "hsl(180, 75%, 60%)", label: "Turquoise" },
				{ color: "hsl(210, 75%, 60%)", label: "Light blue" },
				{ color: "hsl(240, 75%, 60%)", label: "Blue" },
				{ color: "hsl(270, 75%, 60%)", label: "Purple" },
			],
		},
		link: {
			decorators: {
				addTargetToExternalLinks: true,
				defaultProtocol: "https://",
				toggleDownloadable: {
					mode: "manual",
					label: "Downloadable",
					attributes: {
						download: "file",
					},
				},
			},
		},		htmlSupport: {
			allow: [
				{
					name: /^.*$/,
					attributes: true,
					classes: true,
					styles: true
				}
			],
			disallow: [
				{
					attributes: [
						{ key: /^on(.*)/i, value: true }
					]
				}
			]
		},
		table: {
			contentToolbar: [
				"tableColumn",
				"tableRow",
				"mergeTableCells",
				"tableCellProperties",
				"tableProperties",
			],
			tableProperties: {
				borderColors: [
					{ color: "hsl(0, 0%, 0%)", label: "Black" },
					{ color: "hsl(0, 0%, 30%)", label: "Dim grey" },
					{ color: "hsl(0, 0%, 60%)", label: "Grey" },
					{ color: "hsl(0, 0%, 90%)", label: "Light grey" },
					{ color: "hsl(0, 0%, 100%)", label: "White", hasBorder: true },
					{ color: "hsl(0, 75%, 60%)", label: "Red" },
					{ color: "hsl(30, 75%, 60%)", label: "Orange" },
					{ color: "hsl(60, 75%, 60%)", label: "Yellow" },
					{ color: "hsl(90, 75%, 60%)", label: "Light green" },
					{ color: "hsl(120, 75%, 60%)", label: "Green" },
					{ color: "hsl(150, 75%, 60%)", label: "Aquamarine" },
					{ color: "hsl(180, 75%, 60%)", label: "Turquoise" },
					{ color: "hsl(210, 75%, 60%)", label: "Light blue" },
					{ color: "hsl(240, 75%, 60%)", label: "Blue" },
					{ color: "hsl(270, 75%, 60%)", label: "Purple" },
				],
				backgroundColors: [
					{ color: "hsl(0, 0%, 0%)", label: "Black" },
					{ color: "hsl(0, 0%, 30%)", label: "Dim grey" },
					{ color: "hsl(0, 0%, 60%)", label: "Grey" },
					{ color: "hsl(0, 0%, 90%)", label: "Light grey" },
					{ color: "hsl(0, 0%, 100%)", label: "White", hasBorder: true },
					{ color: "hsl(0, 75%, 60%)", label: "Red" },
					{ color: "hsl(30, 75%, 60%)", label: "Orange" },
					{ color: "hsl(60, 75%, 60%)", label: "Yellow" },
					{ color: "hsl(90, 75%, 60%)", label: "Light green" },
					{ color: "hsl(120, 75%, 60%)", label: "Green" },
					{ color: "hsl(150, 75%, 60%)", label: "Aquamarine" },
					{ color: "hsl(180, 75%, 60%)", label: "Turquoise" },
					{ color: "hsl(210, 75%, 60%)", label: "Light blue" },
					{ color: "hsl(240, 75%, 60%)", label: "Blue" },
					{ color: "hsl(270, 75%, 60%)", label: "Purple" },
				],
			},
			tableCellProperties: {
				borderColors: [
					{ color: "hsl(0, 0%, 0%)", label: "Black" },
					{ color: "hsl(0, 0%, 30%)", label: "Dim grey" },
					{ color: "hsl(0, 0%, 60%)", label: "Grey" },
					{ color: "hsl(0, 0%, 90%)", label: "Light grey" },
					{ color: "hsl(0, 0%, 100%)", label: "White", hasBorder: true },
					{ color: "hsl(0, 75%, 60%)", label: "Red" },
					{ color: "hsl(30, 75%, 60%)", label: "Orange" },
					{ color: "hsl(60, 75%, 60%)", label: "Yellow" },
					{ color: "hsl(90, 75%, 60%)", label: "Light green" },
					{ color: "hsl(120, 75%, 60%)", label: "Green" },
					{ color: "hsl(150, 75%, 60%)", label: "Aquamarine" },
					{ color: "hsl(180, 75%, 60%)", label: "Turquoise" },
					{ color: "hsl(210, 75%, 60%)", label: "Light blue" },
					{ color: "hsl(240, 75%, 60%)", label: "Blue" },
					{ color: "hsl(270, 75%, 60%)", label: "Purple" },
				],
				backgroundColors: [
					{ color: "hsl(0, 0%, 0%)", label: "Black" },
					{ color: "hsl(0, 0%, 30%)", label: "Dim grey" },
					{ color: "hsl(0, 0%, 60%)", label: "Grey" },
					{ color: "hsl(0, 0%, 90%)", label: "Light grey" },
					{ color: "hsl(0, 0%, 100%)", label: "White", hasBorder: true },
					{ color: "hsl(0, 75%, 60%)", label: "Red" },
					{ color: "hsl(30, 75%, 60%)", label: "Orange" },
					{ color: "hsl(60, 75%, 60%)", label: "Yellow" },
					{ color: "hsl(90, 75%, 60%)", label: "Light green" },
					{ color: "hsl(120, 75%, 60%)", label: "Green" },
					{ color: "hsl(150, 75%, 60%)", label: "Aquamarine" },
					{ color: "hsl(180, 75%, 60%)", label: "Turquoise" },
					{ color: "hsl(210, 75%, 60%)", label: "Light blue" },
					{ color: "hsl(240, 75%, 60%)", label: "Blue" },
					{ color: "hsl(270, 75%, 60%)", label: "Purple" },
				],
			},
		},
		placeholder: "Start composing your email content here...",
		removePlugins: [
			"CKFinderUploadAdapter",
			"CKFinder",
			"EasyImage",
			"RealTimeCollaborativeComments",
			"RealTimeCollaborativeTrackChanges",
			"RealTimeCollaborativeRevisionHistory",
			"PresenceList",
			"Comments",
			"TrackChanges",
			"TrackChangesData",
			"RevisionHistory",
			"Pagination",
			"WProofreader",
			"MathType",
		],
	};	// Initialize email with template data and process placeholders
	useEffect(() => {
		if (bookingData) {
			const subject = generateEmailSubject(bookingData);
			const bodyHTML = generateEmailHTML(transactionType, bookingData);

			// Extract content from HTML (remove DOCTYPE, html, head tags but keep body content)
			const tempDiv = document.createElement("div");
			tempDiv.innerHTML = bodyHTML;
			const bodyContent = tempDiv.querySelector("body")?.innerHTML || bodyHTML;

			// Process placeholders with booking data
			let processedContent = processPlaceholders(bodyContent, bookingData);
			
			// Process HTML to make it CKEditor-friendly
			processedContent = processHTMLForEditor(processedContent);

			setEmailData({
				to: bookingData.email || "",
				subject: subject,
				body: processedContent,
				attachments: [],
			});

			setOriginalTemplate(processedContent);
			setPlaceholderData(bookingData);
		}
	}, [bookingData, transactionType]);// Handle CKEditor ready event
	const handleEditorReady = (editor) => {
		editorRef.current = editor;

		// Configure image upload handling
		editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
			return {
				upload: () => {
					return loader.file.then((file) => {
						return new Promise((resolve, reject) => {
							const reader = new FileReader();
							reader.onload = () => {
								resolve({
									default: reader.result,
								});
							};
							reader.onerror = reject;
							reader.readAsDataURL(file);
						});
					});
				},
				abort: () => {},
			};
		};
	};

	// Handle rich text editor changes
	const handleEditorChange = (event, editor) => {
		const data = editor.getData();
		setEmailData((prev) => ({ ...prev, body: data }));
	};
	// Reset to original template with placeholders re-processed
	const resetToTemplate = () => {
		if (bookingData) {
			const bodyHTML = generateEmailHTML(transactionType, bookingData);
			const tempDiv = document.createElement("div");
			tempDiv.innerHTML = bodyHTML;
			const bodyContent = tempDiv.querySelector("body")?.innerHTML || bodyHTML;
			let processedContent = processPlaceholders(bodyContent, bookingData);
			
			// Process HTML to make it CKEditor-friendly
			processedContent = processHTMLForEditor(processedContent);

			setEmailData((prev) => ({
				...prev,
				body: processedContent,
			}));
			setOriginalTemplate(processedContent);
		}
	};// Handle sending email
	const handleSendEmail = async () => {
		if (!emailData.to || !emailData.subject || !emailData.body) {
			alert("Please fill in all required fields");
			return;
		}

		setIsLoading(true);
		try {
			// Create full HTML document for email
			const fullEmailHTML = `
				<!DOCTYPE html>
				<html>
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>${emailData.subject}</title>
				</head>
				<body>
					${emailData.body}
				</body>
				</html>
			`;

			const emailPayload = {
				...emailData,
				body: fullEmailHTML,
			};

			// Send email via API
			const response = await fetch("/api/emails/send", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(emailPayload),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const result = await response.json();

			// Log success for now (callback info could be used for future enhancements)
			console.log("Email sent successfully:", result);

			alert("Email sent successfully!");

			// Navigate back after successful send
			navigate(-1);
		} catch (error) {
			console.error("Error sending email:", error);
			alert("Failed to send email. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	// Handle back navigation
	const handleBack = () => {
		navigate(-1);
	};
	// Preview component
	const EmailPreview = () => (
		<div className="bg-white text-black p-4 rounded border max-h-96 overflow-y-auto">
			<div className="mb-4 text-sm">
				<div className="font-semibold text-gray-700">To: {emailData.to}</div>
				<div className="font-semibold text-gray-700">
					Subject: {emailData.subject}
				</div>
			</div>
			<div className="border-t pt-4">
				<div
					className="prose max-w-none"
					dangerouslySetInnerHTML={{ __html: emailData.body }}
				/>
			</div>
		</div>
	);

	return (
		<div className="min-h-screen bg-gray-900 text-white email-composer-page">
			<div className="container mx-auto px-4 py-6">
				{/* Header */}
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center gap-4">
						<button
							onClick={handleBack}
							className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
							title="Go back"
						>
							<ArrowLeft className="w-5 h-5" />
						</button>
						<div>
							<h1 className="text-2xl font-bold">Compose Email</h1>
							<p className="text-gray-400">
								Create and send professional emails
							</p>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Main Content */}
					<div className="lg:col-span-3">
						<div className="space-y-6">
							{/* Email Fields */}
							<div className="bg-gray-800 rounded-lg p-6">
								<h2 className="text-lg font-semibold mb-4">Email Details</h2>
								<div className="space-y-4">
									{/* To Field */}
									<div>
										<label className="block text-sm font-medium text-gray-300 mb-2">
											To
										</label>
										<input
											type="email"
											value={emailData.to}
											onChange={(e) =>
												setEmailData((prev) => ({
													...prev,
													to: e.target.value,
												}))
											}
											className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
											placeholder="recipient@example.com"
										/>
									</div>

									{/* Subject Field */}
									<div>
										<label className="block text-sm font-medium text-gray-300 mb-2">
											Subject
										</label>
										<input
											type="text"
											value={emailData.subject}
											onChange={(e) =>
												setEmailData((prev) => ({
													...prev,
													subject: e.target.value,
												}))
											}
											className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
											placeholder="Email subject"
										/>
									</div>
								</div>
							</div>

							{/* Rich Text Editor */}
							<div className="rounded-lg overflow-hidden">
								{/* Editor Header */}
								<div className=" border-b border-gray-300 p-4 flex justify-between items-center">
									<button
										onClick={resetToTemplate}
										className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2 transition-colors"
										title="Reset to original template"
									>
										<RotateCcw className="w-4 h-4" />
										Reset Template
									</button>
									{/* Action Buttons */}
									<div className="flex gap-4">
										<button
											onClick={handleSendEmail}
											disabled={isLoading}
											className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors font-medium"
										>
											<Send className="w-5 h-5" />
											{isLoading ? "Sending..." : "Send Email"}
										</button>

										<button
											onClick={() => setShowPreview(!showPreview)}
											className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2 transition-colors font-medium"
										>
											<Eye className="w-5 h-5" />
											{showPreview ? "Hide Preview" : "Preview"}
										</button>

										<button
											onClick={handleBack}
											className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2 transition-colors font-medium"
										>
											<X className="w-5 h-5" />
											Cancel
										</button>
									</div>
								</div>

								{/* CKEditor */}
								<div
									className="p-4"
									style={{ minHeight: "500px", backgroundColor: "#1a202c" }}
								>
									<CKEditor
										editor={ClassicEditor}
										config={editorConfiguration}
										data={emailData.body}
										onReady={handleEditorReady}
										onChange={handleEditorChange}
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Sidebar */}
					<div className="lg:col-span-1">
						{/* Preview Section */}
						{showPreview && (
							<div className="bg-gray-800 rounded-lg p-6">
								<h3 className="text-lg font-semibold mb-4">Email Preview</h3>
								<EmailPreview />
							</div>
						)}
					</div>
				</div>{" "}
			</div>
		</div>
	);
};

export default EmailComposer;
