import { Box, Button, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { DrawVolunteer } from '@/components/DrawVolunteer';
import { Volunteer } from '@/types/interfaces';

const ExistingListPage = () => {
  const { state } = useLocation();

  const volunteers: Volunteer[] = state?.list?.volunteers || [];

  const [currentUser, setCurrentUser] = useState<Volunteer | null>(null);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pb: 4,
      }}
    >
      <>
        <Typography variant="h1" gutterBottom sx={{ mt: 4 }}>
          {state?.list?.name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 4,
            width: { xs: '100%', sm: '400px' },
          }}
        >
          {!currentUser ? (
            <>
              <Typography variant="h2" align="center">
                Qui es-tu ?
              </Typography>
              {volunteers.map((volunteer) => (
                <Button
                  key={volunteer.id}
                  variant="outlined"
                  sx={{ mt: 2 }}
                  onClick={() => setCurrentUser(volunteer)}
                >
                  {volunteer.name}
                </Button>
              ))}
            </>
          ) : (
            <>
              <Typography variant="h2" align="center" sx={{ mb: 2 }}>
                <Typography
                  variant="h2"
                  component="span"
                  color="primary"
                  sx={{ fontWeight: 400 }}
                >
                  {currentUser.name}
                </Typography>
                , clique sur ce bouton pour savoir qui te sera désigné(e) :
              </Typography>
              <DrawVolunteer
                volunteers={volunteers}
                currentUser={currentUser}
              />
            </>
          )}
        </Box>
      </>
    </Container>
  );
};

export default ExistingListPage;
