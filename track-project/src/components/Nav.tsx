import Logo from "../assets/letter-t.png";
import "../App.css";

function Nav() {
  return (
    <div className="nav-container">
      <nav className="nav-bar">
        <div className="nav-logo">
          <img src={Logo} alt="Trackvestment Logo" />
        </div>
        <ul>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#signup">Sign up</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
