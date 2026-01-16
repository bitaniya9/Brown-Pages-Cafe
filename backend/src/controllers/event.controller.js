const Event = require("../models/Event");
const EventRegistration = require("../models/EventRegistration");

//only Admin can create and delete the cafes events
const createEvent = async (request, response) => {
  try {
    const event = await Event.create(request.body);
    response.status(201).json(event);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

const getAllEvents = async (request, response) => {
  try {
    const { type, time, page = 1, limit = 6 } = request.query;
    const now = new Date();
    const query = {};

    if (type) {
      query.type = type; //to filter by category
    }

    if (time === "upcoming") {
      query.date = { $gte: now };
    }
    if (time === "past") {
      query.date = { $lt: now };
    }

    const skip = (page - 1) * limit;

    const events = await Event.find(query)
      .sort({ date: 1 })
      .skip(skip)
      .limit(Number(limit));

    let registrations = [];

    if (request.user?.id) {
      registrations = await EventRegistration.find({
        userId: request.user.id,
        eventId: { $in: events.map((e) => e._id) },
      });
    }
    const registeredEventIds = registrations.map((r) => r.eventId.toString());

    const enrichedEvents = events.map((event) => ({
      ...event.toObject(),
      isRegistered: registeredEventIds.includes(event._id.toString()),
    }));

    const total = await Event.countDocuments(query);

    response.json({
      events: enrichedEvents,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

//get Single events by Id so that when a user clicks view details
const getEventById = async (request, response) => {
  try {
    const event = await Event.findById(request.params.id);
    if (!event) {
      return response.status(404).json({ error: "Event not found" });
    }
    let isRegistered = false;
    if (request.user?.id) {
      const reg = await EventRegistration.findOne({
        userId: request.user.id,
        eventId: event._id,
      });
      isRegistered = !!reg;
    }
    response.json({
      ...event.toObject(),
      isRegistered,
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

//Delete Admin (Admin)
const deleteEvent = async (request, response) => {
  try {
    const event = await Event.findByIdAndDelete(request.params.id);
    if (!event) {
      return response.status(404).json({ message: "Event not found" });
    }
    response.json({ message: "Event deleted" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const registerForEvent = async (request, response) => {
  const userId = request.user.id;
  const eventId = request.params.id;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return response.status(404).json({ message: "Event not found" });
    }
    const count = await EventRegistration.countDocuments({ eventId });
    if (count >= event.capacity) {
      return response.status(400).json({ message: "Event is full" });
    }

    //If the event is found and there is space register
    const registration = await EventRegistration.create({ userId, eventId });
    response
      .status(201)
      .json({ message: "Registered successfully", registration });
  } catch (error) {
    if (error.code === 11000) {
      return response
        .status(400)
        .json({ message: "Already registered for this event" });
    }
    response.status(500).json({ message: error.message });
  }
};

const getRemainingSpots = async (request, response) => {
  try {
    const event = await Event.findById(request.params.id);
    if (!event) {
      return response.status(404).json({ message: "Event not found" });
    }
    const count = await EventRegistration.countDocuments({
      eventId: event._id,
    });
    const remaining = event.capacity - count;
    response.json({ remaining });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
const cancelEventRegistration = async (request, response) => {
  try {
    const deleted = await EventRegistration.findOneAndDelete({
      userId: request.user.id,
      eventId: request.params.id,
    });
    if (!deleted) {
      return response
        .status(404)
        .json({ message: "Not registered for this event" });
    } else if (deleted.date < new Date()) {
      return response
        .status(400)
        .json({ message: "Cannot cancel past events" });
    } else {
      response.json({ message: "RSVP cancelled successfully" });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const getMyEvents = async (request, response) => {
  try {
    const now = new Date();
    const registrations = await EventRegistration.find({
      userId: request.user.id,
    }).populate("eventId");

    const upcomingEvents = [];
    const pastEvents = [];

    registrations.forEach((reg) => {
      if (!reg.eventId) {
        return;
      }
      const event = reg.eventId;
      const eventData = {
        _id: event._id,
        title: event.title,
        date: event.date,
        type: event.type,
        capacity: event.capacity,
      };
      if (new Date(event.date) >= now) {
        upcomingEvents.push(eventData);
      } else {
        pastEvents.push(eventData);
      }
    });
    response.json({ upcomingEvents, pastEvents });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  deleteEvent,
  registerForEvent,
  getRemainingSpots,
  cancelEventRegistration,
  getMyEvents,
};
