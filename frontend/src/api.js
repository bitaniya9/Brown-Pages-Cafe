const BASE_URL = import.meta.env.VITE_API_URL;

//Sign up page
export const signup = async (userData) => {
  const response = await fetch(`${BASE_URL}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }
  return data;
};
//Login page
export const loginUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Login message");
  }
  return data;
};

//For the events
export const getUpcomingEvents = async () => {
  const response = await fetch(`${BASE_URL}/events?time=upcoming`);
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  return response.json();
};

// Admin: get all events
export const getAllEvents = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/events`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to fetch events");
  }
  const data = await res.json();
  return data.events || data;
};

export const registerForEvent = async (id, token) => {
  const response = await fetch(`${BASE_URL}/events/${id}/register`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to register");
  }
  return response.json();
};
export const cancelEventRegistration = async (id, token) => {
  const response = await fetch(`${BASE_URL}/events/${id}/register`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to cancel registration");
  }
  return data;
};

// Reservation functions
export const createReservation = async (token, reservationData) => {
  const response = await fetch(`${BASE_URL}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reservationData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to create reaservation");
  }
  return data;
};
export const cancelReservation = async (token, id) => {
  const response = await fetch(`${BASE_URL}/reservations/${id}/cancel`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to cancel reservation");
  }
  return data;
};

//For the menu

export const getMenuItems = async ({ category, available } = {}) => {
  const params = new URLSearchParams();

  if (category) params.append("category", category);
  if (available !== undefined) params.append("available", available);

  const response = await fetch(`${BASE_URL}/menu?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch menu items");
  }

  return response.json();
};
//Create Menu items

//Events Admin Only

export const updateEvent = async (id, updateData) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  Object.keys(updateData).forEach((key) => {
    if (updateData[key] !== undefined) {
      formData.append(key, updateData[key]);
    }
  });

  console.log("Updating event at:", `${BASE_URL}/events/${id}`);
  const res = await fetch(`${BASE_URL}/events/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to update event");
  }

  return res.json();
};

export const deleteEvent = async (id) => {
  const token = localStorage.getItem("token"); // get admin JWT

  const res = await fetch(`${BASE_URL}/events/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, // send token
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to delete event");
  }

  return res.json(); // { message: "Event deleted" }
};

//Reservation admin only
export const getAllReservations = async () => {
  const token = localStorage.getItem("token"); // your stored JWT
  const res = await fetch(`${BASE_URL}/reservations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to fetch reservations");
  }
  return res.json();
};
// Admin: get all users
export const getAllUsers = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to fetch users");
  }
  return res.json();
};
//Review

// --- Review Functions ---

export const createReview = async (token, reviewData) => {
  const response = await fetch(`${BASE_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reviewData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to create review");
  }
  return data;
};

export const getAllReviewsAdmin = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/reviews/admin`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch reviews");
  }
  return data;
};

//users Admin Only
