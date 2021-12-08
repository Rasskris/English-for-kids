import { ROLE } from '../enums';

export interface User {
  [index: string]: string;
  name: string;
  email: string;
  role: ROLE;
}
