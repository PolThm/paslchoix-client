import { Box, Button, Typography } from '@mui/material';
import { FC, useState } from 'react';

import LoadingErrorHandler from '@/components/shared/LoaderErrorHandler';
import { useUpdateList } from '@/mutations/lists';
import { List, Volunteer } from '@/types/interfaces';

type Props = {
  list: List;
  volunteers: Volunteer[];
  currentUser: Volunteer;
};

export const DrawVolunteer: FC<Props> = ({ list, volunteers, currentUser }) => {
  const {
    mutate: updateListMutation,
    isLoading: isUpdateListLoading,
    isError: isUpdateListError,
  } = useUpdateList();

  const [randomVolunteer, setRandomVolunteer] = useState<Volunteer | null>(
    null
  );

  const drawVolunteer = (): void => {
    const randomIndex = Math.floor(Math.random() * volunteers.length);
    const newRandomVolunteer = volunteers[randomIndex];

    if (
      newRandomVolunteer === currentUser ||
      newRandomVolunteer === randomVolunteer ||
      newRandomVolunteer.isTargeted
    ) {
      return drawVolunteer();
    }

    const currentUserWithTarget = {
      ...currentUser,
      target: newRandomVolunteer.id,
    };

    const newRandomVolunteerTargeted = {
      ...newRandomVolunteer,
      isTargeted: true,
    };

    const newVolunteers = volunteers.map((volunteer) => {
      if (volunteer.id === currentUser?.id) return currentUserWithTarget;
      if (volunteer.id === newRandomVolunteer.id)
        return newRandomVolunteerTargeted;
      return volunteer;
    });

    setRandomVolunteer(newRandomVolunteer);

    // TODO: Fix type issue here
    if (!list['_id']) return; // eslint-disable-line consistent-return

    return updateListMutation({
      listId: list['_id'],
      updatedList: { ...list, volunteers: newVolunteers },
    });
  };

  return (
    <Box>
      {volunteers.length > 1 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
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
            onClick={drawVolunteer}
            disabled={!!randomVolunteer}
          >
            Tirer au sort
          </Button>
          <LoadingErrorHandler
            isLoading={isUpdateListLoading}
            isError={isUpdateListError}
            sx={{ mt: 4 }}
          />
          {!isUpdateListLoading && !isUpdateListError && randomVolunteer && (
            <Box key={randomVolunteer.id} sx={{ animation: 'fadein 5s ease' }}>
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
                {randomVolunteer.name}
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
