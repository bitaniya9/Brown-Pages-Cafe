import { useEffect, useState } from "react";

const timeSlots = ["morning", "afternoon", "evening"];

export default function ReservationCalendar({
  resourceId,
  resourceType,
  token,
}) {
  const [date, setDate] = useState("");
  const [reservedSlots, setReservedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    if (!date) return;

    fetch(`/api/reservations?date=${date}&resourceType=${resourceType}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setReservedSlots(data.map((r) => r.timeSlot));
      });
  }, [date, resourceType, token]);

  const handleReserve = async () => {
    await fetch("/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        resourceId,
        resourceType,
        date,
        timeSlot: selectedSlot,
      }),
    });

    alert("Reservation created!");
  };

  return (
    <div>
      <h2>Reserve a Spot</h2>

      {/* Date Picker */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* Time Slots */}
      <div style={{ marginTop: "1rem" }}>
        {timeSlots.map((slot) => (
          <button
            key={slot}
            disabled={reservedSlots.includes(slot)}
            onClick={() => setSelectedSlot(slot)}
            style={{
              marginRight: "10px",
              backgroundColor: selectedSlot === slot ? "#333" : "#eee",
              color: selectedSlot === slot ? "white" : "black",
            }}
          >
            {slot}
          </button>
        ))}
      </div>

      {/* Submit */}
      <button
        disabled={!selectedSlot || !date}
        onClick={handleReserve}
        style={{ marginTop: "1rem" }}
      >
        Confirm Reservation
      </button>
    </div>
  );
}
