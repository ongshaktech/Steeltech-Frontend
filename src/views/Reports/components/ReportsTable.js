import React from 'react'
import { ReportTableWrapper } from '../../../styles/Reports.styled'

const details = [
    {
        id: '1',
        machineNumber: "a1",
        productType: "circular",
        thickness: 22.22,
        product: 220,
        totalWeight: 120,
        averageWeight: 540,
        shift: "afternoon",
        lastProductionTime: {
            time: "5:00 PM",
            date: "22/04/2022"
        }
    },
    {
        id: '2',
        machineNumber: "a2",
        productType: "Doubly",
        thickness: 12.22,
        product: 270,
        totalWeight: 420,
        averageWeight: 140,
        shift: "morning",
        lastProductionTime: {
            time: "2:00 PM",
            date: "25/04/2022"
        }
    },
    {
        id: '3',
        machineNumber: "a3",
        productType: "circular",
        thickness: 22.22,
        product: 220,
        totalWeight: 120,
        averageWeight: 540,
        shift: "afternoon",
        lastProductionTime: {
            time: "5:00 PM",
            date: "22/04/2022"
        }
    },
    {
        id: '4',
        machineNumber: "a4",
        productType: "Doubly",
        thickness: 12.22,
        product: 270,
        totalWeight: 420,
        averageWeight: 140,
        shift: "morning",
        lastProductionTime: {
            time: "2:00 PM",
            date: "25/04/2022"
        }
    },
    {
        id: '5',
        machineNumber: "a5",
        productType: "circular",
        thickness: 22.22,
        product: 220,
        totalWeight: 120,
        averageWeight: 540,
        shift: "afternoon",
        lastProductionTime: {
            time: "5:00 PM",
            date: "22/04/2022"
        }
    },
    {
        id: '6',
        machineNumber: "a6",
        productType: "Doubly",
        thickness: 12.22,
        product: 270,
        totalWeight: 420,
        averageWeight: 140,
        shift: "morning",
        lastProductionTime: {
            time: "2:00 PM",
            date: "25/04/2022"
        }
    },
    {
        id: '7',
        machineNumber: "a7",
        productType: "circular",
        thickness: 22.22,
        product: 220,
        totalWeight: 120,
        averageWeight: 540,
        shift: "afternoon",
        lastProductionTime: {
            time: "5:00 PM",
            date: "22/04/2022"
        }
    },
    {
        id: '8',
        machineNumber: "a8",
        productType: "Doubly",
        thickness: 12.22,
        product: 270,
        totalWeight: 420,
        averageWeight: 140,
        shift: "morning",
        lastProductionTime: {
            time: "2:00 PM",
            date: "25/04/2022"
        }
    },
    {
        id: '9',
        machineNumber: "a9",
        productType: "circular",
        thickness: 22.22,
        product: 220,
        totalWeight: 120,
        averageWeight: 540,
        shift: "afternoon",
        lastProductionTime: {
            time: "5:00 PM",
            date: "22/04/2022"
        }
    },
    {
        id: '10',
        machineNumber: "a10",
        productType: "Doubly",
        thickness: 12.22,
        product: 270,
        totalWeight: 420,
        averageWeight: 140,
        shift: "morning",
        lastProductionTime: {
            time: "2:00 PM",
            date: "25/04/2022"
        }
    },
]

export default function ReportsTable({ ReportData }) {
    // console.log(ReportData);

    return (
        <ReportTableWrapper>
            <div className='table_heading'>
                <p>ID</p>
                <p>Machine Number</p>
                <p>Product Type</p>
                <p>thickness</p>
                <p>Product Count</p>
                <p>Total weight</p>
                <p>Shift</p>
                <p>Last Production Time</p>
            </div>
            {
                ReportData.map((item, index) => (
                    <>
                        <hr className='divider' />
                        <div className='table_content' key={item.id}>
                            <p>{index + 1}</p>
                            <p>{item.machine_no}</p>
                            <p>{item.product_type}</p>
                            <p>{item.thickness}</p>
                            <p>{item.count} </p>
                            <p>{item.weight} KG</p>
                            <p>{item.shift}</p>
                            <p>{item['date']} {
                                `${(item['time']).toString().slice(0, 2)}:${(item['time']).toString().slice(2, 4)}:${(item['time']).toString().slice(4, 6)}`
                            }</p>
                            {/* `${item.Time.slice(0, 2)} : ${item.Time.slice(2, 4)}: ${item.Time.slice(4, 6)}` */}
                        </div>
                    </>
                ))
            }
        </ReportTableWrapper>
    )
}
