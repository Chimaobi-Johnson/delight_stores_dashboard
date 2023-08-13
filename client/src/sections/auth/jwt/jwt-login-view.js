import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useSearchParams, useRouter } from 'src/routes/hooks';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// auth
import { useAuthContext } from 'src/auth/hooks';
import axios from 'axios';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useDispatch } from 'react-redux';
// ----------------------------------------------------------------------

export default function  JwtLoginView() {
  const { login } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  // const returnTo = searchParams.get('returnTo');

  const [isSubmitting, setIsSubmitting] = useState(false)

  const userStatus = searchParams.get('status');

  const password = useBoolean();

  const dispatch = useDispatch();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
  } = methods;

  const onSubmit = async (data) => {
    console.log(data)
    setIsSubmitting(true)
    const customData = new FormData();
    customData.append('email', data.email);
    customData.append('password', data.password);
    try {
      const result = await axios.post('/api/login', customData);
      console.log(result)
      if (result.status === 200) {
        setIsSubmitting(false)
        localStorage.setItem('dlight_userId', result.data.user._id);

        // set one hour expiration time
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
        localStorage.setItem('dlight_expiryDate', expiryDate.toISOString());
        router.push(`${PATH_AFTER_LOGIN}?status=newlogin`);
      }
    } catch (error) {
      setIsSubmitting(false)
      console.error(error);
      if(error.response.status === 404) {
        setErrorMsg('Email or password is not correct')
      } else {
         setErrorMsg(typeof error === 'string' ? error : error.message);
      }
      // reset();
    }
  };

  const renderAlert = () => {
   if(userStatus === 'success') {
      return (
      <Alert severity="info" sx={{ mb: 3 }}>
        User created successfully. Please login
      </Alert>) 
   }
   if(userStatus === 'login') {
      return (
      <Alert severity="info" sx={{ mb: 3 }}>
        You have been logged out
      </Alert>
    )
  }
  return (<></>) 
}
  

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Sign in to Delight Dashboard</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">New user?</Typography>

        <Link component={RouterLink} href={paths.auth.jwt.register} variant="subtitle2">
          Create an account
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField name="email" label="Email address" />

      <RHFTextField
        name="password"
        label="Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Link variant="body2" color="inherit" underline="always" sx={{ alignSelf: 'flex-end' }}>
        Forgot password?
      </Link>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        onClick={handleSubmit(onSubmit)}
      >
        Login
      </LoadingButton>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderAlert()}

      {renderForm}
    </FormProvider>
  );
}
