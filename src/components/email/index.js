// Main exports for the email system
export { default as EmailComposer } from "./EmailComposer";
export { default as EmailButton } from "./EmailButton";
export { default as TemplateSelector } from "./TemplateSelector";

// Utility exports
export {
	generateEmailTemplate,
	replaceVariables,
	formatTransactionType,
	formatCurrency,
	formatDate,
	htmlToPlainText,
} from "./utils/templateGenerator";

// Constants exports
export {
	VARIABLE_DEFINITIONS,
	EMAIL_TEMPLATE_TYPES,
	DEFAULT_EMAIL_TEMPLATES,
} from "./constants/emailVariables";
