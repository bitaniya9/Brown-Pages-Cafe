const Event = require("../models/Event");
const EventRegistration = require("../models/EventRegistration");
const jwt = require("jsonwebtoken");
const formidable = require("formidable");
const path = require("path"); // This is the module
const fs = require("fs");

const sendJSON = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
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

  // --- 1. ADMIN CREATE (POST /api/events) ---
  if (pathName === "/api/events" && method === "POST") {
    if (!user || user.role !== "admin")
      return sendJSON(response, 403, { message: "Admin only" });

    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, "../uploads/events");
    form.keepExtensions = true;

    if (!fs.existsSync(form.uploadDir))
      fs.mkdirSync(form.uploadDir, { recursive: true });

    form.parse(request, async (err, fields, files) => {
      if (err) return sendJSON(response, 500, { message: "Upload Error" });
      try {
        const imageUrl = files.image
          ? `/uploads/events/${files.image[0].newFilename}`
          : null;
        const event = await Event.create({
          title: fields.title[0],
          description: fields.description[0],
          date: fields.date[0],
          capacity: fields.capacity[0],
          image: imageUrl,
        });
        return sendJSON(response, 201, event);
      } catch (error) {
        return sendJSON(response, 400, { message: error.message });
      }
    });
    return;
  }

  // --- 2. GET ALL EVENTS (GET /api/events) ---
  if (pathName === "/api/events" && method === "GET") {
    // Fixed 'path' to 'pathName'
    try {
      const { type, time, page = 1, limit = 6 } = query;
      const now = new Date();
      const mongoQuery = {};

      if (type) mongoQuery.type = type;
      if (time === "upcoming") mongoQuery.date = { $gte: now };
      if (time === "past") mongoQuery.date = { $lt: now };

      const skip = (parseInt(page) - 1) * parseInt(limit);
      const events = await Event.find(mongoQuery)
        .sort({ date: 1 })
        .skip(skip)
        .limit(parseInt(limit));

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

      const total = await Event.countDocuments(mongoQuery);
      return sendJSON(response, 200, {
        events: enrichedEvents,
        pagination: {
          total,
          page: Number(page),
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      return sendJSON(response, 500, { message: error.message });
    }
  }

  // --- 3. MY EVENTS (GET /api/events/user/my-events) ---
  if (pathName === "/api/events/user/my-events" && method === "GET") {
    // Fixed 'path' to 'pathName'
    if (!user) return sendJSON(response, 401, { message: "Unauthorized" });
    try {
      const now = new Date();
      const registrations = await EventRegistration.find({
        userId: user.id,
      }).populate("eventId");
      const upcomingEvents = [],
        pastEvents = [];

      registrations.forEach((reg) => {
        if (!reg.eventId) return;
        const event = reg.eventId;
        const data = {
          _id: event._id,
          title: event.title,
          date: event.date,
          type: event.type,
        };
        new Date(event.date) >= now
          ? upcomingEvents.push(data)
          : pastEvents.push(data);
      });
      return sendJSON(response, 200, { upcomingEvents, pastEvents });
    } catch (error) {
      return sendJSON(response, 500, { message: error.message });
    }
  }

  // --- 4. DYNAMIC ID ROUTES ---
  const idMatch = pathName.match(
    /^\/api\/events\/([a-zA-Z0-9]+)(?:\/(remaining-spots|register))?$/,
  ); // Fixed 'path' to 'pathName'

  if (idMatch) {
    const eventId = idMatch[1];
    const subRoute = idMatch[2];

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
      if (!user) return sendJSON(response, 401, { message: "Unauthorized" });
      const deleted = await EventRegistration.findOneAndDelete({
        userId: user.id,
        eventId,
      });
      return deleted
        ? sendJSON(response, 200, { message: "RSVP cancelled" })
        : sendJSON(response, 404, { message: "Not found" });
    }

    if (!subRoute && method === "GET") {
      const event = await Event.findById(eventId);
      if (!event)
        return sendJSON(response, 404, { message: "Event not found" });
      let isRegistered = false;
      if (user) {
        const reg = await EventRegistration.findOne({
          userId: user.id,
          eventId,
        });
        isRegistered = !!reg;
      }
      return sendJSON(response, 200, { ...event.toObject(), isRegistered });
    }

    // PATCH /api/events/:id (Updated to handle Multipart for images)
    if (!subRoute && method === "PATCH") {
      if (!user || user.role !== "admin")
        return sendJSON(response, 403, { message: "Admin only" });

      const form = new formidable.IncomingForm();
      form.parse(request, async (err, fields, files) => {
        if (err) return sendJSON(response, 500, { message: "Update Error" });
        try {
          const updateData = {};
          for (let key in fields) {
            updateData[key] = fields[key][0];
          }
          if (files.image)
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
