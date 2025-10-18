import Table from "../components/Table";
import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Validate from "../utils/Validate";

function AccountPage() {
  const params = useParams();
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
      <Table
        tableType={1}
        parentId={Number(params.id)}
        account_type_id={Number(params.type)}
      />
    </section>
  );
}
export default AccountPage;
