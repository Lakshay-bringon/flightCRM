import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { UserProvider, useUser } from './context/UserContext';
import Dashboard from './components/Dashboard';
import ManageBookings from './components/ManageBookings';
import EmailPreviewPage from './pages/EmailPreviewPage';
import FindBookings from './features/booking/FindBookings';
import ManageUsers from './features/user/ManageUsers';
import ManageData from './features/data/ManageData';
import Revenue from './components/Revenue';
import RevenueDetails from './features/revenue/RevenueDetails';
import IPSetting from './components/IPSetting';
import Sidebar from './components/Sidebar';
import UserProfile from './features/user/UserProfile';
import Login from './pages/Login';
import ProfilePage from './features/user/ProfilePage';
import BookingDetails from './features/booking/BookingDetails';

// Protected route wrapper component
const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  return user ? children : <Navigate to="/login" />;
};

function AppContent() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useUser();

  const handleSidebarToggle = () => setSidebarCollapsed((prev) => !prev);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="min-w-full h-screen box-border bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="flex w-full h-full">
                  <Sidebar collapsed={sidebarCollapsed} onToggleCollapse={handleSidebarToggle} />
                  <div className={sidebarCollapsed ? "flex-1 overflow-y-auto" : "flex-1 overflow-y-auto"}>
                    <div className="p-4">
                      <Routes>
                        <Route index element={<Dashboard />} />
                        <Route path="manage-bookings" element={<ManageBookings />} />
                        <Route path="find-bookings" element={<FindBookings />} />
                        <Route path="details/booking/:id" element={<BookingDetails />} />
                        <Route path="manage-users" element={<ManageUsers />} />
                        <Route path="details/user/:id" element={<ProfilePage />} />
                        <Route path="manage-data" element={<ManageData />} />
                        <Route path="revenue" element={<Revenue />} />
                        <Route path="revenue/details" element={<RevenueDetails />} />
                        <Route path="ip-setting" element={<IPSetting />} />
                        <Route path="email-preview/:emailType" element={<EmailPreviewPage />} />
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
    </Router>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
