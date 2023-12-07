import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Container } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useLocation, useNavigate } from 'react-router-dom';

import { Paths } from '@/types/enums';

const BackButton = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isHome = pathname === Paths.Home;

  return (
    <Container maxWidth="xl" sx={{ mb: { xs: -7, sm: -6 } }}>
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          mt: { xs: 0.5, md: 2 },
          ml: { md: 0.5 },
          width: 'max-content',
          transition: isHome ? 'opacity 0.5s ease' : 'opacity 2s ease',
          opacity: isHome ? '0' : '1',
          pointerEvents: isHome ? 'none' : 'auto',
        }}
      >
        <ArrowBackIcon fontSize="large" />
      </IconButton>
    </Container>
  );
};

export default BackButton;
