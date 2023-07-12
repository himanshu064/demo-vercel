import React from 'react';
import { Outlet, useParams, useNavigate, Link } from 'react-router-dom';
import { VerticalTabs } from '@lantern/components';
import { BsArrowLeft } from 'react-icons/bs';

interface Tabs {
  id: string;
  name: string;
  onClick: () => void;
}

const AccountPageLayout = () => {
  const { id } = useParams();
  const naviagate = useNavigate();

  const tabs: Tabs[] = React.useMemo(
    () => [
      {
        id: 'profile',
        name: 'Profile',
        onClick: () => naviagate(`/account/profile`),
      },
      {
        id: 'security',
        name: 'Security',
        onClick: () => naviagate(`/account/security`),
      },
      {
        id: 'staking',
        name: 'Staking Preference',
        onClick: () => naviagate(`/account/staking`),
      },
      {
        id: 'whitelisting',
        name: 'Whitelisting',
        onClick: () => naviagate(`/account/whitelisting`),
      },
      {
        id: 'reports',
        name: 'Reports',
        onClick: () => naviagate(`/account/reports`),
      },
      {
        id: 'referrals',
        name: 'Referrals',
        onClick: () => naviagate(`/account/referrals`),
      },
      {
        id: 'contact',
        name: 'Contact Us',
        onClick: () => naviagate(`/account/contact`),
      },
    ],
    []
  );
  return (
    <React.Fragment>
      {/* <SectionHeading
        title='Account Settings'
        description='Manage your account settings and preferences.'
        onGoBack={() => naviagate(-1)}
      />
      <VerticalTabs tabs={tabs} selected={id}>
        <Outlet />
      </VerticalTabs> */}
      <div className='container my-8 mx-auto'>
        <div className='flex mb-6 gap-4 items-center'>
          <Link
            to='/account'
            className='bg-white/50 text-muted-900 p-3 rounded-lg'
          >
            <BsArrowLeft />
          </Link>
          <div>
            <h1 className='text-2xl font-semibold'>Account Settings</h1>
            <span className='text-sm text-muted-900'>
              Manage your account settings and preferences.
            </span>
          </div>
        </div>
        <VerticalTabs tabs={tabs} selected={id}>
          <div className='flex-grow p-6'>
            <Outlet />
          </div>
        </VerticalTabs>
      </div>
    </React.Fragment>
  );
};

export default AccountPageLayout;
