import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faUsers,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
const EventCard = ({ event, onViewDetails, onRegister }) => {
  const BACKEND_ROOT = "http://localhost:3000";
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="event-card">
      <div className="main-event-card">
        <div className="card-image-box">
          <img
            src={`${BACKEND_ROOT}${event.image}`}
            alt={event.title}
            className="card-image-fit"
          />
          <div className="card-content">
            <h3 className="card-title">{event.title}</h3>
            <div className="card-info">
              <div className="info-item">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="date-icon"
                ></FontAwesomeIcon>
                <span>{formattedDate}</span>
              </div>
            </div>
            <div className="card-actions">
              <button
                className="details-link"
                onClick={() => onViewDetails?.(event)}
              >
                View Details
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="date-icon"
                ></FontAwesomeIcon>
              </button>
              <button className="rsvp-btn" onClick={() => onRegister?.(event)}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="event-sidebar">
        <h4 className="sidebar-title">Event Details</h4>
        <div className="info-item">
          <FontAwesomeIcon
            icon={faUsers}
            className="date-icon"
          ></FontAwesomeIcon>
          <span>Capacity:{event.capacity} guests</span>
        </div>
        <div className="info-item">
          <FontAwesomeIcon
            icon={faLocationDot}
            className="date-icon"
          ></FontAwesomeIcon>
          <span>Location:Brown Pages Cafe</span>
        </div>
        <div className="info-item">
          <span>Description: {event.description} </span>
        </div>
      </div>
    </div>
  );
};
export default EventCard;
