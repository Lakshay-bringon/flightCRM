import { useAuth } from "./useAuth";

export const useHasRole = (role) => {
	const { user } = useAuth();
	return user?.role === role;
};

export const useHasAnyRole = (roles = []) => {
	const { user } = useAuth();
	return roles.includes(user?.role);
};
