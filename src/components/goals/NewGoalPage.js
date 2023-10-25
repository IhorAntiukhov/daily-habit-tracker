import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { useNavigate, useParams } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi';
import { FiTarget } from 'react-icons/fi';
import { addGoal, changeMaxSkips, setFinalDate, setGoalName, setHabit, setInitialState } from '../../store';
import Input from '../input/Input';
import MultipleSelect from '../input/MultipleSelect';
import Icon from '../other/Icon';
import DateInput from '../input/DateInput';
import Button from '../input/Button';

function NewGoalPage() {
  const { goalName, maxSkips, habit, finalDate } = useSelector((state) => state.newGoalReducer);
  const habits = useSelector((state) => state.habitsReducer.habits);
  const goals = useSelector((state) => state.goalsReducer.goals);

  console.log(habit)

  const habitNames = habits.map((habit) => habit.name);
  const habitIds = habits.map((habit) => habit.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!!id) {
      setTimeout(() => {
        const goal = goals.find((goal) => goal.id === id);
        console.log(goal)
        goal.habit = habits.find((habit) => habit.id === goal.habit)?.name;
        dispatch(setInitialState(goal));
      }, 500);
    }
  }, [id, goals, habits, dispatch]);

  const handleAddGoal = () => {
    const now = new Date();
    const creationDate = now.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: '2-digit' });

    const final = new Date(`${finalDate.year}-${finalDate.month}-${finalDate.day}`);
    const finalFormattedDate = final.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: '2-digit' });

    const goal = {
      id: nanoid(), name: goalName,
      skips: maxSkips, habit: habitIds[habitNames.indexOf(habit)],
      finalDate: finalFormattedDate, created: creationDate
    };

    dispatch(addGoal(goal));
    navigate('/goals');
  };

  return (
    <div className="flex flex-col space-y-2 pt-[4.5rem] pb-8 px-4 animate-slide-down sm:pt-4 sm:rounded-xl sm:shadow-lg sm:shadow-neutral-2 sm:overflow-auto sm:bg-[white] lg:min-w-[70%] xl:min-w-[50%]">
      <div className="flex items-center space-x-2">
        <Input value={goalName} onChange={(text) => dispatch(setGoalName(text))} placeholder="Goal name ..." />

        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2">
            <p className="text-2xl text-neutral-4">{maxSkips}</p>
            <div className="flex flex-col">
              <Icon icon={<BiSolidUpArrow className="w-4 h-4 cursor-pointer duration-200 hover:opacity-80"
                onClick={() => dispatch(changeMaxSkips('increase'))} />} color="#898C87" />
              <Icon icon={<BiSolidDownArrow className="w-4 h-4 cursor-pointer duration-200 hover:opacity-80"
                onClick={() => dispatch(changeMaxSkips('decrease'))} />} color="#898C87" />
            </div>
          </div>
          <p className="text-neutral-4">Max skips</p>
        </div>
      </div>

      <div className="flex space-x-4 pb-2">
        <MultipleSelect className="w-full xl:w-1/2" value={habit} onChange={(habit) => dispatch(setHabit(habit))}
          options={habitNames} icon={<FiTarget className="w-6 h-6" />} label="Select habit" singleOption />
        <DateInput value={finalDate} onChange={(date) => dispatch(setFinalDate(date))} label="Final date" />
      </div>

      <Button onClick={handleAddGoal}>
        <Icon icon={<MdAdd className="w-6 h-6" color="white" />} />
        <p className="text-lg text-[white]">Create goal</p>
      </Button>
    </div>
  );
}

export default NewGoalPage;
