import React from 'react';
import GoogleLogo from '../GoogleLogo/GoogleLogo';
import googleLogo from './g-logo.png';

interface ISignIn {
  children: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
}

const GoogleButton: React.FC<ISignIn> = ({ children, loading, onClick }) => {
  return (
    <button
      onClick={onClick}
      className='w-full flex justify-center items-center px-4 py-1 !bg-white !border !border-gray-200 rounded rounded-xs'
    >
      <GoogleLogo src={googleLogo} width={35} height={20} alt='Google Logo' />
      <span className='inline-block ml-1'>
        {loading ? 'Loading...' : children}
      </span>
    </button>
  );
};

export default GoogleButton;
