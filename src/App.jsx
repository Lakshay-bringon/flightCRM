import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useNavigate,
} from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "./auth/AuthProvider";
import { useAuth } from "./auth/hooks/useAuth";
import Dashboard from "./components/Dashboard";
import ManageBookings from "./components/ManageBookings";
import EmailPreviewPage from "./pages/EmailPreviewPage";
import FindBookings from "./features/booking/FindBookings";
import ManageUsers from "./features/user/ManageUsers";
import ManageData from "./features/data/ManageData";
import Revenue from "./components/Revenue";
import RevenueDetails from "./features/revenue/RevenueDetails";
import IPSetting from "./components/IPSetting";
import Sidebar from "./components/Sidebar";
import UserProfile from "./features/user/UserProfile";
import Login from "./pages/Login";
import ProfilePage from "./features/user/ProfilePage";
import BookingDetails from "./features/booking/BookingDetails";
import NewBooking from "./features/booking/components/NewBooking";
import Exchange from "./features/booking/components/Exchange";
import SeatAssignment from "./features/booking/components/SeatAssignment";
import Upgrade from "./features/booking/components/Upgrade";
import CancelForRefund from "./features/booking/components/CancelForRefund";
import CancelForFutureCredit from "./features/booking/components/CancelForFutureCredit";
import OtpScreen from "./pages/OtpScreen";

// Protected route wrapper component
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated } = useAuth();
	return isAuthenticated ? children : <Navigate to="/login" />;
};

function AppContent() {
	const [showProfileMenu, setShowProfileMenu] = useState(false);
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	const navigate = useNavigate();
	const handleSidebarToggle = () => setSidebarCollapsed((prev) => !prev);

	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/otp" element={<OtpScreen />} />
			<Route
				path="/*"
				element={
					<ProtectedRoute>
						<div className="min-w-full h-screen box-border bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
							<div className="flex w-full h-full">
								<Sidebar
									collapsed={sidebarCollapsed}
									onToggleCollapse={handleSidebarToggle}
								/>
								<div className={"flex-1 overflow-y-auto"}>
									<div className="p-4">
										<Routes>
											<Route index element={<Dashboard />} />

											<Route
												path="manage-bookings"
												element={<ManageBookings />}
											/>
											<Route
												path="manage-bookings/new-booking"
												element={<NewBooking onBack={() => navigate(-1)} />}
											/>
											<Route
												path="manage-bookings/exchange"
												element={<Exchange onBack={() => navigate(-1)} />}
											/>
											<Route
												path="manage-bookings/seat-assignment"
												element={<SeatAssignment onBack={() => navigate(-1)} />}
											/>
											<Route
												path="manage-bookings/upgrade"
												element={<Upgrade onBack={() => navigate(-1)} />}
											/>
											<Route
												path="manage-bookings/cancel-for-refund"
												element={
													<CancelForRefund onBack={() => navigate(-1)} />
												}
											/>
											<Route
												path="manage-bookings/cancel-for-future-credit"
												element={
													<CancelForFutureCredit onBack={() => navigate(-1)} />
												}
											/>

											<Route path="find-bookings" element={<FindBookings />} />
											<Route
												path="details/booking/:id"
												element={<BookingDetails />}
											/>
											<Route path="manage-users" element={<ManageUsers />} />
											<Route
												path="details/user/:id"
												element={<ProfilePage />}
											/>
											<Route path="manage-data" element={<ManageData />} />
											<Route path="revenue" element={<Revenue />} />
											<Route
												path="revenue/details"
												element={<RevenueDetails />}
											/>
											<Route path="ip-setting" element={<IPSetting />} />
											<Route
												path="email-preview/:emailType"
												element={<EmailPreviewPage />}
											/>
											<Route path="profile" element={<ProfilePage />} />

											<Route path="*" element={<Navigate to="/" />} />
										</Routes>
									</div>
								</div>
							</div>
						</div>
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
}

function App() {
	return (
		<AuthProvider>
			<Router>
				<AppContent />
			</Router>
		</AuthProvider>
	);
}

export default App;
