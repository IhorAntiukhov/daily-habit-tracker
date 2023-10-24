import { Route, Routes } from 'react-router-dom';
import NavDrawer from './components/navigation/NavDrawer';
import HabitsPage from './components/habits/HabitsPage';
import NewHabitPage from './components/habits/NewHabitPage';
import TodaysHabitsPage from './components/habits/TodaysHabitsPage';
import TotalProgressPage from './components/progress/TotalProgressPage';
import GoalsPage from './components/goals/GoalsPage';
import NewGoalPage from './components/goals/NewGoalPage';

function App() {
  return (
    <div className="relative h-screen bg-neutral-1">
      <NavDrawer />
      <Routes>
        <Route index element={<TodaysHabitsPage />} />
        <Route path="/habits/*">
          <Route index element={<HabitsPage />} />
          <Route path="new-habit" element={<NewHabitPage />} />
          <Route path="edit-habit/:id" element={<NewHabitPage />} />
        </Route>
        <Route path="/progress" element={<TotalProgressPage />} />
        <Route path="/goals/*">
          <Route index element={<GoalsPage />} />
          <Route path="new-goal" element={<NewGoalPage />} />
          <Route path="edit-goal/:id" element={<NewGoalPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
