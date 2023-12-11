import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Paths } from '@/types/enums';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        width: '100%',
        height: '100%',
        mt: -2,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h2">Page non trouvée</Typography>
      <Button variant="contained" onClick={() => navigate(Paths.Home)}>
        Retourner à l'accueil
      </Button>
    </Box>
  );
};

export default NotFoundPage;
