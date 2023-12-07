import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Container,
  IconButton,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ConfirmModal from '@/components/shared/ConfirmModal';
import LoadingErrorHandler from '@/components/shared/LoaderErrorHandler';
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
    refetch,
  } = useQueryGetLists();
  const myLists: List[] = data ?? [];

  const [currentList, setCurrentList] = useState<List | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const goToList = ({ list, isEdit }: { list: List; isEdit?: boolean }) => {
    navigate(`${Paths.ExistingList}/${list['_id']}`, {
      state: { isEdit },
    });
  };

  const openConfirmDeleteModal = (list: List) => {
    setCurrentList(list);
    setIsConfirmModalOpen(true);
  };

  const deleteList = () => {
    if (!currentList?.['_id']) return;
    deleteListMutation(currentList['_id'], {
      onSuccess: () => {
        setIsConfirmModalOpen(false);
        setCurrentList(null);
        refetch();
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
            width: { xs: '90%', sm: '400px' },
          }}
        >
          <LoadingErrorHandler
            isLoading={areMyListsLoading}
            isError={areMyListsError}
          />
          {!areMyListsLoading && !areMyListsError && (
            <>
              {myLists.map((list) => (
                <Box
                  key={list['_id']}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: { xs: '90%', sm: 400 },
                    gap: 1,
                  }}
                >
                  <Button variant="outlined" onClick={() => goToList({ list })}>
                    {list.name}
                  </Button>
                  <IconButton onClick={() => goToList({ list, isEdit: true })}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => openConfirmDeleteModal(list)}>
                    <DeleteIcon />
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
        isLoading={isDeleteListLoading}
        isError={isDeleteListError}
      >
        {`Êtes-vous sûr de vouloir supprimer la liste "${currentList?.name}" ?`}
      </ConfirmModal>
    </Container>
  );
};

export default MyListsPage;
