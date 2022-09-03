import React from 'react'
import { ReportDetails } from '../styles/CommonReports.styled'

const userData = [
    {
        id: '1',
        userName: "John Doe",
        email: "johndoe@gmail.com",
        phone: "018762834",
        type: "admin"
    },
    {
        id: '2',
        userName: "John Doe",
        email: "johndoe@gmail.com",
        phone: "018762834",
        type: "admin"
    },
    {
        id: '3',
        userName: "John Doe",
        email: "johndoe@gmail.com",
        phone: "018762834",
        type: "manager"
    },
    {
        id: '4',
        userName: "John Doe",
        email: "johndoe@gmail.com",
        phone: "018762834",
        type: "manager"
    },
    {
        id: '5',
        userName: "John Doe",
        email: "johndoe@gmail.com",
        phone: "018762834",
        type: "admin"
    },
]

export default function UserDetails() {
    return (
        <ReportDetails>
            <div className='table_heading'>
                <p>ID</p>
                <p>UserName</p>
                <p>Email</p>
                <p>Phone</p>
                <p>Type</p>
            </div>
            {
                userData.map(item => (

                    <div className='table_content' key={item.id}>
                        <p>{item.id}</p>
                        <p>{item.userName}</p>
                        <p>{item.email}</p>
                        <p>{item.phone}</p>
                        <p>{item.type}</p>
                    </div>
                ))
            }
        </ReportDetails>
    )
}
