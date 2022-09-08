import React from 'react';
import { DashboardContent } from '../../styles/Dashboard.styled';
import ReportsHeading from './components/ReportsHeading';
import ReportsTable from './components/ReportsTable';
import { GetFirestoreData } from '../../Hooks/firebaseFuncs';
import { db_firestore } from '../../Hooks/config';
import { collection, query, orderBy, limit, getDocs, onSnapshot } from 'firebase/firestore';
import { useState } from 'react';
import { useEffect } from 'react';
import { ProtectedRoute } from '../Authentication/ProtectedRoute';


export default function Reports() {
  let [MachineNo, setMachineNo] = useState('');
  let [ReportData, setReportData] = useState([]);

  useEffect(
    () => {
      if (MachineNo !== '') {
        const ref = collection(db_firestore, `machine${MachineNo}`);
        const q = query(ref, orderBy('creatingDate', 'desc'));
        onSnapshot(q,
          (snapShot) => {
            let items = [];      
            snapShot.forEach((doc) => {
              items.push(doc.data());
            });
            console.log(items);
            setReportData(items);
          }
        );

      }
    }, [MachineNo]
  );

  useEffect(
    () => {
      // Set Machine No.
      const ref = collection(db_firestore, 'products');
      const q = query(ref, orderBy('creatingDate', 'desc'), limit(1));
      getDocs(q).then(
        (snapShot) => {
          let items = [];
          snapShot.forEach((doc) => {
            items.push(doc.data());
          });
          setMachineNo(items[0]['machine_no']);
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
