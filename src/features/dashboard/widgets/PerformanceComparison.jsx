import React from "react";
import { DollarSign, TrendingUp, TrendingDown, Target, User, AlertTriangle } from "lucide-react";
import { currencyFormatter, numberFormatter } from "../../../utils/formatters";

function ComparisonCard({ title, currentValue, topValue, percentage, isNegative = false }) {
  const isPositive = isNegative ? percentage <= 100 : percentage >= 100;
  const difference = ((percentage - 100) * topValue / 100).toFixed(0);

  return (
    <div className="p-4 rounded-lg border border-gray-600">
      <p className="text-sm text-gray-400 mb-3">{title}</p>
      
      <div className="space-y-2">
        {/* Current Agent */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">You</span>
          </div>
          <span className="text-white font-medium">{currentValue}</span>
        </div>

        {/* Top Performer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-400">Top Performer</span>
          </div>
          <span className="text-green-400 font-medium">{topValue}</span>
        </div>

        {/* Difference */}
        <div className={`flex items-center justify-end gap-1 text-xs ${
          isPositive ? 'text-green-400' : 'text-red-400'
        }`}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          <span>{isPositive ? '+' : ''}{difference}</span>
        </div>
      </div>
    </div>
  );
}

export function PerformanceComparison({ agentData, topPerformer }) {
  // Calculate percentages
  const mcoPercentage = ((agentData.revenue / topPerformer.revenue) * 100).toFixed(1);
  const bookingPercentage = ((agentData.bookings / topPerformer.bookings) * 100).toFixed(1);
  const chargebackPercentage = ((agentData.chargeback / topPerformer.chargeback) * 100).toFixed(1);

  return (
    <div className="px-4 py-3 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800/50">
            <Target className="w-5 h-5 text-blue-400" />
          </div>
          <h3 className="font-medium text-gray-200">Monthly Performance Comparison</h3>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-800/50 text-blue-400 text-sm">
          <DollarSign className="w-4 h-4" />
          <span>vs Top Performer</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <ComparisonCard
          title="Monthly MCO"
          currentValue={currencyFormatter.format(agentData.revenue)}
          topValue={currencyFormatter.format(topPerformer.revenue)}
          percentage={mcoPercentage}
        />
        <ComparisonCard
          title="Monthly Bookings"
          currentValue={numberFormatter.format(agentData.bookings)}
          topValue={numberFormatter.format(topPerformer.bookings)}
          percentage={bookingPercentage}
        />
        <ComparisonCard
          title="Monthly CB + Refund"
          currentValue={currencyFormatter.format(agentData.chargeback)}
          topValue={currencyFormatter.format(topPerformer.chargeback)}
          percentage={chargebackPercentage}
          isNegative={true}
        />
      </div>
    </div>
  );
} 