import type { ToastOptions, UpdateOptions } from 'react-toastify';

export const API_URL = 'http://localhost:5000';

export const RSS_SCHOOL_URL = 'https://rs.school/js/';

export const MY_GITHUB_URL = 'https://github.com/Rasskris';

export const FETCH_ERROR = 'Fetch failed';

export const FETCH_HEADERS = {
  'Content-Type': 'application/json',
};

export const APP_TITLE = 'English for kids';

export const APP_DESCRIPTION =
  "English for kids - it's the web app will help your child to increase vocabulary and improve pronunciation";

export const LABEL_TEXT = {
  IMAGE: 'Upload new image',
  AUDIO: 'Upload new audio',
};

export const PAGE_DEFAULT_CONTENT = {
  STATISTICS: {
    image: '/images/image__statistics.png',
    text: 'After the start training or playing you may check result here',
  },
  DIFFICULT_WORDS: {
    image: '/images/image__difficultWord.png',
    text: "Cool, you haven't made a mistake in the game mode yet. Keep it up!",
  },
  CATEGORY: {
    image: '/images/image__category.png',
    text: 'All the words of this category were stolen by UFO',
  },
  MAIN: {
    image: '/images/image__main.png',
    text: 'Something went wrong, please try again',
  },
};

export const ICON_PATH = {
  MAIN: '/icons/icon__main.png',
  ADMIN: '/icons/icon__admin.png',
  STATISTICS: '/icons/icon__statistics.png',
  CARD_ADD: '/icons/icon__cardAdd.png',
  IMAGE: '/icons/icon__imageAdd.png',
  AUDIO: '/icons/icon__audioAdd.png',
  AUDIO_LOADED: '/icons/icon__audioLoaded.png',
};

export const TOAST_TEXT = {
  WORD_ADDED: 'Word added successefully!',
  WORD_UPDATED: 'Word updated successefully!',
  WORD_DELETED: 'Word deleted successefully!',
  CATEGORY_ADDED: 'Category added successefully!',
  CATEGORY_UPDATED: 'Category updated successefully!',
};

export const SRC_SERVICE_AUDIO = {
  RIGHT_ANSWER: '/audio/right.mp3',
  WRONG_ANSWER: '/audio/wrong.mp3',
  WON_GAME: '/audio/win.mp3',
  FAILED_GAME: '/audio/fail.mp3',
};

export const EXTENSIONS = {
  AUDIO: '.mp3, .wav, .aac, .mp4',
  IMAGE: '.jpg, .jpeg, .png',
};

export const TOAST_OPTIONS: ToastOptions = {
  position: 'top-center',
  theme: 'colored',
  style: { fontSize: '14px', textAlign: 'center' },
};

export const TOAST_UPDATE_OPTIONS: UpdateOptions = {
  isLoading: false,
  autoClose: 5000,
  style: { fontSize: '14px', textAlign: 'center' },
};

export const SUCCESS_SIGN_UP = 'Signed up successfully! Please sign in.';

export const SUCCESS_SIGN_IN = 'Authenticated successfully!';

export const TABLE_COLUMNS = [
  { name: 'Category', selector: (row) => row.category, sortable: true },
  { name: 'Word', selector: (row) => row.name, sortable: true },
  { name: 'Translation', selector: (row) => row.translation, sortable: true },
  { name: 'Trained', selector: (row) => row.trained, sortable: true },
  { name: 'Correct', selector: (row) => row.correct, sortable: true },
  { name: 'Incorrect', selector: (row) => row.incorrect, sortable: true },
];
