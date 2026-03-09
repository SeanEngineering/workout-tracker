import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { routes } from '../app/routes';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getWorkouts } from '../api/workout';

export default function Sidebar() {
  const navigate = useNavigate();

  useEffect(() => {
    getWorkouts();
  }, []);

  return (
    <Box
      sx={{
        width: 240,
        bgcolor: '#0f172a',
        color: 'white',
        height: '100vh',
        p: 2,
      }}
    >
      <Typography variant='h6' sx={{ mb: 4 }}>
        WorkoutLab
      </Typography>

      <List>
        {routes.map((item) => (
          <ListItemButton
            key={item.path}
            sx={{
              borderRadius: 2,
              mb: 1,
              '&:hover': { bgcolor: '#1e293b' },
            }}
            onClick={() => navigate(item.path!)}
          >
            <ListItemText primary={item.displayName} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
