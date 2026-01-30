import { useState, useEffect } from "react";
import {
  cancelEventRegistration,
  getUpcomingEvents,
  registerForEvent,
} from "../api.js";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import EventsCard from "../components/EventsCard";
const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUpcomingEvents()
      .then((data) => {
        const userId = localStorage.getItem("userId");
        const updatedEvents = data.events.map((event) => ({
          ...event,
          isRegistered: event.attendees?.includes(userId), // Mark as true if user is in the list
        }));
        setEvents(updatedEvents);
      })
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
      setEvents((prevEvents) =>
        prevEvents.map((e) =>
          e._id === event._id ? { ...e, isRegistered: true } : e,
        ),
      );
    } catch (error) {
      toast.error(error.message || "Failed to register");
    }
  };

  const handleCancel = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.info("Please login to manage registrations.");
      await cancelEventRegistration(eventId, token);
      toast.success("Registeration has been cancelled successfully");
      setEvents((prevEvents) =>
        prevEvents.map((e) =>
          e._id === eventId ? { ...e, isRegistered: false } : e,
        ),
      );
    } catch (error) {
      toast.error(error.message || "Failed to cancel");
    }
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
              onCancel={handleCancel}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Events;
