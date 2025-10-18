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
      link: "/dashboard",
    },
    {
      title: "Salary",
      icon: Salary,
      link: "/salary",
    },
    {
      title: "Logout",
      icon: Logout,
      link: "/logout",
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
            <a href={element.link}>
              <span>{element.title}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
