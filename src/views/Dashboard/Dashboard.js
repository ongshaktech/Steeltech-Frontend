import React from 'react';
import { DashboardContent } from '../../styles/Dashboard.styled';
import DownTime from './components/DownTime';
import MasOverview from './components/MasOverview';
import Overview from './components/Overview';
import { useEffect } from 'react';
// import GetData from '../../config';

export default function Dashboard() {

  // GetData('Machine32/Data/Date/26August2022', (data)=>{
  //   console.log(data);
  // });

  return (
    <DashboardContent>
      <Overview />
      <MasOverview />
      <MasOverview />
      <DownTime />
    </DashboardContent>
  );
}
