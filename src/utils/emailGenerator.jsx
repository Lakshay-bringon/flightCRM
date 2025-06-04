import { renderToStaticMarkup } from "react-dom/server";
import { DynamicEmailTemplate } from "../features/booking/emailTemplates";

export const generateEmailSubject = (bookingData) => {
	const { airline_name = "", pnr = "" } = bookingData;
	if (airline_name && pnr) {
		return `${airline_name.toUpperCase()} RESERVATION CONFIRMATION – ${pnr}`;
	} else if (pnr) {
		return `RESERVATION CONFIRMATION – ${pnr}`;
	} else if (airline_name) {
		return `${airline_name.toUpperCase()} RESERVATION CONFIRMATION`;
	}
	return "RESERVATION CONFIRMATION";
};

export const generateEmailHTML = (transactionType, formData, emailType) => {
	const htmlString = renderToStaticMarkup(
		<DynamicEmailTemplate
			transactionType={transactionType}
			formData={formData}
			emailType={emailType}
		/>
	);

	// Ensure the HTML string is properly escaped for rendering
	return `<!DOCTYPE html><html><head><meta charset='UTF-8'></head><body>${htmlString}</body></html>`;
};
