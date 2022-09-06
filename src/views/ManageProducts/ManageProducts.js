import React, { useState } from 'react';
import { DashboardContent } from '../../styles/Dashboard.styled';
import { ProtectedRoute } from '../Authentication/ProtectedRoute';
import ManageHeading from './components/ManageHeading';
import ProductDetails from './components/ProductDetails';

export default function ManageProducts() {
  let [showProductModal, setshowProductModal] = useState(false);
  return (
    <ProtectedRoute permission="manageProduct">
      <DashboardContent>
        <ManageHeading setshowProductModal={setshowProductModal} />
        <ProductDetails setshowProductModal={setshowProductModal} showProductModal={showProductModal} />
      </DashboardContent>
    </ProtectedRoute>
  );
}
