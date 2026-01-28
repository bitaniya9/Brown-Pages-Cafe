const MenuItem = require("../models/MenuItem.js");
const createMenuItem = async (request, response) => {
  try {
    const menu = await MenuItem.create(request.body);
    response
      .status(201)
      .json({ message: "Menu Item created sucessfully", menu });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};
const getMenuItems = async (request, response) => {
  try {
    const { category, available } = request.query;
    const filter = {};
    if (category) {
      filter.category = category;
    }
    if (available !== undefined) {
      filter.available = available === "true";
    }
    const menuItems = await MenuItem.find(filter).sort({
      category: 1,
      name: 1,
    });
    response.status(200).json(menuItems);
  } catch (error) {
    console.error("GET MENU ERROR:", error);
    response.status(500).json({ message: error.message });
  }
};

module.exports = { createMenuItem, getMenuItems };
