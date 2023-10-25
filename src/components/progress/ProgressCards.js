import { useSelector } from 'react-redux';
import { currentTime } from '../../time';
import ProgressCardsItem from './ProgressCardsItem';

function ProgressCards() {
  const habits = useSelector((state) => state.habitsReducer.habits);

  const getCompletionsSeries = (habit) => {
    let completionsSeries = 0;
    if (habit.dates.length > 0) {
      for (let time = (new Date(currentTime)).getTime(); time >= (new Date(habit.dates[0])).getTime(); time -= 8.64e+7) {
        const date = new Date(time);
        const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const stringDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

        if (habit.days.includes(weekDays[date.getDay()]) && habit.dates.includes(stringDate)) {
          completionsSeries += 1;
        } else if (habit.days.includes(weekDays[date.getDay()]) && !habit.dates.includes(stringDate)) {
          break;
        }
      }
    }
    return completionsSeries;
  }

  const sortedHabits = [...habits];
  const bestCompletions = sortedHabits.sort((habit1, habit2) => habit2.dates.length - habit1.dates.length)[0];
  const bestCompletionsSeries = sortedHabits.sort((habit1, habit2) => getCompletionsSeries(habit2) - getCompletionsSeries(habit1))[0];
  const totalCompletions = habits.reduce((accumulator, habit) => accumulator += habit.dates.length, 0);
  const totalSkips = habits.reduce((accumulator, habit) => {
    let skips = 0;
    for (let time = (new Date(currentTime)).getTime(); time >= (new Date(habit.dates[0])).getTime(); time -= 8.64e+7) {
      const date = new Date(time);
      const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const stringDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart('0', 2)}`;

      if (habit.days.includes(weekDays[date.getDay()]) && !habit.dates.includes(stringDate)) {
        skips += 1;
      }
    }
    return accumulator += skips;
  }, 0);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(8rem,_1fr))] place-content-center gap-3 pb-8 px-4 xl:grid-cols-[repeat(2,_minmax(8rem,_1fr))] xl:pb-0">
      <ProgressCardsItem label="Best checks" value={bestCompletions.dates.length} habit={bestCompletions} />
      <ProgressCardsItem label="Best checks series" value={bestCompletionsSeries.dates.length} habit={bestCompletionsSeries} />
      <ProgressCardsItem label="Total checks" value={totalCompletions} />
      <ProgressCardsItem label="Total skips" value={totalSkips} />
    </div>
  );
}

export default ProgressCards;
