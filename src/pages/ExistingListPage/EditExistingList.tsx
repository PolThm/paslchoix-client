import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoadingErrorHandler from '@/components/shared/LoaderErrorHandler';
import useDrawVolunteers from '@/hooks/useDrawVolunteers';
import { useUpdateList } from '@/mutations/lists';
import { useQueryGetOneList } from '@/queries/lists';
import { Paths } from '@/types/enums';
import { List, Volunteer } from '@/types/interfaces';

type Props = {
  list: List;
};

const EditExistingList: FC<Props> = ({ list }) => {
  const navigate = useNavigate();
  const drawVolunteers = useDrawVolunteers();

  const { refetch } = useQueryGetOneList(list['_id']);

  const {
    mutate: updateListMutation,
    isLoading: isUpdateListLoading,
    isError: isUpdateListError,
  } = useUpdateList();

  const [volunteers, setVolunteers] = useState<Volunteer[]>(list.volunteers);
  const [isModified, setIsModified] = useState(false);
  const [newListName, setNewListName] = useState(list.name);
  const [newVolunteerName, setNewVolunteerName] = useState('');
  const [areNotEnoughVirginVolunteers, setAreNotEnoughVirginVolunteers] =
    useState(false);

  const deleteChoice = (id: string) => {
    if (!isModified) setIsModified(true);
    setVolunteers(volunteers.filter((volunteer) => volunteer.id !== id));
  };

  const modifyChoiceName = (volunteerId: string, newName: string) => {
    if (!isModified) setIsModified(true);
    setVolunteers(
      volunteers.map((v) =>
        v.id === volunteerId ? { ...v, name: newName } : v
      )
    );
  };

  const modifyChoiceHasDrawn = (volunteerId: string, hasDrawn: boolean) => {
    if (!isModified) setIsModified(true);
    setVolunteers(
      volunteers.map((v) => (v.id === volunteerId ? { ...v, hasDrawn } : v))
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
      {
        id: Date.now().toString(),
        name: newVolunteerName,
        target: '',
        hasDrawn: false,
      },
    ]);
    setNewVolunteerName('');
  };

  const updateList = () => {
    let updatedVolunteers = volunteers;

    const areNewVolunteers = volunteers.some((volunteer) => !volunteer.target);

    if (areNewVolunteers) {
      const virginVolunteers = volunteers.filter(
        (volunteer) => !volunteer.hasDrawn
      );

      if (virginVolunteers.length < 2) {
        return setAreNotEnoughVirginVolunteers(virginVolunteers.length < 2);
      }

      const newDrawVolunteers = drawVolunteers(virginVolunteers);

      updatedVolunteers = volunteers.map((volunteer) => {
        const updatedVolunteer = newDrawVolunteers.find(
          (newV) => newV.id === volunteer.id
        );
        return updatedVolunteer
          ? { ...volunteer, target: updatedVolunteer.target }
          : volunteer;
      });
    }

    setAreNotEnoughVirginVolunteers(false);

    return updateListMutation(
      {
        listId: list['_id'],
        updatedList: {
          ...list,
          volunteers: updatedVolunteers,
          name: newListName,
        },
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
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Typography
          variant="body2"
          sx={{
            flex: { xs: 3, sm: 4 },
            color: 'text.primary',
            fontWeight: 700,
          }}
        >
          Participants
        </Typography>
        <Typography
          variant="body2"
          color="primary"
          sx={{ flex: 1, fontWeight: 700 }}
        >
          A joué ?
        </Typography>
      </Box>
      {volunteers.map((volunteer, index) => (
        <Box
          key={volunteer.id}
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'center',
          }}
        >
          <TextField
            value={volunteer.name}
            onChange={(e) => modifyChoiceName(volunteer.id, e.target.value)}
            label={`Personne ${index + 1}`}
            sx={{ flex: { xs: 3, sm: 4 } }}
          />
          <Box sx={{ flex: 1, display: 'flex' }}>
            <Checkbox
              color={areNotEnoughVirginVolunteers ? 'error' : 'primary'}
              sx={{ color: 'primary.main' }}
              checked={volunteer.hasDrawn}
              onChange={() =>
                modifyChoiceHasDrawn(volunteer.id, !volunteer.hasDrawn)
              }
              disabled={!volunteer.target}
            />
            <IconButton onClick={() => deleteChoice(volunteer.id)}>
              <CloseIcon />
            </IconButton>
          </Box>
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
      <Typography variant="body2" color="primary" sx={{ mt: -1 }}>
        (Minimum trois personnes dans la liste)
      </Typography>
      {isModified && volunteers.length >= 3 && !isUpdateListLoading && (
        <>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{
              mt: { xs: 3, sm: 4 },
              mx: 'auto',
            }}
            onClick={updateList}
          >
            Modifier ma liste
          </Button>
          {areNotEnoughVirginVolunteers && (
            <Typography color="error">
              Au moins deux participants doivent ne pas avoir joué.
            </Typography>
          )}
        </>
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
