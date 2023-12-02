import { Box, Button, Modal, Typography } from '@mui/material';
import React, { FC } from 'react';

type Props = {
  children: string;
  isOpen: boolean;
  handleClose: () => void;
  confirmAction: () => void;
};

const ConfirmModal: FC<Props> = ({
  children,
  isOpen,
  handleClose,
  confirmAction,
}) => {
  return (
    <Modal open={isOpen} onClose={handleClose}>
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
        }}
      >
        <Typography variant="h6" component="h2">
          {children}
        </Typography>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-around' }}>
          <Button onClick={confirmAction} size="small" color="error">
            Confirmer
          </Button>
          <Button onClick={handleClose} size="small">
            Annuler
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
