import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUpcomingEvents } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faUsers, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const BACKEND_ROOT = "http://localhost:3000";

    useEffect(() => {
        getUpcomingEvents()
            .then((data) => {
                const foundEvent = data.events.find((e) => e._id === id);
                setEvent(foundEvent);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="event-details-loading">Loading...</div>;
    if (!event) return <div className="event-details-error">Event not found</div>;

    const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <div className="event-details-page">
            <button className="back-btn" onClick={() => navigate("/events")}>
                &larr; Back to Events
            </button>

            <div className="event-details-container">
                <div className="details-image-section">
                    <img
                        src={`${BACKEND_ROOT}${event.image}`}
                        alt={event.title}
                        className="details-hero-img"
                    />
                </div>

                <div className="details-info-section">
                    <h1>{event.title}</h1>

                    <div className="details-meta">
                        <div className="meta-item">
                            <FontAwesomeIcon icon={faCalendarDays} className="icon" />
                            <span>{formattedDate}</span>
                        </div>
                        <div className="meta-item">
                            <FontAwesomeIcon icon={faUsers} className="icon" />
                            <span>Capacity: {event.capacity}</span>
                        </div>
                        <div className="meta-item">
                            <FontAwesomeIcon icon={faLocationDot} className="icon" />
                            <span>Location: Brown Pages Cafe</span>
                        </div>
                    </div>

                    <div className="details-description">
                        <h3>About this Event</h3>
                        <p>{event.description}</p>
                    </div>

                    <button className="register-btn-large">Register Now</button>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
