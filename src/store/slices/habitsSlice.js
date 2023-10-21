import { createSlice } from '@reduxjs/toolkit';

const habitsSlice = createSlice({
  name: 'habits',
  initialState: {
    sortingCriteria: 'Date',
    sortingOrder: null,
    habits: []
  },
  reducers: {
    setSortingCriteria(state, action) {
      state.sortingCriteria = action.payload.criteria;
      state.sortingOrder = action.payload.order;
    },
    addHabit(state, action) {
      state.habits.push(action.payload);
    },
    editHabit(state, action) {
      state.habits = [...state.habits.map((habit) => {
        if (habit.id === action.payload.id) return action.payload;
        else return habit;
      })];
    },
    deleteHabit(state, action) {
      state.habits = [...state.habits.filter((habit) => habit.id !== action.payload)];
    }
  }
});

export const habitsReducer = habitsSlice.reducer;
export const { setSortingCriteria, addHabit, editHabit, deleteHabit } = habitsSlice.actions;
