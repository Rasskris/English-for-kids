import { ROLE } from '../constants';

export interface User {
  [index: string]: string;
  name: string;
  email: string;
  role: ROLE;
}
