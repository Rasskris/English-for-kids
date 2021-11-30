import { render } from 'test-utils';
import { mockedCategory } from '../../__mocks__/mockedCategory';
import { CategoryEditCard } from '../../components';

describe('CategoryEditCard', () => {
  test('should equal received category name props and name input', () => {
    const { getByRole } = render(<CategoryEditCard category={mockedCategory} />);
    const categoryNameInput = getByRole('textbox', { name: /name/i });

    expect(categoryNameInput).toHaveValue(mockedCategory.name);
  });
});
