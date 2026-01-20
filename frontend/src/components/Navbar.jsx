import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        Brown Pages Cafe
      </Link>

      <button className="nav-toggle" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <nav className={`nav-links ${open ? "open" : ""}`}>
        <Link to="/" onClick={() => setOpen(false)}>
          Home
        </Link>
        <Link to="/menu" onClick={() => setOpen(false)}>
          Menu
        </Link>
        <Link to="/events" onClick={() => setOpen(false)}>
          Events
        </Link>
        <Link to="/contacts" onClick={() => setOpen(false)}>
          Contacts
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
