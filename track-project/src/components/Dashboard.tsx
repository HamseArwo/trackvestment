import "../App.css";
import PlusImage from "../assets/plus.svg";
import Sidebar from "./SideBar.tsx";

function Dashboard() {
  const accountCards = [
    {
      id: 1,
      name: "Account #1",
      type: "TFSA",
      balance: 1000,
    },
    {
      id: 2,
      name: "Account #2",
      type: "RRSP",
      balance: 5000,
    },
    {
      id: 3,
      name: "Account #3",
      type: "RESP",
      balance: 200,
    },
    {
      id: 4,
      name: "Account #4",
      type: "TFSA",
      balance: 10000,
    },
    {
      id: 5,
      name: "Account #5",
      type: "RRSP",
      balance: 500,
    },
    {
      id: 6,
      name: "Account #6",
      type: "RESP",
      balance: 100,
    },
  ];

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <div className="dash-header">
          <h1> Welcome Back</h1>
          <h1>
            <span className="highlight">John Doe</span>
          </h1>
          <div className="subheader">
            <h2> Accounts</h2>
            <button className="create-btn">
              <img src={PlusImage} alt="Plus Icon" />

              <span> Create </span>
            </button>
          </div>
          <div className="account-cards">
            {accountCards.map((card) => (
              <div key={card.id} className="account-card">
                <h2>
                  <span className="highlight">{card.name}</span>
                </h2>
                <p>Type: {card.type}</p>
                <p>Balance: ${card.balance}</p>
                <button className="edit-btn">
                  <span> Edit Account </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
