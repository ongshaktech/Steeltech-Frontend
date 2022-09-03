import React from 'react'
import PieChartComponent from '../organism/PieChartComponent';
import { Select } from '../styles/Common.styled'
import { OverAllCard } from '../styles/Overview.styled'

export default function OverallOverview() {
    const data = [
        { name: 'Group A', value: 400, profit: "20%" },
        { name: 'Group B', value: 300, profit: "50%" },
        { name: 'Group C', value: 300, profit: "10%" },
        { name: 'Group D', value: 200, profit: "70%" },
    ];

    return (
        <OverAllCard>
            <PieChartComponent data = {data} />
            <div>
                <div className="title_wraper">
                    <div></div>
                    <p>Machine Wise Production</p>
                </div>
                <div className="title_wraper">
                    <div></div>
                    <p>Item Wise Total Mass Production</p>
                </div>
                <div className="title_wraper">
                    <div></div>
                    <p>Item Wise Average Mass Production</p>
                </div>
            </div>
        </OverAllCard>
    )
}
