import React, { useId } from 'react';
import classNames from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

interface ICheckBox {
  id?: string;
  name: string;
  defaultChecked?: boolean;
  className?: string;
  children: React.ReactNode;
}

const CheckBox: React.FC<ICheckBox> = ({
  id: inputId,
  name,
  defaultChecked,
  className,
  children,
  ...props
}) => {
  const methods = useFormContext();
  const fieldId = useId();
  const id = inputId || fieldId;

  return (
    <Controller
      defaultValue={defaultChecked}
      name={name}
      control={methods.control}
      render={({
        field,
        fieldState: { isTouched, invalid },
        formState: { errors },
      }) => {
        const hasError = isTouched && invalid;
        return (
          <div className={className} aria-live='polite'>
            <div className='flex items-center'>
              <input
                id={id}
                {...field}
                aria-invalid={hasError}
                type='checkbox'
                className={classNames(
                  'w-5 h-5 text-primary-900 border-muted-400 rounded focus:ring-current focus:ring-1',
                  hasError && '!border-red-600'
                )}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                {...props}
              />
              <label htmlFor={id} className='ml-2 text-sm'>
                {children}
              </label>
            </div>
            <ErrorMessage
              errors={errors}
              name={name as any}
              render={({ message }) => (
                <div className='mt-1 text-red-600'>{message}</div>
              )}
            />
          </div>
        );
      }}
    />
  );
};

export default CheckBox;
