import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { registerSW } from 'virtual:pwa-register';

const ReloadPrompt = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateSW = registerSW({
      onNeedRefresh() {
        setIsOpen(true);
      },
    });

    return () => {
      updateSW();
    };
  }, []);

  return (
    <Modal open={isOpen}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90vw', sm: 550 },
          backgroundColor: 'background.paper',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Typography variant="h6" textAlign="center">
          Une nouvelle version de l'application est disponible
        </Typography>
        <Button
          onClick={() => window.location.reload()}
          variant="contained"
          color="primary"
        >
          Mettre à jour
        </Button>
        <IconButton
          sx={{ position: 'absolute', top: '8px', right: '8px' }}
          onClick={() => setIsOpen(false)}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Modal>
  );
};

export default ReloadPrompt;
