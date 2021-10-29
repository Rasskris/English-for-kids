export const URL = 'http://localhost:5000';

export const FETCH_ERROR = 'Fetch failed';

export const FETCH_HEADERS = {
  'Content-Type': 'application/json',
};

export const APP_TITLE = 'English for kids';

export const APP_DESCRIPTION =
  'English for kids - it is the web app will help your child to increase vocabulary and improve pronunciation';

export const MAIN_ICON_PATH = '/icons/icon__main.png';

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

export enum GAME_MODE {
  TRAIN = 'train',
  PLAY = 'play',
}
