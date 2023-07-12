import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Form, FormSwitch } from '@lantern/components';
import { FaRegQuestionCircle } from 'react-icons/fa';

const StakingPreferenceTab = () => {
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      enableReStaking: false,
    },
  });

  const {
    formState: { isValid, isValidating },
    reset,
  } = methods;

  return (
    <div className='w-full h-full flex flex-col p-2 md:mt-0 sm:mt-0 mt-10 lg:mt-0'>
      <div className='flex-1'>
        <h3 className='text-lg font-semibold mt-1'>Staking Preference</h3>

        <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='w-full'>
            <div className='my-6'>
              <div className='border border-muted-300 rounded divide-y divide-muted-300'>
                <div className='p-4 flex items-center justify-between'>
                  <h3 className='font-semibold'>Automatic re-staking</h3>
                  <FormProvider {...methods}>
                    <Form>
                      <FormSwitch name='enableReStaking' />
                    </Form>
                  </FormProvider>
                </div>
                <p className='text-muted-900 p-4 text-sm'>
                  Automatic re-staking is a feature that allows clients to
                  automatically reinvest their staking rewards into the staking
                  pool without manual intervention.
                </p>
              </div>
            </div>
          </div>

          <div className='w-full'>
            <div className='flex lg:mt-11 md:mt-5 mt-0'>
              <FaRegQuestionCircle className='text-yellow-500 mr-2 mt-1 w-4 h-4' />
              <div>
                <span className='font-normal text-sm text-textLight-100'>
                  Default is automatic re-staking of rewards
                </span>
              </div>
            </div>
          </div>
        </div>
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
  );
};

export default StakingPreferenceTab;
