import React from 'react'
import { DashboardContent } from '../../styles/Dashboard.styled'
import DownTime from './components/DownTime'
import MasOverview from './components/MasOverview'
import Overview from './components/Overview'

export default function Dashboard() {
  return (
    <DashboardContent>
        <Overview />
        <MasOverview />
        <MasOverview />
        <DownTime />
    </DashboardContent>
  )
}
