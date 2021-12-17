import { Statistics, Word } from '../interfaces';

export const extractWordData = (statisticsData: Statistics[]): Word[] => {
  return statisticsData.map(({ id, name, translation, image, audio }) => ({
    id,
    name,
    translation,
    image,
    audio,
  }));
};
