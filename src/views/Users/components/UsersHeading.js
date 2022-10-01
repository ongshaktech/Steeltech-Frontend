import React from 'react';
import { Button } from '../../../styles/Common.styled';
import { ReportHeadingWrapper } from '../../../styles/Reports.styled';
// import filterImg from "../../../assets/images/filter.png";
import { ProtectedRoute } from '../../Authentication/ProtectedRoute';

export default function UsersHeading({ setshowUserModal }) {
    return (
        <ReportHeadingWrapper>
            <div>
                <p>Users</p>
            </div>
            <div className="right">
                <ProtectedRoute permission="addUser">
                    <Button bg="#00B6CD" onClick={() => setshowUserModal(true)}>Add User</Button>
                </ProtectedRoute>
                {/* <div>
                    <input type="text" placeholder='Search by Name' />
                </div>
                <div>
                    <img src={filterImg} alt="filter img" />
                </div> */}
            </div>
        </ReportHeadingWrapper>
    )
}
