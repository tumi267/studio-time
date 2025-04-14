'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format, addDays, isAfter, parseISO } from 'date-fns';

export default function CalendarGrid({ availableDates, onBookingSelect }) {
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null
  });
  const [timeRange, setTimeRange] = useState({
    start: null,
    end: null
  });
  const [showTimeSlots, setShowTimeSlots] = useState(false);

  // Generate time slots from 8AM to 8PM
  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = i + 8;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  // Check if a time slot is available
  const isTimeAvailable = (time) => {
    if (!dateRange.from) return false;
    
    const dateStr = format(dateRange.from, 'yyyy-MM-dd');
    const dateData = availableDates.find(d => d.date === dateStr);
    if (!dateData) return false;
    
    return !dateData.bookedSlots.some(slot => 
      time >= slot.start && time < slot.end
    );
  };

  // Handle date selection
  const handleDateSelect = (range) => {
    setDateRange(range);
    setTimeRange({ start: null, end: null });
    setShowTimeSlots(!!range.from);
  };

  // Handle time selection
  const handleTimeSelect = (time) => {
    if (!timeRange.start || (timeRange.start && timeRange.end)) {
      // Starting new selection
      setTimeRange({ start: time, end: null });
    } else if (time > timeRange.start) {
      // Completing selection
      setTimeRange(prev => ({ ...prev, end: time }));
    } else {
      // Reselecting start time
      setTimeRange({ start: time, end: null });
    }
  };

  // Confirm booking selection
  const confirmSelection = () => {
    if (!dateRange.from || !timeRange.start || !timeRange.end) return;
    
    const bookingDetails = {
      startDate: format(dateRange.from, 'yyyy-MM-dd'),
      endDate: dateRange.to ? format(dateRange.to, 'yyyy-MM-dd') : null,
      startTime: timeRange.start,
      endTime: timeRange.end
    };
    
    onBookingSelect(bookingDetails);
  };

  // Check if time is selected
  const isTimeSelected = (time) => {
    if (!timeRange.start || !timeRange.end) return false;
    return time >= timeRange.start && time < timeRange.end;
  };

  // Check if time is start/end boundary
  const isTimeBoundary = (time) => {
    return time === timeRange.start || time === timeRange.end;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <Calendar
            mode="range"
            selected={{
              from: dateRange.from,
              to: dateRange.to
            }}
            onSelect={handleDateSelect}
            numberOfMonths={2}
            disabled={(day) => {
              const dateStr = format(day, 'yyyy-MM-dd');
              const dateData = availableDates.find(d => d.date === dateStr);
              return !dateData?.available;
            }}
          />
        </div>
        
        {showTimeSlots && (
          <div className="w-full md:w-1/2">
            <h3 className="font-medium mb-4">
              Select time for {format(dateRange.from, 'MMM d')}
              {dateRange.to && ` - ${format(dateRange.to, 'MMM d')}`}
            </h3>
            
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time, index) => (
                <Button
                  key={index}
                  variant={
                    isTimeSelected(time) 
                      ? 'default' 
                      : isTimeAvailable(time) 
                        ? 'outline' 
                        : 'ghost'
                  }
                  disabled={!isTimeAvailable(time)}
                  onClick={() => handleTimeSelect(time)}
                  className={
                    isTimeBoundary(time) ? 'ring-2 ring-offset-2 ring-primary' : ''
                  }
                >
                  {time}
                </Button>
              ))}
            </div>
            
            {timeRange.start && (
              <div className="mt-4 p-4 border rounded-lg">
                <p>
                  <strong>Selected:</strong> {timeRange.start}
                  {timeRange.end ? ` - ${timeRange.end}` : ''}
                </p>
                <p><strong>Duration:</strong> 
                  {timeRange.end 
                    ? `${parseInt(timeRange.end) - parseInt(timeRange.start)} hours` 
                    : 'Select end time'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {timeRange.start && timeRange.end && (
        <div className="flex justify-end">
          <Button onClick={confirmSelection}>
            Confirm Time Selection
          </Button>
        </div>
      )}
    </div>
  );
}