import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdAdd, MdArrowBack, MdArrowForward, MdCalendarMonth } from 'react-icons/md';
import classNames from 'classnames';
import {
  setSelectedTemplate, setHabitAdditionStage, setHabitName, toggleHabitDay, setHabitDeadlineTime, setHabitIcon,
  addHabit
} from '../../store';
import habitTemplates from '../../habitTemplates';
import Button from '../input/Button';
import Icon from '../other/Icon';
import Input from '../input/Input';
import MultipleSelect from '../input/MultipleSelect';
import SeparatedInput from '../input/SeparatedInput';
import { nanoid } from '@reduxjs/toolkit';

function NewHabitPage() {
  const {
    selectedTemplate, habitAdditionStage, habitName, habitDays, habitDeadlineTime, habitIcon
  } = useSelector((state) => state.newHabitReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const renderedHabitTemplates = habitTemplates.map((habit) => {
    const habitTemplateClass = classNames(
      'flex', 'flex-col', 'justify-center', 'items-center', 'space-y-2', 'h-full', 'p-2',
      'rounded-xl', 'bg-neutral-2', 'shadow-md', 'border-2', 'duration-200',
      {
        'border-accent shadow-accent': selectedTemplate === habit.name,
        'border-[transparent] shadow-neutral-3': selectedTemplate !== habit.name
      }
    );

    return (
      <div key={habit.name} className={habitTemplateClass} onClick={() => dispatch(setSelectedTemplate(habit.name))}>
        <div className="p-2.5 bg-[white] rounded-full">
          {habit.icon}
        </div>
        <p className="text-center">{habit.name}</p>
      </div>
    );
  });

  const renderedHabitIcons = habitTemplates.map((habit) => {
    const iconClass = classNames(
      'p-2.5', 'bg-neutral-2', 'rounded-full', 'shadow-md', 'border-2', 'animate-slide-down', 'duration-200',
      {
        'border-accent shadow-accent': habitIcon === habit.name,
        'border-[transparent] shadow-neutral-3': habitIcon !== habit.name
      });

    return (
      <div key={habit.name} className={iconClass}
        onClick={() => dispatch(setHabitIcon(habit.name))}>
        {habit.icon}
      </div>
    );
  });

  const handleAddHabit = () => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: '2-digit' });

    const habit = {
      id: nanoid(),
      name: habitName,
      icon: habitIcon,
      days: habitDays,
      time: habitDeadlineTime,
      created: formattedDate,
      dates: []
    };

    dispatch(addHabit(habit));
    navigate('/habits');
  };

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="flex flex-col justify-between h-full pt-[4.5rem] pb-8 px-4 animate-slide-down">
      <div className="flex flex-col space-y-2">
        {habitAdditionStage === 1 && <>
          <p className="self-center text-xl font-bold text-neutral-3 animate-slide-down">Suggested habits</p>
          <div className="self-stretch grid grid-cols-[repeat(auto-fit,_10rem)] gap-3 animate-slide-down">
            {renderedHabitTemplates}
          </div>
        </>}

        {habitAdditionStage === 2 && <>
          <Input value={habitName} onChange={(text) => dispatch(setHabitName(text))} placeholder="Habit name ..." />

          <div className="flex space-x-2">
            <MultipleSelect className="w-full" value={habitDays} onChange={(day) => dispatch(toggleHabitDay(day))}
              options={weekDays} icon={<MdCalendarMonth className="w-6 h-6" />} label="Habit days" />
            <SeparatedInput value={habitDeadlineTime} onChange={(time) => dispatch(setHabitDeadlineTime(time))} label="Deadline time" />
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-2 mx-4">
            {renderedHabitIcons}
          </div>
        </>}
      </div>

      {habitAdditionStage === 1 &&
        <Button className="self-end" onClick={() => dispatch(setHabitAdditionStage('next'))}>
          <p className="text-lg text-[white]">Next</p>
          <Icon icon={<MdArrowForward className="w-6 h-6" color="white" />} />
        </Button>}

      {habitAdditionStage === 2 &&
        <div className="flex justify-between space-x-2">
          <Button onClick={() => dispatch(setHabitAdditionStage('back'))}>
            <Icon icon={<MdArrowBack className="w-6 h-6" color="white" />} />
            <p className="text-lg text-[white]">Back</p>
          </Button>

          <Button onClick={handleAddHabit}>
            <Icon icon={<MdAdd className="w-6 h-6" color="white" />} />
            <p className="text-lg text-[white]">Create habit</p>
          </Button>
        </div>}
    </div>
  );
}

export default NewHabitPage;
