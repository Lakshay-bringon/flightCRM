import React from "react";
import PropTypes from "prop-types";
import { renderToStaticMarkup } from "react-dom/server";
import EmailNewBooking from "./components/EmailNewBooking";
import EmailUpgrade from "./components/EmailUpgrade";
import EmailExchange from "./components/EmailExchange";
import EmailSeatAssignment from "./components/EmailSeatAssignment";
import EmailCancelForRefund from "./components/EmailCancelForRefund";
import EmailCancelForFutureCredit from "./components/EmailCancelForFutureCredit";
import EmailCardDecline from "./components/EmailCardDecline";
import { TRANSACTION_TYPES } from "../../../constants";

const DynamicEmailTemplate = ({ transactionType, formData, emailType }) => {
	const renderTemplate = () => {
		if (emailType === "declined") {
			return <EmailCardDecline {...formData} />;
		} else {
			switch (transactionType) {
				case TRANSACTION_TYPES.NEW_BOOKING:
					return <EmailNewBooking bookingData={formData} />;
				case TRANSACTION_TYPES.UPGRADE:
					return <EmailUpgrade bookingData={formData} />;
				case TRANSACTION_TYPES.EXCHANGE:
					return <EmailExchange bookingData={formData} />;
				case TRANSACTION_TYPES.SEAT_ASSIGNMENT:
					return <EmailSeatAssignment bookingData={formData} />;
				case TRANSACTION_TYPES.CANCEL_FOR_REFUND:
					return <EmailCancelForRefund bookingData={formData} />;
				case TRANSACTION_TYPES.CANCEL_FOR_FUTURE_CREDIT:
					return <EmailCancelForFutureCredit bookingData={formData} />;
				default:
					return <p>Invalid transaction type</p>;
			}
		}
	};

	return <div>{renderTemplate()}</div>;
};

DynamicEmailTemplate.propTypes = {
	transactionType: PropTypes.string.isRequired,
	formData: PropTypes.object.isRequired,
};

export const generateEmailHTML = (transaction_type, formData) => {
	return renderToStaticMarkup(
		<DynamicEmailTemplate
			transactionType={transaction_type}
			formData={formData}
		/>
	);
};

export default DynamicEmailTemplate;
