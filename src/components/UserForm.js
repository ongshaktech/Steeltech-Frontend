import React from 'react'
import { ReportsFormContainer } from '../styles/CommonReports.styled'

export default function UserForm() {
  return (
    <ReportsFormContainer bg="#00B6CD">
        <h3>Add Users</h3>
        <form>
            <label>
                <p>UserName*</p>
                <input type="text"  />
            </label>
            <label>
                <p>Name*</p>
                <input type="text"  />
            </label>
            <label>
                <p>Password*</p>
                <input type="password"  />
            </label>
            <label>
                <p>Email*</p>
                <input type="email"  />
            </label>
            <label>
                <p>Access*</p>
                <select>
                    <option>manager</option>
                    <option>manager</option>
                    <option>manager</option>
                </select>
            </label>
            <input className='submit' type="submit" value="submit" />
        </form>
    </ReportsFormContainer>
  )
}
