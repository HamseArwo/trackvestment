import Table from "../components/Table";
import SideBar from "../components/SideBar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Validate from "../components/Validate";

function SalaryPage() {
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
    <section className="table-container">
      <SideBar />
      <Table tableType={0} parentId={0} account_type_id={0} />
    </section>
  );
}
export default SalaryPage;
