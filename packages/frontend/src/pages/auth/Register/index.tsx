import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import {
  Alert,
  Form,
  Title,
  FormInput,
  FormPasswordInput,
  Button,
  FormCheckbox,
} from '@lantern/components';

import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { registerWithCredentialsAction } from '../../../store/slices/authSlice';
import {
  registerSchema,
  TRegisterSchema,
} from '../../../validation/auth.validation';
import { zodResolver } from '@hookform/resolvers/zod';

interface IProps {
  children?: React.ReactNode;
}

const Register = ({ children }: IProps) => {
  const navigate = useNavigate();
  const { error, credentialLoading } = useAppSelector((state) => ({
    error: state.auth.error,
    credentialLoading: state.auth.credentialLoading,
  }));
  const dispatch = useAppDispatch();

  const methods = useForm<TRegisterSchema>({
    mode: 'onBlur',
    resolver: zodResolver(registerSchema),
  });

  const {
    formState: { isValid, isValidating },
    reset,
  } = methods;

  const onSubmit: SubmitHandler<TRegisterSchema> = (data) => {
    dispatch(
      registerWithCredentialsAction({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        repeatPassword: data.repeatPassword,
        acceptPrivacyTerms: data.acceptPrivacyTerms,
        ageGeoRequirements: data.ageGeoRequirements,
      })
    )
      .unwrap()
      .then(() => {
        // reset the form
        reset();
        navigate('/login');
      });
  };

  return (
    <div>
      <Title className='text-3xl my-10 font-semibold'>Create an Account</Title>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormInput
            name='firstName'
            type='text'
            label='Legal first name'
            placeholder='Enter your First Name'
          />
          <FormInput
            name='lastName'
            type='text'
            label='Legal last name'
            placeholder='Enter your Last Name'
          />

          <FormInput
            name='email'
            type='email'
            label='Email'
            placeholder='Enter your Email id'
          />

          <FormPasswordInput
            name='password'
            label='Password'
            placeholder='Enter your password'
          />

          <FormPasswordInput
            name='repeatPassword'
            label='Repeat Password'
            placeholder='Enter your Repeat password'
          />

          <FormCheckbox
            name='ageGeoRequirements'
            defaultChecked
            className='font-semibold'
          >
            I meet
            <Link to='' className='ml-1 text-primary-900 underline'>
              age & geographical requirements
            </Link>
          </FormCheckbox>

          <FormCheckbox
            name='acceptPrivacyTerms'
            defaultChecked
            className='font-semibold'
          >
            I reviewed Lantern&apos;s
            <Link to='' className='ml-1 text-primary-900 underline'>
              Terms of Service and Privacy Policy
            </Link>
          </FormCheckbox>

          {error && <Alert status='error'>{error}</Alert>}
          <Button
            loading={credentialLoading}
            disabled={!isValid || isValidating}
            className='!py-3'
          >
            Create an Account
          </Button>
        </Form>
      </FormProvider>
      <div className='mt-6 text-center font-semibold'>
        Already have an account?
        <Link to='/login' className='ml-1 text-primary-900 underline'>
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Register;
