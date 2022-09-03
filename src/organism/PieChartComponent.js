import React from 'react'
import { ResponsiveContainer, PieChart, Pie } from 'recharts';

export default function PieChartComponent({data}) {
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer >
                <PieChart>
                    <Pie dataKey="value" data={data} fill="#8884d8" label />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
