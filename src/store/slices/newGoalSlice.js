import { createSlice } from '@reduxjs/toolkit';

const newGoalSlice = createSlice({
  name: 'newGoal',
  initialState: {
    goalName: '',
    maxSkips: 0,
    habit: null,
    finalDate: {
      year: '',
      month: '',
      day: ''
    }
  },
  reducers: {
    setGoalName(state, action) {
      state.goalName = action.payload;
    },
    changeMaxSkips(state, action) {
      if (action.payload === 'increase' && state.maxSkips < 5) state.maxSkips += 1;
      else if (action.payload === 'decrease' && state.maxSkips > 0) state.maxSkips -= 1;
    },
    setHabit(state, action) {
      state.habit = action.payload;
    },
    setFinalDate(state, action) {
      state.finalDate[action.payload.input] = action.payload.text;
    },
    setInitialState(state, action) {
      state.goalName = action.payload.name;
      state.maxSkips = action.payload.skips;
      state.habit = action.payload.habit;

      const finalDate = new Date(action.payload.finalDate);

      state.finalDate.year = finalDate.getFullYear();
      state.finalDate.month = String(finalDate.getMonth() + 1).padStart(2, '0');
      state.finalDate.day = String(finalDate.getDate()).padStart(2, '0');
    }
  }
});

export const newGoalReducer = newGoalSlice.reducer;
export const { setGoalName, changeMaxSkips, setHabit, setFinalDate, setInitialState } = newGoalSlice.actions;
