require("dotenv").config();
const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path"); // This is the 'path' module
const connectDB = require("./config/db.js");

const handleUserRoutes = require("./routes/User.routes.js");
const handleReservationRoutes = require("./routes/reservation.routes.js");
const handleReviewRoutes = require("./routes/review.routes.js");
const handleEventRoutes = require("./routes/events.routes.js");
const handleMenuRoutes = require("./routes/menu.routes.js");

connectDB();

const setCorsHeaders = (res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
};

const getJSONBody = (request) => {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk.toString();
    });
    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
};

const server = http.createServer(async (request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const pathname = parsedUrl.pathname; // The string variable
  const query = parsedUrl.query;

  setCorsHeaders(response);

  // 1. Handle CORS Preflight
  if (request.method === "OPTIONS") {
    response.writeHead(204);
    response.end();
    return;
  }

  // 2. Serve Static Files (Fixed 'pathName' to 'pathname')
  if (pathname.startsWith("/uploads/")) {
    const filePath = path.join(__dirname, "..", pathname);
    if (fs.existsSync(filePath)) {
      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        ".jpg": "image/jpeg",
        ".png": "image/png",
        ".gif": "image/gif",
      };
      response.writeHead(200, {
        "Content-Type": mimeTypes[ext] || "application/octet-stream",
      });
      fs.createReadStream(filePath).pipe(response);
    } else {
      response.writeHead(404);
      response.end("Not Found");
    }
    return;
  }

  try {
    let body = {};
    const contentType = request.headers["content-type"] || "";

    // Parse JSON only if it's not a file upload
    if (
      ["POST", "PUT", "PATCH"].includes(request.method) &&
      contentType.includes("application/json")
    ) {
      body = await getJSONBody(request);
    }

    if (pathname === "/" && request.method === "GET") {
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.end("Backend running with native HTTP");
    }
    // ALL ROUTE CALLS BELOW: Changed 'path' (module) to 'pathname' (string)
    else if (pathname.startsWith("/api/users")) {
      await handleUserRoutes(request, response, body, pathname);
    } else if (pathname.startsWith("/api/reservations")) {
      await handleReservationRoutes(request, response, body, pathname);
    } else if (pathname.startsWith("/api/events")) {
      await handleEventRoutes(request, response, body, pathname, query);
    } else if (pathname.startsWith("/api/reviews")) {
      await handleReviewRoutes(request, response, body, pathname, query);
    } else if (pathname.startsWith("/api/menu")) {
      await handleMenuRoutes(request, response, body, pathname, query);
    } else {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Route not found" }));
    }
  } catch (error) {
    console.error(error);
    response.writeHead(500);
    response.end(JSON.stringify({ error: "Internal Server Error" }));
  }
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server starting at port ${port}`);
});
