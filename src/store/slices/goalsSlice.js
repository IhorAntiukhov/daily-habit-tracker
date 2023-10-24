import { createSlice } from '@reduxjs/toolkit'

const goalsSlice = createSlice({
  name: 'goals',
  initialState: {
    goals: []
  },
  reducers: {
    addGoal(state, action) {
      state.goals.push(action.payload);
    }
  }
});

export const goalsReducer = goalsSlice.reducer;
export const { addGoal } = goalsSlice.actions;
