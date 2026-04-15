import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReservationProvider, useReservation } from "./context/ReservationContext";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import Home from "./pages/Home";
import DayView from "./pages/DayView";
import MyReservations from "./pages/MyReservations";
import "./App.css";

function AppInner() {
  const { notification } = useReservation();

  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/day/:date" element={<DayView />} />
          <Route path="/my-reservations" element={<MyReservations />} />
        </Routes>
      </div>
      <Notification notification={notification} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ReservationProvider>
        <AppInner />
      </ReservationProvider>
    </BrowserRouter>
  );
}
