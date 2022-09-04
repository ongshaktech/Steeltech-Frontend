import React from 'react'
import { ReportDetails } from '../styles/CommonReports.styled'

export default function UserDetails({ userdata }) {
    return (
        <ReportDetails>
            <div className='table_heading'>
                <p>ID</p>
                <p>Name</p>
                <p>User Name</p>
                <p>Email</p>
                <p>Access</p>
            </div>
            {
                userdata.map((item, index) => (
                    <>
                        <hr className='divider' />
                        <div className='table_content' key={item.id}>
                            <p>{index + 1}</p>
                            <p>{item.name}</p>
                            <p>{item.username}</p>
                            <p>{item.email}</p>
                            <p>{item.access}</p>                            
                        </div>
                    </>
                ))
            }
        </ReportDetails>
    )
}
