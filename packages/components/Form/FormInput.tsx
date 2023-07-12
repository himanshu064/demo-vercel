import React, { useId, HTMLInputTypeAttribute } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import classNames from 'classnames';

interface IFormInput {
  id?: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  after?: React.ReactNode;
}

const FormInput: React.FC<IFormInput> = ({
  id: inputId,
  name,
  type = 'text',
  placeholder,
  label,
  defaultValue = '',
  className,
  after,
  ...props
}) => {
  const methods = useFormContext();
  const fieldId = useId();
  const id = inputId || fieldId;
  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      control={methods.control}
      render={({
        field,
        fieldState: { error, invalid, isDirty, isTouched },
        formState: { errors },
      }) => {
        const hasError = isTouched && invalid;
        return (
          <div className={className} aria-live='polite'>
            <label
              className={classNames(
                'border rounded flex focus-within:border-primary-900 border-muted-300 focus:outline-none transition-colors ease-in-out bg-white cursor-text',
                {
                  '!border-red-600': hasError,
                }
              )}
              htmlFor={id}
            >
              <div className='grow py-2 px-4'>
                <span
                  className={classNames(
                    'select-none text-muted-600 uppercase text-xs',
                    {
                      '!text-red-600': hasError,
                    }
                  )}
                >
                  {label}
                </span>
                <input
                  {...field}
                  id={id}
                  aria-invalid={hasError}
                  placeholder={placeholder}
                  className='relative inline-flex w-full placeholder-muted-600 text-gray-700 outline-none bg-transparent'
                  {...props}
                />
              </div>
              {after}
            </label>
            {hasError && (
              <ErrorMessage
                errors={errors}
                name={name as any}
                render={({ message }) => (
                  <div className='mt-1 text-red-600 text-sm'>{message}</div>
                )}
              />
            )}
          </div>
        );
      }}
    />
  );
};

export default FormInput;
