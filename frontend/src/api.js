//EventCard component
const BASE_URL = import.meta.env.VITE_API_URL;

export const getUpcomingEvents = async () => {
  // Mock data for display purposes since backend might not be running/connected
  return {
    events: [
      {
        _id: "1",
        title: "Poetry Night",
        date: "2026-02-20",
        capacity: 30,
        image: "/uploads/events/poetry_night.png",
        description:
          "Join us for an enchanting evening of poetry where local artists will perform their original works. This event is perfect for poetry lovers of all ages who enjoy hearing creative expressions come to life. There will be opportunities to interact with the performers, share your own verses, and explore the rich literary culture in a cozy and welcoming environment.",
      },
      {
        _id: "2",
        title: "Book Club: The Alchemist",
        date: "2026-02-25",
        capacity: 15,
        image: "/uploads/events/home_hero.jpg",
        description:
          "Dive deep into the magical world of Paulo Coelho's masterpiece, The Alchemist. We will discuss the themes of destiny, dreams, and the journey of self-discovery. Whether you've read it a dozen times or this is your first journey with Santiago, your perspective is welcome!",
      },
      {
        _id: "3",
        title: "Coffee Tasting Workshop",
        date: "2026-03-05",
        capacity: 10,
        image: "/uploads/events/coffee_tasting.png",
        description:
          "Experience the subtle nuances of different coffee beans from around the world. Our head barista, Maya Hailu, will guide you through the tasting process, explaining the origins, roasting techniques, and flavor profiles. Perfect for coffee enthusiasts looking to refine their palate.",
      },
    ],
  };
};

export const registerForEvent = async (id, token) => {
  console.log(`Mock registration for event ${id} with token ${token}`);
  return { success: true, message: "Registered successfully (Mock)" };
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
