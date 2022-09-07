import React from 'react'
import { FaSignInAlt, FaRegLifeRing, FaRegBell, FaChartBar, FaDharmachakra } from 'react-icons/fa';
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
                    <FaRegLifeRing />
                </div>
            </NavLink>
            <NavLink to="/report" style={({ isActive }) =>
                isActive ? activeStyle : normalStyle
            }>
                <div>
                    <FaRegBell />
                </div>
            </NavLink>
            <NavLink to="/users" style={({ isActive }) =>
                isActive ? activeStyle : normalStyle
            }>
                <div>
                    <FaChartBar />
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
                <a title='logout' onClick={()=>{
                  ClearCookie();
                  window.location.reload();  
                }}>
                    <FaSignInAlt />    
                </a>
            </div>
        </NavSidebar>
    )
}
