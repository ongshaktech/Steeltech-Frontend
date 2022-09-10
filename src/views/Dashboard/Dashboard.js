import React from 'react';
import { DashboardContent } from '../../styles/Dashboard.styled';
import DownTime from './components/DownTime';
import TotalPipesGraph from './components/MasOverview';
import Overview from './components/Overview';

export default function Dashboard() {

  return (
    <DashboardContent>
      <TotalPipesGraph />
      <Overview />
      {/* <MasOverview /> */}
      <DownTime />
    </DashboardContent>
  );
}
