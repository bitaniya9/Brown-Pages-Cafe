import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faBook } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

const AdminEventCard = ({ event, onEdit, onDelete }) => {
  return (
    <div className="admin-card">
      <img src={event.imageURL} alt={event.title} className="card-image" />
      <div className="card-body">
        <h3 className="card-title">{event.title}</h3>
        <p className="card-detail">
          <FontAwesomeIcon icon={faCalendarDays} className="date-icon" /> Date:{" "}
          {event.date}
        </p>
        <p className="card-detail">
          {" "}
          <FontAwesomeIcon icon={faBook} className="date-icon" />
          Type: {event.type}
        </p>
        <p className="card-detail">
          <FontAwesomeIcon icon={faUsers} className="date-icon" />
          Capacity: {event.capacity}
        </p>
      </div>
      <div className="card-actions">
        <button className="btn btn-edit" onClick={() => onEdit(event)}>
          Edit
        </button>
        <button className="btn btn-delete" onClick={() => onDelete(event._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};
export default AdminEventCard;
