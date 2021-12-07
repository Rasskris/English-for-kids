import { useEffect } from 'react';
import useSWR from 'swr';
import { User } from '../interfaces';
import { useAppDispatch } from './useAppDispatch';
import { signIn, signOut } from '../redux/thunks';
import { clientAPI } from '../lib';
import { ENDPOINT } from '../constants';

const fetcher = (endpoint: string) => clientAPI.checkAuth(endpoint);

export const useUser = () => {
  const { data: user, error } = useSWR<User>(ENDPOINT.AUTHENTICATION, fetcher);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch({ type: signIn.fulfilled.type, payload: user });
    }

    if (error) {
      dispatch({ type: signOut.fulfilled.type });
    }
  }, [user, error, dispatch]);

  return { user };
};
