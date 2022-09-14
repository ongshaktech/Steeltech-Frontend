import React from 'react';
import { DashboardContent } from '../../styles/Dashboard.styled';
import ReportsHeading from './components/ReportsHeading';
import ReportsTable from './components/ReportsTable';
import { db_firestore } from '../../Hooks/config';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { useState } from 'react';
import { useEffect } from 'react';
import { ProtectedRoute } from '../Authentication/ProtectedRoute';


export default function Reports() {

  let [ReportData, setReportData] = useState([]);

  useEffect(
    () => {
      const ref = collection(db_firestore, `machines`);
      const q = query(ref, orderBy('unix_time', 'desc'), limit(75));
      onSnapshot(q,
        (snapShot) => {
          let items = [];
          snapShot.forEach((doc) => {
            items.push(doc.data());
          });
          setReportData(items);
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
