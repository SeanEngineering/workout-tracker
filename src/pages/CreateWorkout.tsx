import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Card,
  CardContent,
  MenuItem,
  IconButton,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { createSets } from '../api/set';
import { getExercises } from '../api/exercise';

import { createWorkout } from '../api/workout';
import type { Exercise, Set } from '../db/models';
import Topbar from '../components/Topbar';

export default function CreateWorkoutPage() {
  const [date, setDate] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [maxHeartRate, setMaxHeartRate] = useState(0);
  const [avgHeartRate, setAvgHeartRate] = useState(0);
  const [sessionRpe, setSessionRpe] = useState(7);
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('strength');

  const [exercises, setExercises] = useState<Exercise[]>([]);

  const [sets, setSets] = useState<Set[]>([
    { workoutId: 0, exerciseId: 0, reps: 0, weight: 0 },
  ]);

  useEffect(() => {
    async function loadExercises() {
      const data = await getExercises();
      setExercises(data);
    }

    loadExercises();
  }, []);

  function addSet() {
    setSets([
      ...sets,
      {
        workoutId: 0,
        exerciseId: 0,
        reps: 0,
        weight: 0,
        distance: 0,
        timeSeconds: 0,
        setCount: 1,
      },
    ]);
  }

  function removeSet(index: number) {
    setSets(sets.filter((_, i) => i !== index));
  }

  function updateSet(index: number, field: keyof Set, value: number) {
    const updated = [...sets];
    updated[index] = { ...updated[index], [field]: value };
    setSets(updated);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const workout = await createWorkout({
        date,
        durationMinutes,
        sessionRpe,
        notes,
        category,
        avgHeartRate,
        maxHeartRate,
      });

      const setsWithWorkout = sets.map((s) => ({
        ...s,
        workoutId: workout.id,
      }));

      await createSets(setsWithWorkout);

      alert('Workout saved!');
    } catch (err) {
      console.error(err);
      alert('Error saving workout');
    }
  }

  return (
    <Container maxWidth='md'>
      <Topbar title='Add Workout' />

      <Stack spacing={3} component='form' onSubmit={handleSubmit}>
        <TextField
          label='Date'
          type='date'
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <Stack direction='row' spacing={2}>
          <TextField
            label='Duration (minutes)'
            type='number'
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(Number(e.target.value))}
            fullWidth
          />

          <TextField
            label='Session RPE'
            type='number'
            value={sessionRpe}
            onChange={(e) => setSessionRpe(Number(e.target.value))}
            fullWidth
          />
        </Stack>

        <TextField
          label='Category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <TextField
          label='Notes'
          multiline
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <TextField
          label='Average Heart Rate'
          type='number'
          value={avgHeartRate}
          onChange={(e) => setAvgHeartRate(Number(e.target.value))}
        />

        <TextField
          label='Max Heart Rate'
          type='number'
          value={maxHeartRate}
          onChange={(e) => setMaxHeartRate(Number(e.target.value))}
        />

        <Typography variant='h5'>Sets</Typography>

        {sets.map((set, i) => (
          <Card key={i}>
            <CardContent>
              <Stack direction='row' spacing={1} alignItems='center'>
                <TextField
                  select
                  label='Exercise'
                  value={set.exerciseId}
                  onChange={(e) =>
                    updateSet(i, 'exerciseId', Number(e.target.value))
                  }
                  sx={{ minWidth: 180 }}
                >
                  {exercises.map((ex) => (
                    <MenuItem key={ex.id} value={ex.id}>
                      {ex.name}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label='Reps'
                  type='number'
                  value={set.reps}
                  onChange={(e) => updateSet(i, 'reps', Number(e.target.value))}
                />

                <TextField
                  label='Weight'
                  type='number'
                  value={set.weight}
                  onChange={(e) =>
                    updateSet(i, 'weight', Number(e.target.value))
                  }
                />

                <TextField
                  label='Distance'
                  type='number'
                  value={set.distance}
                  onChange={(e) =>
                    updateSet(i, 'distance', Number(e.target.value))
                  }
                />

                <TextField
                  label='Time (sec)'
                  type='number'
                  value={set.timeSeconds}
                  onChange={(e) =>
                    updateSet(i, 'timeSeconds', Number(e.target.value))
                  }
                />

                <TextField
                  label='Set count'
                  type='number'
                  value={set.setCount}
                  onChange={(e) =>
                    updateSet(i, 'setCount', Number(e.target.value))
                  }
                />

                <IconButton onClick={() => removeSet(i)}>
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </CardContent>
          </Card>
        ))}

        <Button variant='outlined' startIcon={<AddIcon />} onClick={addSet}>
          Add Set
        </Button>

        <Button variant='contained' type='submit' size='large'>
          Save Workout
        </Button>
      </Stack>
    </Container>
  );
}
