import React from "react";
import {
  Trophy,
  TrendingUp,
  DollarSignIcon,
  TicketsPlane,
  Users,
  Plane,
  Medal,
  Sparkles,
  DollarSign,
  TrendingDown,
} from "lucide-react";
import { currencyFormatter, numberFormatter } from "../../../utils/formatters";

const defaultData = [
  {
    id: 1,
    name: "Sarah Wilson",
    role: "Senior Agent",
    revenue: 184500,
    bookings: 145,
    badge: "🏆 Top Performer",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Travel Consultant",
    revenue: 162100,
    bookings: 128,
    badge: "⭐ Rising Star",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Travel Agent",
    revenue: 158000,
    bookings: 132,
  },
];

const positionColors = {
  0: "from-blue-500/10 to-blue-600/10 border-blue-500/20 text-blue-400",
  1: "from-purple-500/10 to-purple-600/10 border-purple-500/20 text-purple-400",
  2: "from-green-500/10 to-green-600/10 border-green-500/20 text-green-400",
};

const medalIcons = [
  <Trophy className="w-5 h-5 text-blue-400" />,
  <Medal className="w-5 h-5 text-purple-400" />,
  <Sparkles className="w-5 h-5 text-green-400" />
];

const Badges = ["Top Performer", "Rising Star", "High Achiever"];

function PerformerCard({ performer, index, isBottom = false }) {
  return (
    <div
      className={`relative flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-br border ${positionColors[index]} transition-all duration-200`}
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800/50 text-lg">
          {isBottom ? <TrendingDown className="w-5 h-5 text-red-400" /> : medalIcons[index]}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-white truncate">
              {performer.name}
            </h4>
          </div>
          <p className="text-sm text-gray-400 truncate">{performer.role}</p>
          <div className="flex gap-4 mt-1">
            <div className="text-sm text-gray-400">
              <span className="font-semibold text-green-400">{currencyFormatter.format(performer.revenue)}</span>
            </div>
            <div className="text-sm text-gray-400">
              <span className="font-semibold text-blue-400">{numberFormatter.format(performer.bookings)}</span> bookings
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TopPerformers({ data = defaultData, showBottom = false }) {
  const sortedData = [...data].sort((a, b) => b.revenue - a.revenue);
  const displayData = showBottom ? sortedData.slice(-3).reverse() : sortedData.slice(0, 3);

  return (
    <div className="px-4 py-3 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800/50">
            {showBottom ? <TrendingDown className="w-5 h-5 text-red-400" /> : <Trophy className="w-5 h-5 text-yellow-400" />}
          </div>
          <h3 className="font-medium text-gray-200">{showBottom ? "Bottom Performers" : "Top Performers"}</h3>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-800/50 text-green-400 text-sm">
          <DollarSign className="w-4 h-4" />
          <span>MCO</span>
        </div>
      </div>
      <div className="grid gap-2">
        {displayData.map((performer, index) => (
          <PerformerCard
            key={performer.id}
            performer={performer}
            index={index}
            isBottom={showBottom}
          />
        ))}
      </div>
    </div>
  );
}
