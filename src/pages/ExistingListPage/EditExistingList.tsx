import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, TextField } from '@mui/material';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoadingErrorHandler from '@/components/shared/LoaderErrorHandler';
import { useUpdateList } from '@/mutations/lists';
import { Paths } from '@/types/enums';
import { List, Volunteer } from '@/types/interfaces';

type Props = {
  list: List;
};

const EditExistingList: FC<Props> = ({ list }) => {
  const navigate = useNavigate();

  const {
    mutate: updateListMutation,
    isLoading: isUpdateListLoading,
    isError: isUpdateListError,
  } = useUpdateList();

  const [isModified, setIsModified] = useState(false);
  const [volunteers, setVolunteers] = useState<Volunteer[]>(
    list?.volunteers || []
  );

  const deleteChoice = (id: string) => {
    if (!isModified) setIsModified(true);
    setVolunteers(volunteers.filter((volunteer) => volunteer.id !== id));
  };

  const modifyChoice = (volunteerId: string, newName: string) => {
    if (!isModified) setIsModified(true);
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
        onSuccess: () => navigate(Paths.MyLists),
      }
    );
  };

  return (
    <>
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
      {isModified && !isUpdateListLoading && (
        <Button
          variant="contained"
          color="secondary"
          sx={{
            mt: { xs: 4, sm: 6 },
            mx: 'auto',
          }}
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
  );
};

export default EditExistingList;
