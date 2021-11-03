export const URL = 'http://localhost:5000';

export const RSS_SCHOOL_URL = 'https://rs.school/js/';

export const MY_GITHUB_URL = 'https://github.com/Rasskris';

export const FETCH_ERROR = 'Fetch failed';

export const FETCH_HEADERS = {
  'Content-Type': 'application/json',
};

export const APP_TITLE = 'English for kids';

export const APP_DESCRIPTION =
  "English for kids - it's the web app will help your child to increase vocabulary and improve pronunciation";

export const MAIN_ICON_PATH = '/icons/icon__main.png';

export const SRC_SERVICE_AUDIO = {
  RIGHT_ANSWER: '/audio/right.mp3',
  WRONG_ANSWER: '/audio/wrong.mp3',
  WON_GAME: '/audio/win.mp3',
  FAILED_GAME: '/audio/fail.mp3',
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

export enum GAME_MODE {
  TRAIN = 'train',
  PLAY = 'play',
}

export enum GAME_STATUS {
  NOT_STARTED = 'notStarted',
  STARTED = 'started',
  FINISHED = 'finished',
}

export enum ANSWER {
  WRONG = 'wrong',
  RIGHT = 'right',
}
