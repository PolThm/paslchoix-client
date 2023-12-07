import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
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

  const [isModified, setIsModified] = useState(false);
  const [volunteers, setVolunteers] = useState<Volunteer[]>(list.volunteers);
  const [newListName, setNewListName] = useState(list.name);
  const [newVolunteerName, setNewVolunteerName] = useState('');

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

  const addChoice = () => {
    if (!newVolunteerName) return;
    if (!isModified) setIsModified(true);
    setVolunteers([
      ...volunteers,
      { id: Date.now().toString(), name: newVolunteerName },
    ]);
    setNewVolunteerName('');
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
        sx={{ mt: 2, mb: 2 }}
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
      <Box sx={{ display: 'flex', mt: 4, width: '100%', mx: 'auto', gap: 1 }}>
        <TextField
          value={newVolunteerName}
          onChange={(e) => setNewVolunteerName(e.target.value)}
          label="Nouvelle personne..."
          sx={{ width: '100%' }}
          onKeyUp={(e) => {
            if (e.key === 'Enter') addChoice();
          }}
        />
        <IconButton onClick={addChoice} color="primary">
          <AddIcon />
        </IconButton>
      </Box>
      {isModified && volunteers.length > 1 && !isUpdateListLoading && (
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
