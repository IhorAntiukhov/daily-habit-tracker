import { useMemo } from 'react';
import { currentTime } from '../time';

function useCompletionsSeries(habit) {
  return useMemo(() => {
    let currentCompletionSeries = 0;
    if (habit.dates.length > 0) {
      for (let time = (new Date(currentTime)).getTime(); time >= (new Date(habit.dates[0])).getTime(); time -= 8.64e+7) {
        const date = new Date(time);
        const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const stringDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

        if (habit.days.includes(weekDays[date.getDay()]) && habit.dates.includes(stringDate)) {
          currentCompletionSeries += 1;
        } else if (habit.days.includes(weekDays[date.getDay()]) && !habit.dates.includes(stringDate)) {
          break;
        }
      }
    }

    return currentCompletionSeries;
  }, [habit]);
}

export default useCompletionsSeries;
