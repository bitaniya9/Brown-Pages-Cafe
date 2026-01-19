require("dotenv").config();
const mongoose = require("mongoose");
const Event = require("./src/models/Event.js");

const connectDB = require("./src/config/db.js");
const seedEvents = async () => {
  try {
    await connectDB();

    const events = [
      {
        title: "Poetry Night",
        type: "poetry_night",
        date: new Date("2026-02-20"),
        description: `Join us for an enchanting evening of poetry where local artists will perform their original works. 
        This event is perfect for poetry lovers of all ages who enjoy hearing creative expressions come to life. 
        There will be opportunities to interact with the performers, share your own verses, and explore the rich literary culture in a cozy and welcoming environment.`,
        capacity: 30,
        image: "/uploads/events/poetry_night.png",
      },
      {
        title: "Book Club: The Alchemist",
        type: "book_club",
        date: new Date("2026-02-25"),
        description: `Dive deep into the magical world of Paulo Coelho's masterpiece, The Alchemist. 
        We will discuss the themes of destiny, dreams, and the journey of self-discovery. 
        Whether you've read it a dozen times or this is your first journey with Santiago, your perspective is welcome!`,
        capacity: 15,
        image: "/uploads/events/home_hero.jpg",
      },
      {
        title: "Coffee Tasting Workshop",
        type: "flavor_exploration",
        date: new Date("2026-03-05"),
        description: `Experience the subtle nuances of different coffee beans from around the world. 
        Our head barista, Maya Hailu, will guide you through the tasting process, explaining the origins, roasting techniques, and flavor profiles. 
        Perfect for coffee enthusiasts looking to refine their palate.`,
        capacity: 10,
        image: "/uploads/events/coffee_tasting.png",
      },
    ];
    await Event.insertMany(events);
    console.log("Seeded events successfully!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
seedEvents();
