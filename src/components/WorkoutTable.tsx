import { DataGrid } from '@mui/x-data-grid';
import { Card, CardContent, Typography } from '@mui/material';

const columns: unknown[] = [
  { field: 'date', headerName: 'Date', width: 120 },
  { field: 'exercise', headerName: 'Exercise', width: 180 },
  { field: 'sets', headerName: 'Sets', width: 100 },
  { field: 'reps', headerName: 'Reps', width: 100 },
  { field: 'weight', headerName: 'Weight', width: 120 },
];

const rows = [
  {
    id: 1,
    date: 'Jun 26',
    exercise: 'Bench Press',
    sets: 5,
    reps: 5,
    weight: 100,
  },
  { id: 2, date: 'Jun 27', exercise: 'Squat', sets: 5, reps: 5, weight: 140 },
];

export default function WorkoutTable() {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Workout Log
        </Typography>

        <div style={{ height: 300 }}>
          <DataGrid rows={rows} columns={columns as any} />
        </div>
      </CardContent>
    </Card>
  );
}
