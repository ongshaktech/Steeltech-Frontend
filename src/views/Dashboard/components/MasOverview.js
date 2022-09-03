import React from 'react'
import Analytics from '../../../organism/Analytics';
import LineChartComponent from '../../../organism/LineChartComponent'
import { GridTwo } from '../../../styles/Common.styled'
import { Section } from '../../../styles/Sections.styled'

export default function MasOverview() {
    const data = [
        { name: 'Group A', value: 700, profit: "30%" },
        { name: 'Group B', value: 300, profit: "50%" },
        { name: 'Group C', value: 530, profit: "20%" },
        { name: 'Group D', value: 200, profit: "80%" },
      ];

    return (
        <Section>
            <GridTwo>
                <Analytics data = {data} />
                <Analytics data = {data} />
            </GridTwo>
        </Section>
    )
}
