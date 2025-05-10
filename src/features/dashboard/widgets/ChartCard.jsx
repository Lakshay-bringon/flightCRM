import React from 'react';
// import { LucideIcon } from 'lucide-react';

export function ChartCard({
  title,
  icon: Icon,
  height = 300,
  legendContent,
  children,
  className = ''
}) {
  return (
    <div className={`bg-gray-900 rounded-lg border border-gray-800 p-3 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {Icon && (
            <div className="p-1.5 bg-gray-800 rounded-lg">
              <Icon className="w-4 h-4 text-gray-400" />
            </div>
          )}
          <h3 className="font-medium text-gray-200">{title}</h3>
        </div>
        {legendContent}
      </div>
      <div style={{ height: typeof height === 'number' ? `${height}px` : height }}>
        {children}
      </div>
    </div>
  );
}