import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";

function OtpScreen() {
	const [otp, setOtp] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const location = useLocation();
	const { updateUser } = useUser();
	// For demo, let's use a hardcoded OTP. In real app, fetch from backend or location.state
	const expectedOtp = "123456";
	const email = location.state?.email;
	const user = location.state?.user;

	const handleSubmit = (e) => {
		e.preventDefault();
		setError("");
		if (otp === expectedOtp) {
			// Only now update the user context
			if (user) updateUser(user);
			navigate("/");
		} else {
			setError("Invalid OTP. Redirecting to login...");
			setTimeout(() => {
				navigate("/login");
			}, 1500);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
			<div className="w-full max-w-md p-8 rounded-2xl bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700 shadow-xl">
				<div className="text-center mb-8">
					<h2 className="text-2xl font-bold text-white mb-2">
						OTP Verification
					</h2>
					<p className="text-gray-400 text-sm">
						Enter the OTP sent to your email{email ? ` (${email})` : ""}.
					</p>
				</div>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label className="block text-sm font-medium text-gray-400 mb-2">
							OTP
						</label>
						<input
							type="text"
							required
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
							className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none text-center tracking-widest text-lg"
							placeholder="Enter OTP"
							maxLength={6}
						/>
					</div>
					{error && (
						<div className="text-red-500 text-sm mt-2 text-center">{error}</div>
					)}
					<button
						type="submit"
						className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
					>
						Verify OTP
					</button>
				</form>
			</div>
		</div>
	);
}

export default OtpScreen;
