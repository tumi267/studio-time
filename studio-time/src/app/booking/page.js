'use client';
import { useState } from 'react';
import { availableDates, rooms, teamMembers, bookingConfig } from '../data/bookingdates.js';
import CalendarGrid from '../components/booking/BookingCalendar.js';
import RoomSelection from '../components/booking/RoomSelection.js';
import TeamMemberSelection from '../components/booking/TeamMemberSelection.js';
import BookingSummary from '../components/booking/BookingSummary.js';
import PaymentGateway from '../components/booking/PaymentGateway.js';
import { Card } from '@/components/ui/card';

export default function BookingPage() {
    const [step, setStep] = useState(1);
    const [bookingDetails, setBookingDetails] = useState({
      dates: null,
      room: null,
      teamMember: null
    });
    const [bookingConfirmed, setBookingConfirmed] = useState(false);
  
    // Define step navigation functions
    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);
  
    const handleDateSelect = (dates) => {
      setBookingDetails(prev => ({ ...prev, dates }));
      nextStep();
    };
  
    const handleRoomSelect = (room) => {
      setBookingDetails(prev => ({ ...prev, room }));
      nextStep();
    };
  
    const handleTeamMemberSelect = (member) => {
      setBookingDetails(prev => ({ ...prev, teamMember: member }));
      nextStep();
    };
  
    const handleBookingComplete = () => {
      setBookingConfirmed(true);
      console.log('Booking completed:', bookingDetails);
    };
  
    const calculateTotal = () => {
      if (!bookingDetails.dates || !bookingDetails.room) return 0;
      
      const hoursPerDay = parseInt(bookingDetails.dates.endTime.split(':')[0]) - 
                         parseInt(bookingDetails.dates.startTime.split(':')[0]);
      
      const days = bookingDetails.dates.endDate 
        ? (new Date(bookingDetails.dates.endDate) - new Date(bookingDetails.dates.startDate)) / (1000 * 60 * 60 * 24) + 1
        : 1;
      
      const roomCost = hoursPerDay * days * bookingDetails.room.rate;
      const memberCost = bookingDetails.teamMember 
        ? hoursPerDay * days * bookingDetails.teamMember.rate 
        : 0;
      
      return roomCost + memberCost;
    };
  
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Book Studio Time</h1>
        
        <div className="max-w-6xl mx-auto">
          {!bookingConfirmed ? (
            <Card className="p-6">
              {step === 1 && (
                <CalendarGrid 
                  availableDates={availableDates}
                  onBookingSelect={handleDateSelect}
                />
              )}
              
              {step === 2 && (
                <RoomSelection 
                  rooms={rooms} 
                  onSelect={handleRoomSelect}
                  onBack={prevStep}
                  minHours={bookingConfig.minSessionHours}
                />
              )}
              
              {step === 3 && (
                <TeamMemberSelection 
                  teamMembers={teamMembers}
                  selectedDates={bookingDetails.dates}
                  onSelect={handleTeamMemberSelect}
                  onBack={prevStep}
                  isOptional={true}
                />
              )}
              
              {step === 4 && (
                <BookingSummary
                  dates={bookingDetails.dates}
                  room={bookingDetails.room}
                  teamMember={bookingDetails.teamMember}
                  total={calculateTotal()}
                  onBack={prevStep}
                  onConfirm={nextStep}
                />
              )}
              
              {step === 5 && (
                <PaymentGateway
                  amount={calculateTotal()}
                  bookingDetails={bookingDetails}
                  onSuccess={handleBookingComplete}
                  onBack={prevStep}
                />
              )}
            </Card>
          ) : (
            <ConfirmationScreen 
              bookingDetails={bookingDetails}
              total={calculateTotal()}
              onNewBooking={() => {
                setBookingConfirmed(false);
                setStep(1);
                setBookingDetails({
                  dates: null,
                  room: null,
                  teamMember: null
                });
              }}
            />
          )}
        </div>
      </div>
    );
  }