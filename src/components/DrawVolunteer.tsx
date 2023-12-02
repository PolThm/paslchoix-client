import { Box, Button, Typography } from '@mui/material';
import { FC, useState } from 'react';

import { Volunteer } from '@/types/interfaces';

type Props = {
  volunteers: Volunteer[];
  currentUser?: Volunteer;
};

export const DrawVolunteer: FC<Props> = ({ volunteers, currentUser }) => {
  const [randomVolunteer, setRandomVolunteer] = useState<Volunteer | null>(
    null
  );

  const drawVolunteer = (): void => {
    const randomIndex = Math.floor(Math.random() * volunteers.length);
    const newRandomChoice = volunteers[randomIndex];

    if (newRandomChoice === (currentUser || randomVolunteer)) {
      return drawVolunteer();
    }

    return setRandomVolunteer(volunteers[randomIndex]);
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
            sx={{ mt: { xs: 2, sm: 4 }, mx: 'auto' }}
            onClick={drawVolunteer}
          >
            Tirer au sort
          </Button>
          {randomVolunteer && (
            <Box key={randomVolunteer.id} sx={{ animation: 'fadein 5s' }}>
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
