import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from '@mui/material';
import { FC } from 'react';

type Props = {
  children: string;
  isOpen: boolean;
  handleClose: () => void;
  confirmAction: () => void;
  isLoading?: boolean;
  isError?: boolean;
};

const ConfirmModal: FC<Props> = ({
  children,
  isOpen,
  handleClose,
  confirmAction,
  isLoading,
  isError,
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
        {isLoading && <CircularProgress />}
        {isError && (
          <Typography variant="body1">
            Oups, une erreur est survenue...
          </Typography>
        )}
        {!isLoading && !isError && (
          <Typography variant="h6" component="h2">
            {children}
          </Typography>
        )}

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
