import React from 'react'
import { ReportDetails } from '../styles/CommonReports.styled'

// const productData = [
//     {
//         id: '1',
//         machine: "A1",
//         productType: "Circular",
//         shift: "Morning"
//     },
//     {
//         id: '2',
//         machine: "A1",
//         productType: "Circular",
//         shift: "Morning"
//     },
//     {
//         id: '3',
//         machine: "A1",
//         productType: "Circular",
//         shift: "Morning"
//     },
//     {
//         id: '4',
//         machine: "A1",
//         productType: "Circular",
//         shift: "Morning"
//     },
// ]

export default function ProductDetail({ productData }) {
    return (
        <ReportDetails>
            <div className='table_heading'>
                <p>ID</p>
                <p>Machine</p>
                <p>Thickness</p>
                <p>Product Type</p>
                <p>Shift</p>
            </div>
            {
                productData.map(item => (

                    <div className='table_content' key={item.id}>
                        <p>{item.id}</p>
                        <p>{item.machine_no}</p>
                        <p>{item.thickness}</p>
                        <p>{item.product_type}</p>
                        <p>{item.shift}</p>
                    </div>
                ))
            }
        </ReportDetails>
    )
}
