import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUpcomingEvents, registerForEvent } from "../api.js";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import EventsCard from "../components/EventsCard";
const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUpcomingEvents()
      .then((data) => setEvents(data.events))
      .catch((error) => setError(error.message));
  }, []);
  const handleRegister = async (event) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return toast.info("Please login to register.");
      }
      await registerForEvent(event._id, token);
      toast.success(`Registered for ${event.title} `);
    } catch (error) {
      toast.error(error.message || "Failed to register");
    }
  };
  const handleViewDetails = (event) => {
    navigate(`/events/${event._id}`);
  };
  return (
    <main className="events">
      <h1 className="event-heading">Events</h1>
      <p className="event-heading paragraph">
        Join us for fun, engaging and educational events at Brown Pages Cafe!
        <br></br>Explore our upcoming events and register to save your spots.
        <br></br>See you there!{" "}
      </p>
      <div>
        <h2 className="event-heading-h2">Upcoming Events</h2>
        <div>
          {events.map((event) => (
            <EventsCard
              key={event._id}
              event={event}
              onRegister={handleRegister}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Events;
