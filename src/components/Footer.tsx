import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Link, Typography } from '@mui/material';
import { FC } from 'react';

const Footer: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'primary.main',
        py: { xs: 1.2, sm: 1.6, md: 2 },
        gap: { xs: 0.4, sm: 0.7, md: 1 },
      }}
    >
      <Typography
        variant="h6"
        component="p"
        color="primary.contrastText"
        sx={{
          fontWeight: 400,
          display: 'flex',
          alignItems: 'center',
          gap: 0.8,
        }}
      >
        Développé par
        <Link
          underline="none"
          href="https://github.com/PolThm/"
          target="_blank"
          rel="noopener noreferrer"
          color="secondary"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          Pol Thomas
          <GitHubIcon sx={{ fontSize: '1.5rem' }} />
        </Link>
      </Typography>
      <Typography
        variant="subtitle1"
        component="p"
        color="textSecondary"
        sx={{ opacity: 0.8 }}
      >
        {`${new Date().getFullYear()} | TS | MERN | React Query | MUI | PWA`}
      </Typography>
    </Box>
  );
};

export default Footer;
