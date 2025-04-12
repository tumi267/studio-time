'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { useState } from 'react';

export default function BookingCalendar({ availableDates, onSelect }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  // Convert date strings to Date objects
  const availableDateObjects = availableDates.map(item => ({
    ...item,
    dateObj: new Date(item.date)
  }));

  // Check if a day has available slots
  const isDayAvailable = (day) => {
    return availableDateObjects.some(
      date => date.dateObj.toDateString() === day.toDateString()
    );
  };

  // Get available times for selected day
  const getAvailableTimes = () => {
    if (!selectedDay) return [];
    const date = availableDateObjects.find(
      d => d.dateObj.toDateString() === selectedDay.toDateString()
    );
    return date ? date.times.filter(t => t.available) : [];
  };

  const handleTimeSelect = (time) => {
    setSelectedTimeSlot(time);
    const selectedDate = availableDateObjects.find(
      d => d.dateObj.toDateString() === selectedDay.toDateString()
    );
    onSelect(selectedDate.date, time.time);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select Date & Time</h2>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <Calendar
            mode="single"
            selected={selectedDay}
            onSelect={setSelectedDay}
            disabled={(day) => !isDayAvailable(day)}
            className="rounded-md border"
          />
        </div>
        
        <div className="w-full md:w-1/2">
          {selectedDay ? (
            <div>
              <h3 className="font-medium mb-4">
                Available times for {format(selectedDay, 'PPP')}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {getAvailableTimes().map((time) => (
                  <Button
                    key={time.id}
                    variant={selectedTimeSlot?.id === time.id ? 'default' : 'outline'}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time.time}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">
                Select a date to see available times
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}