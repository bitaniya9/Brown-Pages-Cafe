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
        image: "/uploads/events/Gemini_Generated_Image_se687xse687xse68.png",
      },
      {
        title: "Harry Potter: Goblet of fire",
        type: "book_club",
        date: new Date("2026-03-05"),
        description: `Dive into the magical world of Harry Potter in our engaging book club session focused on 'Goblet of Fire'. 
        Discuss the plot, characters, and the hidden themes of friendship, courage, and perseverance. 
        This interactive session encourages lively conversation and is a great way to connect with fellow fans of the series while gaining new insights and perspectives on J.K. Rowling's beloved books.`,
        capacity: 12,
        image: "/uploads/events/khalis-rafif-XVUVPhcFHu8-unsplash.jpg",
      },
      {
        title: "Author Signing- Jerry Spineli",
        type: "signing",
        date: new Date("2026-03-10"),
        description: `Meet the acclaimed author Jerry Spineli and get your favorite books signed! 
        This special event offers an intimate opportunity to hear Spineli share insights into his writing process, inspirations, and upcoming works. 
        Whether you're a lifelong fan or discovering his stories for the first time, you'll enjoy engaging conversations, photo opportunities, and the chance to connect with a vibrant literary community.`,
        capacity: 50,
        image: "/uploads/events/elena-kloppenburg-JP-EwLOTDBk-unsplash.jpg",
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
