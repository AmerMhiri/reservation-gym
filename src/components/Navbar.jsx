import { Link, useLocation } from "react-router-dom";
import { useReservation } from "../context/ReservationContext";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const { reservations } = useReservation();

  const navLinks = [
    { to: "/", label: "Schedule", icon: "◈" },
    { to: "/my-reservations", label: "My Reservations", icon: "◉", badge: reservations.length },
  ];

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">⚡</span>
          <span className="brand-name">Amer<span className="brand-accent">FIT</span></span>
        </Link>

        <nav className="navbar-links">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? "active" : ""}`}
            >
              <span className="nav-icon">{link.icon}</span>
              <span>{link.label}</span>
              {link.badge > 0 && (
                <span className="nav-badge">{link.badge}</span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
