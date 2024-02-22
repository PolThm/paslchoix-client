import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoadingErrorHandler from '@/components/shared/LoaderErrorHandler';
import { useAuth } from '@/contexts/AuthContext';
import useDrawVolunteers from '@/hooks/useDrawVolunteers';
import { useCreateList } from '@/mutations/lists';
import { Paths } from '@/types/enums';
import { NewList, Volunteer } from '@/types/interfaces';

const NewListPage: FC = () => {
  const navigate = useNavigate();
  const { username } = useAuth();
  const { mutate: createListMutation, isLoading, isError } = useCreateList();

  const drawVolunteers = useDrawVolunteers();

  const [listName, setListName] = useState('');
  const [newVolunteerName, setNewVolunteerName] = useState('');
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [areChoicesVisible, setAreChoicesVisible] = useState(false);

  const addChoice = () => {
    if (!newVolunteerName) return;
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

  const deleteChoice = (id: string) => {
    setVolunteers(volunteers.filter((volunteer) => volunteer.id !== id));
  };

  const createList = () => {
    if (!listName || !volunteers.length) return;
    const list: NewList = {
      name: listName,
      owner: username,
      volunteers: drawVolunteers(volunteers),
    };
    createListMutation(list, {
      onSuccess: () => navigate(Paths.MyLists),
    });
  };

  useEffect(() => {
    if (!listName) return setAreChoicesVisible(false);
    const timer = setTimeout(() => setAreChoicesVisible(true), 300);
    return () => clearTimeout(timer);
  }, [listName]);

  return (
    <>
      <Typography variant="h1" gutterBottom>
        {listName || 'Nouvelle liste'}
      </Typography>
      <Container maxWidth="xs">
        <TextField
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          label="Nom de votre liste..."
          sx={{ width: '100%', mt: 4 }}
        />
        {areChoicesVisible && (
          <>
            <Box
              sx={{ display: 'flex', mt: 6, width: '100%', mx: 'auto', gap: 1 }}
            >
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
            <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
              (Minimum trois personnes)
            </Typography>
          </>
        )}
        <List sx={{ width: { xs: '100%', sm: '100%' }, mx: 'auto' }}>
          {volunteers?.map((volunteer, index) => (
            <Box key={volunteer.id}>
              {index > 0 && <Divider />}
              <ListItem sx={{ px: 0 }}>
                <ListItemText primary={volunteer.name} />
                <IconButton onClick={() => deleteChoice(volunteer.id)}>
                  <CloseIcon />
                </IconButton>
              </ListItem>
            </Box>
          ))}
        </List>
        {volunteers.length >= 3 && !isLoading && (
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ mt: { xs: 2, sm: 4 }, mx: 'auto' }}
            onClick={createList}
          >
            Créer ma liste
          </Button>
        )}
        <LoadingErrorHandler
          isLoading={isLoading}
          isError={isError}
          sx={{ mt: 4 }}
        />
      </Container>
    </>
  );
};

export default NewListPage;
