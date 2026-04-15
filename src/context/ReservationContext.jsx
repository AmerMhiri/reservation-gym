import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { gymClasses } from "../data/classes";

const ReservationContext = createContext(null);

const STORAGE_KEY = "gym_reservations";
const COUNTS_KEY = "gym_participant_counts";

export function ReservationProvider({ children }) {
  const [reservations, setReservations] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  const [participantCounts, setParticipantCounts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(COUNTS_KEY)) || {};
    } catch {
      return {};
    }
  });

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem(COUNTS_KEY, JSON.stringify(participantCounts));
  }, [participantCounts]);

  const getParticipantCount = useCallback(
    (classId) => participantCounts[classId] ?? 0,
    [participantCounts]
  );

  const isReserved = useCallback(
    (classId) => reservations.some((r) => r.classId === classId),
    [reservations]
  );

  const isFull = useCallback(
    (gymClass) => {
      const count = getParticipantCount(gymClass.id);
      return count >= gymClass.maxParticipants;
    },
    [getParticipantCount]
  );

  const showNotification = (message, type = "success") => {
    setNotification({ message, type, id: Date.now() });
    setTimeout(() => setNotification(null), 3500);
  };

  const reserve = useCallback(
    (gymClass) => {
      if (isReserved(gymClass.id)) {
        showNotification("You already reserved this class.", "warning");
        return false;
      }
      if (isFull(gymClass)) {
        showNotification("This class is full. No spots left.", "error");
        return false;
      }

      const reservation = {
        id: Date.now(),
        classId: gymClass.id,
        name: gymClass.name,
        coach: gymClass.coach,
        date: gymClass.date,
        time: gymClass.time,
        duration: gymClass.duration,
        category: gymClass.category,
        color: gymClass.color,
        reservedAt: new Date().toISOString(),
      };

      setReservations((prev) => [...prev, reservation]);
      setParticipantCounts((prev) => ({
        ...prev,
        [gymClass.id]: (prev[gymClass.id] ?? 0) + 1,
      }));

      showNotification(`"${gymClass.name}" successfully reserved!`, "success");
      return true;
    },
    [isReserved, isFull]
  );

  const cancel = useCallback(
    (classId) => {
      const reservation = reservations.find((r) => r.classId === classId);
      if (!reservation) return;

      setReservations((prev) => prev.filter((r) => r.classId !== classId));
      setParticipantCounts((prev) => ({
        ...prev,
        [classId]: Math.max(0, (prev[classId] ?? 0) - 1),
      }));

      showNotification(`"${reservation.name}" reservation cancelled.`, "info");
    },
    [reservations]
  );

  const getClassById = useCallback((id) => gymClasses.find((c) => c.id === id), []);

  return (
    <ReservationContext.Provider
      value={{
        reservations,
        participantCounts,
        getParticipantCount,
        isReserved,
        isFull,
        reserve,
        cancel,
        getClassById,
        notification,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const ctx = useContext(ReservationContext);
  if (!ctx) throw new Error("useReservation must be used inside ReservationProvider");
  return ctx;
}
