import { Box, Button, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { DrawVolunteer } from '@/components/DrawVolunteer';
import LoadingErrorHandler from '@/components/shared/LoaderErrorHandler';
import EditExistingList from '@/pages/ExistingListPage/EditExistingList';
import { useQueryGetOneList } from '@/queries/lists';
import { Volunteer } from '@/types/interfaces';

const ExistingListPage = () => {
  const { id } = useParams();
  const { state } = useLocation();

  const {
    data: list,
    isLoading: isListLoading,
    isError: isListError,
  } = useQueryGetOneList(id);

  const volunteers: Volunteer[] = list?.volunteers || [];

  const [currentUser, setCurrentUser] = useState<Volunteer | null>(null);

  if (state?.isEdit && !isListLoading && !isListError) {
    return <EditExistingList list={list} />;
  }

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
          {list?.name ?? 'Ma liste'}
        </Typography>
        <LoadingErrorHandler
          isLoading={isListLoading}
          isError={isListError}
          sx={{ mt: 4 }}
        />
        {!isListLoading && !isListError && (
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
        )}
      </>
    </Container>
  );
};

export default ExistingListPage;
