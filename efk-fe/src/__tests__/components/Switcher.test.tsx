import userEvent from '@testing-library/user-event';
import { render } from 'test-utils';
import { Switcher } from '../../components';

describe('Switcher', () => {
  test('should change name of game mode when user toggle switcher', () => {
    const { queryByText, getByRole } = render(<Switcher />);

    const switcher = getByRole('checkbox', { name: /switcher/i });

    expect(queryByText(/train/i)).toBeVisible();
    expect(queryByText(/play/i)).toBeNull();

    userEvent.click(switcher);

    expect(queryByText(/train/i)).toBeNull();
    expect(queryByText(/play/i)).toBeVisible();
  });
});
