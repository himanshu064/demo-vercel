import classNames from 'classnames';
import React from 'react';
import {
  AiFillInfoCircle as Info,
  AiFillWarning as Warning,
} from 'react-icons/ai';
import { BiSolidErrorAlt as Error } from 'react-icons/bi';
import { TiTick as Success } from 'react-icons/ti';
interface IAlert {
  status: 'error' | 'warning' | 'success' | 'info';
  children: React.ReactNode;
}

const SvgIcon = {
  error: <Error size={20} fill='red' />,
  warning: <Warning size={20} fill='yellow' />,
  success: <Success size={20} fill='green' />,
  info: <Info size={20} fill='blue' />,
};

const Alert = ({ status, children }: IAlert) => {
  return (
    <div
      className={classNames(
        'flex items-center text-sm font-semibold px-4 py-3 rounded rounded-xs',
        {
          'bg-red-100': status === 'error',
          'bg-yellow-100': status === 'warning',
          'bg-green-100': status === 'success',
          'bg-blue-100': status === 'info',
          // text
          'text-red-600': status === 'error',
          'text-yellow-600': status === 'warning',
          'text-green-600': status === 'success',
          'text-blue-600': status === 'info',
        }
      )}
      role='alert'
    >
      <span className='inline-block mr-2'>{SvgIcon[status]}</span>
      {children}
    </div>
  );
};

export default Alert;
