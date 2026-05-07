const BUFFER_MINUTES = 10;

export const generateTimeSlots = (start, end, durationMinutes) => {
  const slots = [];
  const slotInterval = durationMinutes + BUFFER_MINUTES;

  const [startH, startM] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);

  let current = startH * 60 + startM;
  const endTotal = endH * 60 + endM;

  while (current + durationMinutes <= endTotal) {
    const h = Math.floor(current / 60).toString().padStart(2, "0");
    const m = (current % 60).toString().padStart(2, "0");
    slots.push(`${h}:${m}`);
    current += slotInterval;
  }

  return slots;
};
 

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