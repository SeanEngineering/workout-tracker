import type { RouteProps } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import CreateWorkoutPage from '../pages/CreateWorkout';
import CreateExercisePage from '../pages/CreateExercise';
import CreateWellbeingPage from '../pages/CreateWellbeing';

type RouteWithDisplay = RouteProps & {
  displayName: string;
};

export const routes: RouteWithDisplay[] = [
  {
    path: '/',
    element: <Dashboard />,
    displayName: 'Dashboard',
  },
  {
    path: '/workouts',
    element: <Dashboard />,
    displayName: 'Workouts',
  },
  {
    path: '/sets',
    element: <Dashboard />,
    displayName: 'Sets',
  },
  {
    path: '/exercise',
    element: <Dashboard />,
    displayName: 'Exercises',
  },
  {
    path: '/wellbeing',
    element: <CreateWellbeingPage />,
    displayName: 'Add Wellbeing Stats',
  },
  {
    path: '/new',
    element: <CreateWorkoutPage />,
    displayName: 'Add Workout',
  },
  {
    path: '/new-exercise',
    element: <CreateExercisePage />,
    displayName: 'Add Exercise',
  },
];
