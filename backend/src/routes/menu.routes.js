const MenuItem = require("../models/MenuItem.js");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken"); // Added for admin check

const sendJSON = (response, statusCode, data) => {
  response.writeHead(statusCode, { "Content-Type": "application/json" });
  response.end(JSON.stringify(data));
};

// Helper to verify the admin token
const verifyAdmin = (request) => {
  const token = request.headers["authorization"]?.split(" ")[1];
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.role === "admin" ? decoded : null;
  } catch (err) {
    return null;
  }
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

  // --- 2. POST /api/menu (Admin Only + Image Upload) ---
  if (pathname === "/api/menu" && method === "POST") {
    const admin = verifyAdmin(request);
    if (!admin) {
      return sendJSON(response, 403, { message: "Access denied: Admins only" });
    }

    // Initialize Formidable
    const form = new formidable.IncomingForm();
    const uploadFolder = path.join(__dirname, "../uploads/menu");
    form.uploadDir = uploadFolder;
    form.keepExtensions = true;

    // Ensure directory exists
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }

    form.parse(request, async (err, fields, files) => {
      if (err)
        return sendJSON(response, 500, { message: "Image upload failed" });

      try {
        // Formidable v3 returns arrays for fields
        const name = fields.name?.[0];
        const price = fields.price?.[0];
        const category = fields.category?.[0];
        const available = fields.available?.[0] !== "false"; // Default to true unless explicitly false

        // 1. Validation for Enum categories
        const allowedCategories = [
          "sandwiches_and_snacks",
          "pasteries",
          "specials",
          "hot_drinks",
          "cold_drinks",
          "juice",
        ];

        if (!allowedCategories.includes(category)) {
          return sendJSON(response, 400, {
            message: `Invalid category. Must be one of: ${allowedCategories.join(", ")}`,
          });
        }

        // 2. Handle Image path
        let imageUrl = null;
        if (files.image && files.image[0]) {
          imageUrl = `/uploads/menu/${files.image[0].newFilename}`;
        }

        // 3. Create in Database
        const newItem = await MenuItem.create({
          name,
          price: Number(price),
          category,
          available,
          image: imageUrl,
        });

        return sendJSON(response, 201, newItem);
      } catch (error) {
        return sendJSON(response, 400, { message: error.message });
      }
    });
    return; // Prevent falling through to 404 while formidable is parsing
  }

  // --- 404 Fallback ---
  sendJSON(response, 404, { message: "Menu route not found" });
};

module.exports = handleMenuRoutes;
