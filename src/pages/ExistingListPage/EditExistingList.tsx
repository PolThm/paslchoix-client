import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoadingErrorHandler from '@/components/shared/LoaderErrorHandler';
import { useUpdateList } from '@/mutations/lists';
import { useQueryGetOneList } from '@/queries/lists';
import { Paths } from '@/types/enums';
import { List, Volunteer } from '@/types/interfaces';

type Props = {
  list: List;
};

const EditExistingList: FC<Props> = ({ list }) => {
  const navigate = useNavigate();

  const { refetch } = useQueryGetOneList(list['_id']);

  const {
    mutate: updateListMutation,
    isLoading: isUpdateListLoading,
    isError: isUpdateListError,
  } = useUpdateList();

  const [volunteers, setVolunteers] = useState<Volunteer[]>(
    list?.volunteers || []
  );

  const deleteChoice = (id: string) => {
    setVolunteers(volunteers.filter((volunteer) => volunteer.id !== id));
  };

  const modifyChoice = (volunteerId: string, newName: string) => {
    setVolunteers(
      volunteers.map((v) =>
        v.id === volunteerId ? { ...v, name: newName } : v
      )
    );
  };

  const updateList = () => {
    if (!list['_id']) return;
    updateListMutation(
      {
        listId: list['_id'],
        updatedList: { ...list, volunteers },
      },
      {
        onSuccess: () => {
          navigate(`${Paths.ExistingList}/${list['_id']}`);
          refetch();
        },
      }
    );
  };

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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 4,
            width: { xs: '100%', sm: '400px' },
          }}
        >
          <Typography variant="h2" align="center">
            Modification
          </Typography>
          {volunteers.map((volunteer) => (
            <Box
              key={volunteer.id}
              sx={{
                display: 'flex',
                mt: 2,
                width: '100%',
                mx: 'auto',
                gap: 1,
              }}
            >
              <TextField
                value={volunteer.name}
                onChange={(e) => modifyChoice(volunteer.id, e.target.value)}
                label="Modifier la personne..."
                sx={{ width: '100%' }}
              />
              <IconButton onClick={() => deleteChoice(volunteer.id)}>
                <CloseIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
        {!isUpdateListLoading && (
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: { xs: 4, sm: 6 }, mx: 'auto' }}
            onClick={updateList}
          >
            Modifier ma liste
          </Button>
        )}
        <LoadingErrorHandler
          isLoading={isUpdateListLoading}
          isError={isUpdateListError}
          sx={{ mt: 4 }}
        />
      </>
    </Container>
  );
};

export default EditExistingList;
