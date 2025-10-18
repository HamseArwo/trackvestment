// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

import HomePage from "./pages/HomePage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import AccountPage from "./pages/AccountPage.tsx";
import SalaryPage from "./pages/SalaryPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogoutPage from "./pages/LogoutPage.tsx";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/account/:type/:id" element={<AccountPage />} />
          <Route path="/salary" element={<SalaryPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
