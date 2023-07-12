import React, { useState, useEffect } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import barCode from '../../../assets/barcode.svg';
import {
  Button,
  Form,
  FormInput,
  FormSwitch,
  Image,
} from '@lantern/components';
import { Link } from 'react-router-dom';
import { FaRegQuestionCircle } from 'react-icons/fa';

const SecurityTab = () => {
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      enableMfa: false,
    },
  });

  const {
    formState: { isValid, isValidating },
    reset,
  } = methods;

  const [password, setPassword] = useState('');
  const [validity, setValidity] = useState({
    charLength: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  });

  const Password = methods.watch('newPassword');
  useEffect(() => {
    setValidity({
      charLength: Password?.length >= 8,
      lowercase: /[a-z]/.test(Password),
      uppercase: /[A-Z]/.test(Password),
      number: /\d/.test(Password),
      special: /[_\W]/.test(Password),
    });
  }, [Password]);

  const hasValidPassword = Object.values(validity).every((valid) => valid);

  const enableMfa = methods.watch('enableMfa');

  return (
    <>
      <div className='w-full p-2 md:mt-0 sm:mt-0 mt-10 lg:mt-0'>
        <h3 className='text-xl font-semibold mb-4'>Password</h3>

        <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='w-full'>
            <FormProvider {...methods}>
              <Form>
                <div className='grid grid-cols-1 gap-3'>
                  <div className='w-full'>
                    <FormInput
                      name='currentPassword'
                      type='password'
                      label='ENTER CURRENT PASSWORD'
                      placeholder='Enter Current Password'
                    />
                  </div>
                  <div className='w-full'>
                    <FormInput
                      name='newPassword'
                      type='password'
                      label='CHOOSE NEW NAME'
                      placeholder='Enter New Password'
                    />
                  </div>
                  <div className='w-full'>
                    <FormInput
                      name='confirmPassword'
                      type='PASSWORD'
                      label='CONFIRM NEW PASSWORD'
                      placeholder='Enter Confirm Password'
                    />
                  </div>
                </div>
              </Form>
            </FormProvider>
          </div>

          <div className='flex w-full items-center'>
            <div>
              <div className='flex'>
                <FaRegQuestionCircle className='text-yellow-500 mr-2 mt-1 w-4 h-4' />
                <div>
                  <span className='font-normal text-xs text-textLight-100'>
                    Forgot current password?
                  </span>
                  <Link
                    to='/register'
                    className='ml-1 text-blue-500 font-normal text-xs underline'
                  >
                    Password recovery
                  </Link>
                </div>
              </div>

              <ul className='mt-6 grid gap-3 font-normal list-inside text-sm text-textLight-100  leading-4 list-disc'>
                <li
                  color={validity.lowercase ? '#20D152' : 'text-textLight-100'}
                >
                  One lowercase character
                </li>
                <li
                  color={validity.uppercase ? '#20D152' : 'text-textLight-100'}
                >
                  One uppercase character
                </li>
                <li color={validity.number ? '#20D152' : 'text-textLight-100'}>
                  One number
                </li>
                <li color={validity.special ? '#20D152' : 'text-textLight-100'}>
                  One special character
                </li>
                <li
                  color={validity.charLength ? '#20D152' : 'text-textLight-100'}
                >
                  8 characters minimum
                </li>
              </ul>
              {hasValidPassword && (
                <div className='mt-2 font-semibold' color='#20D152'>
                  Password is valid!
                </div>
              )}
            </div>
          </div>
        </div>

        <h3 className='text-xl font-semibold mb-2 mt-8'>
          Multi-Factor Authentication
        </h3>

        <div className='grid grid-cols-1 !items-center md:grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='w-full'>
            <div className='mt-6'>
              <div className='border border-muted-300 rounded divide-y divide-muted-300'>
                <div className='p-4 flex items-center justify-between'>
                  <h3 className='font-semibold'>Enable MFA</h3>
                  <FormProvider {...methods}>
                    <Form>
                      <FormSwitch name='enableMfa' />
                    </Form>
                  </FormProvider>
                </div>

                {enableMfa ? (
                  <div className='flex gap-4 p-4 items-center '>
                    <Image
                      src={barCode}
                      width={80}
                      height={80}
                      alt='Barcode Logo'
                    />
                    <p className='font-normal text-xs text-textLight-100'>
                      Scan this QR code in the Authenticator app to set up your
                      MFA
                    </p>
                  </div>
                ) : (
                  <p className='text-muted-900 p-4 text-sm '>
                    MFA adds an extra layer of security by requiring more than
                    just a password. It uses multiple types of verification,
                    like a code sent to your phone, to protect your account from
                    unauthorized access.
                  </p>
                )}
              </div>
            </div>
          </div>
          {enableMfa && (
            <div className='w-full'>
              <div className='flex'>
                <FaRegQuestionCircle className='text-yellow-500 mr-2 mt-1 w-4 h-4' />
                <div>
                  <span className='font-normal text-xs text-textLight-100'>
                    How to set up the MFA?
                  </span>
                  <Link
                    to='/register'
                    className='ml-1 text-blue-500 font-normal text-xs underline'
                  >
                    Detailed guide
                  </Link>
                </div>
              </div>

              <div>
                <ul className='!list-decimal !list-inside  mt-3 space-y-2'>
                  <li className='font-normal text-xs text-textLight-100'>
                    Download an Authenticator app on your mobile device (e.g.,
                    Google Authenticator, Microsoft Authenticator).
                  </li>
                  <li className='font-normal text-xs text-textLight-100'>
                    Scan the QR code or enter the secret key into the
                    Authenticator app.
                  </li>
                  <li className='font-normal text-xs text-textLight-100'>
                    Enter the 6-digit code generated by the Authenticator app to
                    finish the setup.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className='flex gap-4 justify-end'>
          <Button
            variant='outline'
            className='px-8'
            type='button'
            onClick={() => reset()}
          >
            Cancel
          </Button>
          <Button className='px-8'>Save</Button>
        </div>
      </div>
    </>
  );
};

export default SecurityTab;
