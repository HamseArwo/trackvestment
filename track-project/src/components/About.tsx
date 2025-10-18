import "../App.css";
import { useNavigate } from "react-router-dom";
function About() {
  const aboutCards = [
    {
      title: "Overcontribute",
      description:
        "Trackvestment helps you avoid exceeding your TFSA contribution limit.",
    },
    {
      title: "Undercontribute",
      description:
        "Easily track your unused TFSA contribution room from previous years.",
    },
    {
      title: "Worry About Grants",
      description: "Keep an organized record of all your RESP CESG grants.",
    },
    {
      title: "Exceed Limit",
      description:
        "Keep track of total RRSP contributions never exceeding cap.",
    },
  ];
  const navigate = useNavigate();
  return (
    <div className="about" id="about">
      <div className="what-container">
        <div className="what-card">
          <h1>
            What is <span className="highlight">Trackvestment?</span>
          </h1>
          <p>
            Trackvestment is a simple, easy-to-use finance tracking app designed
            specifically for your <strong>TFSA</strong>, <strong>RRSP</strong>,
            and <strong>RESP</strong> accounts. Just add your contributions for
            a given year, and Trackvestment does the rest for you{" "}
          </p>
        </div>
      </div>

      <h1>
        Why <span className="highlight">Trackvestment Makes Sense</span>
      </h1>
      <h2>
        Trackvestment ensures your finances stay on track. With us, you’ll never
        have to…
      </h2>

      <div className="about-content">
        {aboutCards.map((card) => (
          <div className="about-card">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
      <div className="signup-card">
        <h2>
          So What
          <span className="highlight"> Are You Waiting For?</span>
        </h2>
        <button onClick={() => navigate("/signup")}> Sign Up!</button>
      </div>
    </div>
  );
}
export default About;
