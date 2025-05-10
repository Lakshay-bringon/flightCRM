import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './components/Dashboard';
import CreatePNR from './components/CreatePNR';
import FindBookings from './features/booking/FindBookings';
import UserMGMT from './features/user/UserMGMT';
import DataMGMT from './components/DataMGMT';
import Revenue from './components/Revenue';
import RevenueDetails from './features/revenue/RevenueDetails';
import IPSetting from './components/IPSetting';
// import TimeManagement from './components/TimeManagement';
// import CallDetails from './components/CallDetails';
import Sidebar from './components/Sidebar';
import UserProfile from './features/user/UserProfile';
import Login from './pages/Login';
import Profile from './features/user/Profile';
import UserDetailsForm from './features/user/UserDetailsForm';
import BookingDetails from './features/booking/BookingDetails';

// Protected route wrapper component
const ProtectedRoute = ({ children }) => {
  // TODO: Replace with actual auth check
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  // return isAuthenticated ? children : <Navigate to="/login" />;
  return children;
};

function App() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => setSidebarCollapsed((prev) => !prev);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="min-w-full h-screen box-border bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="flex w-full h-full">
                  <Sidebar collapsed={sidebarCollapsed} onToggleCollapse={handleSidebarToggle} />
                  <div className={sidebarCollapsed ? "flex-1 overflow-y-auto" : "flex-1 overflow-y-auto"}>
                    {/* <div className="sticky top-0 z-10"> */}
                      {/* <Header /> */}
                      {/* <div className="absolute top-4 right-4">
                        <UserProfile showMenu={showProfileMenu} setShowMenu={setShowProfileMenu} />
                      </div> */}
                    {/* </div> */}
                    <div className="p-4">
                      <Routes>
                        <Route index element={<Dashboard />} />
                        <Route path="create-pnr" element={<CreatePNR />} />
                        <Route path="find-bookings" element={<FindBookings />} />
                        <Route path="details/booking/:id" element={<BookingDetails />} />
                        <Route path="user-management" element={<UserMGMT />} />
                        <Route path="details/user/:id" element={<Profile />} />
                        <Route path="data-management" element={<DataMGMT />} />
                        <Route path="revenue" element={<Revenue />} />
                        <Route path="revenue/details" element={<RevenueDetails />} />
                        <Route path="ip-setting" element={<IPSetting />} />
                        {/* <Route path="time-management" element={<TimeManagement />} />
                        <Route path="call-details" element={<CallDetails />} /> */}
                        <Route path="profile" element={<Profile />} />
                        {/* <Route path="agent-details" element={<AgentDetailsForm />} /> */}
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

export default App;
