import { createContext, useContext, useState } from "react";
import { loginApi } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(() => localStorage.getItem("jwt_token"));
	const [user, setUser] = useState(() => {
		const stored = localStorage.getItem("user");
		return stored ? JSON.parse(stored) : null;
	});

	const login = async (email, password) => {
		const { user } = await loginApi(email, password);
		localStorage.setItem("jwt_token", token);
		localStorage.setItem("user", JSON.stringify(user));
		setToken(token);
		setUser(user);
	};

	const logout = () => {
		localStorage.removeItem("jwt_token");
		localStorage.removeItem("user");
		setToken(null);
		setUser(null);
	};

	// Map role_id to role string
	const ROLE_MAP = {
		1: "admin",
		2: "leader",
		3: "agent",
	};

	const parsedRoleId = user?.role_id ? Number(user.role_id) : undefined;
	const role = parsedRoleId ? ROLE_MAP[parsedRoleId] : undefined;

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				logout,
				isAuthenticated: !!user,
				role,
				role_id: parsedRoleId,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => useContext(AuthContext);
