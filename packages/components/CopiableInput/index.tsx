import React, { useState } from 'react';
import { LuCopyCheck, LuCopy } from 'react-icons/lu';

interface IProps {
  label?: string;
  value?: string;
  onCopy?: () => void;
}

const CopiableInput = (props: IProps) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText((props.value || '').toString());
    props.onCopy?.();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <label className='border rounded flex focus-within:border-primary-900 border-muted-300 focus:outline-none transition-colors ease-in-out bg-white cursor-text'>
        <div className='grow py-2 px-4'>
          <span className='select-none text-muted-600 uppercase text-xs'>
            {props.label}
          </span>
          <input
            readOnly
            value={props.value}
            className='relative inline-flex w-full placeholder-muted-600 text-gray-700 outline-none bg-transparent'
          />
        </div>
        <button className='p-4' onClick={copy} type='button'>
          {copied ? (
            <LuCopyCheck className='text-green-600' size={20} />
          ) : (
            <LuCopy className='text-primary-900' size={20} />
          )}
        </button>
      </label>
    </div>
  );
};

export default CopiableInput;
