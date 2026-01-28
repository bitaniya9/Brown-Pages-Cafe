require("dotenv").config();
const mongoose = require("mongoose");
const MenuItem = require("./src/models/MenuItem.js");

const connectDB = require("./src/config/db.js");
const seedMenu = async () => {
  try {
    await connectDB();

    const menuItems = [
      {
        name: "Chicken Sandwich",
        price: 5.5,
        category: "sandwiches_and_snacks",
        image: "/uploads/menu/chicken_sandwich.jpg",
      },
      {
        name: "Veggie Wrap",
        price: 4.0,
        category: "sandwiches_and_snacks",
        image: "/uploads/menu/veggie_wrap.jpg",
      },
      {
        name: "Chocolate Croissant",
        price: 2.5,
        category: "pasteries",
        image: "/uploads/menu/chocolate_croissant.jpg",
      },
      {
        name: "Banana Muffin",
        price: 2.0,
        category: "pasteries",
        image: "/uploads/menu/muffin.jpg",
      },
      {
        name: "Special Burger",
        price: 7.0,
        category: "specials",
        image: "/uploads/menu/chefs_special_burger.jpg",
      },
      {
        name: "Cappuccino",
        price: 3.0,
        category: "hot_drinks",
        image: "/uploads/menu/cappuccino.jpg",
      },
      {
        name: "Black tea",
        price: 3.5,
        category: "hot_drinks",
        image: "/uploads/menu/black_tea.jpg",
      },
      {
        name: "Iced Coffee",
        price: 3.0,
        category: "cold_drinks",
        image: "/uploads/menu/iced_coffee.jpg",
      },
      {
        name: "Lemonade",
        price: 2.5,
        category: "juice",
        image: "/uploads/menu/lemonade.jpg",
      },
      {
        name: "Orange Juice",
        price: 3.0,
        category: "juice",
        image: "/uploads/menu/orange_juice.jpg",
      },
      {
        name: "Avocado Juice",
        price: 3.0,
        category: "juice",
        image: "/uploads/menu/avocado_juice.jpg",
      },
      {
        name: "Samosa",
        price: 2.0,
        category: "specials",
        image: "/uploads/menu/samosa.jpg",
      },
    ];
    await MenuItem.insertMany(menuItems);
    console.log("Seeded menu successfully!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
seedMenu();
