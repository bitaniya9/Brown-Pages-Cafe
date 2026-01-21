import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MenuCard from "../components/MenuCard";
import { getMenuItems } from "../api";
// import Footer from "../components/Footer";
const categories = [
  { label: "All", value: "all" },
  { label: "Hot Drinks", value: "hot_drinks" },
  { label: "Cold Drinks", value: "cold_drinks" },
  { label: "Pastries", value: "pasteries" },
  { label: "Sandwiches", value: "sandwiches_and_snacks" },
  { label: "Specials", value: "specials" },
  { label: "Juice", value: "juice" },
];

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const loadMenu = async () => {
      const data =
        activeCategory === "all"
          ? await getMenuItems()
          : await getMenuItems({ category: activeCategory });

      setMenuItems(data);
    };
    loadMenu();
  }, [activeCategory]);
  return (
    <div className="menu">
      <Navbar />
      <section className="menu-page">
        <h1 className="event-heading">Our Menu</h1>
        <p className="event-heading paragraph"></p>

        {/* FILTER */}
        <div className="category-bar">
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`category-btn ${
                activeCategory === cat.value ? "active" : ""
              }`}
              onClick={() => setActiveCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="menu-grid">
          {menuItems.map((item) => (
            <MenuCard key={item._id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Menu;
