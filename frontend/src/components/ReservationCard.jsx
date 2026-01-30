import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faUsers,
  faClock,
  //   faBook,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
export const ReservationCard = ({ reservation }) => {
  // Extracting data safely from your backend structure
  const userName = reservation.userId?.name || "Guest";
  const guestCount = reservation.guests;

  return (
    <div className="admin-card">
      <div className="card-body">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 className="card-title">{userName}</h3>
          <span style={{ fontSize: "0.8rem", color: "#718096" }}>
            #{reservation._id.slice(-5)}
          </span>
        </div>

        <p className="card-detail">
          <FontAwesomeIcon icon={faLocationDot} className="date-icon" /> Table:{" "}
          {reservation.table}
        </p>
        <p className="card-detail">
          <FontAwesomeIcon icon={faUsers} className="date-icon" />
          Guests: {guestCount}
        </p>
        <p className="card-detail">
          <FontAwesomeIcon icon={faCalendarDays} className="date-icon" />
          Date: {new Date(reservation.date).toLocaleDateString()}
        </p>
        <p className="card-detail">
          <FontAwesomeIcon icon={faClock} className="date-icon" /> Slot:{" "}
          {reservation.timeSlot}
        </p>

        {/* Status Badge */}
        <span className={`status-badge ${reservation.status}`}>
          {reservation.status.toUpperCase()}
        </span>
      </div>
    </div>
  );
};
