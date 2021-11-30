/* eslint-disable global-require */
import { render, waitFor } from 'test-utils';
import mockRouter from 'next-router-mock';
import { Menu } from '../../components';

jest.mock('next/router', () => require('next-router-mock'));

describe('Menu', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/');
  });

  test('should render all recieved items of menu', async () => {
    const { getByRole, getAllByRole } = render(<Menu />);

    await waitFor(() => {
      const menuItems = getAllByRole('menuitem');

      expect(menuItems.length).toBe(5);
      expect(getByRole('menu')).toBeInTheDocument();
    });
  });
});
