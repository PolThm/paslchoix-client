import {
  Box,
  CircularProgress,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { FC } from 'react';

type Props = {
  isLoading?: boolean;
  isError?: boolean;
  erroMessage?: string;
  sx?: SxProps<Theme>;
};

const LoadingErrorHandler: FC<Props> = ({
  isLoading,
  isError,
  erroMessage,
  sx,
}) => {
  const defaultSx: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  if (!isLoading && !isError) return null;

  return (
    <Box sx={{ ...defaultSx, ...sx }}>
      {isLoading && <CircularProgress />}
      {isError && (
        <Typography variant="body1">
          {erroMessage ?? 'Oups, une erreur est survenue...'}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingErrorHandler;
