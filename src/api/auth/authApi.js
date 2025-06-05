import API from "../axios";

export const loginApi = async (email, password) => {
	try {
		const res = await API.post("/login", { email, password });

		const { status, msg, data } = res.data;
		if (status !== 200 || !data) {
			throw new Error(msg || "Login failed");
		}
		// Destructure & alias `email` to `userEmail`, and `api_token` to `token`
		const {
			api_token: token,
			name,
			alies_name: alias,
			created_at,
			email: userEmail,
			id,
			leader_id,
			phone,
			role_id,
			status: userStatus,
		} = data;
		const user = {
			name,
			alias,
			created_at,
			email: userEmail,
			id,
			leader_id,
			phone,
			role_id,
			status: userStatus,
		};
		if (!user) {
			throw new Error("Invalid response from server");
		}
		return { user, token };
	} catch (err) {
		if (err.response) {
			throw new Error(err.response.data.message || "Login failed");
		} else if (err.request) {
			throw new Error("No response from server");
		} else {
			throw new Error("Login error: " + err.message);
		}
	}
};

export const changePasswordApi = async ({
	user_id,
	current_password,
	new_password,
	confirm_password,
	email,
	token,
}) => {
	try {
		const res = await API.post(
			"/changePassword",
			{
				user_id,
				current_password,
				new_password,
				confirm_password,
			},
			{
				headers: {
					// "X-Email-ID": email,
					// "X-Access-Key": token,
				},
			}
		);
		const { status, msg } = res.data;
		if (status !== 200) {
			throw new Error(msg || "Password change failed");
		}
		return msg || "Password changed successfully";
	} catch (err) {
		if (err.response) {
			throw new Error(
				err.response.data.msg ||
					err.response.data.message ||
					"Password change failed"
			);
		} else if (err.request) {
			throw new Error("No response from server");
		} else {
			throw new Error("Change password error: " + err.message);
		}
	}
};

export const forgetPasswordApi = async (email) => {
	try {
		// Email format validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			throw new Error("Invalid email format");
		}

		const res = await API.post("/forgetPassword", { email });

		const { status, msg, message } = res.data;
		if (status !== 200) {
			throw new Error(msg || message || "Password reset request failed");
		}

		return msg || message || "Password reset link sent to your email";
	} catch (err) {
		if (err.response) {
			throw new Error(
				err.response.data.msg ||
					err.response.data.message ||
					"Password reset request failed"
			);
		} else if (err.request) {
			throw new Error("No response from server");
		} else {
			throw new Error("Forget password error: " + err.message);
		}
	}
};
