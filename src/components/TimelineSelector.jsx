import React from 'react';
import { format, subDays, subMonths, startOfDay, startOfMonth, startOfYear } from 'date-fns';
import { CalendarSearch } from 'lucide-react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '../lib/utils';

const timeRanges = [
  { id: 'today', label: 'Today' },
  { id: '30d', label: 'Last 30 Days' },
  { id: 'thisMonth', label: 'This Month' },
  { id: '12m', label: 'Last 12 Months' },
  { id: 'thisYear', label: 'This Year' },
];

export function TimelineSelector({ onRangeChange }) {
  const [date, setDate] = React.useState({
    from: startOfDay(new Date()),
    to: new Date(),
  });

  const [selectedRange, setSelectedRange] = React.useState(timeRanges[0]);
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);

  const handleRangeSelect = (range) => {
    setSelectedRange(range);
    setIsDatePickerOpen(false);
    
    const now = new Date();
    let start = now;
    let end = now;
    
    switch (range.id) {
      case 'today':
        start = startOfDay(now);
        break;
      case '30d':
        start = subDays(now, 30);
        break;
      case 'thisMonth':
        start = startOfMonth(now);
        break;
      case '12m':
        start = subMonths(now, 12);
        break;
      case 'thisYear':
        start = startOfYear(now);
        break;
      default:
        return;
    }
    
    setDate({ from: start, to: end });
    onRangeChange({ start, end });
  };

  const handleDateChange = (field, value) => {
    const newDate = value ? new Date(value) : null;
    const newDateRange = {
      ...date,
      [field]: newDate
    };
    
    setDate(newDateRange);
    
    if (newDateRange.from && newDateRange.to) {
      onRangeChange({ 
        start: newDateRange.from, 
        end: newDateRange.to 
      });
      setSelectedRange({ id: 'custom', label: 'Custom' });
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-2">
        {timeRanges.map((range) => (
          <Button
            key={range.id}
            variant={selectedRange.id === range.id ? "default" : "outline"}
            size="sm"
            type="button"
            className={cn(
              "text-sm font-medium transition-colors",
              selectedRange.id === range.id 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            )}
            onClick={(e) => {
              e.preventDefault();
              handleRangeSelect(range);
            }}
          >
            {range.label}
          </Button>
        ))}
      </div>

      <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "justify-start text-left font-normal min-w-[240px] border-gray-700 text-gray-300",
              "hover:bg-gray-800 hover:text-white transition-colors",
              isDatePickerOpen && "bg-gray-800 text-white"
            )}
          >
            <CalendarSearch className="mr-2 h-4 w-4 text-gray-300" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "MMM d, yyyy")} - {format(date.to, "MMM d, yyyy")}
                </>
              ) : (
                format(date.from, "MMM d, yyyy")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-0" align="end">
          <div className="p-3 border-b border-gray-700 bg-gray-800/95 backdrop-blur-sm">
            <h4 className="font-medium text-sm text-gray-200">Select Date Range</h4>
          </div>
          <div className="p-3 space-y-3 bg-gray-900/95 backdrop-blur-sm">
            <div className="group cursor-pointer">
              <label className="block text-sm font-medium text-gray-300 mb-1 cursor-pointer">Start Date</label>
              <div className="relative" onClick={() => document.getElementById('start-date').showPicker()}>
                <input
                  id="start-date"
                  type="date"
                  value={date.from ? format(date.from, "yyyy-MM-dd") : ""}
                  onChange={(e) => handleDateChange("from", e.target.value)}
                  className="w-full px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                />
                <CalendarSearch className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 pointer-events-none group-hover:text-white transition-colors" />
              </div>
            </div>
            <div className="group cursor-pointer">
              <label className="block text-sm font-medium text-gray-300 mb-1 cursor-pointer">End Date</label>
              <div className="relative" onClick={() => document.getElementById('end-date').showPicker()}>
                <input
                  id="end-date"
                  type="date"
                  value={date.to ? format(date.to, "yyyy-MM-dd") : ""}
                  onChange={(e) => handleDateChange("to", e.target.value)}
                  className="w-full px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                />
                <CalendarSearch className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 pointer-events-none group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}