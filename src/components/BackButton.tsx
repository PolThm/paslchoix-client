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
          mt: 1,
          ml: 1,
          width: 'max-content',
          transition: isHome ? 'opacity 0.5s ease' : 'opacity 2s ease',
          opacity: isHome ? '0' : '1',
        }}
      >
        <ArrowBackIcon />
      </IconButton>
    </Container>
  );
};

export default BackButton;
