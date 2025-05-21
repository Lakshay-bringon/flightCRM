import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { ChevronDown, ChevronUp } from "lucide-react";

const DisclaimerSection = () => {
	return (
		<div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 shadow-sm my-6">
			<div className="flex items-start gap-3">
				<div className="text-yellow-600 mt-1">
					<AlertTriangle className="w-6 h-6" />
				</div>
				<div className="text-sm text-gray-800 leading-relaxed">
					<p className="font-semibold text-yellow-700 mb-2">Disclaimer</p>
					<p>
						SkylineTravels LLC is an independent travel agency with no
						third-party association. We shall not be associated with or
						considered as an airline or an ally of any of the airlines or
						brands. SkylineTravels is shown on your bank account details in most
						cases. However, sometimes we have to split the payment with the
						airline. SkylineTravels and the airline or another company of that
						organization both will appear as recipients on your account. All the
						service fee and convenience fee is non-refundable.
					</p>
				</div>
			</div>
		</div>
	);
};

const faqs = [
	{
		title: "📌 Important Information",
		content: (
			<>
				<p>
					• Passenger names must match passport (International) or
					government-approved ID (Domestic).
				</p>
				<p>
					• Ensure all travel documents, including passports and visas, are
					issued and presented at travel.
				</p>
				<p>
					• Arrive at the airport 3 hours early for international flights and 2
					hours early for domestic.
				</p>
				<p>• Confirm international flights 72 hours before departure.</p>
				<p>
					• Check all itinerary details: names, dates, times, cities, stopovers,
					and connections.
				</p>
				<p>
					• If your credit card is declined, call us immediately at
					+1-877-413-0030.
				</p>
				<p>
					• One adult must accompany children under 18. Children 12+ are priced
					as adults.
				</p>
			</>
		),
	},
	{
		title: "🔄 Changes",
		content: (
			<p>
				Call us at +1-877-413-0030 to make any kind of changes to the itinerary.
				Airline penalties, fare differences, and service fees will apply.
			</p>
		),
	},
	{
		title: "❌ Cancellations",
		content: (
			<p>
				Call us at +1-877-413-0030 at least 3–4 hours before departure to avoid
				a no-show. You may be eligible for a refund or travel credit (if allowed
				by the airline). Cancellations must be done over the phone.
			</p>
		),
	},
	{
		title: "💺 Seat Assignments",
		content: (
			<p>
				Most airlines charge for advance seat selection, or allow it only at
				check-in. Refer to the airline’s policies or call us at +1-877-413-0030
				for help.
			</p>
		),
	},
	{
		title: "🧳 Baggage Policy",
		content: (
			<p>
				Baggage allowance may be restricted. Additional fees may apply. Check
				with your airline or call us at +1-877-413-0030 for details.
			</p>
		),
	},
	{
		title: "🛂 Visa / Travel Documents",
		content: (
			<p>
				Verify all travel documents (entry/transit visas). We are not
				responsible for denied entry. Please consult embassies or TSA for
				up-to-date information.
			</p>
		),
	},
	{
		title: "🛫 Check-In",
		content: (
			<p>
				Arrive 3 hours early for international flights, 2 hours early for
				domestic. For latest procedures, contact your airline or TSA.
			</p>
		),
	},
	{
		title: "📞 Still have questions?",
		content: (
			<p>
				Call us at +1-877-413-0030 (available 24/7) or email{" "}
				<a
					href="mailto:booking@skylinetravelsllc.com"
					className="text-blue-600 underline"
				>
					booking@skylinetravelsllc.com
				</a>
				. We appreciate your business and look forward to serving your future
				travel needs. ✈️
			</p>
		),
	},
];

const FAQAccordion = () => {
	const [openIndex, setOpenIndex] = useState(null);

	const toggle = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className="w-full max-w-3xl mx-auto my-10">
			<h2 className="text-2xl font-bold text-center mb-6">
				📖 Travel Information & FAQs
			</h2>
			<div className="space-y-4">
				{faqs.map((faq, index) => (
					<div
						key={index}
						className="border border-gray-200 rounded-lg shadow-sm bg-white"
					>
						<button
							onClick={() => toggle(index)}
							className="w-full flex items-center justify-between px-4 py-3 text-left text-gray-800 font-medium hover:bg-gray-100 transition"
						>
							<span>{faq.title}</span>
							{openIndex === index ? (
								<ChevronUp className="w-5 h-5" />
							) : (
								<ChevronDown className="w-5 h-5" />
							)}
						</button>
						{openIndex === index && (
							<div className="px-5 pb-4 pt-2 text-sm text-gray-700 space-y-2">
								{faq.content}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default function CommonInfo() {
	return (
		<div>
			<DisclaimerSection />
			<FAQAccordion />
		</div>
	);
}
