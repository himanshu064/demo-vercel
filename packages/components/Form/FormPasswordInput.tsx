import React, { useId } from 'react';
import classNames from 'classnames';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const errorColor = 'var(--chakra-colors-red-500)';

interface IFormInput {
  id?: string;
  name: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  after?: React.ReactNode;
}

const FormPasswordInput: React.FC<IFormInput> = ({
  id: inputId,
  name,
  placeholder,
  label,
  defaultValue = '',
  className,
  after,
  ...props
}) => {
  const [show, setShow] = React.useState(false);

  const methods = useFormContext();
  const fieldId = useId();
  const id = inputId || fieldId;

  const handleClick = () => setShow((p) => !p);

  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      control={methods.control}
      render={({
        field,
        fieldState: { invalid, isTouched },
        formState: { errors },
      }) => {
        const hasError = isTouched && invalid;
        return (
          <div className={className} aria-live='polite'>
            <label
              className={classNames([
                'border rounded flex focus-within:border-primary-900 border-muted-300 focus:outline-none transition-colors ease-in-out bg-white cursor-text',
                hasError && '!border-red-600',
              ])}
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
                  type={show ? 'text' : 'password'}
                  aria-invalid={hasError}
                  placeholder={placeholder}
                  className='relative inline-flex w-full placeholder-muted-600 text-gray-700 outline-none bg-transparent'
                  {...props}
                />
              </div>
              <div className='flex items-center justify-center pr-2 cursor-pointer relative'>
                <span className='inline-block absolute bottom-2 right-2'>
                  {show ? (
                    <AiOutlineEyeInvisible
                      fontSize={20}
                      onClick={handleClick}
                    />
                  ) : (
                    <AiOutlineEye fontSize={20} onClick={handleClick} />
                  )}
                </span>
              </div>
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

export default FormPasswordInput;
