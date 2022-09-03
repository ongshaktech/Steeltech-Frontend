import React, {useState} from 'react'
import { DashboardContent } from '../../styles/Dashboard.styled'
import ManageHeading from './components/ManageHeading'
import ProductDetails from './components/ProductDetails'

export default function ManageProducts() {
  let [showProductModal, setshowProductModal] = useState(false);
  return (
    <DashboardContent>
      <ManageHeading setshowProductModal={setshowProductModal} />
      <ProductDetails setshowProductModal={setshowProductModal} showProductModal={showProductModal} />
    </DashboardContent>
  )
}
