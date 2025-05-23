import { useAuthContext } from "../AuthProvider";

export const useAuth = () => {
	const { token, user, login, logout, isAuthenticated } = useAuthContext();
	return { token, user, login, logout, isAuthenticated };
};
