import moment from 'moment';
import holidays from '../holidays.json' assert { type: 'json' };

export const workDay = () => {
  // Check if not holiday
  const todayDate = moment().format('DD-MM-YYYY');
  const isHoliday = holidays.includes(todayDate.toString());
  console.log('check if Holiday: ', isHoliday);
  if (isHoliday) {
    return false;
  }
  // Check if not Saturday / Sunday
  const today = moment().weekday();
  const workingDays = [1, 2, 3, 4, 5];
  console.log('Check if Working day: ', workingDays.includes(today));
  if (workingDays.includes(today)) {
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
