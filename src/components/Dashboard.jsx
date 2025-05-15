import  { useState } from 'react';
import { StatsCard } from '../features/dashboard/widgets/StatsCard';
import { TopPerformers } from '../features/dashboard/widgets/TopPerformers';
import { PerformanceComparison } from '../features/dashboard/widgets/PerformanceComparison';
import { Plane, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { TimelineSelector } from './TimelineSelector';
import { useUser } from '../context/UserContext';

export default function AdminDashboard() {  const [dateRange, setDateRange] = useState({
    start: new Date(),
    end: new Date()
  });
  const { user } = useUser();
  const isAgent = user?.role === 'agent';
  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  // Sample data for demonstration
  const topPerformer = {
    id: 1,
    name: "Sarah Wilson",
    role: "Senior Agent",
    revenue: 184500,
    bookings: 145,
    chargeback: 2500, // Monthly chargeback + refund
  };

  const currentAgent = {
    id: 4,
    name: "John Doe",
    role: "Travel Agent",
    revenue: 145000,
    bookings: 120,
    chargeback: 4200, // Monthly chargeback + refund
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700 overflow-hidden mb-4">
        <div className="sticky top-0 z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-4 min-h-[72px] border-b border-gray-700 bg-gray-800/95 backdrop-blur-sm">
          <h3 className="text-xl font-semibold text-white">Dashboard Overview</h3>
          <TimelineSelector onRangeChange={handleDateRangeChange} />
        </div>
        
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <StatsCard
              title="Total Bookings"
              value="2,543"
              icon={Plane}
              color="blue"
            />
            <StatsCard
              title="Active Agents"
              value="165"
              icon={Users}
              color="green"
            />
            <StatsCard
              title="Revenue"
              value="$1.2M"
              icon={TrendingUp}
              color="purple"
            />
            <StatsCard
              title="Chargeback + Refund"
              value="$6.5K"
              icon={AlertTriangle}
              color="red"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <TopPerformers dateRange={dateRange} />
            {!isAgent && (
            <TopPerformers dateRange={dateRange} showBottom={true} />
            )}
            {isAgent && (
              <PerformanceComparison 
              agentData={currentAgent}
              topPerformer={topPerformer}
              />
            )}
          </div>

       
        </div>
      </div>
    </div>
  );
}
