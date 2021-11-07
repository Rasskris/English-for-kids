/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import * as Yup from 'yup';
import { AuthFormWrapper, InputText } from '../../components';
import { useAppSelector, useDispatchWithReturn } from '../../hooks';
import { signUp } from '../../redux/thunks';
import { TOAST_OPTIONS } from '../../constants';

interface SignUpInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const defaultValues: SignUpInputs = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(4, 'Name must be at least 4 characters')
    .max(20, 'Name must not exceed 20 characters'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(16, 'Password must not exceed 16 characters'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password'), null], 'Confirm password does not not match'),
});

const SignUp: FC = () => {
  const [dispatch] = useDispatchWithReturn();
  const router = useRouter();
  const { authSuccess } = useAppSelector((state) => state.user);

  const methods = useForm<SignUpInputs>({
    mode: 'all',
    resolver: yupResolver(validationSchema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    const { name, email, password } = data;
    try {
      await dispatch(signUp({ name, email, password }));
      toast.success(authSuccess, TOAST_OPTIONS);
      router.push('/auth/signin');
    } catch (error) {
      toast.error(error.message, TOAST_OPTIONS);
      reset(defaultValues);
    }
  };

  return (
    <AuthFormWrapper authText="Sign Up">
      <FormProvider {...methods}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <InputText name="name" label="Name" defaultValue="" />
          <InputText name="email" label="Email" defaultValue="" />
          <InputText name="password" label="Password" defaultValue="" />
          <InputText name="confirmPassword" label="Confirm password" defaultValue="" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/auth/signin">
                <a style={{ fontFamily: 'sans-serif' }}>Sign In</a>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </FormProvider>
    </AuthFormWrapper>
  );
};

export default SignUp;