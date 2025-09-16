import HeroImage from "../assets/hero.svg";
import "../App.css";

function Hero() {
  return (
    <div className="hero">
      <div className="hero-text">
        <h2>WELCOME TO</h2>
        <h1>Trackvestment</h1>
        <h2>Track your investments and stay on top of your finances.</h2>
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
