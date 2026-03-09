import { Card, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { getWorkouts } from '../api/workout';

const data = [
  { name: 'Strength', value: 60 },
  { name: 'Conditioning', value: 25 },
  { name: 'Mobility', value: 15 },
];

interface DataInterface {
  name: string;
  value: number;
}

const COLORS = ['#6366f1', '#f59e0b', '#14b8a6'];

export default function SplitChart() {
  const [pieData, setPieData] = useState<DataInterface[]>([]);
  useEffect(() => {
    (async () => {
      const map: Record<string, number> = {};
      const data = await getWorkouts();
      data.forEach((w) => {
        if (w.category) {
          map[w.category] = map[w.category] ? 1 : map[w.category] + 1;
        }
      });
      const newData = Object.entries(map).map(([k, v]) => {
        return {
          name: k,
          value: Math.floor((v / data.length) * 100),
        };
      });
      setPieData(newData);
    })();
  }, []);
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Training Split
        </Typography>

        <ResponsiveContainer width='100%' height={300}>
          <PieChart>
            <Pie
              data={pieData}
              innerRadius={70}
              outerRadius={100}
              dataKey='value'
              legendType='circle'
            >
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
