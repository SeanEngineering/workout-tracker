import type { RouteProps } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';

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
    path: '/recovery',
    element: <Dashboard />,
    displayName: 'Recovery',
  },
];
