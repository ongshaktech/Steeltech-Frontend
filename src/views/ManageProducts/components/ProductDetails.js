import React from 'react'
import ProductDetail from '../../../components/ProductDetail'
import ProductForm from '../../../components/ProductForm'
import Modal from '../../../organism/Modal'
import { ReportsWrapper } from '../../../styles/CommonReports.styled'

export default function ProductDetails({ setshowProductModal, showProductModal }) {
  return (
    <ReportsWrapper>
      <ProductDetail />
      {
        showProductModal && <Modal>
          <div onClick={() => setshowProductModal(false)} className='button'>X</div>
          <ProductForm />
        </Modal>
      }
    </ReportsWrapper>
  )
}
