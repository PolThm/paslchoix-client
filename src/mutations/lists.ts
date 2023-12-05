import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { List } from '@/types/interfaces';

const apiUrl = import.meta.env.VITE_API_URL;

const postNewList = async (newList: List) => {
  const response = await axios.post(`${apiUrl}/api/new-list`, newList);
  return response.data;
};

const deleteList = async (listId: string) => {
  const response = await axios.delete(`${apiUrl}/api/delete-list/${listId}`);
  return response.data;
};

export const useCreateList = () => useMutation(postNewList);

export const useDeleteList = () => useMutation(deleteList);
