import { ROLE } from '../constants';

export const isRoleAdmin = (role: ROLE): boolean => {
  return role === ROLE.ADMIN;
};
