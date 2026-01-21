import React, { useState, useMemo } from "react";
import { createReservation, cancelReservation } from "../api.js";
import { toast } from "react-toastify";

const TABLES = {
  reading: {
    R1: { capacity: 1, type: "Window Seat" },
    R2: { capacity: 1, type: "Window Seat" },
    R3: { capacity: 2, type: "Reading Nook" },
    R4: { capacity: 2, type: "Reading Nook" },
    R5: { capacity: 4, type: "Group Table" },
    R6: { capacity: 4, type: "Group Table" },
    R7: { capacity: 4, type: "Group Table" },
    R8: { capacity: 6, type: "Group Table" },
    R9: { capacity: 6, type: "Group Table" },
    R10: { capacity: 6, type: "Group Table" },
  },
  eating: {
    E1: { capacity: 2, type: "Window Dining" },
    E2: { capacity: 2, type: "Window Dining" },
    E3: { capacity: 4, type: "Dining Place" },
    E4: { capacity: 4, type: "Dining Place" },
    E5: { capacity: 4, type: "Dining Place" },
    E6: { capacity: 6, type: "Lounge Table" },
    E7: { capacity: 6, type: "Lounge Table" },
    E8: { capacity: 8, type: "Lounge Table" },
    E9: { capacity: 8, type: "Lounge Table" },
    E10: { capacity: 10, type: "Lounge Table" },
    E11: { capacity: 10, type: "Lounge Table" },
    E12: { capacity: 10, type: "Lounge Table" },
  },
};

const BookTable = () => {
  const [areaType, setAreaType] = useState("reading");
  const [table, setTable] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [guests, setGuests] = useState(1);

  const [reservationId, setReservationId] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const isReserved = Boolean(reservationId);

  const tableInfo = table ? TABLES[areaType][table] : null;

  const groupedTables = useMemo(() => {
    const groups = {};
    Object.entries(TABLES[areaType]).forEach(([id, data]) => {
      if (!groups[data.type]) groups[data.type] = [];
      groups[data.type].push({ id, ...data });
    });
    return groups;
  }, [areaType]);

  const isFormValid =
    date && timeSlot && table && guests <= (tableInfo?.capacity || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      return toast.info("Please login to reserve your spot.");
    }

    setLoading(true);

    try {
      if (!isReserved) {
        const reservationData = {
          resourceId:
            areaType === "reading" ? "READING_AREA_ID" : "EATING_AREA_ID",
          resourceType: areaType,
          table,
          date,
          timeSlot,
          guests,
        };

        const reservation = await createReservation(token, reservationData);
        setReservationId(reservation._id);
        toast.success("Reservation confirmed");
      } else {
        await cancelReservation(token, reservationId);
        setReservationId(null);
        toast.info("Reservation cancelled");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="reservation-section">
      <form className="reservation-form" onSubmit={handleSubmit}>
        {/* AREA TYPE */}
        <div className="form-group-1">
          <label>Area</label>
          <select
            value={areaType}
            disabled={isReserved}
            onChange={(e) => {
              setAreaType(e.target.value);
              setTable("");
              setGuests(1);
            }}
          >
            <option value="eating">Eating Area</option>
            <option value="reading">Reading Space</option>
          </select>
        </div>

        {/* DATE */}
        <div className="form-group-1">
          <label>Date</label>
          <input
            type="date"
            value={date}
            disabled={isReserved}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* TIME SLOT */}
        <div className="form-group-1">
          <label>Time</label>
          <div className="time-toggle">
            {["morning", "afternoon", "evening"].map((t) => (
              <button
                key={t}
                type="button"
                disabled={isReserved}
                className={timeSlot === t ? "active" : ""}
                onClick={() => setTimeSlot(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* TABLE */}
        <div className="form-group-1">
          <label>Table</label>
          <select
            value={table}
            disabled={isReserved}
            onChange={(e) => {
              setTable(e.target.value);
              setGuests(1);
            }}
            required
          >
            <option value="">Select a table</option>

            {Object.entries(groupedTables).map(([type, tables]) => (
              <optgroup key={type} label={type}>
                {tables.map(({ id, capacity }) => (
                  <option key={id} value={id}>
                    {id} — {capacity} seats
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* GUESTS */}
        <div className="form-group-1">
          <label>Guests</label>
          <input
            type="number"
            min="1"
            max={tableInfo?.capacity || 1}
            value={guests}
            disabled={!table || isReserved}
            onChange={(e) => setGuests(Number(e.target.value))}
          />
          {tableInfo && <small>Max capacity: {tableInfo.capacity}</small>}
        </div>

        {/* SUBMIT */}
        <button
          className="submit-btn"
          type="submit"
          disabled={(!isFormValid && !isReserved) || loading}
        >
          {loading
            ? "Processing..."
            : isReserved
              ? "Cancel Reservation"
              : "Confirm Reservation"}
        </button>
      </form>
    </section>
  );
};

export default BookTable;
