import { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
} from '@mui/material';

import { upsertWellbeing } from '../api/wellbeing';
import Topbar from '../components/Topbar';

export default function CreateWellbeingPage() {
  const [date, setDate] = useState('');
  const [bodyWeight, setBodyWeight] = useState<number | ''>('');
  const [hoursSlept, setHoursSlept] = useState<number | ''>('');
  const [restingHeartRate, setRestingHeartRate] = useState<number | ''>('');
  const [muscleMass, setMuscleMass] = useState<number | ''>('');
  const [fatMass, setFatMass] = useState<number | ''>('');

  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await upsertWellbeing({
        date,
        bodyWeight: bodyWeight || undefined,
        hoursSlept: hoursSlept || undefined,
        restingHeartRate: restingHeartRate || undefined,
        muscleMass: muscleMass || undefined,
        fatMass: fatMass || undefined,
      });

      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert('Error saving wellbeing data');
    }
  }

  return (
    <Container maxWidth='sm'>
      <Topbar title='Add Wellbeing' />

      <Stack spacing={3} component='form' onSubmit={handleSubmit}>
        {success && <Alert severity='success'>Wellbeing entry saved!</Alert>}

        <TextField
          label='Date'
          type='date'
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <TextField
          label='Body Weight'
          type='number'
          value={bodyWeight}
          onChange={(e) =>
            setBodyWeight(e.target.value === '' ? '' : Number(e.target.value))
          }
          inputProps={{ step: 0.1 }}
        />

        <TextField
          label='Sleep (hours)'
          type='number'
          value={hoursSlept}
          onChange={(e) =>
            setHoursSlept(e.target.value === '' ? '' : Number(e.target.value))
          }
          inputProps={{ step: 0.1 }}
        />

        <TextField
          label='Resting Heart Rate'
          type='number'
          value={restingHeartRate}
          onChange={(e) =>
            setRestingHeartRate(
              e.target.value === '' ? '' : Number(e.target.value)
            )
          }
        />

        <TextField
          label='Muscle Mass'
          type='number'
          value={muscleMass}
          onChange={(e) =>
            setMuscleMass(e.target.value === '' ? '' : Number(e.target.value))
          }
          inputProps={{ step: 0.1 }}
        />

        <TextField
          label='Fat Mass'
          type='number'
          value={fatMass}
          onChange={(e) =>
            setFatMass(e.target.value === '' ? '' : Number(e.target.value))
          }
          inputProps={{ step: 0.1 }}
        />

        <Button variant='contained' type='submit' size='large'>
          Save Wellbeing
        </Button>
      </Stack>
    </Container>
  );
}
