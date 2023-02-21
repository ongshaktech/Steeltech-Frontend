import React from 'react';
import { ReportDetails } from '../styles/CommonReports.styled';

export default function ProductDetail({ productData }) {
    return (
        <ReportDetails>
            <div className='table_heading'>
                <p>ID</p>
                <p>Machine</p>
                <p>Thickness</p>
                <p>Dimension</p>
                <p>Product Type</p>
                <p>Shift</p>
            </div>
            {
                productData.map((item, index) => (
                    <div key={index}>
                        <hr className='divider' />
                        <div className='table_content'>
                            <p>{index + 1}</p>
                            <p>{item?.machine_no}</p>
                            <p>{item?.thickness}</p>
                            <p>{item?.dimension}</p>
                            <p>{item?.product_type}</p>
                            <p>{item?.shift}</p>
                        </div>
                    </div>
                ))
            }
        </ReportDetails>
    )
}
