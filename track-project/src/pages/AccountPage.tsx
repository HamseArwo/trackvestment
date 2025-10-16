import Table from "../components/Table";
import { useParams } from "react-router-dom";

function AccountPage() {
  const params = useParams();
  return (
    <>
      {/*<SideBar />*/}
      <Table tableType={1} parentId={Number(params.id)} />
      {/*<h2>{params.id}</h2>*/}
    </>
  );
}
export default AccountPage;
