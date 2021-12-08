import { ROLE } from '../enums';

export const isRoleAdmin = (role: ROLE): boolean => {
  return role === ROLE.ADMIN;
};
