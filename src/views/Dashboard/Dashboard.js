import React from 'react';
import { DashboardContent } from '../../styles/Dashboard.styled';
import DownTime from './components/DownTime';
import TotalPipesGraph from './components/TotalPipesGraph';
import TypeThicknessGraph from './components/TypeThicknessGraph';
import { ProtectedRoute } from '../Authentication/ProtectedRoute';
// import Overview from './components/Overview';

export default function Dashboard() {

  return (
    <DashboardContent>
      
      <ProtectedRoute permission="productDetails">
        <TotalPipesGraph />
      </ProtectedRoute>

      <ProtectedRoute permission="productType">
        <TypeThicknessGraph />
      </ProtectedRoute>

      <ProtectedRoute permission="downtimeStatus">
        <DownTime />
      </ProtectedRoute>

      {/* <Overview /> */}
    </DashboardContent>
  );
}
