import { render } from 'test-utils';
import { CategoryCard } from '../../components';
import { mockedCategory } from '../../__mocks__/mockedCategory';

describe('CategoryCard', () => {
  test('should render category card', () => {
    const { getByText } = render(<CategoryCard category={mockedCategory} />);

    expect(getByText(mockedCategory.name)).toBeInTheDocument();
  });
});
