import React from 'react';
import { DashboardContent, PaginationButton } from '../../styles/Dashboard.styled';
import ReportsHeading from './components/ReportsHeading';
import ReportsTable from './components/ReportsTable';
import { db_firestore } from '../../Hooks/config';

import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { startAfter, endBefore } from 'firebase/firestore';

import { useState } from 'react';
import { useEffect } from 'react';
import { ProtectedRoute } from '../Authentication/ProtectedRoute';


export default function Reports() {

  let [ReportData, setReportData] = useState([]);
  let [snap, setSnap] = useState(null);
  let [pageIndex, setPageIndex] = useState(0);

  const dataPerPage = 30;

  useEffect(
    () => {
      const ref = collection(db_firestore, `*machines`);
      const q = query(ref, orderBy('unix_time', 'desc'), limit(dataPerPage));
      putDataInTable(q);
    }, []
  );


  const putDataInTable = (q) => {
    onSnapshot(q,
      (snapShot) => {
        let items = [];
        setSnap(snapShot);
        snapShot.forEach((doc) => {
          items.push(doc.data());
        });
        setReportData(items);
      }
    );
  }


  // Pagination
  const handleNextPage = () => {
    let collectionRef = collection(db_firestore, `*machines`);

    const q = query(collectionRef,
      orderBy('unix_time', 'desc'),
      startAfter(snap.docs[ReportData.length - 1]),
      limit(dataPerPage)
    );

    putDataInTable(q);
    setPageIndex(pageIndex + 1);
  }

  const handlePreviousPage = () => {
    let collectionRef = collection(db_firestore, `*machines`);

    const q = query(collectionRef,
      orderBy('unix_time', 'desc'),
      endBefore(snap.docs[0]),
      limit(dataPerPage)
    );

    putDataInTable(q);
    setPageIndex(pageIndex - 1);
  }


  return (
    <ProtectedRoute permission="manageRealtime">
      <DashboardContent>
        <ReportsHeading />
        <ReportsTable ReportData={ReportData} startIndex={pageIndex * dataPerPage} />

        <PaginationButton>
          <button onClick={handleNextPage}>
            <b>Next</b>
          </button>

          <button onClick={handlePreviousPage}>
            <b>Previous</b>
          </button>
        </PaginationButton>

      </DashboardContent>
    </ProtectedRoute>
  )
}
