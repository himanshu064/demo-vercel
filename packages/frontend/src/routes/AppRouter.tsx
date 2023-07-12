import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { FirebaseApp, getCurrentUser } from '@lantern/api';
import AuthLayout from '../layouts/AuthLayout';
import PrivateLayout from '../layouts/PrivateLayout';
import AccountPageLayout from '../layouts/AccountPageLayout';
import AccountSettings from '../pages/account/settings';

import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import Dashboard from '../pages/Dashboard';

import { useAppDispatch } from '../store/hooks';
import { setAuth } from '../store/slices/authSlice';
import { IUser } from '@lantern/interfaces';
import { transformAuthUser } from '../helpers/auth-helper';

const AppRouter = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = FirebaseApp.auth.onAuthStateChanged(
      async (_user: any) => {
        if (_user) {
          const authUser: IUser = transformAuthUser(_user, _user.accessToken);
          const user = await getCurrentUser(authUser.email!);
          dispatch(
            setAuth({
              authUser,
              user,
            })
          );
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route key='/login' path='/login' element={<Login />}></Route>
        <Route key='/register' path='/register' element={<Register />}></Route>
      </Route>
      <Route element={<PrivateLayout />}>
        {/* Redirect the user to dashboard */}
        <Route key='/home' path='/' element={<Navigate to='/login' />} />
        <Route key='/dashboard' path='/dashboard' element={<Dashboard />} />

        <Route key='/account'>
          <Route key='/account' path='/account' element={<p>Account Page</p>} />
          <Route element={<AccountPageLayout />}>
            <Route
              key='/account/container'
              path='/account/:id'
              element={<AccountSettings />}
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
