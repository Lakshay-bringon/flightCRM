import { toast } from "react-hot-toast";

function flattenErrorMessages(error) {
	if (!error) return [];
	if (typeof error === "string") return [error];
	if (Array.isArray(error)) return error.flatMap(flattenErrorMessages);
	if (typeof error === "object") {
		return Object.values(error).flatMap(flattenErrorMessages);
	}
	return [String(error)];
}

function formatErrorMessage(error) {
	const messages = flattenErrorMessages(error);
	return messages.filter(Boolean).join(" ") || "Something went wrong.";
}

export function showPromiseToast(promise, messages = {}, toastOptions = {}) {
	const { loading = "Loading...", success = "Success!" } = messages;

	const defaultOptions = {
		style: { borderRadius: "8px", backgroundColor: "#1f2937", color: "#fff" },
		duration: 3000,
	};

	return toast.promise(
		promise,
		{
			loading,
			success,
			error: (err) => formatErrorMessage(err),
		},
		{ ...defaultOptions, ...toastOptions }
	);
}
