import { Box } from '@mui/material';
import Topbar from '../components/Topbar';
import SalesChart from '../components/VolumeChart';
import TrafficChart from '../components/SplitChart';
import OrdersTable from '../components/WorkoutTable';

import Heatmap from '../components/HeatMap';

export default function Dashboard() {
  const sampleData = [
    { date: '2026-03-01', value: 2 },
    { date: '2026-03-02', value: 1 },
    { date: '2026-03-03', value: 4 },
    { date: '2026-03-05', value: 3 },
  ];

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f8fafc' }}>
      <Box sx={{ flex: 1 }}>
        <Topbar />
        <div className='flex flex-col p-5'>
          {/* Metric Cards */}
          <Heatmap data={sampleData} />
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
