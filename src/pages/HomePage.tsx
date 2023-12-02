import { Box, Button, Container, Typography } from '@mui/material';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import logoGift from '@/assets/img/logo-gift.png';
import { Paths } from '@/types/enums';

const HomePage: FC = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 1,
        mt: -2,
        py: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { sm: 4, md: 6 },
          mb: 3,
          fontSize: { xs: '4.5rem', md: '6rem' },
        }}
      >
        <img src={logoGift} alt="logo gift" style={{ width: '100px' }} />
        <Typography
          variant="h1"
          noWrap
          sx={{
            fontWeight: 700,
            letterSpacing: 5,
            color: 'inherit',
            textDecoration: 'none',
            fontSize: 'inherit',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          Pas l'choix
        </Typography>
      </Box>
      <Typography
        variant="h2"
        textAlign="center"
        sx={{ fontSize: '2.5rem', mb: { xs: 6, md: 8 } }}
      >
        Une application pour désigner des volontaires
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: { xs: 4, md: 8 },
          width: 1,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          component={NavLink}
          to={Paths.MyLists}
        >
          Mes listes
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={NavLink}
          to={Paths.NewList}
        >
          Nouvelle liste
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
