import { render, waitFor } from 'test-utils';
import userEvent from '@testing-library/user-event';
import SignInPage from '../../pages/auth/signin';
import { server, rest } from '../../__mocks__/mockedServer';
import { URL } from '../../constants';

const TEST_EMAIL = 'test@email.com';
const TEST_PASSWORD = 'test1234';

describe('SignIn page', () => {
  test('page renders', async () => {
    const { getByRole, getByLabelText } = render(<SignInPage />);

    expect(getByRole('heading', { level: 1, name: 'Sign In' })).toBeInTheDocument();
    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('should clear inputs when receive an error from server', async () => {
    const { getByLabelText, getByRole } = render(<SignInPage />);

    const inputEmail = getByLabelText(/email/i);
    const inputPassword = getByLabelText(/password/i);
    const buttonSubmit = getByRole('button', { name: /submit/i });

    userEvent.type(inputEmail, TEST_EMAIL);
    userEvent.type(inputPassword, TEST_PASSWORD);

    expect(inputEmail).toHaveValue(TEST_EMAIL);
    expect(inputPassword).toHaveValue(TEST_PASSWORD);

    server.use(rest.post(`${URL}/authentication/signin`, async (_req, res, ctx) => res(ctx.status(400))));

    userEvent.click(buttonSubmit);

    await waitFor(() => {
      expect(inputEmail).toHaveValue('');
      expect(inputPassword).toHaveValue('');
    });
  });
});
