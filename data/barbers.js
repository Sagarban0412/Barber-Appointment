export const barbersData = [
  {
    id: 1,
    name: "John Smith",
    specialties: ["Classic Cuts", "Beard Styling"],
    experience: "8 years",
    rating: 4.9,
    schedule: {
      monday: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30"],
      tuesday: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30"],
      wednesday: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30"],
      thursday: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30"],
      friday: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30"],
      saturday: ["10:00", "10:30", "11:00", "11:30", "16:00", "16:30", "17:00", "17:30"],
      sunday: []
    }
  },
  {
    id: 2,
    name: "Mike Johnson",
    specialties: ["Modern Cuts", "Hot Towel Shave"],
    experience: "12 years",
    rating: 4.8,
    schedule: {
      monday: ["10:00", "10:30", "11:00", "11:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"],
      tuesday: ["10:00", "10:30", "11:00", "11:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"],
      wednesday: ["10:00", "10:30", "11:00", "11:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"],
      thursday: ["10:00", "10:30", "11:00", "11:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"],
      friday: ["10:00", "10:30", "11:00", "11:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"],
      saturday: ["09:00", "09:30", "10:00", "10:30", "14:00", "14:30", "15:00", "15:30"],
      sunday: ["12:00", "12:30", "14:00", "14:30", "15:00", "15:30"]
    }
  },
  {
    id: 3,
    name: "David Wilson",
    specialties: ["All Services", "Premium Packages"],
    experience: "15 years",
    rating: 5.0,
    schedule: {
      monday: ["09:00", "09:30", "10:00", "10:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"],
      tuesday: ["09:00", "09:30", "10:00", "10:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"],
      wednesday: ["09:00", "09:30", "10:00", "10:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"],
      thursday: ["09:00", "09:30", "10:00", "10:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"],
      friday: ["09:00", "09:30", "10:00", "10:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"],
      saturday: ["11:00", "11:30", "12:00", "12:30", "16:00", "16:30", "17:00", "17:30"],
      sunday: []
    }
  }
];

export const getDayName = (dateString) => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const date = new Date(dateString);
  return days[date.getDay()];
};

export const getAvailableTimeSlots = (barberId, selectedDate) => {
  if (!barberId || !selectedDate) return [];
  
  const barber = barbersData.find(b => b.id === parseInt(barberId));
  if (!barber) return [];
  
  const dayName = getDayName(selectedDate);
  return barber.schedule[dayName] || [];
};