import React, {useState} from 'react'
import { DashboardContent } from '../../styles/Dashboard.styled'
import UsersDetails from './components/UsersDetails'
import UsersHeading from './components/UsersHeading'

export default function Users() {
  let [showUserModal, setshowUserModal] = useState(false);
  return (
    <DashboardContent>
      <UsersHeading setshowUserModal = {setshowUserModal} />
      <UsersDetails showUserModal = {showUserModal} setshowUserModal = {setshowUserModal}  />
    </DashboardContent>
  )
}
