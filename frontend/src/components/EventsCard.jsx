import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faUsers,
  // faChevronRight,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

const EventCard = ({ event, onRegister, onCancel }) => {
  const BACKEND_ROOT = import.meta.env.VITE_API_URL1;
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    /* This is the Flex Container */
    <div className="events">
      <div className="event-card-container">
        <div className="main-event-card">
          <div className="card-image-box">
            <img
              src={`${BACKEND_ROOT}${event.image}`}
              alt={event.title}
              className="card-image-fit"
            />
          </div>
          <div className="card-content">
            <h3 className="card-title">{event.title}</h3>
            <div className="card-info">
              <div className="info-item">
                <FontAwesomeIcon icon={faCalendarDays} className="date-icon" />
                <span>{formattedDate}</span>
              </div>
            </div>
            <div className="card-actions">
              <button className="rsvp-btn" onClick={() => onRegister?.(event)}>
                Register
              </button>
              <button
                className="rsvp-btn cancel"
                onClick={() => onCancel(event._id)}
              >
                Cancel Registration
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION: Sidebar */}
        <div className="event-sidebar">
          <h4 className="sidebar-title">Event Details</h4>
          <div className="info-item">
            <h3>{event.title}</h3>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faCalendarDays} className="date-icon" />
            <span> {formattedDate}</span>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faUsers} className="date-icon" />
            <span> Capacity: {event.capacity} guests</span>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faLocationDot} className="date-icon" />
            <span> Location: Brown Pages Cafe</span>
          </div>

          <div className="info-item description-box">
            <p>
              <strong>
                <FontAwesomeIcon icon={faBook} className="date-icon" />
                Description:
              </strong>{" "}
              {event.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventCard;
