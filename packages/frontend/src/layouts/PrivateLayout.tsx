import React from 'react';
import {
  Image,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
} from '@lantern/components';
import { Outlet, Navigate, useLocation, Link } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import ReferModal from '../components/Refer/ReferModal';
import logo from '../assets/logo.svg';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logoutAction } from '../store/slices/authSlice';

function PrivateLayout() {
  const [avatarKey, setAvatarKey] = React.useState(0);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const onLogout = React.useCallback(() => {
    dispatch(logoutAction({}));
  }, []);

  // when path is changed hide the expanded avatar menu
  React.useEffect(() => {
    setAvatarKey((key) => key + 1);
  }, [location.pathname]);

  return user ? (
    <div>
      <div className='bg-white flex justify-between px-6 py-3'>
        <Image src={logo} alt='Lantern Finance' />
        <div className='flex items-center gap-4'>
          <ReferModal>
            <Button variant='outline'>🔥 Refer a friend</Button>
          </ReferModal>
          {/* <WalletModal tab='deposit'> */}
          <Button>Deposit and withdraw</Button>
          {/* </WalletModal> */}
          <DropdownMenu key={avatarKey}>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary'>
                <AiOutlineUser className='h-6 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>
                <div className='flex items-center gap-2 py-3.5 px-5'>
                  <Image
                    alt='User avatar'
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.displayName!
                    )}&background=FFA756&color=fff`}
                    width={32}
                    height={32}
                    className='rounded-full'
                  />
                  <div>
                    <div className='font-semibold'>{user.displayName}</div>
                    <div className='text-sm text-muted-900 font-thin'>
                      {user.email}
                    </div>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuLabel>
                <Link
                  to='/account/profile'
                  className='flex items-center gap-2 py-3.5 px-5'
                >
                  Account Settings
                </Link>
              </DropdownMenuLabel>
              <DropdownMenuLabel>
                <button
                  onClick={onLogout}
                  className='flex items-center gap-2 text-red-600 py-3.5 px-5'
                >
                  Logout
                </button>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className='container mx-auto max-w-screen-xl'>
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to='/login' />
  );
}

export default PrivateLayout;
