import { useReservation } from "../context/ReservationContext";
import { categoryIcons } from "../data/classes";
import "./ReservationList.css";

export default function ReservationList() {
  const { reservations, cancel } = useReservation();

  if (reservations.length === 0) {
    return (
      <div className="no-reservations">
        <span className="no-res-icon">📋</span>
        <h3>No Reservations Yet</h3>
        <p>Head to the schedule to book your first class.</p>
      </div>
    );
  }

  const sorted = [...reservations].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA - dateB;
  });

  const formatDate = (dateStr) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  };

  const formatReservedAt = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" }) +
      " at " +
      d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="reservation-list">
      {sorted.map((res, idx) => {
        const icon = categoryIcons[res.category] || "🏋️";
        return (
          <article
            key={res.id}
            className="reservation-card"
            style={{ "--accent": res.color, animationDelay: `${idx * 0.06}s` }}
          >
            <div className="res-card-glow" />

            <div className="res-card-left">
              <div className="res-icon-wrap">
                <span className="res-icon">{icon}</span>
              </div>
            </div>

            <div className="res-card-body">
              <div className="res-card-top">
                <h3 className="res-class-name">{res.name}</h3>
                <span className="res-category" style={{ color: res.color }}>
                  {res.category}
                </span>
              </div>

              <div className="res-meta-grid">
                <div className="res-meta-item">
                  <span className="res-meta-icon">📅</span>
                  <span>{formatDate(res.date)}</span>
                </div>
                <div className="res-meta-item">
                  <span className="res-meta-icon">⏰</span>
                  <span>{res.time} · {res.duration} min</span>
                </div>
                <div className="res-meta-item">
                  <span className="res-meta-icon">👤</span>
                  <span>{res.coach}</span>
                </div>
                <div className="res-meta-item">
                  <span className="res-meta-icon">🎟️</span>
                  <span className="res-booked-at">Booked {formatReservedAt(res.reservedAt)}</span>
                </div>
              </div>
            </div>

            <div className="res-card-right">
              <button
                className="res-cancel-btn"
                onClick={() => cancel(res.classId)}
                title="Cancel reservation"
              >
                <span>✕</span>
                <span className="cancel-label">Cancel</span>
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
