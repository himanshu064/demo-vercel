import React from 'react';
import { useAppSelector } from '../../store/hooks';

const Dashboard = () => {
  const user = useAppSelector((state) => state.auth.user);
  
  return <div>{JSON.stringify(user, null, 2)}</div>;
};

export default Dashboard;
