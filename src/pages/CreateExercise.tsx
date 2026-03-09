import { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
} from '@mui/material';
import { createExercise } from '../api/exercise';
import Topbar from '../components/Topbar';

export default function CreateExercisePage() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await createExercise({
        name,
        category,
      });

      setSuccess(true);
      setName('');
      setCategory('');
    } catch (err) {
      console.error(err);
      alert('Error creating exercise');
    }
  }

  return (
    <Container maxWidth='sm'>
      <Topbar title='Add Exercise' />

      <Stack spacing={3} component='form' onSubmit={handleSubmit}>
        {success && (
          <Alert severity='success'>Exercise created successfully!</Alert>
        )}

        <TextField
          label='Exercise Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
        />

        <TextField
          label='Category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder='e.g. chest, legs, cardio'
          fullWidth
        />

        <Button variant='contained' type='submit' size='large'>
          Create Exercise
        </Button>
      </Stack>
    </Container>
  );
}
