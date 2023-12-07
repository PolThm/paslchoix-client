import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useLocation, useNavigate } from 'react-router-dom';

import { Paths } from '@/types/enums';

const BackButton = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isHome = pathname === Paths.Home;

  return (
    <IconButton
      onClick={() => navigate(-1)}
      sx={{
        mt: 1,
        ml: 1,
        mb: -1,
        width: 'max-content',
        transition: isHome ? 'opacity 0.5s ease' : 'opacity 2s ease',
        opacity: isHome ? '0' : '1',
      }}
    >
      <ArrowBackIcon />
    </IconButton>
  );
};

export default BackButton;
