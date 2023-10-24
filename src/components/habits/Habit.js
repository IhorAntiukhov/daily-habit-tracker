import classNames from 'classnames';
import habitTemplates from '../../habitTemplates';
import Icon from '../other/Icon';
import { MdCheck } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { toggleHabitCompletion } from '../../store';
import { currentTime } from '../../time';
import useCompletionsSeries from '../../hooks/use-completions-series';

function Habit({ data, todaysHabit }) {
  const dispatch = useDispatch();

  const icon = habitTemplates.find((templateHabit) => templateHabit.name === data.icon)?.icon;
  const deadlineTime =
    `${(data.time.slice(0, data.time.indexOf(':'))).padStart(2, '0')}:${data.time.slice(data.time.indexOf(':') + 1).padStart(2, '0')} `;
  const currentCompletionSeries = useCompletionsSeries(data);

  const getTodayDate = () => {
    const now = new Date(currentTime);
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }

  const compareTime = () => {
    if (data.time) {
      const now = new Date(currentTime);
      const nowTime = now.getHours() * 60 + now.getMinutes();
      const deadlineTime = Number(data.time.slice(0, data.time.indexOf(':'))) * 60 + Number(data.time.slice(data.time.indexOf(':') + 1));

      return (deadlineTime - nowTime) >= 0;
    } else {
      return true;
    }
  }

  const handleCompleteHabit = () => {
    if (compareTime()) {
      dispatch(toggleHabitCompletion({
        id: data.id, date: getTodayDate()
      }));
    }
  }

  const habitClass = classNames(
    'flex', 'items-center', 'space-x-2', 'w-full', 'px-4',
    'rounded-xl', 'bg-neutral-2', 'shadow-md', 'shadow-neutral-3',
    { 'opacity-60': !compareTime() && todaysHabit });

  const completeHabitButtonClass = classNames(
    'p-1', 'bg-primary-brighter', 'rounded-full', 'border-2', 'border-primary-main', 'duration-200',
    { 'active:scale-90': compareTime() });

  return (
    <div className={habitClass}>
      {todaysHabit &&
        <div className={completeHabitButtonClass} onClick={handleCompleteHabit}>
          <div className="w-4 h-4">
            {data.dates.includes(getTodayDate()) &&
              <Icon icon={<MdCheck className="w-4 h-4" />} color="white" />}
          </div>
        </div>}
      <div className="grow flex justify-between items-center">
        <div className="flex flex-col pt-1 pb-2">
          <p className="text-neutral-4">Deadline: {(data.time) ? deadlineTime : 'full day'}</p>
          <div className="flex space-x-2">
            {icon}
            <p>{data.name}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <p className="text-2xl text-neutral-4">{data.dates.length}</p>
          <p className="text-2xl text-neutral-4">{currentCompletionSeries}</p>
        </div>
      </div>
    </div>
  );
}

export default Habit;
