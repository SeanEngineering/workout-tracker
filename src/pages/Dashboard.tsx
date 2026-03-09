import { Box } from '@mui/material';
import Topbar from '../components/Topbar';
import SalesChart from '../components/VolumeChart';
import TrafficChart from '../components/SplitChart';
import OrdersTable from '../components/WorkoutTable';

import Heatmap from '../components/HeatMap';
import { useEffect, useState } from 'react';
import { getWorkouts } from '../api/workout';

export default function Dashboard() {
  const [workoutData, setWorkoutData] = useState([]);
  const sampleData = [
    { date: '2026-03-01', value: 2 },
    { date: '2026-03-02', value: 1 },
    { date: '2026-03-03', value: 4 },
    { date: '2026-03-05', value: 3 },
  ];

  useEffect(() => {
    (async () => {
      const workouts = await getWorkouts();
      const temp = workouts.map((wo) => {
        return {
          date: wo.date,
          value: Math.floor(wo.durationMinutes! / 30),
        };
      });
      setWorkoutData(temp);
    })();
  }, []);

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f8fafc' }}>
      <Box sx={{ flex: 1 }}>
        <Topbar title='Dashboard' />
        <div className='flex flex-col p-5'>
          {/* Metric Cards */}
          <Heatmap data={workoutData} />
          {/* Charts */}

          <SalesChart />
          <TrafficChart />

          {/* Table */}

          <OrdersTable />
        </div>
      </Box>
    </Box>
  );
}
