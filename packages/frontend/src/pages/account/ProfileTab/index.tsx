import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Form, FormInput, Button } from '@lantern/components';

const ProfileTab = () => {
  const methods = useForm({
    mode: 'onBlur',
  });

  const {
    formState: { isValid, isValidating },
    reset,
  } = methods;

  return (
    <>
      <div className='w-full p-2 md:mt-0 sm:mt-0 mt-10 lg:mt-0'>
        <h3 className='text-xl font-semibold mb-4'>Profile</h3>
        <FormProvider {...methods}>
          <Form>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div className='w-full'>
                <FormInput
                  name='firstName'
                  type='text'
                  label='FIRST NAME'
                  placeholder='Enter First Name'
                />
              </div>
              <div className='w-full'>
                <FormInput
                  name='lastName'
                  type='text'
                  label='LEGAL LAST NAME'
                  placeholder='Enter Last Name'
                />
              </div>

              <div className='w-full'>
                <FormInput
                  name='email'
                  type='email'
                  label='EMAIL'
                  placeholder='Enter Email id'
                />
              </div>

              <div className='w-full'>
                <FormInput
                  name='password'
                  type='password'
                  label='PASSWORD'
                  placeholder='Enter password'
                />
              </div>
            </div>
          </Form>
        </FormProvider>

        <div className='mt-6'>
          <h3 className='text-xl font-semibold mb-4'>Address</h3>
          <FormProvider {...methods}>
            <Form>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <div className='w-full'>
                  <FormInput
                    name='address'
                    type='text'
                    label='Street address'
                    placeholder='Your Street address'
                  />
                </div>
                <div className='w-full'>
                  <FormInput
                    name='flat'
                    type='text'
                    label='Apt, suite, etc'
                    placeholder='Enter Here...'
                  />
                </div>

                <div className='w-full'>
                  <FormInput
                    name='city'
                    type='text'
                    label='City'
                    placeholder='Enter your City'
                  />
                </div>

                <div className='w-full'>
                  <FormInput
                    name='state'
                    type='text'
                    label='State'
                    placeholder='Enter your State'
                  />
                </div>
                <div className='w-full'>
                  <FormInput
                    name='zip code'
                    type='number'
                    label='ZIP or postcode'
                    placeholder='Enter your code'
                  />
                </div>
              </div>
            </Form>
          </FormProvider>
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
      </div>
    </>
  );
};

export default ProfileTab;
