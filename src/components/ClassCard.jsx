import { useReservation } from "../context/ReservationContext";
import { categoryIcons } from "../data/classes";
import "./ClassCard.css";

export default function ClassCard({ gymClass, showDate = false }) {
  const { reserve, cancel, isReserved, isFull, getParticipantCount } = useReservation();

  const reserved = isReserved(gymClass.id);
  const full = isFull(gymClass);
  const count = getParticipantCount(gymClass.id);
  const spotsLeft = gymClass.maxParticipants - count;
  const fillPercent = (count / gymClass.maxParticipants) * 100;
  const icon = categoryIcons[gymClass.category] || "🏋️";

  const formatDate = (dateStr) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  const handleAction = () => {
    if (reserved) {
      cancel(gymClass.id);
    } else {
      reserve(gymClass);
    }
  };

  return (
    <article className={`class-card ${reserved ? "class-card--reserved" : ""} ${full && !reserved ? "class-card--full" : ""}`}
      style={{ "--accent": gymClass.color }}>

      <div className="class-card-glow" />

      <div className="class-card-header">
        <div className="class-category">
          <span className="category-icon">{icon}</span>
          <span className="category-label">{gymClass.category}</span>
        </div>
        {reserved && <span className="reserved-badge">Reserved</span>}
        {full && !reserved && <span className="full-badge">Full</span>}
      </div>

      <div className="class-card-body">
        <h3 className="class-name">{gymClass.name}</h3>
        {showDate && (
          <p className="class-date">{formatDate(gymClass.date)}</p>
        )}
        <p className="class-description">{gymClass.description}</p>
      </div>

      <div className="class-card-meta">
        <div className="meta-item">
          <span className="meta-icon">👤</span>
          <span>{gymClass.coach}</span>
        </div>
        <div className="meta-item">
          <span className="meta-icon">⏰</span>
          <span>{gymClass.time}</span>
        </div>
        <div className="meta-item">
          <span className="meta-icon">⏱</span>
          <span>{gymClass.duration} min</span>
        </div>
      </div>

      <div className="class-card-capacity">
        <div className="capacity-header">
          <span className="capacity-label">Participants</span>
          <span className="capacity-count">
            <strong>{count}</strong> / {gymClass.maxParticipants}
            {!full && <span className="spots-left"> · {spotsLeft} spot{spotsLeft !== 1 ? "s" : ""} left</span>}
          </span>
        </div>
        <div className="capacity-bar">
          <div
            className={`capacity-fill ${fillPercent >= 100 ? "full" : fillPercent >= 75 ? "high" : ""}`}
            style={{ width: `${Math.min(fillPercent, 100)}%` }}
          />
        </div>
      </div>

      <button
        className={`class-btn ${reserved ? "class-btn--cancel" : full ? "class-btn--disabled" : "class-btn--reserve"}`}
        onClick={handleAction}
        disabled={full && !reserved}
      >
        {reserved ? (
          <><span>✕</span> Cancel Reservation</>
        ) : full ? (
          <><span>⊘</span> Class Full</>
        ) : (
          <><span>+</span> Reserve Spot</>
        )}
      </button>
    </article>
  );
}
