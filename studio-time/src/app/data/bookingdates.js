export const bookingConfig = {
    minSessionHours: 2,
    operatingHours: {
      start: 8,
      end: 20,
    },
  };
  
  export const availableDates = [
    {
      date: '2025-04-15',
      available: true,
      bookedSlots: [
        { start: '10:00', end: '12:00' },
        { start: '14:00', end: '15:30' }
      ]
      
    },
    {
        date: '2025-04-16',
        available: true,
        bookedSlots: [
          { start: '10:00', end: '12:00' },
          { start: '14:00', end: '15:30' }
        ]
        
      },
      {
        date: '2025-04-17',
        available: true,
        bookedSlots: [
          { start: '10:00', end: '12:00' },
          { start: '14:00', end: '15:30' }
        ]
        
      },
      {
        date: '2025-04-18',
        available: true,
        bookedSlots: [
          { start: '10:00', end: '12:00' },
          { start: '14:00', end: '15:30' }
        ]
        
      },
      {
        date: '2025-04-19',
        available: true,
        bookedSlots: [
          { start: '10:00', end: '12:00' },
          { start: '14:00', end: '15:30' }
        ]
        
      },
    // ... more dates
  ];
  
  export const rooms = [
    { 
      id: 1, 
      name: 'Recording Studio A', 
      rate: 500,
      minBookingHours: 4
    },
    // ... more rooms
  ];
  
  export const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      role: "Producer",
      rate: 200,
      // No availability restrictions - only check against existing bookings
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Sound Engineer", 
      rate: 180,
    },
    // ... more team members
  ];
  
  export const existingBookings = [
    {
      id: 101,
      teamMemberIds: [1], // John Doe is booked
      date: "2025-04-15",
      startTime: "10:00",
      endTime: "12:00"
    },
    {
      id: 102,
      teamMemberIds: [2], // Jane Smith is booked
      date: "2025-04-15", 
      startTime: "14:00",
      endTime: "16:00"
    }
  ];