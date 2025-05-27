import { useAuthContext } from "../AuthProvider";

export const useAuth = () => {
	const { user, login, logout, isAuthenticated } = useAuthContext();
	return { user, login, logout, isAuthenticated };
};
