const Event = require("../models/Event");
const EventRegistration = require("../models/EventRegistration");
const jwt = require("jsonwebtoken");
const formidable = require("formidable");
const path = require("path"); // This is the module to build folder paths
const fs = require("fs");

const sendJSON = (response, statusCode, data) => {
  response.writeHead(statusCode, { "Content-Type": "application/json" });
  response.end(JSON.stringify(data));
};

const verifyAuth = (request) => {
  const token = request.headers["authorization"]?.split(" ")[1];
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};

const handleEventRoutes = async (request, response, body, pathName, query) => {
  const method = request.method;
  const user = verifyAuth(request);

  // GET ALL EVENTS ---
  if (pathName === "/api/events" && method === "GET") {
    // Fixed 'path' to 'pathName'
    try {
      const { type, time } = query;
      const now = new Date();
      const mongoQuery = {};

      if (type) mongoQuery.type = type;
      if (time === "upcoming") mongoQuery.date = { $gte: now };
      if (time === "past") mongoQuery.date = { $lt: now };

      const events = await Event.find(mongoQuery).sort({ date: 1 });

      let registeredEventIds = [];
      if (user) {
        const registrations = await EventRegistration.find({
          userId: user.id,
          eventId: { $in: events.map((e) => e._id) },
        });
        registeredEventIds = registrations.map((r) => r.eventId.toString());
      }

      const enrichedEvents = events.map((event) => ({
        ...event.toObject(),
        isRegistered: registeredEventIds.includes(event._id.toString()),
      }));

      return sendJSON(response, 200, {
        events: enrichedEvents,
      });
    } catch (error) {
      return sendJSON(response, 500, { message: error.message });
    }
  }

  // ID ROUTES
  //To get register
  const idMatch = pathName.match(
    /^\/api\/events\/([a-zA-Z0-9]+)(?:\/(remaining-spots|register))?$/,
  ); // Fixed 'path' to 'pathName'
  // /api/events/:id/remaining-spots
  // //api/events/:id/register

  if (idMatch) {
    const eventId = idMatch[1]; //to get id
    const subRoute = idMatch[2]; //to get the subroute register/remaing spot

    if (subRoute === "remaining-spots" && method === "GET") {
      const event = await Event.findById(eventId);
      if (!event)
        return sendJSON(response, 404, { message: "Event not found" });
      const count = await EventRegistration.countDocuments({ eventId });
      return sendJSON(response, 200, { remaining: event.capacity - count });
    }

    if (subRoute === "register" && method === "POST") {
      if (!user) return sendJSON(response, 401, { message: "Unauthorized" });
      try {
        const event = await Event.findById(eventId);
        if (!event)
          return sendJSON(response, 404, { message: "Event not found" });
        const count = await EventRegistration.countDocuments({ eventId });
        if (count >= event.capacity)
          return sendJSON(response, 400, { message: "Event full" });
        const registration = await EventRegistration.create({
          userId: user.id,
          eventId,
        });
        return sendJSON(response, 201, { message: "Registered", registration });
      } catch (error) {
        return sendJSON(response, error.code === 11000 ? 400 : 500, {
          message: error.code === 11000 ? "Already registered" : error.message,
        });
      }
    }

    if (subRoute === "register" && method === "DELETE") {
      if (!user) return sendJSON(response, 401, { message: "Unauthorized" }); //not logged in
      const deleted = await EventRegistration.findOneAndDelete({
        userId: user.id,
        eventId,
      });
      return deleted
        ? sendJSON(response, 200, { message: "RSVP cancelled" })
        : sendJSON(response, 404, { message: "Not found" });
    }

    // Updating events
    if (!subRoute && method === "PATCH") {
      if (!user || user.role !== "admin")
        return sendJSON(response, 403, { message: "Admin only" });

      const form = new formidable.IncomingForm();
      form.uploadDir = path.join(__dirname, "../uploads/events");
      form.keepExtensions = true;
      form.parse(request, async (error, fields, files) => {
        if (error) return sendJSON(response, 500, { message: "Update Error" });
        try {
          const updateData = {};
          for (let key in fields) {
            updateData[key] = fields[key][0];
          }
          if (files.image && files.image[0])
            updateData.image = `/uploads/events/${files.image[0].newFilename}`;

          const event = await Event.findByIdAndUpdate(eventId, updateData, {
            new: true,
          });
          return event
            ? sendJSON(response, 200, event)
            : sendJSON(response, 404, { message: "Not found" });
        } catch (error) {
          return sendJSON(response, 400, { message: error.message });
        }
      });
      return;
    }

    //Deleting events
    if (!subRoute && method === "DELETE") {
      if (!user || user.role !== "admin")
        return sendJSON(response, 403, { message: "Admin only" });
      const event = await Event.findByIdAndDelete(eventId);
      return event
        ? sendJSON(response, 200, { message: "Deleted" })
        : sendJSON(response, 404, { message: "Not found" });
    }
  }

  sendJSON(response, 404, { message: "Event route not found" });
};

module.exports = handleEventRoutes;
