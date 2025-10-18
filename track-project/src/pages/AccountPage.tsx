import Table from "../components/Table";
import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar";

function AccountPage() {
  const params = useParams();
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
