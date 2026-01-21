//EventCard component
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
export const getRemainingSpots = async (eventId) => {
  const response = await fetch(`${BASE_URL}/events/${eventId}/remaining`);

  if (!response.ok) {
    throw new Error("Failed to fetch remaining spots");
  }

  return response.json(); // { remaining }
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

export const getMyEvents = async (token) => {
  const response = await fetch(`${BASE_URL}/events/user/my-events`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch registered events");
  }

  return data.events; // array of event IDs or events
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
