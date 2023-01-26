import React from 'react'
import { FaSignInAlt, FaUserCircle, FaChartBar, FaDharmachakra, FaBuromobelexperte } from 'react-icons/fa';
import { HiDocumentReport } from "react-icons/hi";
import { NavSidebar } from '../styles/NavSidebar'
import { NavLink } from "react-router-dom"
import { ClearCookie } from '../views/Authentication/Cookies';


export default function Sidebar() {
    let activeStyle = {
        textDecoration: "node",
        background: "#ddd",
        borderRadius: "50%",
        color: "currentColor",
    };
    let normalStyle = {
        textDecoration: "node",
        color: "currentColor",
    }
    return (
        <NavSidebar className='sideBar'>

            <NavLink to="/" style={({ isActive }) =>
                isActive ? activeStyle : normalStyle
            }>
                <div title='Machine Status'>
                    <FaBuromobelexperte />
                </div>
            </NavLink>


            <NavLink to="/dashboard" style={({ isActive }) =>
                isActive ? activeStyle : normalStyle
            }>
                <div title='Graph and Charts'>
                    <FaChartBar />
                </div>
            </NavLink>

            <NavLink to="/reports" style={({ isActive }) =>
                isActive ? activeStyle : normalStyle
            }>
                <div title='Reports'>
                    <HiDocumentReport />
                </div>
            </NavLink>
            <NavLink to="/users" style={({ isActive }) =>
                isActive ? activeStyle : normalStyle
            }>
                <div title='Manage Users'>
                    <FaUserCircle />
                </div>
            </NavLink>
            <NavLink to="/manage-products" style={({ isActive }) =>
                isActive ? activeStyle : normalStyle
            }>
                <div title='Manage Products'>
                    <FaDharmachakra />
                </div>
            </NavLink>
            <div title='Logout'>
                <a title='logout' onClick={() => {
                    ClearCookie();
                    window.location.reload();
                }}>
                    <FaSignInAlt/>
                </a>
            </div>
        </NavSidebar>
    )
}
