import React from 'react'
import { DashboardContent } from '../../styles/Dashboard.styled'
import ReportsHeading from './components/ReportsHeading'
import ReportsTable from './components/ReportsTable'

export default function Reports() {
  return (
    <DashboardContent>
        <ReportsHeading />
        <ReportsTable />
    </DashboardContent>
  )
}
