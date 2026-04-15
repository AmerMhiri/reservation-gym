import { gymClasses } from "../data/classes";
import ClassCard from "./ClassCard";
import "./DayClasses.css";

export default function DayClasses({ date }) {
  const classes = gymClasses
    .filter((c) => c.date === date)
    .sort((a, b) => a.time.localeCompare(b.time));

  if (classes.length === 0) {
    return (
      <div className="no-classes-message">
        <span className="no-classes-icon">🏖️</span>
        <h3>Rest Day</h3>
        <p>No classes scheduled. Time to recover!</p>
      </div>
    );
  }

  return (
    <div className="day-classes-grid">
      {classes.map((cls) => (
        <ClassCard key={cls.id} gymClass={cls} />
      ))}
    </div>
  );
}
