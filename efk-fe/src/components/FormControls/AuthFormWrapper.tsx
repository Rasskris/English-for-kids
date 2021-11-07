import { FC } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface AuthFormWrapperProps {
  children: JSX.Element;
  authText: 'Sign In' | 'Sign Up';
}
export const AuthFormWrapper: FC<AuthFormWrapperProps> = ({ children, authText }) => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component="section" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {authText}
          </Typography>
          {children}
        </Box>
      </Container>
    </ThemeProvider>
  );
};
