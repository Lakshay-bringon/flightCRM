import React, { useRef, useEffect, useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush } from 'recharts';
import { DollarSign } from 'lucide-react';
import { currencyFormatter } from '../../../utils/formatters';
import { ChartCard } from '../widgets/ChartCard';

const defaultData = [
  { month: 'Jan', revenue: 42000, chargeback: 3200, refund: 2800 },
  { month: 'Feb', revenue: 48000, chargeback: 2900, refund: 3100 },
  { month: 'Mar', revenue: 51000, chargeback: 3400, refund: 2600 },
  { month: 'Apr', revenue: 56000, chargeback: 3100, refund: 3400 },
  { month: 'May', revenue: 48000, chargeback: 2800, refund: 2900 },
  { month: 'Jun', revenue: 54000, chargeback: 3300, refund: 3200 },
];

const processData = (data) =>
  data.map(d => ({
    ...d,
    chargeRefund: (d.chargeback || 0) + (d.refund || 0)
  }));

export function RevenueChart({ 
  data = defaultData,
  title = "Revenue Overview",
  height = 300,
  showLegend = true,
  dateRange
}) {
  const [zoomDomain, setZoomDomain] = useState([0, data.length - 1]);
  
  // Filter data based on date range
  const filteredData = useMemo(() => {
    if (!dateRange) return data;
    return data.filter(item => {
      const itemDate = new Date(item.month); // Assuming month is in a parseable format
      return itemDate >= dateRange.start && itemDate <= dateRange.end;
    });
  }, [data, dateRange]);

  const chartData = processData(filteredData);
  
  // Reset zoom domain when data changes
  useEffect(() => {
    setZoomDomain([0, filteredData.length - 1]);
  }, [filteredData]);

  const legendContent = showLegend ? (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#60A5FA' }} />
        <span className="text-sm text-gray-400">Revenue</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F87171' }} />
        <span className="text-sm text-gray-400">Chargeback + Refund</span>
      </div>
    </div>
  ) : null;

  return (
    <ChartCard
      title={title}
      icon={DollarSign}
      height={height}
      legendContent={legendContent}
      className="w-full"
    >
      <div className="w-full" style={{ minWidth: 0 }}>
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart
            data={chartData.slice(zoomDomain[0], zoomDomain[1] + 1)}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#60A5FA" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorChargeRefund" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F87171" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#F87171" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
            <XAxis 
              dataKey="month" 
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#4B5563' }}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#4B5563' }}
              tickFormatter={(value) => currencyFormatter.format(value)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              itemStyle={{ color: '#F3F4F6' }}
              labelStyle={{ color: '#F3F4F6', fontWeight: 'bold', marginBottom: '0.5rem' }}
              formatter={(value, name) => [
                currencyFormatter.format(value),
                name === 'chargeRefund' ? 'Chargeback + Refund' : 'Revenue'
              ]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#60A5FA"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="chargeRefund"
              stroke="#F87171"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorChargeRefund)"
            />
            <Brush
              dataKey="month"
              height={24}
              stroke="#60A5FA"
              travellerWidth={12}
              startIndex={zoomDomain[0]}
              endIndex={zoomDomain[1]}
              onChange={(range) => {
                setZoomDomain([range.startIndex, range.endIndex]);
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}