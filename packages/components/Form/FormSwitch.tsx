import React, { useId } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface IFormSwitch {
  id?: string;
  name: string;
  defaultValue?: boolean;
}

const FormSwitch: React.FC<IFormSwitch> = ({
  id: inputId,
  name,
  defaultValue = false,
}) => {
  const methods = useFormContext();
  const fieldId = useId();
  const id = inputId || fieldId;
  return (
    <Controller
      name={name}
      control={methods.control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <label className='relative inline-flex items-center cursor-pointer'>
          <input id={id} type='checkbox' className='sr-only peer' {...field} />
          <div className="w-[50px] h-7 bg-muted-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 peer-checked:after:left-0 after:left-[2px] after:bg-transparent after:border-white after:border-[10px] after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-success-400"></div>
        </label>
      )}
    />
  );
};
export default FormSwitch;
