import { Category } from 'interfaces';
import { mockedCategory } from './mockedCategory';

export const mockedCategories: Category[] = [mockedCategory, { ...mockedCategory, id: 2 }];
