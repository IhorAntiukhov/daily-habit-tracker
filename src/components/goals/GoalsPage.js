import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import Goal from './Goal';
import Button from '../input/Button';
import Icon from '../other/Icon';

function GoalsPage() {
  const goals = useSelector((state) => state.goalsReducer.goals);
  const navigate = useNavigate();

  const renderedGoals = goals.map((goal) => <Goal key={goal.id} data={goal} />);

  return (
    <div className="flex flex-col justify-between space-y-8 h-full pt-[4.5rem] pb-8 px-4 animate-slide-down sm:h-auto sm:pt-4 sm:rounded-xl sm:shadow-lg sm:shadow-neutral-2 sm:overflow-auto sm:bg-[white] lg:min-w-[70%] xl:min-w-[50%]">
      <div className="flex flex-col space-y-2">
        {(goals.length > 0) ?
          renderedGoals :
          <p className="text-center font-bold text-neutral-4">You haven't added any goals</p>}
      </div>

      <Button className="self-center" onClick={() => navigate('/goals/new-goal')} equalPaddings>
        <Icon icon={<MdAdd className="w-8 h-8" />} color="white" />
      </Button>
    </div>
  );
}

export default GoalsPage;
