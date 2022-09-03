import React from 'react'
import { AnalyticsCard } from '../styles/Analytics.styled'
import { GridTwo } from '../styles/Common.styled'
import AnalyticsDetails from './AnalyticsDetails'
import BarChartComponent from './BarChartComponent'
// import LineChartComponent from './LineChartComponent'

export default function Analytics({ data }) {
    return (
        <AnalyticsCard>
            <h2>Total Mass Per Machine</h2>
            <div className='content'>
                <div style={{width: "100%"}}>
                <BarChartComponent data={data} />
                </div>
                <AnalyticsDetails />
            </div>
        </AnalyticsCard>
    )
}
