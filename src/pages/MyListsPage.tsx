import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ConfirmModal from '@/components/shared/ConfirmModal';
import LoadingErrorHandler from '@/components/shared/LoaderErrorHandler';
import { useAuth } from '@/contexts/AuthContext';
import { useDeleteList } from '@/mutations/lists';
import { useQueryGetLists } from '@/queries/lists';
import { Paths } from '@/types/enums';
import { List } from '@/types/interfaces';

const MyListsPage = () => {
  const navigate = useNavigate();
  const { username } = useAuth();

  const {
    mutate: deleteListMutation,
    isLoading: isDeleteListLoading,
    isError: isDeleteListError,
  } = useDeleteList();
  const {
    data: myListsData,
    isLoading: areMyListsLoading,
    isError: areMyListsError,
    refetch,
  } = useQueryGetLists(username);

  const [currentList, setCurrentList] = useState<List | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [myLists, setMyLists] = useState<List[]>([]);

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

  useEffect(() => {
    if (username) {
      refetch();
      setMyLists(myListsData ?? []);
    }
  }, [myListsData, refetch, username]);

  return (
    <>
      <Typography variant="h1" gutterBottom>
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
          width: '100%',
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
                  width: { xs: '100%', sm: 'unset' },
                  gap: 1,
                }}
              >
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => goToList({ list })}
                >
                  {list.name}
                </Button>
                <IconButton
                  color="primary"
                  onClick={() => goToList({ list, isEdit: true })}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => openConfirmDeleteModal(list)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            {myLists.length === 0 && (
              <>
                <Typography variant="body1">
                  Vous n'avez pas encore de liste
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ width: { xs: '100%', sm: 'unset' } }}
                  onClick={() => navigate(Paths.NewList)}
                >
                  Créer une liste
                </Button>
              </>
            )}
          </>
        )}
      </Box>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        handleClose={() => setIsConfirmModalOpen(false)}
        confirmAction={deleteList}
        isLoading={isDeleteListLoading}
        isError={isDeleteListError}
      >
        {`Êtes-vous sûr de vouloir supprimer la liste "${currentList?.name}" ?`}
      </ConfirmModal>
    </>
  );
};

export default MyListsPage;
