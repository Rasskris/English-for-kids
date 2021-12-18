/* eslint-disable react/jsx-props-no-spreading */
import { FC, ReactText } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { AuthFormWrapper, InputText } from '../../components';
import { useDispatchWithReturn } from '../../hooks';
import { signIn } from '../../redux/thunks';
import { SUCCESS_SIGN_IN, TOAST_OPTIONS, TOAST_UPDATE_OPTIONS } from '../../constants';

interface SignInInputs {
  email: string;
  password: string;
}
const defaultValues: SignInInputs = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(16, 'Password must not exceed 16 characters'),
});

const SignIn: FC = () => {
  const router = useRouter();
  const [dispatch] = useDispatchWithReturn();

  const methods = useForm<SignInInputs>({
    mode: 'all',
    resolver: yupResolver(validationSchema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<SignInInputs> = async (data) => {
    let toastId: ReactText;

    try {
      toastId = toast.loading('Please wait...', TOAST_OPTIONS);

      await dispatch(signIn(data));

      toast.update(toastId, { render: SUCCESS_SIGN_IN, type: 'success', ...TOAST_UPDATE_OPTIONS });
      router.push('/');
    } catch (error) {
      toast.update(toastId, { render: error.message, type: 'error', ...TOAST_UPDATE_OPTIONS });
      reset();
    }
  };

  return (
    <AuthFormWrapper authText="Sign In">
      <FormProvider {...methods}>
        <Box role="form" component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <InputText type="text" name="email" label="Email" required />
          <InputText type="password" name="password" label="Password" required />
          <Button type="submit" aria-label="Submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/auth/signup">
                <a style={{ fontFamily: 'sans-serif' }}>Sign up</a>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </FormProvider>
    </AuthFormWrapper>
  );
};

export default SignIn;
