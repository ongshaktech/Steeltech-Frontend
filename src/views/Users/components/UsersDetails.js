import React from 'react'
import UserDetails from '../../../components/UserDetails'
import UserForm from '../../../components/UserForm'
import Modal from '../../../organism/Modal'
import { ReportsWrapper } from '../../../styles/CommonReports.styled'

export default function UsersDetails({ setshowUserModal, showUserModal }) {

  return (
    <ReportsWrapper>
      <UserDetails />
      {
        showUserModal && <Modal>
          <div onClick={() => setshowUserModal(false)} className='button'>X</div>
          <UserForm />
        </Modal>
      }
    </ReportsWrapper>
  )
}
