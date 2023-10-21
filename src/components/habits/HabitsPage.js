import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { setSortingCriteria } from '../../store';
import SelectSorting from '../input/SelectSorting';
import Button from '../input/Button';
import Icon from '../other/Icon';
import habitTemplates from '../../habitTemplates';

function HabitsPage() {
  const { habits, sortingCriteria, sortingOrder } = useSelector((state) => state.habitsReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (criteria, order) => {
    dispatch(setSortingCriteria({ criteria, order }));
  }

  const renderedHabits = habits.map((habit) => {
    const icon = habitTemplates.find((templateHabit) => templateHabit.name === habit.icon)?.icon;

    return (
      <div className="flex justify-between items-center w-full px-4 pt-1 pb-2 rounded-xl bg-neutral-2 shadow-md shadow-neutral-3 animate-slide-down">
        <div className="flex flex-col space-y-1">
          <p className="text-neutral-3">{habit.created}</p>
          <div className="flex space-x-2">
            {icon}
            <p>{habit.name}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <p className="text-2xl text-neutral-3">0</p>
          <p className="text-2xl text-neutral-3">0</p>
        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-col justify-between h-full pt-[4.5rem] pb-8 px-4">
      <div className="flex flex-col items-center space-y-2">
        <SelectSorting criteria={sortingCriteria} order={sortingOrder}
          onChange={handleChange} options={['Date', 'Total days', 'Current streak', 'Total passes']} />
        {renderedHabits}
      </div>

      <Button className="self-center px-2 py-2" onClick={() => navigate('/habits/new-habit')}>
        <Icon icon={<MdAdd className="w-6 h-6" />} color="white" />
      </Button>
    </div>
  );
}

export default HabitsPage;
