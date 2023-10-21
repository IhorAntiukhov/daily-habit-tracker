import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {
  newHabitReducer, setSelectedTemplate, setHabitAdditionStage, setHabitName, toggleHabitDay, setHabitDeadlineTime, setHabitIcon
} from './slices/newHabitSlice';
import {
  habitsReducer, setSortingCriteria, addHabit, editHabit, deleteHabit
} from './slices/habitsSlice';

const rootReducer = combineReducers({
  newHabitReducer,
  habitsReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['habitsReducer'],
  stateReconciler: autoMergeLevel2,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    });
  }
});

export const persistor = persistStore(store);
export {
  store, setSortingCriteria, setSelectedTemplate, setHabitAdditionStage, setHabitName, toggleHabitDay, setHabitDeadlineTime, setHabitIcon,
  addHabit, editHabit, deleteHabit
};
