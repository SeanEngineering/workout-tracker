import { Card, CardContent, Typography } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', volume: 12000 },
  { month: 'Feb', volume: 10000 },
  { month: 'Mar', volume: 8000 },
  { month: 'Apr', volume: 14000 },
  { month: 'May', volume: 6000 },
  { month: 'Jun', volume: 15000 },
];

export default function VolumeChart() {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Training Volume
        </Typography>

        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={data}>
            <XAxis dataKey='month' />
            <YAxis />
            <Tooltip />
            <Bar dataKey='volume' fill='#6366f1' radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
