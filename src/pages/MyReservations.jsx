import { useNavigate } from "react-router-dom";
import ReservationList from "../components/ReservationList";
import { useReservation } from "../context/ReservationContext";
import "./MyReservations.css";

export default function MyReservations() {
  const navigate = useNavigate();
  const { reservations } = useReservation();

  const upcoming = reservations.filter((r) => new Date(`${r.date}T${r.time}`) >= new Date()).length;

  return (
    <main className="my-reservations-page">
      <div className="my-res-header">
        <button className="back-btn-res" onClick={() => navigate("/")}>
          <span>←</span> Schedule
        </button>

        <div className="my-res-title-row">
          <div>
            <h1 className="my-res-title">My Reservations</h1>
            <p className="my-res-sub">Manage your booked fitness classes</p>
          </div>

          {reservations.length > 0 && (
            <div className="res-summary-chips">
              <div className="summary-chip">
                <span className="chip-num">{reservations.length}</span>
                <span className="chip-lbl">Total</span>
              </div>
              <div className="summary-chip summary-chip--gold">
                <span className="chip-num">{upcoming}</span>
                <span className="chip-lbl">Upcoming</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <ReservationList />
    </main>
  );
}
