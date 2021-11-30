import { Statistics } from 'interfaces';

export const mockedTableData: Statistics[] = [
  {
    id: 1,
    name: 'test',
    translation: 'тест',
    image: {
      id: '1',
      key: 'test123',
      url: 'www.test.com',
    },
    audio: {
      id: '1',
      key: 'test123',
      url: 'www.test.com',
    },
    category: 'test',
    trained: 1,
    correct: 1,
    incorrect: 0,
  },
];
