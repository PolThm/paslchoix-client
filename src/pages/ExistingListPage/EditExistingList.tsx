import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, TextField } from '@mui/material';
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

  const [isModified, setIsModified] = useState(false);
  const [volunteers, setVolunteers] = useState<Volunteer[]>(list.volunteers);
  const [newListName, setNewListName] = useState(list.name);

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

  const modifyListName = (newName: string) => {
    if (!isModified) setIsModified(true);
    setNewListName(newName);
  };

  const updateList = () => {
    if (!list['_id']) return;
    updateListMutation(
      {
        listId: list['_id'],
        updatedList: { ...list, volunteers, name: newListName },
      },
      {
        onSuccess: () => {
          refetch();
          navigate(Paths.MyLists);
        },
      }
    );
  };

  return (
    <>
      <TextField
        value={newListName}
        onChange={(e) => modifyListName(e.target.value)}
        label="Nom de la liste"
        sx={{ mt: 2 }}
      />
      {volunteers.map((volunteer, index) => (
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
            label={`Personne ${index + 1}`}
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
          fullWidth
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
