import React from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  Title,
  FormInput,
  FormPasswordInput,
  Button,
  GoogleButton,
  Alert,
} from '@lantern/components';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  loginWithGoogleAction,
  loginWithCredentialsAction,
} from '../../../store/slices/authSlice';
import {
  signInZodSchema,
  TLoginSchema,
} from '../../../validation/auth.validation';

interface IProps {
  children?: React.ReactNode;
}

const initialValues: TLoginSchema = {
  email: '',
  password: '',
};

function Login({ children }: IProps) {
  const { googleLoading, error, credentialLoading } = useAppSelector(
    (state) => ({
      error: state.auth.error,
      googleLoading: state.auth.googleLoading,
      credentialLoading: state.auth.credentialLoading,
    })
  );
  const dispatch = useAppDispatch();

  const handleSignInwithGoogle = () => {
    dispatch(loginWithGoogleAction());
  };

  const methods = useForm<TLoginSchema>({
    defaultValues: initialValues,
    mode: 'onBlur',
    resolver: zodResolver(signInZodSchema),
  });

  const {
    formState: { isValid, isValidating },
  } = methods;

  const onSubmit: SubmitHandler<TLoginSchema> = (data) => {
    console.log(data, 'data');
    dispatch(
      loginWithCredentialsAction({
        email: data.email,
        password: data.password,
      })
    );
  };

  return (
    <div>
      <Title className='text-3xl my-10 font-semibold'>Welcome Back!</Title>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormInput
            name='email'
            type='email'
            label='Email'
            placeholder='Your email address'
          />
          <FormPasswordInput
            name='password'
            label='Password'
            placeholder='Enter your password'
          />
          {error && <Alert status='error'>{error}</Alert>}
          <Button
            disabled={!isValid || isValidating}
            loading={credentialLoading}
            variant='default'
            className='!py-3'
          >
            Login
          </Button>
        </Form>
      </FormProvider>
      <div className='mt-3'>
        <GoogleButton loading={googleLoading} onClick={handleSignInwithGoogle}>
          <span className='font-semibold text-base'>Continue with Google</span>
        </GoogleButton>
      </div>
      <div className='mt-10 text-center font-semibold'>
        <span>Don&apos;t have an account? </span>
        <Link to='/register' className='ml-1 text-primary-900 underline'>
          Create an Account
        </Link>
      </div>
    </div>
  );
}

export default Login;
