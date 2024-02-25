import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const fetchUser = async (token: string) => {
  const response = await axios.get(`${apiUrl}/api/get-user-auth-info`, {
    headers: { 'x-access-token': token },
  });
  return response.data;
};

export const useFetchUser = (
  token: string
): UseQueryResult<{ isLoggedIn: boolean; username: string }, unknown> =>
  useQuery(['user', token], () => fetchUser(token), { enabled: !!token });
