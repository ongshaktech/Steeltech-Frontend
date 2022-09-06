import React from 'react';
import ProductDetail from '../../../components/ProductDetail';
import ProductForm from '../../../components/ProductForm';
import Modal from '../../../organism/Modal';
import { ReportsWrapper } from '../../../styles/CommonReports.styled';
import { useState, useEffect } from 'react';
import { useFirestore, useCollection } from '../../../Hooks/firebaseFuncs';


export default function ProductDetails({ setshowProductModal, showProductModal }) {

  let [formData, setFormData] = useState({});
  const { document } = useCollection('products');
  const { addDocument } = useFirestore('products');

  console.log(document);


  useEffect(
    () => {
      if (Object.keys(formData).length !== 0) {
        addDocument(formData);
      }
    }, [formData]
  );

  return (
    <ReportsWrapper>
      <ProductDetail productData={document}/>
      {
        showProductModal && <Modal>
          <div onClick={() => setshowProductModal(false)} className='button'>X</div>
          <ProductForm setFormData={setFormData} setshowProductModal={setshowProductModal}/>
        </Modal>
      }
    </ReportsWrapper>
  )
}
