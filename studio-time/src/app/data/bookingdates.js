// Sample data simulating availability from Google Calendar/Calendly
export const availableDates = [
    {
      id: 1,
      date: '2025-04-15',
      times: [
        { id: 1, time: '09:00', available: true },
        { id: 2, time: '11:00', available: true },
        { id: 3, time: '14:00', available: false }, // Booked
        { id: 4, time: '16:00', available: true },
      ],
    },
    {
      id: 2,
      date: '2025-04-16',
      times: [
        { id: 1, time: '10:00', available: true },
        { id: 2, time: '13:00', available: true },
        { id: 3, time: '15:00', available: true },
      ],
    },
    {
      id: 3,
      date: '2025-04-17',
      times: [
        { id: 1, time: '09:30', available: true },
        { id: 2, time: '11:30', available: false }, // Booked
        { id: 3, time: '14:30', available: true },
      ],
    },
  ];
  
  export const rooms = [
    { id: 1, name: 'Recording Studio A', rate: 500 },
    { id: 2, name: 'Recording Studio B', rate: 450 },
    { id: 3, name: 'Mixing Room', rate: 400 },
  ];
  
  export const teamMembers = [
    { id: 1, name: 'John Doe', role: 'Producer' },
    { id: 2, name: 'Jane Smith', role: 'Sound Engineer' },
    { id: 3, name: 'Mike Johnson', role: 'Mixing Engineer' },
  ];