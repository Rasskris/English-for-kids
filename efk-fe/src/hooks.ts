import { unwrapResult } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useDispatchWithReturn = () => {
  const dispatch = useAppDispatch();
  const doDispatch = async (action: any) => {
    try {
      const promise = await dispatch(action);
      return unwrapResult(promise);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  return [doDispatch] as const;
};
