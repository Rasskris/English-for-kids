import userEvent from '@testing-library/user-event';
import { render, waitFor } from 'test-utils';
import { CategoryAddCard } from '../../components';

describe('CategoryAddCard', () => {
  const fileImage = new File(['test'], 'testImage.png', { type: 'image/png' });

  test('should filled input when user typing and upload file', async () => {
    const { getByRole } = render(<CategoryAddCard />);

    await waitFor(() => {
      const inputs = getByRole('form').querySelectorAll('input');
      const [categoryNameInput, coverImageInput, iconImageInput] = Array.from(inputs);

      userEvent.type(categoryNameInput, 'test');
      userEvent.upload(coverImageInput, fileImage);
      userEvent.upload(iconImageInput, fileImage);

      expect(categoryNameInput).toHaveValue('test');
      expect(coverImageInput.files[0]).toStrictEqual(fileImage);
      expect(iconImageInput.files[0]).toStrictEqual(fileImage);
    });
  });
});
