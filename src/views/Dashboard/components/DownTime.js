import React from 'react'
import LineChartComponent from '../../../organism/LineChartComponent'
import { Select } from '../../../styles/Common.styled';
import { DownTimeWrapper } from '../../../styles/DownTime.styled'
import { Section } from '../../../styles/Sections.styled'

export default function DownTime() {
    const data = [
        { name: 'Group A', value: 700, profit: "30%" },
        { name: 'Group B', value: 300, profit: "50%" },
        { name: 'Group C', value: 530, profit: "20%" },
        { name: 'Group D', value: 200, profit: "80%" },
    ];
    return (
        <Section bg="#fff">
            <DownTimeWrapper>
                <div>
                    <h6 style={{fontSize: "1.8rem", marginBottom: "2rem"}}>Downtime Status Per Machine</h6>
                    <LineChartComponent data={data} />
                </div>
                <div>
                    <Select bg="#0071FF" color="#fff">
                        <option>Select Machine</option>
                        <option>Select Machine</option>
                        <option>Select Machine</option>
                    </Select>
                </div>
                <div>
                    <h6 style={{fontSize: "1.8rem", marginBottom: "1rem"}}>Last Updated Time</h6>
                    <div className='date'>
                        <h6>4:31 PM</h6>
                        <p>12/07/2022</p>
                    </div>
                </div>
            </DownTimeWrapper>
        </Section>
    )
}
