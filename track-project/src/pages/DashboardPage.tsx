import Dashboard from "../components/Dashboard";
import Validate from "../utils/Validate";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedinCheck = async () => {
      const loggedin = await Validate();
      if (!loggedin) {
        navigate("/login");
      }
    };
    loggedinCheck();
  }, [navigate]);
  return (
    <>
      <Dashboard />
    </>
  );
}

export default DashboardPage;
