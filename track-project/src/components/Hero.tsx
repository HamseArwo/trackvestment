import HeroImage from "../assets/hero.svg";
import "../App.css";

function Hero() {
  return (
    <div className="hero">
      <div className="hero-text">
        <h2>Welcome to</h2>
        <h1>Trackvestment</h1>
        <p>Track your investments and stay on top of your finances.</p>
      </div>
      <div className="hero-image">
        <img src={HeroImage} alt="Hero Image" />
      </div>
    </div>
  );
}
export default Hero;
