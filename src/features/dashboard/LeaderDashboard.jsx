import React from 'react';
import { RevenueChart } from './charts/RevenueChart';
import { StatsCard } from './widgets/StatsCard';
import { TopPerformers } from './widgets/TopPerformers';
import { Users, Target, TrendingUp, Award } from 'lucide-react';

export default function LeaderDashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700 overflow-hidden mb-4">
        <div className="sticky top-0 z-10 p-4 border-b border-gray-700 bg-gray-800/95 backdrop-blur-sm">
          <h3 className="text-xl font-semibold text-white">Team Dashboard</h3>
        </div>
        
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <StatsCard
              title="Team Size"
              value="24"
              icon={Users}
              color="blue"
            />
            <StatsCard
              title="Team Efficiency"
              value="94.8%"
              icon={Target}
              color="green"
            />
            <StatsCard
              title="Team Revenue"
              value="$425K"
              icon={TrendingUp}
              color="purple"
            />
            <StatsCard
              title="Department Rank"
              value="#1"
              icon={Award}
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