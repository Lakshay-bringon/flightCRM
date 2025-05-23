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
		const { token, user } = await loginApi(email, password);
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

	return (
		<AuthContext.Provider
			value={{ token, user, login, logout, isAuthenticated: !!token }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => useContext(AuthContext);
