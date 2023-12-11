import { Button, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import LoadingErrorHandler from '@/components/shared/LoaderErrorHandler';
import EditExistingList from '@/pages/ExistingListPage/EditExistingList';
import { useQueryGetOneList } from '@/queries/lists';
import { Paths } from '@/types/enums';
import { Volunteer } from '@/types/interfaces';

const ExistingListPage = () => {
  const { id } = useParams();
  const { state, pathname } = useLocation();
  const navigate = useNavigate();

  const {
    data: list,
    isLoading: isListLoading,
    isError: isListError,
  } = useQueryGetOneList(id);

  const volunteers: Volunteer[] = list?.volunteers || [];

  const [isUrlCopied, setIsUrlCopied] = useState(false);

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setIsUrlCopied(true);
  };

  const goToCurrentUserDraw = (currentUser: Volunteer) => {
    navigate(`${pathname}${Paths.DrawVolunteer}`, {
      state: { list, currentUser },
    });
  };

  return (
    <>
      <Typography variant="h1" gutterBottom>
        {list?.name ?? 'Ma liste'}
      </Typography>
      <LoadingErrorHandler
        isLoading={isListLoading}
        isError={isListError}
        sx={{ mt: 4 }}
      />
      {!isListLoading && !isListError && (
        <Container
          maxWidth="xs"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 4,
          }}
        >
          <>
            <Typography variant="h2" align="center">
              {state?.isEdit ? 'Modification' : 'Qui es-tu ?'}
            </Typography>
            {state?.isEdit ? (
              <EditExistingList list={list} />
            ) : (
              <>
                {volunteers.map((volunteer) => (
                  <Button
                    key={volunteer.id}
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => goToCurrentUserDraw(volunteer)}
                    disabled={volunteer.hasDrawn}
                  >
                    {volunteer.name}
                  </Button>
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: { xs: 6, sm: 8 } }}
                  onClick={copyToClipboard}
                  disabled={isUrlCopied}
                >
                  {isUrlCopied ? 'Lien copié' : 'Partager ma liste'}
                </Button>
              </>
            )}
          </>
        </Container>
      )}
    </>
  );
};

export default ExistingListPage;
