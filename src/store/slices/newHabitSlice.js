import { createSlice } from '@reduxjs/toolkit';

const newHabitSlice = createSlice({
  name: 'newHabit',
  initialState: {
    selectedTemplate: null,
    habitAdditionStage: 1,
    habitName: '',
    habitDays: [],
    habitDeadlineTime: '',
    habitIcon: null
  },
  reducers: {
    setSelectedTemplate(state, action) {
      state.selectedTemplate = (action.payload === state.selectedTemplate) ? null : action.payload;
      state.habitName = action.payload;
      state.habitIcon = action.payload;
    },
    setHabitAdditionStage(state, action) {
      if (action.payload === 'next') {
        state.habitAdditionStage = 2;
        if (state.selectedTemplate) state.habitName = state.selectedTemplate;
      }
      if (action.payload === 'back') state.habitAdditionStage = 1;
    },
    setHabitName(state, action) {
      state.habitName = action.payload;
    },
    toggleHabitDay(state, action) {
      state.habitDays = (state.habitDays.includes(action.payload)) ?
        [...state.habitDays.filter((option) => option !== action.payload)] :
        [...state.habitDays, action.payload];
    },
    setHabitDeadlineTime(state, action) {
      const colonIndex = state.habitDeadlineTime.indexOf(':');
      if (action.payload.input === 'hours') {
        state.habitDeadlineTime = `${action.payload.text}:${state.habitDeadlineTime.slice(colonIndex + 1)}`;
      } else if (action.payload.input === 'minutes') {
        state.habitDeadlineTime = `${state.habitDeadlineTime.slice(0, colonIndex)}:${action.payload.text}`;
      }
    },
    setHabitIcon(state, action) {
      state.habitIcon = action.payload;
    }
  }
});

export const newHabitReducer = newHabitSlice.reducer;
export const {
  setSortingCriteria, setSelectedTemplate, setHabitAdditionStage, setHabitName, toggleHabitDay, setHabitDeadlineTime, setHabitIcon
} = newHabitSlice.actions;
