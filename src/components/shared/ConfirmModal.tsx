import { Box, Button, Modal, Typography } from '@mui/material';
import { FC } from 'react';

import LoadingErrorHandler from '@/components/shared/LoaderErrorHandler';

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
        <LoadingErrorHandler isLoading={isLoading} isError={isError} />
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
