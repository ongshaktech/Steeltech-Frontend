import React from 'react';
import { DashboardContent } from '../../styles/Dashboard.styled';
import DownTime from './components/DownTime';
import TotalPipesGraph from './components/TotalPipesGraph';
import TypeThicknessGraph from './components/TypeThicknessGraph';
import Overview from './components/Overview';

export default function Dashboard() {

  return (
    <DashboardContent>
      <TotalPipesGraph />
      <TypeThicknessGraph />
      <Overview />
      {/* <MasOverview /> */}
      <DownTime />
    </DashboardContent>
  );
}
