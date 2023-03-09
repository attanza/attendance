import moment from 'moment';

export const workDay = () => {
  const today = moment().weekday();
  const workingDays = [1, 2, 3, 4, 5];
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
