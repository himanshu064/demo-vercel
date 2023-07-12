import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Image } from '@lantern/components';
import logo from '../assets/logo.svg';
import authDashboard from '../assets/auth-dashboard.png';

import { useAppSelector } from '../store/hooks';

function AuthLayout() {
  const user = useAppSelector((state) => state.auth.user);
  return user ? (
    <Navigate to='/dashboard' />
  ) : (
    <div className='flex flex-col md:flex-row min-h-screen'>
      <div className='bg-white w-full md:max-w-[500px] p-10 flex flex-col md:min-h-screen'>
        <Image width={99} src={logo} alt='Lantern Finance' />
        <div className='my-auto'>
          <Outlet />
        </div>
      </div>
      <div className='ps-10 py-10 flex items-center justify-end flex-grow'>
        <Image
          className='w-[90%] max-w-4xl'
          src={authDashboard}
          alt='Auth Dashboard'
        />
      </div>
    </div>
  );
}

export default AuthLayout;
