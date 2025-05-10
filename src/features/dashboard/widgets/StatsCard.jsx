import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const colorVariants = {
  blue: 'from-blue-500/10 to-blue-600/10 text-blue-400 border-blue-500/20',
  purple: 'from-purple-500/10 to-purple-600/10 text-purple-400 border-purple-500/20',
  green: 'from-green-500/10 to-green-600/10 text-green-400 border-green-500/20',
  red: 'from-red-500/10 to-red-600/10 text-red-400 border-red-500/20',
  yellow: 'from-yellow-500/10 to-yellow-600/10 text-yellow-400 border-yellow-500/20',
  orange: 'from-orange-500/10 to-orange-600/10 text-orange-400 border-orange-500/20',
  cyan: 'from-cyan-500/10 to-cyan-600/10 text-cyan-400 border-cyan-500/20',
};

export function StatsCard({ 
  title, 
  value, 
  trend = 'neutral', 
  trendValue, 
  icon: Icon,
  description,
  color = 'blue',
  onClick
}) {
  const isPositive = trend === 'up';
  const isNegative = trend === 'down';
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div 
      className={`px-4 py-3 rounded-xl bg-gradient-to-br ${colorVariants[color]} border transition-all duration-200
        ${onClick ? 'cursor-pointer hover:scale-[1.02] hover:shadow-lg' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium">{title}</div>
        {Icon && <Icon className="w-5 h-5" />}
      </div>

      <div className="text-2xl font-bold text-white">{value}</div>
      
      {description && (
        <div className="text-sm text-gray-400 mt-1">{description}</div>
      )}

      {(trend !== 'neutral' && trendValue) && (
        <div className={`inline-flex items-center text-sm ${isPositive ? 'text-green-400' : 'text-red-400'} mt-1`}>
          <TrendIcon className="w-4 h-4 mr-1" />
          {trendValue}
        </div>
      )}
    </div>
  );
}