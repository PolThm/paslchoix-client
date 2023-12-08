import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BackButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [historyCount, setHistoryCount] = useState(0);
  const isFirstPage = historyCount <= 1;

  useEffect(() => setHistoryCount((prev) => prev + 1), [location]);

  const goBack = () => {
    if (isFirstPage) return;
    navigate(-1);
    setHistoryCount((prev) => prev - 2);
  };

  return (
    <IconButton
      onClick={goBack}
      size="large"
      sx={{
        width: 'max-content',
        transition: isFirstPage ? 'opacity 0.5s ease' : 'opacity 2s ease',
        opacity: isFirstPage ? '0' : '1',
        pointerEvents: isFirstPage ? 'none' : 'auto',
        color: 'primary.contrastText',
      }}
    >
      <ArrowBackIcon />
    </IconButton>
  );
};

export default BackButton;
