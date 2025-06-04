import React from "react";

const EmailCardDecline = ({
	agent_name = created_by,
	amount = "XXX.XX",
	currency = "USD",
}) => {
	return (
		<div
			style={{
				fontFamily:
					"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
				background: "#0f172a",
				color: "#d1d5db",
				lineHeight: 1.6,
				padding: 20,
				margin: 0,
				boxSizing: "border-box",
			}}
		>
			<div
				style={{
					maxWidth: 896,
					margin: "0 auto",
					background: "rgba(31, 41, 55, 0.9)",
					border: "1px solid #374151",
					borderRadius: 12,
					boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
					overflow: "hidden",
				}}
			>
				<div style={{ padding: 24 }}>
					{/* Header */}
					<div style={{ textAlign: "center", marginBottom: 24 }}>
						<h1
							style={{
								color: "#ffffff",
								fontSize: 20,
								fontWeight: 700,
								lineHeight: 1.4,
								margin: 0,
							}}
						>
							CARD DECLINE NOTICE
						</h1>
					</div>
					{/* Content */}
					<div
						style={{
							background: "#1f2937",
							border: "1px solid #374151",
							borderRadius: 8,
							padding: 24,
							marginBottom: 24,
						}}
					>
						<p style={{ lineHeight: 1.75, marginBottom: 16 }}>
							<strong style={{ color: "#f59e0b" }}>Attention!!</strong>
						</p>
						<p style={{ lineHeight: 1.75, marginBottom: 16 }}>
							Your reservation is{" "}
							<span style={{ color: "#ef4444", fontWeight: 600 }}>
								still pending
							</span>{" "}
							due to{" "}
							<span style={{ color: "#ef4444", fontWeight: 600 }}>
								card decline
							</span>
							.
						</p>
						<p style={{ lineHeight: 1.75, marginBottom: 16 }}>
							Please call your bank to approve the payment and let us know once
							done so that we can process your transaction of amount{" "}
							<span style={{ color: "#10b981", fontWeight: 600 }}>
								{amount} {currency}
							</span>
							.
						</p>
						<p style={{ lineHeight: 1.75, marginBottom: 0 }}>
							Thanks
							<br />
							<span style={{ color: "#60a5fa", fontWeight: 600 }}>
								{agent_name}
							</span>
						</p>
					</div>
					{/* Footer */}
					<div
						style={{
							textAlign: "center",
							padding: 24,
							borderTop: "1px solid #374151",
							background: "rgba(17, 24, 39, 0.5)",
							color: "#6b7280",
							fontSize: 14,
						}}
					>
						For any questions, call us at{" "}
						<span style={{ color: "#f59e0b" }}>+1-877-413-0030</span> or email{" "}
						<span style={{ color: "#f59e0b" }}>
							booking@skylinetravelsllc.com
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmailCardDecline;
