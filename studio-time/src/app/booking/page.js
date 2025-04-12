'use client';
import { useState } from 'react';
import { availableDates, rooms, teamMembers } from '../data/bookingdates';
import BookingCalendar from '../components/booking/BookingCalendar.js';
import RoomSelection from '../components/booking/RoomSelection.js';
import TeamMemberSelection from '../components/booking/TeamMemberSelection.js';
import BookingSummary from '../components/booking/BookingSummary.js';
import PaymentGateway from '../components/booking/PaymentGateway.js';
import { Card } from '@/components/ui/card';

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleDateSelect = (date, time) => {
    setSelectedDate(date);
    setSelectedTime(time);
    nextStep();
  };

  const handleBookingComplete = () => {
    setBookingConfirmed(true);
    // In a real app, you would send this to your backend
    console.log('Booking completed:', {
      date: selectedDate,
      time: selectedTime,
      room: selectedRoom,
      teamMember: selectedTeamMember
    });
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Book Studio Time</h1>
      
      <div className="max-w-4xl mx-auto">
        {!bookingConfirmed ? (
          <Card className="p-6">
            {step === 1 && (
              <BookingCalendar 
                availableDates={availableDates}
                onSelect={handleDateSelect}
              />
            )}
            
            {step === 2 && (
              <RoomSelection 
                rooms={rooms} 
                onSelect={setSelectedRoom}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            
            {step === 3 && (
              <TeamMemberSelection 
                teamMembers={teamMembers}
                onSelect={setSelectedTeamMember}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            
            {step === 4 && (
              <BookingSummary
                date={selectedDate}
                time={selectedTime}
                room={selectedRoom}
                teamMember={selectedTeamMember}
                onBack={prevStep}
                onConfirm={nextStep}
              />
            )}
            
            {step === 5 && (
              <PaymentGateway
                amount={selectedRoom?.rate || 0}
                onSuccess={handleBookingComplete}
                onBack={prevStep}
              />
            )}
          </Card>
        ) : (
          <Card className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
            <div className="space-y-2 mb-6">
              <p><strong>Date:</strong> {selectedDate}</p>
              <p><strong>Time:</strong> {selectedTime}</p>
              <p><strong>Room:</strong> {selectedRoom?.name}</p>
              {selectedTeamMember && <p><strong>Team Member:</strong> {selectedTeamMember.name}</p>}
              <p><strong>Total:</strong> R{selectedRoom?.rate}</p>
            </div>
            <Button onClick={() => setBookingConfirmed(false)}>
              Make Another Booking
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}