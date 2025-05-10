import React from 'react';
import { RevenueChart } from './charts/RevenueChart';
import { StatsCard } from './widgets/StatsCard';
import { TopPerformers } from './widgets/TopPerformers';
import { Plane, Target, TrendingUp, Users } from 'lucide-react';

export default function AgentDashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700 overflow-hidden mb-4">
        <div className="sticky top-0 z-10 p-4 border-b border-gray-700 bg-gray-800/95 backdrop-blur-sm">
          <h3 className="text-xl font-semibold text-white">Agent Dashboard</h3>
        </div>
        
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <StatsCard
              title="My Bookings"
              value="156"
              icon={Plane}
              color="blue"
            />
            <StatsCard
              title="Conversion Rate"
              value="92.4%"
              icon={Target}
              color="green"
            />
            <StatsCard
              title="My Revenue"
              value="$86.5K"
              icon={TrendingUp}
              color="purple"
            />
            <StatsCard
              title="Team Rank"
              value="#2"
              icon={Users}
              color="yellow"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <RevenueChart />
            <TopPerformers />
          </div>
        </div>
      </div>
    </div>
  );
}