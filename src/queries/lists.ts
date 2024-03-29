import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const useQueryGetLists = (username: string) => {
  return useQuery(
    ['lists'],
    async () => {
      const response = await axios.get(`${apiUrl}/api/lists`, {
        headers: { 'x-access-token': localStorage.getItem('token') },
      });
      return response.data;
    },
    {
      enabled: !!username,
    }
  );
};

export const useQueryGetOneList = (id?: string) => {
  return useQuery(['lists', id], async () => {
    const response = await axios.get(`${apiUrl}/api/lists/${id}`);
    return response.data;
  });
};
