import { AppBar, Toolbar, Typography } from '@mui/material';

export default function Topbar({ title }: { title: string }) {
  return (
    <AppBar
      position='static'
      elevation={0}
      sx={{
        bgcolor: 'white',
        color: 'black',
        borderBottom: '1px solid #eee',
      }}
    >
      <Toolbar>
        <Typography variant='h6'>{title}</Typography>
      </Toolbar>
    </AppBar>
  );
}
