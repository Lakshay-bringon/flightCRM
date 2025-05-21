import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
	LayoutDashboard,
	TicketsPlane,
	Search,
	Users,
	UserCircle,
	FileInput,
	PieChart,
	Settings,
	Clock,
	Phone,
} from "lucide-react";
import { useUser } from "../context/UserContext";
import { ROLES, hasPermission } from "../utils/auth";

function NavLink({ to, children, iconOnly }) {
	const location = useLocation();
	// Highlight if current path starts with 'to' (for subroutes)
	const isActive =
		location.pathname === to || location.pathname.startsWith(to + "/");

	const childrenWithProps = React.Children.map(children, (child, idx) => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child, {
				className: `w-5 h-5 ${
					isActive ? "text-blue-400" : "text-gray-400 group-hover:text-blue-400"
				} ${iconOnly ? "" : "mr-2"}`,
			});
		}
		if (!iconOnly && typeof child === "string") {
			return child;
		}
		return null;
	});

	return (
		<Link
			to={to}
			className={`flex items-center ${
				iconOnly ? "justify-center" : ""
			} px-3 py-2 text-sm rounded-lg transition-all duration-200 group
        ${
					isActive
						? "bg-gray-700 text-white shadow-md border border-gray-600"
						: "text-gray-300 hover:bg-gray-700/50 hover:text-white"
				}`}
		>
			{childrenWithProps}
		</Link>
	);
}

function Navigation({ iconOnly = false }) {
	const { user } = useUser();
	const isAgent = user?.role === ROLES.AGENT;
	const isLeader = user?.role === ROLES.LEADER;
	const isAdmin = user?.role === ROLES.ADMIN;

	const canManageIP = !isAgent && !isLeader;

	return (
		<nav className="mt-2 h-[calc(100vh-152px)] overflow-y-auto">
			<div className="px-2 space-y-1">
				{" "}
				<NavLink to="/" iconOnly={iconOnly}>
					<LayoutDashboard /> DASHBOARD
				</NavLink>
				<NavLink to="/manage-bookings" iconOnly={iconOnly}>
					<TicketsPlane />
					MANAGE BOOKINGS
				</NavLink>
				<NavLink to="/find-bookings" iconOnly={iconOnly}>
					<Search />
					FIND BOOKINGS
				</NavLink>
				<NavLink to="/manage-users" iconOnly={iconOnly}>
					<UserCircle />
					MANAGE USERS
				</NavLink>
				{isAdmin && (
					<NavLink to="/manage-data" iconOnly={iconOnly}>
						<FileInput />
						MANAGE DATA
					</NavLink>
				)}
				<NavLink to="/revenue" iconOnly={iconOnly}>
					<PieChart />
					REVENUE
				</NavLink>
				{canManageIP && (
					<NavLink to="/ip-setting" iconOnly={iconOnly}>
						<Settings />
						IP SETTING
					</NavLink>
				)}
			</div>
		</nav>
	);
}

export default Navigation;
