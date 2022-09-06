import { ThemeProvider } from "styled-components"
import GlobalStyles from './styles/Global.styled';
import Sidebar from './shared/Sidebar';
import { WebWrapper } from './styles/Common.styled';
import Dashboard from './views/Dashboard/Dashboard';
import Login from "./views/Authentication/Login";
import { Routes, Route } from "react-router-dom";
import Reports from './views/Reports/Reports';
import Users from './views/Users/Users';
import ManageProducts from './views/ManageProducts/ManageProducts';
import { GetCookie } from "./views/Authentication/Cookies";
import { AuthLogin } from "./Hooks/firebaseFuncs";
import { useState, useEffect } from "react";
import { Triangle } from "react-loader-spinner";
import './styles/spinnerStyle.css';
import { ProtectedRoute } from "./views/Authentication/ProtectedRoute";

const Theme = {
  color: {
    white: "#fff",
    black: "#1F1D1D",
    bg: "#F8FAFA",
    primary: "#F98D12"
  },
  mobile: "1000px",
  smallMobile: "580px"
};

function App() {
  let [isUser, setUser] = useState("unknown");
  let [authview, setAuthview] = useState(<></>);

  useEffect(
    () => {
      AuthLogin('users', GetCookie('email'), GetCookie('pswd')).then(
        (response) => {
          if (response[0]) setUser('is_user');
          else setUser("not_user");
        }
      );
    }, []
  );

  useEffect(
    () => {
      if (isUser === 'unknown') setAuthview(
        <div className="loadingSpinner">
          <Triangle
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            visible={true} />
        </div>
      );
      else if (isUser === 'not_user') setAuthview(<Login />);
    }, [isUser]
  );

  return (
    <>
      {isUser !== 'is_user' ?
        <>
          {authview}
        </>
        :
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
      }
    </>
  );
}

export default App;