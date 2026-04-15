import { useNavigate } from "react-router-dom";
import { gymClasses, categoryIcons } from "../data/classes";
import { useReservation } from "../context/ReservationContext";
import "./Calendar.css";

const WEEK_START = "2026-04-20"; // Monday

function getWeekDays(startStr) {
  const start = new Date(startStr + "T00:00:00");
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return d.toISOString().slice(0, 10);
  });
}

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAY_FULL = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Calendar() {
  const navigate = useNavigate();
  const { isReserved, getParticipantCount, isFull } = useReservation();
  const weekDays = getWeekDays(WEEK_START);

  const classesByDate = weekDays.reduce((acc, date) => {
    acc[date] = gymClasses.filter((c) => c.date === date);
    return acc;
  }, {});

  const today = "2026-04-16";

  return (
    <section className="calendar-section">
      <div className="calendar-header">
        <div className="week-label">
          <span className="week-badge">Week</span>
          <h2 className="week-range">
            Apr 20 – Apr 26, 2026
          </h2>
        </div>
        <p className="calendar-subtitle">Select a day to view and reserve classes</p>
      </div>

      <div className="calendar-grid">
        {weekDays.map((date, idx) => {
          const classes = classesByDate[date] || [];
          const reservedCount = classes.filter((c) => isReserved(c.id)).length;
          const isToday = date === today;

          return (
            <div
              key={date}
              className={`calendar-day ${isToday ? "calendar-day--today" : ""} ${classes.length === 0 ? "calendar-day--empty" : ""}`}
              onClick={() => classes.length > 0 && navigate(`/day/${date}`)}
              role={classes.length > 0 ? "button" : undefined}
              tabIndex={classes.length > 0 ? 0 : undefined}
              onKeyDown={(e) => e.key === "Enter" && classes.length > 0 && navigate(`/day/${date}`)}
            >
              <div className="day-header">
                <div className="day-label-group">
                  <span className="day-short">{DAY_LABELS[idx]}</span>
                  <span className="day-number">{new Date(date + "T00:00:00").getDate()}</span>
                </div>
                {isToday && <span className="today-chip">Today</span>}
                {reservedCount > 0 && (
                  <span className="reserved-count-chip">{reservedCount}</span>
                )}
              </div>

              {classes.length === 0 ? (
                <p className="no-classes">Rest Day</p>
              ) : (
                <>
                  <ul className="day-class-list">
                    {classes.slice(0, 3).map((cls) => {
                      const full = isFull(cls);
                      const reserved = isReserved(cls.id);
                      return (
                        <li
                          key={cls.id}
                          className={`day-class-item ${reserved ? "reserved" : ""} ${full && !reserved ? "full" : ""}`}
                          style={{ "--c": cls.color }}
                        >
                          <span className="class-dot" />
                          <span className="class-item-time">{cls.time}</span>
                          <span className="class-item-name">{cls.name}</span>
                          <span className="class-item-icon">{categoryIcons[cls.category]}</span>
                        </li>
                      );
                    })}
                  </ul>
                  {classes.length > 3 && (
                    <p className="more-classes">+{classes.length - 3} more</p>
                  )}
                  <div className="day-footer">
                    <span className="class-count">{classes.length} class{classes.length !== 1 ? "es" : ""}</span>
                    <span className="view-arrow">→</span>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
