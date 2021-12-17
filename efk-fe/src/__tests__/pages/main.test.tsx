import { render, waitFor } from 'test-utils';
import MainPage from '../../pages/index';
import { mockedCategories } from '../../__mocks__/mockedCategories';

const ERROR_MESSAGE = 'Something went wrong, please try again';

describe('Main page', () => {
  test('should shown the list of categories', async () => {
    const { getAllByText, getAllByRole } = render(
      <MainPage categories={mockedCategories} notFound={false} />,
    );

    await waitFor(() => {
      expect(getAllByRole('figure').length).toBe(mockedCategories.length);
      expect(getAllByText(/testCategory/i).length).toBe(mockedCategories.length);
    });
  });

  test('should shown the error message', async () => {
    const { getByText } = render(<MainPage categories={mockedCategories} notFound />);

    expect(getByText(ERROR_MESSAGE)).toBeInTheDocument();
  });
});
