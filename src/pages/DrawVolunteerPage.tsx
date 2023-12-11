import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import LoadingErrorHandler from '@/components/shared/LoaderErrorHandler';
import { useUpdateList } from '@/mutations/lists';
import { Paths } from '@/types/enums';
import { List, Volunteer } from '@/types/interfaces';

const DrawVolunteerPage = () => {
  const navigate = useNavigate();
  const { state }: { state: { list: List; currentUser: Volunteer } } =
    useLocation();

  useEffect(() => {
    if (!state?.list || !state?.currentUser) navigate(Paths.Home);
  }, [state, navigate]);

  const {
    mutate: updateListMutation,
    isLoading: isUpdateListLoading,
    isError: isUpdateListError,
  } = useUpdateList();

  const [revealedTarget, setRevealedTarget] = useState<Volunteer | null>(null);

  const revealTarget = () => {
    const currentUserTarget = state?.list?.volunteers.find(
      (volunteer) => volunteer.id === state?.currentUser.target
    );

    if (!state?.list['_id'] || !currentUserTarget) return;

    setRevealedTarget(currentUserTarget);

    updateListMutation({
      listId: state?.list['_id'],
      updatedList: {
        ...state?.list,
        volunteers: state?.list?.volunteers.map((volunteer) => {
          if (volunteer.id === state?.currentUser.id) {
            return {
              ...volunteer,
              hasDrawn: true,
            };
          }
          return volunteer;
        }),
      },
    });
  };

  return (
    <>
      <Typography variant="h1" gutterBottom>
        {state?.list?.name ?? 'Ma liste'}
      </Typography>
      <Typography variant="h2" align="center" sx={{ mt: 4, mb: 2 }}>
        <Typography
          variant="h2"
          component="span"
          color="primary"
          sx={{ fontWeight: 400 }}
        >
          {state?.currentUser.name}
        </Typography>
        , clique sur ce bouton pour savoir qui te sera désigné(e)
      </Typography>
      {state?.list?.volunteers.length > 1 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: { xs: '100%', sm: 'unset' },
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{
              mt: { xs: 2, sm: 4 },
              mx: 'auto',
            }}
            onClick={revealTarget}
            disabled={!!revealedTarget}
          >
            Tirer au sort
          </Button>
          <LoadingErrorHandler
            isLoading={isUpdateListLoading}
            isError={isUpdateListError}
            sx={{ mt: 4 }}
          />
          {!isUpdateListLoading && !isUpdateListError && revealedTarget && (
            <Box key={revealedTarget.id} sx={{ animation: 'fadein 5s ease' }}>
              <Typography
                variant="h4"
                align="center"
                sx={{ mt: { xs: 3, sm: 5 } }}
              >
                Le / la désigné(e) est :
              </Typography>
              <Typography
                variant="h1"
                component="p"
                align="center"
                color="primary"
                sx={{
                  mt: 1,
                  fontWeight: 700,
                }}
              >
                {revealedTarget.name}
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default DrawVolunteerPage;
