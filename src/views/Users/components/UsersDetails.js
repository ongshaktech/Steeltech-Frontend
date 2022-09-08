import React from 'react';
import UserDetails from '../../../components/UserDetails';
import UserForm from '../../../components/UserForm';
import Modal from '../../../organism/Modal';
import { ReportsWrapper } from '../../../styles/CommonReports.styled';
import { useState, useEffect } from 'react';
import { useFirestore, GetFirestoreData } from '../../../Hooks/firebaseFuncs';


export default function UsersDetails({ setshowUserModal, showUserModal }) {
  let [formData, setFormData] = useState({});
  let [TableData, setTableData] = useState([]);
  GetFirestoreData('users').then(
    (data) => {
      setTableData(data);
    }
  );

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
      <UserDetails userdata={TableData} />
      {
        showUserModal && <Modal>
          <div onClick={() => setshowUserModal(false)} className='button'>X</div>
          <UserForm setFormData={setFormData} setshowUserModal={setshowUserModal} />
        </Modal>
      }
    </ReportsWrapper>
  )
}
