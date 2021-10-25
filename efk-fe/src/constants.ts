export const URL = 'http://localhost:3000';

export const FETCH_ERROR = 'Fetch failed';

export const FETCH_HEADERS = {
  'Content-Type': 'application/json',
};

export enum ENDPOINT {
  CATEGORIES = 'categories',
  WORDS = 'words',
  AUTHENTICATION = 'authentication',
}

export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}
