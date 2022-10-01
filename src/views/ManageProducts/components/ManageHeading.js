import React from 'react'
import { Button } from '../../../styles/Common.styled'
import { ReportHeadingWrapper } from '../../../styles/Reports.styled'
// import filterImg from "../../../assets/images/filter.png"
import { ProtectedRoute } from '../../Authentication/ProtectedRoute'

export default function ManageHeading({ setshowProductModal }) {
    return (
        <ReportHeadingWrapper>
            <div>
                <p>Floor manage and Products</p>
            </div>
            <div className="right">
                <ProtectedRoute permission="addProduct">
                    <Button onClick={() => setshowProductModal(true)} bg="#E65192">Add Product</Button>
                </ProtectedRoute>
                {/* <div>
                    <input type="text" placeholder='Search' />
                </div>
                <div>
                    <img src={filterImg} alt="filter img" />
                </div> */}
            </div>
        </ReportHeadingWrapper>
    )
}
