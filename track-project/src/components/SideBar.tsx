import "../App.css";
import Logo from "../assets/logo.svg";
import Salary from "../assets/salary.svg";
import Logout from "../assets/logout.svg";
import Dashboard from "../assets/dashboard.svg";
function SideBar() {
  const sideElements = [
    {
      title: "Dashboard",
      icon: Dashboard,
    },
    {
      title: "Salary",
      icon: Salary,
    },
    {
      title: "Logout",
      icon: Logout,
    },
  ];
  return (
    <div className="sidebar">
      <div className="sidebar-column">
        <div className="sidebar-column-header">
          <img src={Logo} alt="Logo" />
        </div>
        {sideElements.map((element) => (
          <div className="sidebar-column-item" key={element.title}>
            <img src={element.icon} alt={element.title} />
            <span>{element.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
