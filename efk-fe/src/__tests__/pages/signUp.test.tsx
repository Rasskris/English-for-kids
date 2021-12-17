import { render, waitFor } from 'test-utils';
import userEvent from '@testing-library/user-event';
import SignUpPage from '../../pages/auth/signup';
import { server, rest } from '../../__mocks__/mockedServer';
import { API_URL } from '../../constants';

const TEST_NAME = 'testName';
const TEST_EMAIL = 'test@email.com';
const TEST_PASSWORD = 'test1234';

describe('SignUp page', () => {
  test('page renders', async () => {
    const { getByRole, getByText } = render(<SignUpPage />);

    expect(getByRole('heading')).toBeInTheDocument();
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Email')).toBeInTheDocument();
    expect(getByText('Password')).toBeInTheDocument();
    expect(getByText(/confirm password/i)).toBeInTheDocument();
  });

  test('should clear inputs when receive an error from server', async () => {
    const { getByRole, getByLabelText } = render(<SignUpPage />);

    const inputName = getByRole('textbox', { name: /name/i });
    const inputEmail = getByRole('textbox', { name: /email/i });
    const inputPassword = getByLabelText('Password');
    const inputConfirmPassword = getByLabelText('Confirm password');
    const buttonSubmit = getByRole('button', { name: /submit/i });

    userEvent.type(inputName, TEST_NAME);
    userEvent.type(inputEmail, TEST_EMAIL);
    userEvent.type(inputPassword, TEST_PASSWORD);
    userEvent.type(inputConfirmPassword, TEST_PASSWORD);

    expect(inputName).toHaveValue(TEST_NAME);
    expect(inputEmail).toHaveValue(TEST_EMAIL);

    server.use(rest.post(`${API_URL}/authentication/signup`, async (_req, res, ctx) => res(ctx.status(400))));

    userEvent.click(buttonSubmit);

    await waitFor(() => {
      [inputName, inputEmail, inputPassword, inputConfirmPassword].forEach((field) => {
        expect(field).toHaveValue('');
      });
    });
  });
});
