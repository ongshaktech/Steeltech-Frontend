import React from 'react';
import { Button } from '../../../styles/Common.styled';
import { ReportHeadingWrapper } from '../../../styles/Reports.styled';
import { useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../../Authentication/ProtectedRoute';

export default function ManageHeading({ setshowProductModal }) {
    const navigate = useNavigate();

    return (
        <ReportHeadingWrapper>
            <div>
                <p>Floor manage and Products</p>
            </div>
            <div className="right">
                <ProtectedRoute permission="addProduct">
                    <Button onClick={() => {setshowProductModal(true)}} bg="#E65192">Add Product</Button>
                </ProtectedRoute>
                
                <ProtectedRoute permission="addMachine">
                    <Button bg="#E65192" onClick={()=>{navigate('/manage-machines')}}>Manage Machines</Button>
                </ProtectedRoute>
                
            </div>
        </ReportHeadingWrapper>
    )
}
