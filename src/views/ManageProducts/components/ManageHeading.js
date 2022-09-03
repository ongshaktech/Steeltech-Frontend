import React from 'react'
import { Button } from '../../../styles/Common.styled'
import { ReportHeadingWrapper } from '../../../styles/Reports.styled'
import filterImg from "../../../assets/images/filter.png"

export default function ManageHeading({ setshowProductModal }) {
    return (
        <ReportHeadingWrapper>
            <div>
                <p>Floor manage and Products</p>
            </div>
            <div className="right">
                <div>
                    <Button onClick={() => setshowProductModal(true)} bg="#E65192">Add Product</Button>
                </div>
                <div>
                    <input type="text" placeholder='Search' />
                </div>
                <div>
                    <img src={filterImg} alt="filter img" />
                </div>
            </div>
        </ReportHeadingWrapper>
    )
}
