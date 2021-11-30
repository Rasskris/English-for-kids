/* eslint-disable global-require */
import { render, waitFor } from 'test-utils';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { Switcher } from '../../components';
import CategoryPage from '../../pages/category/[id]';
import { mockedCategoryWithWords } from '../../__mocks__/mockedCategoryWithWords';

jest.mock('next/router', () => require('next-router-mock'));

describe('CategoryPage', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/category?id=1');
  });

  test('should render title and word cards', async () => {
    const { getAllByText, getByRole } = render(<CategoryPage />);

    await waitFor(() => {
      const wordCards = getAllByText(/testWord/i);
      const title = getByRole('heading', { level: 3 });

      expect(title).toHaveTextContent(mockedCategoryWithWords.name);
      expect(wordCards.length).toBe(mockedCategoryWithWords.words.length);
    });
  });

  test('should visible start button when user toggle switcher to play mode', async () => {
    const { getByRole, queryByRole } = render(
      <>
        <Switcher />
        <CategoryPage />
      </>,
    );

    const swither = getByRole('checkbox', { name: 'switcher' });

    expect(queryByRole('button', { name: 'start' })).toBeNull();

    userEvent.click(swither);

    await waitFor(() => {
      expect(getByRole('button', { name: 'start' })).toBeInTheDocument();
    });
  });
});
