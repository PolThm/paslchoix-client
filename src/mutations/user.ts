import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const loginUser = async (user: { username: string; password: string }) => {
  const response = await axios.post(`${apiUrl}/api/login`, user);
  return response.data;
};

const registerUser = async (user: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${apiUrl}/api/register`, user);
  return response.data;
};

export const useLoginUser = (): UseMutationResult<
  {
    errorWith?: string;
    token: string;
  },
  unknown,
  { username: string; password: string }
> => useMutation(loginUser);

export const useRegisterUser = (): UseMutationResult<
  {
    username?: string;
    email?: string;
    password?: string;
    createdAt?: string;
    _id?: string;
    message?: string;
    errorWith?: string;
  },
  unknown,
  { username: string; email: string; password: string }
> => useMutation(registerUser);
