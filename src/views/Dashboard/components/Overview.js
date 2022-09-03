import React from 'react'
import { Section } from '../../../styles/Sections.styled'
import { OverviewHeading, OverviewWrapper } from '../../../styles/Overview.styled'
import OverallOverview from '../../../components/OverallOverview'
import MachineDetails from '../../../components/MachineDetails'

export default function Overview() {
  return (
    <Section>
      <OverviewHeading>
        <h6>Dashboard</h6>
        <p>Monday, 02/07/2022</p>
      </OverviewHeading>
      <OverviewWrapper>
        <OverallOverview />
        <MachineDetails />
      </OverviewWrapper>
    </Section>
  )
}
