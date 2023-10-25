import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { setSortingCriteria } from '../../store';
import SelectSorting from '../input/SelectSorting';
import Button from '../input/Button';
import Icon from '../other/Icon';
import Habit from './Habit';

function HabitsPage() {
  const { habits, sortingCriteria, sortingOrder } = useSelector((state) => state.habitsReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (criteria, order) => {
    dispatch(setSortingCriteria({ criteria, order }));
  }

  const renderedHabits = habits.map((habit) => <Habit key={habit.id} data={habit} />);

  return (
    <div className="flex flex-col justify-between space-y-8 h-full pt-[4.5rem] pb-8 px-4 animate-slide-down sm:h-auto sm:pt-4 sm:rounded-xl sm:shadow-lg sm:shadow-neutral-2 sm:overflow-auto sm:bg-[white] lg:min-w-[70%] xl:min-w-[50%]">
      <div className="flex flex-col space-y-2">
        {(habits.length > 0) ?
          <>
            <SelectSorting criteria={sortingCriteria} order={sortingOrder}
              onChange={handleChange} options={['Date', 'Total days', 'Current streak', 'Total passes']} />
            {renderedHabits}
          </> :
          <p className="text-center font-bold text-neutral-4">You haven't added any habits</p>}
      </div>

      <Button className="self-center" onClick={() => navigate('/habits/new-habit')} equalPaddings>
        <Icon icon={<MdAdd className="w-8 h-8" />} color="white" />
      </Button>
    </div>
  );
}

export default HabitsPage;
