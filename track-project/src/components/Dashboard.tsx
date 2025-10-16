import "../App.css";
import PlusImage from "../assets/plus.svg";
import Sidebar from "./SideBar.tsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface accounts {
  id: number;
  name: string;
  account_type_id: number;
  total: number;
  child_year: number;
}
interface accountForm {
  name: string;
  type: string;
  child_year: number;
}
function Dashboard() {
  const accountTypes = ["admin", "TFSA", "RESP", "RRSP"];
  const accountList: accounts[] = [];
  useEffect(() => {
    let ignore = false;
    console.log(ignore);

    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/accounts", {
        credentials: "include",
      });
      if (!ignore) {
        const data = await response.json();
        for (const fetchedAccount of data.accounts) {
          // console.log(account.id);
          const accountGiven: accounts = {
            id: fetchedAccount.id,
            name: fetchedAccount.name,
            account_type_id: fetchedAccount.account_type_id,
            total: fetchedAccount.total,
            child_year: fetchedAccount.child_year,
          };
          accountList.push(accountGiven);
        }
        setAccount(accountList);
      }
    };
    fetchData();
    return () => {
      ignore = !ignore;
    };
  }, []);

  const [account, setAccount] = useState<accounts[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<accountForm>({
    name: "",
    type: "",
    child_year: 0,
  });
  const navigate = useNavigate();

  const createAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newAccount = {
      id: Date.now(),
      name: form.name,
      account_type_id: Number(form.type),
      total: 0,
      child_year: form.child_year,
    };
    console.log(newAccount);

    await fetch(`http://localhost:8080/accounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAccount),
      credentials: "include",
    });

    setAccount([...account, newAccount]);
    setOpen(false);
  };

  const deleteAccount = async (id: number) => {
    // console.log(account);
    await fetch(`http://localhost:8080/accounts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    setAccount(account.filter((acc) => acc.id !== id));
  };
  const toggleCard = () => {
    setOpen(!open);
    console.log("Toggle Card");
  };

  return (
    <div className="dashboard">
      <Sidebar />

      {open && (
        <div className="overlay">
          <div className="overlay-content">
            <h4> Create Account</h4>
            <form onSubmit={createAccount}>
              <input
                type="text"
                required
                placeholder="Enter account name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <div className="radio-group">
                <input
                  type="radio"
                  value={1}
                  required
                  id="TFSA"
                  name="accountType"
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                />
                <label htmlFor="TFSA">TFSA</label>
              </div>
              <div className="radio-group">
                <input
                  type="radio"
                  value={3}
                  required
                  id="RRSP"
                  name="accountType"
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                />
                <label htmlFor="RRSP">RRSP</label>
              </div>
              <div className="radio-group">
                <input
                  type="radio"
                  value={2}
                  required
                  id="RESP"
                  name="accountType"
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                />
                <label htmlFor="RESP">RESP</label>
              </div>
              <input
                type="number"
                id="child_year"
                name="child_year"
                placeholder="Child's Year"
                required
                min={2000}
                max={2023}
                // value={0}
                disabled={form.type != "2"}
                onChange={(e) =>
                  setForm({ ...form, child_year: Number(e.target.value) })
                }
              />

              <button type="submit">Create</button>
              <button type="button" onClick={toggleCard}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="dashboard-content">
        <div className="dash-header">
          <h1> Welcome Back</h1>
          <h1>
            <span className="highlight">John Doe</span>
          </h1>
          <div className="subheader">
            <h2> Accounts</h2>
            <button className="create-btn" onClick={toggleCard}>
              <img src={PlusImage} alt="Plus Icon" />

              <span> Create </span>
            </button>
          </div>

          {account.length == 0 && (
            <div className="empty-state">
              <h2>No Accounts Found</h2>
              <p>Create a new account to get started.</p>
            </div>
          )}

          <div className="account-cards">
            {account.map((card) => (
              <div key={card.id} className="account-card">
                <h2>
                  <span className="highlight">{card.name}</span>
                </h2>
                <p>Type: {accountTypes[card.account_type_id]}</p>
                <p>Balance: ${card.total}</p>
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/account/${card.id}`)}
                >
                  <span> Edit Account </span>
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteAccount(card.id)}
                >
                  <span> Delete Account </span>
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
