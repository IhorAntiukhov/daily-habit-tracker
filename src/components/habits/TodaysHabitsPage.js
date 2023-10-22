import { useSelector } from 'react-redux';
import Habit from './Habit';

function TodaysHabitsPage() {
  const habits = useSelector((state) => state.habitsReducer.habits);

  const getTodayDate = () => {
    const now = new Date();
    return `${now.getDate()}.${now.getMonth()}.${now.getFullYear()}`;
  }

  const toDoHabits = habits.filter((habit) => {
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const now = new Date();
    return habit.days.includes(weekDays[now.getDay()]) && !habit.dates.includes(getTodayDate());
  });

  const completedHabits = habits.filter((habit) => {
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const now = new Date();
    return habit.days.includes(weekDays[now.getDay()]) && habit.dates.includes(getTodayDate());
  });

  const renderedToDoHabits = toDoHabits.map((habit) => <Habit key={habit.id} data={habit} todaysHabit />);
  const renderedCompletedHabits = completedHabits.map((habit) => <Habit key={habit.id} data={habit} todaysHabit />);

  return (
    <div className="flex flex-col space-y-8 pt-[4.5rem] pb-8 px-4">
      <div className="flex flex-col space-y-4">
        <p className="-mx-4 px-4 pb-1 text-lg font-bold text-neutral-4 border-b-[1.5px] border-neutral-3 animate-slide-down">
          To do
        </p>
        <div className="flex flex-col space-y-2">
          {(renderedToDoHabits.length > 0) ?
            renderedToDoHabits :
            <p className="text-center font-bold text-neutral-4">No habits for today</p>}
        </div>
      </div>

      {renderedToDoHabits.length > 0 &&
        <div className="flex flex-col space-y-4">
          <p className="-mx-4 px-4 pb-1 text-lg font-bold text-neutral-4 border-b-[1.5px] border-neutral-3 animate-slide-down">
            Completed
          </p>
          <div className="flex flex-col space-y-2">
            {(renderedCompletedHabits.length > 0) ?
              renderedCompletedHabits :
              <p className="text-center font-bold text-neutral-4">You haven't completed a single habit</p>}
          </div>
        </div>}
    </div>
  );
}

export default TodaysHabitsPage;
