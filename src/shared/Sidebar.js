import React from 'react'
import { FaSignInAlt, FaUserCircle, FaChartBar, FaDharmachakra, FaBuromobelexperte } from 'react-icons/fa';
import {HiDocumentReport} from "react-icons/hi";
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
        <NavSidebar>

            <NavLink to="/" style={({ isActive }) =>
                isActive ? activeStyle : normalStyle
            }>
                <div>
                    <FaBuromobelexperte />
                </div>
            </NavLink>


            <NavLink to="/dashboard" style={({ isActive }) =>
                isActive ? activeStyle : normalStyle
            }>
                <div>
                    <FaChartBar />
                </div>
            </NavLink>

            <NavLink to="/reports" style={({ isActive }) =>
                isActive ? activeStyle : normalStyle
            }>
                <div>
                    <HiDocumentReport />
                </div>
            </NavLink>
            <NavLink to="/users" style={({ isActive }) =>
                isActive ? activeStyle : normalStyle
            }>
                <div>
                    <FaUserCircle />
                </div>
            </NavLink>
            <NavLink to="/manage-products" style={({ isActive }) =>
                isActive ? activeStyle : normalStyle
            }>
                <div>
                    <FaDharmachakra />
                </div>
            </NavLink>
            <div>
                <a title='logout' onClick={() => {
                    ClearCookie();
                    window.location.reload();
                }}>
                    <FaSignInAlt />
                </a>
            </div>
        </NavSidebar>
    )
}
