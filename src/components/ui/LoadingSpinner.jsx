import React from "react";

function LoadingSpinner({ label = "Loading..." }) {
	return (
		<div className="fixed inset-0 z-50 flex flex-col items-center justify-center min-h-screen w-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
			<div className="relative flex items-center justify-center">
				<span className="block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
				<span className="absolute w-6 h-6 bg-blue-500 rounded-full opacity-20"></span>
			</div>
			<span className="mt-4 text-base text-gray-300 font-medium tracking-wide animate-pulse">
				{label}
			</span>
		</div>
	);
}

export default LoadingSpinner;
