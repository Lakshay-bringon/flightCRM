import { useAuthContext } from "../AuthProvider";

export const useAuth = () => {
	const { user, login, logout, forgetPassword, isAuthenticated } =
		useAuthContext();
	return { user, login, logout, forgetPassword, isAuthenticated };
};
