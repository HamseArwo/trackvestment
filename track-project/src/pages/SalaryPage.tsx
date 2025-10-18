import Table from "../components/Table";
import SideBar from "../components/SideBar";

function SalaryPage() {
  return (
    <section className="table-container">
      <SideBar />
      <Table tableType={0} parentId={0} account_type_id={0} />
    </section>
  );
}
export default SalaryPage;
