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

  // Convert date string to Date object safely
  const parseDateSafe = (dateStr) => {
    try {
      return dateStr ? parseISO(dateStr) : null;
    } catch {
      return null;
    }
  };

  // Safe format function with validation
  const safeFormat = (date, formatStr) => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) return '';
    return format(date, formatStr);
  };

  // Generate time slots based on operating hours
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 20; hour++) {
      slots.push({
        time: `${hour.toString().padStart(2, '0')}:00`,
        available: checkTimeAvailability(hour)
      });
    }
    return slots;
  };

  // Check time availability
  const checkTimeAvailability = (hour) => {
    if (!dateRange.from) return true;
    
    const timeStr = `${hour.toString().padStart(2, '0')}:00`;
    const datesToCheck = getDatesInRange(dateRange.from, dateRange.to || dateRange.from);
    
    return datesToCheck.every(date => {
      const dateStr = safeFormat(date, 'yyyy-MM-dd');
      const dateData = availableDates.find(d => d.date === dateStr);
      if (!dateData) return false;
      
      return !dateData.bookedSlots.some(slot => 
        timeStr >= slot.start && timeStr < slot.end
      );
    });
  };

  // Get all dates in range
  const getDatesInRange = (start, end) => {
    const dates = [];
    let current = new Date(start);
    const endDate = end ? new Date(end) : new Date(start);
    
    while (current <= endDate) {
      dates.push(new Date(current));
      current = addDays(current, 1);
    }
    
    return dates;
  };

  // Handle date selection
  const handleDateSelect = (range) => {
    if (!range) return;
    
    // Ensure we have proper Date objects
    const from = range.from ? new Date(range.from) : null;
    const to = range.to ? new Date(range.to) : null;
    
    setDateRange({ from, to });
    setTimeRange({ start: null, end: null });
  };

  // Handle time selection
  const handleTimeSelect = (time) => {
    if (!timeRange.start) {
      setTimeRange({ start: time, end: null });
    } else if (time > timeRange.start) {
      setTimeRange(prev => ({ ...prev, end: time }));
    } else {
      setTimeRange({ start: time, end: null });
    }
  };

  // Confirm booking selection
  const confirmSelection = () => {
    if (!dateRange.from || !timeRange.start || !timeRange.end) return;
    
    const bookingDetails = {
      startDate: safeFormat(dateRange.from, 'yyyy-MM-dd'),
      endDate: dateRange.to 
        ? safeFormat(dateRange.to, 'yyyy-MM-dd') 
        : safeFormat(dateRange.from, 'yyyy-MM-dd'),
      startTime: timeRange.start,
      endTime: timeRange.end,
      duration: calculateDuration()
    };
    
    onBookingSelect(bookingDetails);
  };

  // Calculate duration in hours
  const calculateDuration = () => {
    if (!timeRange.start || !timeRange.end) return 0;
    
    const [startHour] = timeRange.start.split(':').map(Number);
    const [endHour] = timeRange.end.split(':').map(Number);
    const dayCount = dateRange.to 
      ? (dateRange.to.getDate() - dateRange.from.getDate() + 1)
      : 1;
    
    return (endHour - startHour) * dayCount;
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
        
        <div className="w-full md:w-1/2">
          {dateRange.from && (
            <div className="space-y-4">
              <h3 className="font-medium">
                {dateRange.to 
                  ? `Select time for ${safeFormat(dateRange.from, 'MMM d')} - ${safeFormat(dateRange.to, 'MMM d')}`
                  : `Select time for ${safeFormat(dateRange.from, 'MMM d')}`}
              </h3>
              
              <div className="grid grid-cols-3 gap-2">
                {generateTimeSlots().map((slot, index) => (
                  <Button
                    key={index}
                    variant={
                      timeRange.start && timeRange.end && 
                      slot.time >= timeRange.start && 
                      slot.time < timeRange.end 
                        ? 'default' 
                        : slot.available 
                          ? 'outline' 
                          : 'ghost'
                    }
                    disabled={!slot.available}
                    onClick={() => handleTimeSelect(slot.time)}
                  >
                    {slot.time}
                  </Button>
                ))}
              </div>
              
              {timeRange.start && (
                <div className="mt-4 p-4 border rounded-lg">
                  <p>
                    <strong>Selected:</strong> {timeRange.start}
                    {timeRange.end ? ` - ${timeRange.end}` : ''}
                  </p>
                  <p><strong>Duration:</strong> {calculateDuration()} hours</p>
                  {dateRange.to && (
                    <p><strong>Days:</strong> {safeFormat(dateRange.from, 'MMM d')} - {safeFormat(dateRange.to, 'MMM d')}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
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