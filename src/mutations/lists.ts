import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';

import { List } from '@/types/interfaces';

const apiUrl = import.meta.env.VITE_API_URL;

const createNewList = async (newList: List) => {
  const response = await axios.post(`${apiUrl}/api/new-list`, newList);
  return response.data;
};

const deleteList = async (listId: string) => {
  const response = await axios.delete(`${apiUrl}/api/delete-list/${listId}`);
  return response.data;
};

const updateList = async (listId: string, updatedList: List) => {
  const response = await axios.put(
    `${apiUrl}/api/update-list/${listId}`,
    updatedList
  );
  return response.data;
};

export const useCreateList = (): UseMutationResult<List, unknown, List> =>
  useMutation(createNewList);

export const useDeleteList = (): UseMutationResult<void, unknown, string> =>
  useMutation(deleteList);

export const useUpdateList = (): UseMutationResult<
  List,
  unknown,
  { listId: string; updatedList: List }
> => useMutation(({ listId, updatedList }) => updateList(listId, updatedList));
