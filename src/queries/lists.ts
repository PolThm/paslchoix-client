import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const useQueryGetLists = () => {
  return useQuery(['lists'], async () => {
    const response = await axios.get(`${apiUrl}/api/lists`);
    return response.data;
  });
};
