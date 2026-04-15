import { useParams, useNavigate } from "react-router-dom";
import DayClasses from "../components/DayClasses";
import { gymClasses } from "../data/classes";
import "./DayView.css";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function DayView() {
  const { date } = useParams();
  const navigate = useNavigate();

  const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
  if (!isValidDate) {
    return (
      <div className="day-view-error">
        <h2>Invalid date.</h2>
        <button onClick={() => navigate("/")}>← Back to schedule</button>
      </div>
    );
  }

  const d = new Date(date + "T00:00:00");
  const dayName = DAY_NAMES[d.getDay()];
  const formattedDate = d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const classes = gymClasses.filter((c) => c.date === date);

  // navigation between days
  const prevDate = (() => {
    const p = new Date(d);
    p.setDate(p.getDate() - 1);
    return p.toISOString().slice(0, 10);
  })();
  const nextDate = (() => {
    const n = new Date(d);
    n.setDate(n.getDate() + 1);
    return n.toISOString().slice(0, 10);
  })();

  const hasPrev = gymClasses.some((c) => c.date === prevDate);
  const hasNext = gymClasses.some((c) => c.date === nextDate);

  return (
    <main className="day-view-page">
      <div className="day-view-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          <span>←</span> Schedule
        </button>

        <div className="day-nav">
          <button
            className="day-nav-btn"
            onClick={() => hasPrev && navigate(`/day/${prevDate}`)}
            disabled={!hasPrev}
          >
            ‹
          </button>

          <div className="day-title-group">
            <h1 className="day-name">{dayName}</h1>
            <p className="day-date">{formattedDate}</p>
          </div>

          <button
            className="day-nav-btn"
            onClick={() => hasNext && navigate(`/day/${nextDate}`)}
            disabled={!hasNext}
          >
            ›
          </button>
        </div>

        <div className="day-summary">
          <span className="day-summary-chip">
            {classes.length} class{classes.length !== 1 ? "es" : ""}
          </span>
        </div>
      </div>

      <DayClasses date={date} />
    </main>
  );
}
