import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { selectAuthSuccess } from '../redux/selectors';
import { clearAuthSuccess } from '../redux/slices';
import { TOAST_OPTIONS } from '../constants';

export const useToast = () => {
  const authSuccess = useAppSelector(selectAuthSuccess);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authSuccess) {
      toast.success(authSuccess, TOAST_OPTIONS);
      dispatch(clearAuthSuccess());
    }
  }, []);
};
