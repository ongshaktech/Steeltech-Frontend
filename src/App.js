import { ThemeProvider } from "styled-components"
import GlobalStyles from './styles/Global.styled';
import Sidebar from './shared/Sidebar';
import { WebWrapper } from './styles/Common.styled';
import Dashboard from './views/Dashboard/Dashboard';
import Login from "./views/Authentication/Login";
import { Routes, Route } from "react-router-dom";
import Reports from './views/Reports/Realtime/Reports';
import Users from './views/Users/Users';
import ManageProducts from './views/ManageProducts/ManageProducts';
import { GetCookie } from "./views/Authentication/Cookies";
import { AuthLogin } from "./Hooks/firebaseFuncs";
import { useState, useEffect } from "react";
import { Triangle } from "react-loader-spinner";
import './styles/spinnerStyle.css';
import Machines from "./views/Machines/Machines";
import DataPerMachine from "./views/DataPerMachine/DataPerMachine";
import ManageMachines from "./views/ManageMachines/ManageMachines";
import ReportDashboard from "./views/Reports/ReportDashboard";
import DailyReport from "./views/Reports/Daily/DailyReport";
import WeeklyReport from "./views/Reports/Weekly/weeklyReport";
import MonthlyReport from "./views/Reports/Monthly/monthlyReport";
import QuarterlyReport from "./views/Reports/Quarterly/quarterlyReport";
import YearlyReport from "./views/Reports/Yearly/yearlyReport";

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
      // Get encrypted Login Credentials from Cookies and Validate with FireStore
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
      // Loading Wheel
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
        // If not user, then show Login page
        <>
          {authview}
        </>
        :

        // If user, then Render the content
        <ThemeProvider theme={Theme}>
          <GlobalStyles />
          <WebWrapper>
            <Sidebar />
            <Routes>
              <Route path="/" element={<Machines />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/machines/:machineNumber" element={<DataPerMachine />} />
              
              {/* Reports */}
              <Route path="/reports" element={<ReportDashboard />} />
              <Route path="/realtime-report" element={<Reports />} />
              <Route path="/daily-report" element={<DailyReport />} />
              <Route path="/weekly-report" element={<WeeklyReport />} />
              <Route path="/monthly-report" element={<MonthlyReport />} />
              <Route path="/quarterly-report" element={<QuarterlyReport />} />
              <Route path="/yearly-report" element={<YearlyReport />} />

              <Route path="/users" element={<Users />} />
              <Route path="/manage-products" element={<ManageProducts />} />
              <Route path="/manage-machines" element={<ManageMachines />} />
            </Routes>
          </WebWrapper>
        </ThemeProvider>
      }
    </>
  );
}

export default App;