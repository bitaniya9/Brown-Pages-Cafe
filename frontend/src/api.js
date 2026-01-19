//EventCard component
const BASE_URL = import.meta.env.VITE_API_URL;

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

export const cancelEventRegistration = async (id, token) => {
  const response = await fetch(`${BASE_URL}/events/${id}/register`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};
