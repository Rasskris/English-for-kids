import { rest } from 'msw';
import { mockedCategory } from './mockedCategory';
import { mockedCategories } from './mockedCategories';
import { mockedCategoryWithWords } from './mockedCategoryWithWords';
import { mockedUser } from './mockedUser';
import { URL } from '../constants';

export const handlers = [
  rest.get(`${URL}/categories`, (_req, res, ctx) => {
    return res(ctx.json(mockedCategories), ctx.delay());
  }),
  rest.get(`${URL}/categories/1`, (_req, res, ctx) => {
    return res(ctx.json(mockedCategoryWithWords), ctx.delay());
  }),
  rest.post(`${URL}/categories`, (_req, res, ctx) => {
    return res(ctx.json(mockedCategory), ctx.delay());
  }),
  rest.post(`${URL}/authentication/signup`, (_req, res, ctx) => {
    return res(ctx.status(201), ctx.delay());
  }),
  rest.post(`${URL}/authentication/signin`, (_req, res, ctx) => {
    return res(ctx.json(mockedUser), ctx.delay());
  }),
];
