import { useEffect, useState } from "react";
import "./Notification.css";

export default function Notification({ notification }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (notification) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [notification]);

  if (!notification) return null;

  const icons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  };

  return (
    <div className={`notification notification--${notification.type} ${visible ? "notification--visible" : ""}`}>
      <span className="notification-icon">{icons[notification.type]}</span>
      <span className="notification-message">{notification.message}</span>
    </div>
  );
}
