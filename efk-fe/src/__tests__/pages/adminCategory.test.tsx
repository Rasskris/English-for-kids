/* eslint-disable global-require */
import { render, waitFor } from 'test-utils';
import mockRouter from 'next-router-mock';
import AdminCategoryPage from '../../pages/admin/category/[id]';
import { mockedCategoryWithWords } from '../../__mocks__/mockedCategoryWithWords';

jest.mock('next/router', () => require('next-router-mock'));

describe('AdminCategorPage', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/admin/category?id=1');
  });

  test('should shown recieved category with words', async () => {
    const { getAllByText } = render(<AdminCategoryPage />, { hydrate: true });

    await waitFor(() => {
      const textElements = getAllByText('testWord');

      expect(textElements.length).toBe(mockedCategoryWithWords.words.length);
    });
  });

  test('should have the card for adding new word', async () => {
    const { getByText } = render(<AdminCategoryPage />);

    expect(getByText(/add new word/)).toBeInTheDocument();
  });
});
