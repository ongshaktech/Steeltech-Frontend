import React from 'react'
import UserDetails from '../../../components/UserDetails'
import UserForm from '../../../components/UserForm'
import Modal from '../../../organism/Modal'
import { ReportsWrapper } from '../../../styles/CommonReports.styled'
import { useState, useEffect } from 'react';
import { useFirestore, useCollection } from '../../../Hooks/firebaseFuncs';


export default function UsersDetails({ setshowUserModal, showUserModal }) {
  let [formData, setFormData] = useState({});
  const { document } = useCollection('users');
  const { addDocument } = useFirestore('users');

  useEffect(
    () => {
      if (Object.keys(formData).length !== 0) {
        addDocument(formData);
      }
    }, [formData]
  );

  return (
    <ReportsWrapper>
      <UserDetails userdata={document}/>
      {
        showUserModal && <Modal>
          <div onClick={() => setshowUserModal(false)} className='button'>X</div>
          <UserForm setFormData={setFormData} setshowUserModal={setshowUserModal}/>
        </Modal>
      }
    </ReportsWrapper>
  )
}
