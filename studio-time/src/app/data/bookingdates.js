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
      name: 'John Doe', 
      role: 'Producer',
      rate: 200, // Hourly rate
      available: ['2025-04-15', '2025-04-16','2025-04-17','2025-04-18','2025-04-19'] // Available dates
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      role: 'Sound Engineer',
      rate: 250,
      available: ['2025-04-15','2025-04-16','2025-04-17','2025-04-18','2025-04-19']
    },
    // ... more team members
  ];