import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useQueryGetLists } from '@/queries/lists';
import { Paths } from '@/types/enums';
import { List } from '@/types/interfaces';

const MyListsPage = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQueryGetLists();
  const myLists: List[] = data ?? [];

  const goToList = (list: List) => {
    navigate(`${Paths.ExistingList}/${list.id}`, { state: { list } });
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
          Mes listes
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
            mt: 4,
            width: { xs: '100%', sm: '400px' },
          }}
        >
          {isLoading && <CircularProgress />}
          {isError && (
            <Typography variant="body1">
              Oups, une erreur est survenue...
            </Typography>
          )}
          {!isLoading && !isError && (
            <>
              {myLists.map((list) => (
                <Button
                  key={list.id}
                  variant="outlined"
                  onClick={() => goToList(list)}
                >
                  {list.name}
                </Button>
              ))}
              {myLists.length === 0 && (
                <Typography variant="body1">
                  Vous n'avez pas encore de liste
                </Typography>
              )}
            </>
          )}
        </Box>
      </>
    </Container>
  );
};

export default MyListsPage;
