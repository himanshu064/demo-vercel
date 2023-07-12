import React from 'react';
import { useParams } from 'react-router-dom';
import ProfileTab from './ProfileTab';
import SecurityTab from './SecurityTab';
import StakingPreferenceTab from './StakingPreferenceTab';
import WhiteListingTab from './WhiteListingTab';
import ReportsTab from './ReportsTab';
import ReferralsTab from './ReferralsTab';
import ContactUsTab from './ContactUsTab';

const AccountSettings = () => {
  const { id } = useParams();

  const ComponentMapping: any = React.useMemo(
    () => ({
      profile: ProfileTab,
      security: SecurityTab,
      staking: StakingPreferenceTab,
      whitelisting: WhiteListingTab,
      reports: ReportsTab,
      referrals: ReferralsTab,
      contact: ContactUsTab,
      default: () => <p>Tab does not exist!</p>,
    }),
    []
  );

  const TabContent = React.useMemo(() => {
    return ComponentMapping?.[id!] || ComponentMapping['default'];
  }, [id]);

  return <TabContent />;
};

export default AccountSettings;
