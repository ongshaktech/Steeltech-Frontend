import React from 'react';
import { DashboardContent } from '../../styles/Dashboard.styled';
import ReportsHeading from './components/ReportsHeading';
import ReportsTable from './components/ReportsTable';
import { GetData } from '../../Hooks/firebaseFuncs';
import { useState } from 'react';
import { useEffect } from 'react';
import { ProtectedRoute } from '../Authentication/ProtectedRoute';

export default function Reports() {
  let [ReportData, setReportData] = useState([]);
  let data = [];
  useEffect(
    () => {
      GetData('Machine32/Data/Date/30August2022',
        (response) => {
          setReportData(response);
        }
      );
    }, []
  );


  return (
    <ProtectedRoute permission="manageRealtime">
      <DashboardContent>
        <ReportsHeading />
        <ReportsTable ReportData={ReportData} />
      </DashboardContent>
    </ProtectedRoute>
  )
}
