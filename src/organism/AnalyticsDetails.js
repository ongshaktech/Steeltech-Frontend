import React from 'react'
import { AnalyticsDetail } from '../styles/Analytics.styled'
import { Button, Select } from '../styles/Common.styled'

export default function AnalyticsDetails() {
    return (
        <AnalyticsDetail>
            <div className='category'>
                <div>
                    <p>Monthly</p>
                </div>
                <div>
                    <p>Daily</p>
                </div>
            </div>
            <div className='detail'>
                <p><span style={{ fontWeight: 700 }}>Highest Mass : </span><span>2000KG</span></p>
                <p><span style={{ fontWeight: 700 }}>Machine No : </span><span>Ek9123</span></p>
                <p><span style={{ fontWeight: 700 }}>Max/Minute : </span><span>200 KG/Minute</span></p>
            </div>
            <div>
                <Button>View More</Button>
            </div>
            <div>
                <Select bg="#0071FF" color="#fff">
                    <option>Selected Machine</option>
                    <option>RKt Machine</option>
                    <option>ERT Machine</option>
                </Select>
            </div>
        </AnalyticsDetail>
    )
}
