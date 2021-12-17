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

export enum FILE_TYPE {
  IMAGE = 'IMAGE',
  AUDIO = 'AUDIO',
}

export enum PAGE {
  STATISTICS = 'STATISTICS',
  DIFFICULT_WORDS = 'DIFFICULT_WORDS',
  CATEGORY = 'CATEGORY',
  MAIN = 'MAIN',
}

export enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
}
