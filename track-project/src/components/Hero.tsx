import HeroImage from "../assets/hero.svg";
import trackLogo from "../assets/log.png";
import futureLogo from "../assets/long-term.png";
import manageLogo from "../assets/bar-chart.png";
import informLogo from "../assets/alarm.png";
import "../App.css";

function Hero() {
  const heroItems = [
    {
      title: "Invest For Your Future",
      img: futureLogo,
    },
    {
      title: "Simple Growth Insights",
      img: manageLogo,
    },
    {
      title: "Manage Your Portfolio",
      img: trackLogo,
    },
    {
      title: "Contribution Reminders",
      img: informLogo,
    },
  ];

  return (
    <div className="hero">
      <div className="hero-text">
        <h2>WELCOME TO</h2>
        <h1>Trackvestment</h1>
        <h2>Track your investments and stay on top of your finances.</h2>
        <div className="hero-items">
          {heroItems.map((item) => (
            <div className="hero-item" key={item.title}>
              <img src={item.img} alt={item.title} />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
        <div className="hero-btn">
          <button>Sign Up Now</button>

          <button className="learn-btn">Learn More</button>
        </div>
      </div>
      <div className="hero-image">
        <img src={HeroImage} alt="Hero Image" />
      </div>
    </div>
  );
}
export default Hero;
