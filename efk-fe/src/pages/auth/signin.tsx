/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
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
import { useAppSelector, useDispatchWithReturn } from '../../hooks';
import { signIn } from '../../redux/thunks';
import { TOAST_OPTIONS } from '../../constants';

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
  const { authSuccess } = useAppSelector((state) => state.user);
  const [dispatch] = useDispatchWithReturn();

  const methods = useForm<SignInInputs>({
    mode: 'all',
    resolver: yupResolver(validationSchema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<SignInInputs> = async (data) => {
    try {
      await dispatch(signIn(data));
      toast.success(authSuccess, TOAST_OPTIONS);
      router.push('/');
    } catch (error) {
      toast.error(error.message, TOAST_OPTIONS);
      reset(defaultValues);
    }
  };

  return (
    <AuthFormWrapper authText="Sign In">
      <FormProvider {...methods}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <InputText type="text" name="email" label="Email" defaultValue="" />
          <InputText type="password" name="password" label="Password" defaultValue="" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
