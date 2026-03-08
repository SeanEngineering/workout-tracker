import { Card, CardContent, Typography, Box } from '@mui/material';
import { type ReactNode } from 'react';

interface Props {
  title: string;
  value: string;
  icon: ReactNode;
}

export default function MetricCard({ title, value, icon }: Props) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography color='text.secondary'>{title}</Typography>
          <Typography variant='h4'>{value}</Typography>
        </Box>

        <Box
          sx={{
            bgcolor: '#6366f1',
            color: 'white',
            width: 44,
            height: 44,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
      </CardContent>
    </Card>
  );
}
