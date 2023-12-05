import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ConfirmModal from '@/components/shared/ConfirmModal';
import { useDeleteList } from '@/mutations/lists';
import { useQueryGetLists } from '@/queries/lists';
import { Paths } from '@/types/enums';
import { List } from '@/types/interfaces';

const MyListsPage = () => {
  const navigate = useNavigate();

  const {
    mutate: deleteListMutation,
    isLoading: isDeleteListLoading,
    isError: isDeleteListError,
  } = useDeleteList();
  const {
    data,
    isLoading: areMyListsLoading,
    isError: areMyListsError,
  } = useQueryGetLists();
  const myLists: List[] = data ?? [];

  const isLoading = areMyListsLoading || isDeleteListLoading;
  const isError = areMyListsError || isDeleteListError;

  const [currentList, setCurrentList] = useState<List | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const goToList = (list: List) => {
    navigate(`${Paths.ExistingList}/${list.id}`, { state: { list } });
  };

  const openConfirmDeleteModal = (list: List) => {
    setCurrentList(list);
    setIsConfirmModalOpen(true);
  };

  const deleteList = () => {
    if (!currentList) return;
    deleteListMutation(currentList.id, {
      onSuccess: () => {
        setIsConfirmModalOpen(false);
        setCurrentList(null);
      },
    });
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
                <Box
                  key={list.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: { xs: '90%', sm: 400 },
                    gap: 2,
                  }}
                >
                  <Button variant="outlined" onClick={() => goToList(list)}>
                    {list.name}
                  </Button>
                  <IconButton
                    onClick={() => openConfirmDeleteModal(list)}
                    color="primary"
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
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
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        handleClose={() => setIsConfirmModalOpen(false)}
        confirmAction={deleteList}
      >
        {`Êtes-vous sûr de vouloir supprimer la liste "${currentList?.name}" ?`}
      </ConfirmModal>
    </Container>
  );
};

export default MyListsPage;
