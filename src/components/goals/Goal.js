import { useSelector } from 'react-redux';
import { MdCheck, MdClose } from 'react-icons/md';
import { FiTarget } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import habitTemplates from '../../habitTemplates';
import Icon from '../other/Icon';
import { currentTime } from '../../time';

function Goal({ data }) {
  const habits = useSelector((state) => state.habitsReducer.habits);

  const habit = habits.find((habit) => habit.id === data.habit);
  const habitIcon = habitTemplates.find((templateHabit) => templateHabit.name === habit.icon)?.icon;

  const daysLeft = ((new Date(data.finalDate)).getTime() - (new Date(currentTime)).getTime()) / (1000 * 3600 * 24);
  const totalDays = ((new Date(data.finalDate)).getTime() - (new Date(data.created)).getTime()) / (1000 * 3600 * 24);

  const startTime = ((new Date(currentTime)).getTime() > (new Date(data.finalDate)).getTime()) ?
    (new Date(data.finalDate)).getTime() :
    (new Date(currentTime)).getTime();
  let habitSkips = 0;

  for (let time = startTime; time >= (new Date(habit.dates[0])).getTime(); time -= 8.64e+7) {
    const date = new Date(time);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const stringDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart('0', 2)}`;

    if (habit.days.includes(weekDays[date.getDay()]) && !habit.dates.includes(stringDate)) {
      habitSkips += 1;
    }
  }

  let goalIcon;
  if (Math.ceil(daysLeft) <= 0 && habitSkips <= data.skips) {
    goalIcon = <MdCheck className="w-8 h-8" title="Goal achieved" />
  } else if (Math.ceil(daysLeft) > 0 && habitSkips <= data.skips) {
    goalIcon = <FiTarget className="w-8 h-8" title="Goal is active" />
  } else if (habitSkips > data.skips) {
    goalIcon = <MdClose className="w-8 h-8" title="Goal not achieved" />
  }

  return (
    <div className="flex items-center space-x-2 w-full pl-4 pr-2 bg-neutral-2 rounded-xl shadow-md shadow-neutral-3">
      {goalIcon}

      <div className="grow flex flex-col pt-1 pb-2">
        <p className="text-neutral-4">{data.finalDate}</p>
        <div className="flex items-center space-x-2">
          {habitIcon}
          <p>{habit.name}</p>
        </div>
      </div>

      <div className="flex flex-col items-center -space-y-1">
        <p className="text-2xl text-neutral-4">{(Math.ceil(daysLeft) > 0) ? Math.ceil(daysLeft) : Math.ceil(totalDays)}</p>
        <p className="text-neutral-4">{(Math.ceil(daysLeft) > 0) ? 'Days left' : 'Total days'}</p>
      </div>

      <Link to={`/goals/edit-goal/${data.id}`}>
        <Icon icon={<MdEdit className="w-8 h-8" />} color="#3A4874" />
      </Link>
    </div>
  );
}

export default Goal;