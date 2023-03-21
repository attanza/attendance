import moment from 'moment';
import holidays from '../holidays.json' assert { type: 'json' };

export const workDay = () => {
  // Check if not Saturday / Sunday
  const today = moment().weekday();
  const workingDays = [1, 2, 3, 4, 5];
  if (workingDays.includes(today)) {
    return true;
  }
  // Check if not holiday
  const todayDate = moment().format('DD-MM-YYYY');
  const isHoliday = holidays.includes(todayDate.toString());
  if (!isHoliday) {
    return true;
  }
  return false;
};

// minggu 0
// Senin 1
// Selasa 2
// Rabu 3
// kamis 4
// jumat 5
// Sabtu 6
