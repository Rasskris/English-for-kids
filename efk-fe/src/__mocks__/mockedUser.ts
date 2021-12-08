import { ROLE } from '../constants';
import { User } from '../interfaces';

export const mockedUser: User = {
  name: 'testUser',
  email: 'user@test.com',
  role: ROLE.USER,
};
