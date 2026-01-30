const MenuItem = require("../models/MenuItem.js");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken"); // Added for admin check

const sendJSON = (response, statusCode, data) => {
  response.writeHead(statusCode, { "Content-Type": "application/json" });
  response.end(JSON.stringify(data));
};

const handleMenuRoutes = async (request, response, body, pathname, query) => {
  const method = request.method;

  //  GET /api/menu-
  if (pathname === "/api/menu" && method === "GET") {
    try {
      const { category, available } = query;
      const filter = {};
      if (category) filter.category = category;
      if (available !== undefined) filter.available = available === "true";

      const menuItems = await MenuItem.find(filter).sort({
        category: 1,
        name: 1,
      });
      return sendJSON(response, 200, menuItems);
    } catch (error) {
      return sendJSON(response, 500, { message: error.message });
    }
  }
};

module.exports = handleMenuRoutes;
