import Calendar from "../components/Calendar";
import "./Home.css";

export default function Home() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="hero-text">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            <span>Weekly Schedule</span>
          </div>
          <h1 className="hero-title">
            Train With
            <br />
            <span className="hero-accent">Purpose.</span>
          </h1>
          <p className="hero-sub">
            Book elite fitness classes with world-class coaches.
            <br />
            Reserve your spot and dominate the week.
          </p>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <span className="stat-number">25+</span>
            <span className="stat-label">Weekly Classes</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">6</span>
            <span className="stat-label">Expert Coaches</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">6</span>
            <span className="stat-label">Disciplines</span>
          </div>
        </div>
      </section>

      <Calendar />
    </main>
  );
}
