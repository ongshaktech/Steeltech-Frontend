import { useState } from 'react';
import { ThemeProvider } from "styled-components"

import GlobalStyles from './styles/Global.styled';
import Sidebar from './shared/Sidebar';
import { WebWrapper } from './styles/Common.styled';
import Dashboard from './views/Dashboard/Dashboard';

import {
  Routes,
  Route,
} from "react-router-dom";
import Reports from './views/Reports/Reports';
import Users from './views/Users/Users';
import ManageProducts from './views/ManageProducts/ManageProducts';

const Theme = {
  color: {
    white: "#fff",
    black: "#1F1D1D",
    bg: "#F8FAFA",
    primary: "#F98D12"
  },
  mobile: "1000px",
  smallMobile: "580px"
}

function App() {

  return (
    // <BrowserRouter>
    <ThemeProvider theme={Theme}>
      <GlobalStyles />

      <WebWrapper>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/report" element={<Reports />} />
          <Route path="/users" element={<Users />} />
          <Route path="/manage-products" element={<ManageProducts />} />
        </Routes>
      </WebWrapper>
    </ThemeProvider>
    // </BrowserRouter>
  );
}

export default App;