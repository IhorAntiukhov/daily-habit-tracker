import { Route, Routes } from 'react-router-dom';
import NavDrawer from './components/navigation/NavDrawer';
import HabitsPage from './components/habits/HabitsPage';
import NewHabitPage from './components/habits/NewHabitPage';

function App() {
  return (
    <div className="relative h-screen bg-neutral-1">
      <NavDrawer />
      <Routes>
        <Route path="/habits/*">
          <Route index element={<HabitsPage />} />
          <Route path="new-habit" element={<NewHabitPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
