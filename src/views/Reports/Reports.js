import React from 'react';
import { DashboardContent, PaginationButton } from '../../styles/Dashboard.styled';
import ReportsHeading from './components/ReportsHeading';
import ReportsTable from './components/ReportsTable';
import { db_firestore } from '../../Hooks/config';

import { collection, query, orderBy, limit, onSnapshot, limitToLast } from 'firebase/firestore';
import { startAfter, endBefore } from 'firebase/firestore';

import { useState } from 'react';
import { useEffect } from 'react';
import { ProtectedRoute } from '../Authentication/ProtectedRoute';


export default function Reports() {

  let [ReportData, setReportData] = useState([]);
  let [snap, setSnap] = useState(null);
  let [pageIndex, setPageIndex] = useState(0);
  let [fetchedDataNum, setFetchedDataNum] = useState(0);

  const dataPerPage = 30;

  const collection_name = 'machines';

  useEffect(
    () => {
      const ref = collection(db_firestore, collection_name);
      const q = query(ref, orderBy('unix_time', 'desc'), limit(dataPerPage));
      putDataInTable(q, 0);
    }, []
  );


  const putDataInTable = (q, increase) => {
    onSnapshot(q,
      (snapShot) => {
        let items = [];
        snapShot.forEach((doc) => {
          items.push(doc.data());
        });

        setFetchedDataNum(items.length);
        if (items.length !== 0) {
          setSnap(snapShot);
          setReportData(items);
          setPageIndex(pageIndex + increase);
        }
      }
    );
  }


  // Pagination
  const handleNextPage = () => {
    let collectionRef = collection(db_firestore, collection_name);

    const q = query(collectionRef,
      orderBy('unix_time', 'desc'),
      startAfter(snap.docs[ReportData.length - 1]),
      limit(dataPerPage)
    );
    putDataInTable(q, 1);
  }

  const handlePreviousPage = () => {
    let collectionRef = collection(db_firestore, collection_name);

    const q = query(collectionRef,
      orderBy('unix_time', 'desc'),
      endBefore(snap.docs[0]),
      limitToLast(dataPerPage)
    );

    putDataInTable(q, -1);
  }


  return (
    <ProtectedRoute permission="manageRealtime">
      <DashboardContent>
        <ReportsHeading />
        <ReportsTable ReportData={ReportData} startIndex={pageIndex * dataPerPage} />

        <PaginationButton>
          <button onClick={handlePreviousPage} disabled={pageIndex === 0}>
            <b>Previous</b>
          </button>
          <button onClick={handleNextPage} disabled={fetchedDataNum < dataPerPage}>
            <b>Next</b>
          </button>
        </PaginationButton>

      </DashboardContent>
    </ProtectedRoute>
  )
}
