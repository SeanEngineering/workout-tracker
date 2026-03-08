import { Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import { routes } from './app/routes';

function App() {
  return (
    <div className='flex'>
      <Sidebar />
      <Routes>
        {routes.map((item) => (
          <Route {...item} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
