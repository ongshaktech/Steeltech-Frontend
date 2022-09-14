import React from 'react';
import ProductDetail from '../../../components/ProductDetail';
import ProductForm from '../../../components/ProductForm';
import Modal from '../../../organism/Modal';
import { ReportsWrapper } from '../../../styles/CommonReports.styled';
import { useState, useEffect } from 'react';
import { useFirestore, GetFirestoreData } from '../../../Hooks/firebaseFuncs';

export default function ProductDetails({ setshowProductModal, showProductModal }) {
  let [TableData, setTableData] = useState([]);
  let [formData, setFormData] = useState({});


  GetFirestoreData('products', 65).then(
    (data) => {
      setTableData(data);
    }
  );

  const { addDocument } = useFirestore('products');
  const { updateDocument } = useFirestore('latest_product')


  useEffect(
    () => {
      if (Object.keys(formData).length !== 0) {
        addDocument(formData);
        updateDocument(`machine${formData.machine_no}`, formData);
      }
    }, [formData]
  );

  return (
    <ReportsWrapper>
      <ProductDetail productData={TableData} />
      {
        showProductModal && <Modal>
          <div onClick={() => setshowProductModal(false)} className='button'>X</div>
          <ProductForm setFormData={setFormData} setshowProductModal={setshowProductModal} />
        </Modal>
      }
    </ReportsWrapper>
  )
}
