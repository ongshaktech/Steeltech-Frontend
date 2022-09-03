import React from 'react'
import LineChartComponent from '../organism/LineChartComponent'
import { Select } from '../styles/Common.styled'
import { MachineCard } from '../styles/Overview.styled'

export default function MachineDetails() {
    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];
  return (
    <MachineCard>
        <div className='machine_Details'>
            <p>Polish Machine</p>
            <div className="machine_number">36.6/m</div>
            <p>Realtime Average output Time</p>
            <Select bg="#0071FF" color="#fff">
                <option>Select Machine</option>
                <option>Select Machine</option>
                <option>Select Machine</option>
            </Select>

        </div>
        <div className='machine_chart'>
            <LineChartComponent data = {data} />
        </div>
    </MachineCard>
  )
}
