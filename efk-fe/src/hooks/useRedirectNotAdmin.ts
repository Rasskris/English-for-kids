import { useEffect } from 'react';
import router from 'next/router';
import { useAppSelector } from './useAppSelector';
import { isRoleAdmin } from '../utils';

export const useRedirectNotAdmin = () => {
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!(user && isRoleAdmin(user.role))) {
      router.push('/auth/signin');
    }
  }, [user]);

  return { user };
};
