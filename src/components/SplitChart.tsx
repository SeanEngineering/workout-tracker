import { Card, CardContent, Typography } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Strength', value: 60 },
  { name: 'Conditioning', value: 25 },
  { name: 'Mobility', value: 15 },
];

const COLORS = ['#6366f1', '#f59e0b', '#14b8a6'];

export default function SplitChart() {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Training Split
        </Typography>

        <ResponsiveContainer width='100%' height={300}>
          <PieChart>
            <Pie data={data} innerRadius={70} outerRadius={100} dataKey='value'>
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
